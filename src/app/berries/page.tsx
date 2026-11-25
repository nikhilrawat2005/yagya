import { getProductsByCategory } from '@/lib/services/productService';
import { CategoryStoryPage } from '@/components/editorial/CategoryStoryPage';

export default async function BerriesPage() {
  const products = await getProductsByCategory('berries');

  return (
    <CategoryStoryPage
      config={{
        pageKey: 'berries',
        categorySlug: 'berries',
        eyebrow: 'Mountain Berries',
        titleLead: 'Vibrant Himalayan',
        titleAccent: 'Berries',
        introBody:
          'Wild sea buckthorn, orchard cranberries, and deep blueberries, gently dehydrated to preserve their tart mountain pulp and seed oils without refined sugar.',
        originTag: 'Ladakh · Himachal · Uttarakhand',
        harvestTitle: 'Tart pulp, zero disguised sugar.',
        harvestBody:
          'Unlike glazed snack berries, our mountain harvests keep their natural acidity, Vitamin C, and phytonutrient density intact.',
        craftTitle: 'Gentle low-heat dehydration.',
        craftBody:
          'Slow drying protects delicate anthocyanins and Omega-7 oils so every spoonful tastes bright in warm infusions or morning bowls.',
        promiseTitle: 'High-altitude purity in every pouch.',
        promiseBody:
          'Hand-sorted in small seasonal batches and sealed immediately against humidity.',
        charcoalDoodle: 'blueberry',
        accentDoodle: 'berries',
        products,
      }}
    />
  );
}
