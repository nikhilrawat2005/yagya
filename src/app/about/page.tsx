import { getProducts, getCategories } from '@/lib/services/productService';
import { StoryJourney } from '@/components/editorial/StoryJourney';

export default async function AboutPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return <StoryJourney products={products} categories={categories} />;
}
