import {
  collection,
  doc,
  getDocs,
  runTransaction,
  setDoc,
} from 'firebase/firestore';
import { products as baselineProducts, type Product, type ProductVariant } from '@/data/products';
import { getFirebaseDb, isFirebaseConfigured } from '@/lib/firebase/config';

const PRODUCTS_COLLECTION = 'products';
const ORDERS_COLLECTION = 'orders';

export interface StoredOrderItem {
  productId: string;
  variantId: string;
  quantity: number;
  priceInr: number | null;
}

export interface StoredOrder {
  orderId: string;
  trackingNumber: string;
  userId?: string | null;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  state: string;
  paymentMethod: string;
  items: StoredOrderItem[];
  totalInr: number | null;
  status: 'confirmed' | 'dispatched' | 'delivered';
  createdAt: string;
}

type FirestoreValue =
  | { stringValue: string }
  | { integerValue: string }
  | { doubleValue: number }
  | { booleanValue: boolean }
  | { nullValue: null }
  | { arrayValue: { values?: FirestoreValue[] } }
  | { mapValue: { fields?: Record<string, FirestoreValue> } };

function decodeFirestoreValue(val: FirestoreValue): unknown {
  if ('stringValue' in val) return val.stringValue;
  if ('integerValue' in val) return Number(val.integerValue);
  if ('doubleValue' in val) return val.doubleValue;
  if ('booleanValue' in val) return val.booleanValue;
  if ('nullValue' in val) return null;
  if ('arrayValue' in val) {
    return (val.arrayValue.values || []).map(decodeFirestoreValue);
  }
  if ('mapValue' in val) {
    const out: Record<string, unknown> = {};
    const fields = val.mapValue.fields || {};
    for (const [k, v] of Object.entries(fields)) {
      out[k] = decodeFirestoreValue(v);
    }
    return out;
  }
  return undefined;
}

function normalizeRemoteVariant(raw: Record<string, unknown>): ProductVariant {
  return {
    id: String(raw.id ?? ''),
    label: String(raw.label ?? raw.weight ?? ''),
    weight: String(raw.weight ?? raw.label ?? ''),
    priceInr: typeof raw.priceInr === 'number' ? raw.priceInr : null,
    mrpInr: typeof raw.mrpInr === 'number' ? raw.mrpInr : null,
    sku: typeof raw.sku === 'string' ? raw.sku : null,
    stock: typeof raw.stock === 'number' ? raw.stock : 0,
  };
}

function normalizeProduct(raw: Product): Product {
  return {
    ...raw,
    provenance: raw.provenance ?? null,
    origin: raw.origin ?? null,
    zeroAddedSugar: Boolean(raw.zeroAddedSugar),
    rating: typeof raw.rating === 'number' ? raw.rating : null,
    reviewCount: typeof raw.reviewCount === 'number' ? raw.reviewCount : null,
    servingSize: raw.servingSize ?? null,
    nutritionFacts: Array.isArray(raw.nutritionFacts) && raw.nutritionFacts.length > 0
      ? raw.nutritionFacts
      : null,
    nutritionFootnote: raw.nutritionFootnote ?? null,
    ingredients: raw.ingredients ?? null,
    allergenAdvice: raw.allergenAdvice ?? null,
    howToUse: Array.isArray(raw.howToUse) && raw.howToUse.length > 0 ? raw.howToUse : null,
    storage: raw.storage ?? null,
    variants: Array.isArray(raw.variants)
      ? raw.variants.map((v) => normalizeRemoteVariant(v as unknown as Record<string, unknown>))
      : [],
  };
}

function decodeFirestoreDocument(docObj: {
  name?: string;
  fields?: Record<string, FirestoreValue>;
}): Product | null {
  if (!docObj.fields) return null;
  const decoded: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(docObj.fields)) {
    decoded[k] = decodeFirestoreValue(v);
  }
  if (!decoded.id || !decoded.slug || !decoded.name || !Array.isArray(decoded.variants)) {
    return null;
  }
  return normalizeProduct(decoded as unknown as Product);
}

function mergeCatalog(remoteProducts: Product[]): Product[] {
  const map = new Map<string, Product>();
  for (const base of baselineProducts) {
    map.set(base.id, base);
  }
  for (const remote of remoteProducts) {
    if (remote && remote.id) {
      const base = map.get(remote.id);
      if (base) {
        // Keep compliant baseline copy/nutrition while allowing stock overrides
        map.set(remote.id, {
          ...base,
          variants: base.variants.map((bv) => {
            const rv = remote.variants.find((v) => v.id === bv.id);
            return rv ? { ...bv, stock: rv.stock } : bv;
          }),
        });
      } else {
        map.set(remote.id, normalizeProduct(remote));
      }
    }
  }
  return Array.from(map.values());
}

/**
 * Fetches the live product catalog (Firestore overrides + newly added products merged with baseline).
 */
export async function fetchLiveCatalog(): Promise<Product[]> {
  if (!isFirebaseConfigured) {
    return [...baselineProducts];
  }

  if (typeof window !== 'undefined') {
    try {
      const db = getFirebaseDb();
      if (!db) return [...baselineProducts];
      const snap = await getDocs(collection(db, PRODUCTS_COLLECTION));
      const remote = snap.docs.map((d) => normalizeProduct(d.data() as Product));
      return mergeCatalog(remote);
    } catch {
      return [...baselineProducts];
    }
  }

  try {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    if (!projectId || !apiKey) return [...baselineProducts];

    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${PRODUCTS_COLLECTION}?pageSize=100&key=${apiKey}`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return [...baselineProducts];

    const data = (await res.json()) as {
      documents?: Array<{ name?: string; fields?: Record<string, FirestoreValue> }>;
    };
    const remote = (data.documents || [])
      .map(decodeFirestoreDocument)
      .filter((p): p is Product => Boolean(p));

    return mergeCatalog(remote);
  } catch {
    return [...baselineProducts];
  }
}

export async function upsertCatalogProduct(product: Product): Promise<Product> {
  const db = getFirebaseDb();
  if (!db) {
    throw new Error('Firebase Firestore is not configured yet.');
  }
  const sanitized = JSON.parse(JSON.stringify(product)) as Product;
  await setDoc(doc(db, PRODUCTS_COLLECTION, sanitized.id), sanitized, { merge: true });
  return sanitized;
}

export async function updateVariantStock(
  product: Product,
  variantId: string,
  nextStock: number
): Promise<Product> {
  const safeStock = Math.max(0, Math.floor(Number.isFinite(nextStock) ? nextStock : 0));
  const updatedProduct: Product = {
    ...product,
    variants: product.variants.map((v) =>
      v.id === variantId ? { ...v, stock: safeStock } : v
    ),
  };
  return upsertCatalogProduct(updatedProduct);
}

export async function seedBaselineCatalog(): Promise<number> {
  const db = getFirebaseDb();
  if (!db) {
    throw new Error('Firebase Firestore is not configured yet.');
  }

  const snap = await getDocs(collection(db, PRODUCTS_COLLECTION));
  const existingIds = new Set(snap.docs.map((d) => d.id));
  let seededCount = 0;

  for (const prod of baselineProducts) {
    if (!existingIds.has(prod.id)) {
      await setDoc(doc(db, PRODUCTS_COLLECTION, prod.id), JSON.parse(JSON.stringify(prod)));
      seededCount += 1;
    }
  }
  return seededCount;
}

/**
 * Places an order in Firestore and atomically subtracts purchased quantities
 * from each product variant's stock.
 */
export async function recordOrderAndSubtractStock(
  order: StoredOrder
): Promise<void> {
  const db = getFirebaseDb();
  if (!db) return;

  const byProduct = new Map<string, Map<string, number>>();
  for (const item of order.items) {
    const varMap = byProduct.get(item.productId) || new Map<string, number>();
    varMap.set(item.variantId, (varMap.get(item.variantId) || 0) + item.quantity);
    byProduct.set(item.productId, varMap);
  }

  await runTransaction(db, async (tx) => {
    const productReads = new Map<string, Product>();

    for (const productId of byProduct.keys()) {
      const ref = doc(db, PRODUCTS_COLLECTION, productId);
      const snap = await tx.get(ref);
      if (snap.exists()) {
        productReads.set(productId, normalizeProduct(snap.data() as Product));
      } else {
        const base = baselineProducts.find((p) => p.id === productId);
        if (base) {
          productReads.set(productId, JSON.parse(JSON.stringify(base)) as Product);
        }
      }
    }

    for (const [productId, varMap] of byProduct.entries()) {
      const currentProduct = productReads.get(productId);
      if (!currentProduct) continue;

      const updatedVariants = currentProduct.variants.map((v) => {
        const orderedQty = varMap.get(v.id) || 0;
        if (orderedQty <= 0) return v;
        return {
          ...v,
          stock: Math.max(0, v.stock - orderedQty),
        };
      });

      const updatedProduct: Product = {
        ...currentProduct,
        variants: updatedVariants,
      };

      tx.set(doc(db, PRODUCTS_COLLECTION, productId), updatedProduct, { merge: true });
    }

    const cleanOrder = JSON.parse(JSON.stringify(order)) as StoredOrder;
    tx.set(doc(db, ORDERS_COLLECTION, order.orderId), cleanOrder);
  });
}

export async function getAllOrders(): Promise<StoredOrder[]> {
  const db = getFirebaseDb();
  if (!db) {
    throw new Error('Firebase Firestore is not configured yet.');
  }
  const snap = await getDocs(collection(db, ORDERS_COLLECTION));
  return snap.docs
    .map((d) => d.data() as StoredOrder)
    .sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
}
