import { Product } from '@/lib/data/products';
import { categories, Category } from '@/lib/data/categories';
import { reviews, Review } from '@/lib/data/reviews';
import { journalArticles, JournalArticle } from '@/lib/data/journal';
import {
  fetchLiveCatalog,
  recordOrderAndSubtractStock,
} from '@/lib/firebase/catalog';
import { isFirebaseConfigured } from '@/lib/firebase/config';

export interface OrderInput {
  userId?: string | null;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  state: string;
  paymentMethod: string;
  items: Array<{
    productId: string;
    variantId: string;
    quantity: number;
    price: number;
  }>;
  total: number;
}

export interface OrderResult {
  orderId: string;
  success: boolean;
  timestamp: string;
  trackingNumber: string;
}

export async function getProducts(): Promise<Product[]> {
  return fetchLiveCatalog();
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const all = await fetchLiveCatalog();
  return all.find((p) => p.slug === slug);
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const all = await fetchLiveCatalog();
  return all.filter((p) => p.categorySlug === categorySlug);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const all = await fetchLiveCatalog();
  return all.filter((p) => p.isFeatured || p.isBestseller);
}

export async function getCategories(): Promise<Category[]> {
  return [...categories];
}

export async function getReviews(productSlug?: string): Promise<Review[]> {
  if (productSlug) {
    return reviews.filter((r) => r.productSlug === productSlug);
  }
  return [...reviews];
}

export async function getJournalArticles(): Promise<JournalArticle[]> {
  return [...journalArticles];
}

export async function checkPincodeDelivery(pincode: string): Promise<{ serviceable: boolean; estimatedDays: string }> {
  await new Promise((res) => setTimeout(res, 300));
  const pin = pincode.trim();
  if (/^\d{6}$/.test(pin)) {
    return { serviceable: true, estimatedDays: '2 - 3 business days' };
  }
  return { serviceable: false, estimatedDays: 'Pincode not serviceable' };
}

export async function createOrder(input: OrderInput): Promise<OrderResult> {
  const randomSuffix = Math.floor(100000 + Math.random() * 900000);
  const orderId = `YAG-${input.items.length > 0 ? randomSuffix : '000000'}`;
  const trackingNumber = `EXP-IN-${randomSuffix}`;
  const timestamp = new Date().toISOString();

  if (isFirebaseConfigured && input.items.length > 0) {
    await recordOrderAndSubtractStock({
      orderId,
      trackingNumber,
      userId: input.userId || null,
      customerName: input.customerName,
      email: input.email,
      phone: input.phone,
      address: input.address,
      city: input.city,
      pincode: input.pincode,
      state: input.state,
      paymentMethod: input.paymentMethod,
      items: input.items,
      total: input.total,
      status: 'confirmed',
      createdAt: timestamp,
    });
  } else {
    await new Promise((res) => setTimeout(res, 400));
  }

  return {
    orderId,
    success: true,
    timestamp,
    trackingNumber,
  };
}
