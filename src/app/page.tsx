import { getProducts, getCategories, getReviews } from '@/lib/services/productService';
import { StoryLanding } from '@/components/editorial/StoryLanding';

export default async function HomePage() {
  const [products, categories, reviews] = await Promise.all([
    getProducts(),
    getCategories(),
    getReviews(),
  ]);

  return (
    <StoryLanding
      products={products}
      categories={categories}
      reviews={reviews}
    />
  );
}
