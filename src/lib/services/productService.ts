import { Product } from '@/data/products';
import { categories, Category } from '@/lib/data/categories';
import { reviews, Review } from '@/lib/data/reviews';
import { journalArticles, JournalArticle } from '@/lib/data/journal';
import { siteConfig } from '@/config/site';
import { INDIAN_PINCODE_REGEX } from '@/lib/validation/forms';
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
    priceInr: number | null;
  }>;
  totalInr: number | null;
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
  return all.filter((p) => (p.isFeatured || p.isBestseller) && !p.comingSoon);
}

export async function getCategories(): Promise<Category[]> {
  return [...categories];
}

export async function getReviews(productSlug?: string): Promise<Review[]> {
  if (!siteConfig.featureFlags.showTestimonials) {
    return [];
  }
  if (productSlug) {
    return reviews.filter((r) => r.productSlug === productSlug);
  }
  return [...reviews];
}

export async function getJournalArticles(): Promise<JournalArticle[]> {
  if (!siteConfig.featureFlags.showJournal) {
    return [];
  }
  return [...journalArticles];
}

export async function checkPincodeDelivery(
  pincode: string
): Promise<{ serviceable: boolean; message: string }> {
  await new Promise((res) => setTimeout(res, 250));
  const pin = pincode.trim();
  if (INDIAN_PINCODE_REGEX.test(pin)) {
    const dispatchText = siteConfig.operations.dispatchWindowText;
    return {
      serviceable: true,
      message: dispatchText
        ? `Valid Indian PIN code (${pin}). Estimated dispatch: ${dispatchText}.`
        : `Valid 6-digit Indian PIN code (${pin}). Delivery schedule will be confirmed upon order review.`,
    };
  }
  return {
    serviceable: false,
    message: 'Enter a valid 6-digit Indian PIN code.',
  };
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
      totalInr: input.totalInr,
      status: 'confirmed',
      createdAt: timestamp,
    });
  } else {
    await new Promise((res) => setTimeout(res, 350));
  }

  return {
    orderId,
    success: true,
    timestamp,
    trackingNumber,
  };
}
