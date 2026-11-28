import { getProductsByCategory } from '@/lib/services/productService';
import { CategoryStoryPage } from '@/components/editorial/CategoryStoryPage';

export default async function SeedsPage() {
  const products = await getProductsByCategory('seeds-and-grains');

  return (
    <CategoryStoryPage
      config={{
        pageKey: 'seeds',
        categorySlug: 'seeds-and-grains',
        eyebrow: 'Seeds & Grains',
        titleLead: 'Sun-ripened',
        titleAccent: 'Seeds',
        introBody:
          'Flax seeds, chia seeds, pumpkin pepitas, and sunflower kernels — cleaned and packed in small batches with zero added sugar on our documented seed lineup.',
        originTag: 'Seeds & Grains',
        harvestTitle: 'Sorted for daily bowls and baking.',
        harvestBody:
          'Documented seed varieties include reference nutrition profiles per 100 g and per serve so you can plan breakfast bowls, smoothies, and dough with confidence.',
        craftTitle: 'Whole, versatile pantry staples.',
        craftBody:
          'Stir alsi into roti dough, soak chia seeds in water or curd, or scatter pumpkin and sunflower kernels over warm salads and oats.',
        promiseTitle: 'Everyday seed nourishment.',
        promiseBody:
          'Available in 100g and 200g pack sizes, with Amaranth (Rajgira) and Haleel joining the lineup soon.',
        charcoalDoodle: 'seeds',
        accentDoodle: 'seeds',
        products,
      }}
    />
  );
}
