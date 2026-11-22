import { products, Product } from '@/lib/data/products';
import { categories, Category } from '@/lib/data/categories';
import { reviews, Review } from '@/lib/data/reviews';
import { journalArticles, JournalArticle } from '@/lib/data/journal';

export interface OrderInput {
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
  return [...products];
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return products.find((p) => p.slug === slug);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return products.filter((p) => p.isFeatured || p.isBestseller);
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
  await new Promise((res) => setTimeout(res, 500));
  const randomSuffix = Math.floor(100000 + Math.random() * 900000);
  return {
    orderId: `BP-${input.items.length > 0 ? randomSuffix : '000000'}`,
    success: true,
    timestamp: new Date().toISOString(),
    trackingNumber: `EXP-IN-${randomSuffix}`,
  };
}
