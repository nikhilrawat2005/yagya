import type { Metadata } from 'next';
import { getProducts, getCategories } from '@/lib/services/productService';
import { StoryJourney } from '@/components/editorial/StoryJourney';

export const metadata: Metadata = {
  title: 'Our Story',
};

export default async function AboutPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return <StoryJourney products={products} categories={categories} />;
}
