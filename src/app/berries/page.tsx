import { getProductsByCategory } from '@/lib/services/productService';
import { CategoryStoryPage } from '@/components/editorial/CategoryStoryPage';

export default async function BerriesPage() {
  const products = await getProductsByCategory('berries');

  return (
    <CategoryStoryPage
      config={{
        pageKey: 'berries',
        categorySlug: 'berries',
        eyebrow: 'Dried Berries',
        titleLead: 'Vibrant Dried',
        titleAccent: 'Berries',
        introBody:
          'Whole dried sea buckthorn berries with zero added sugar alongside sweet-tart dried blueberries and ruby cranberries for everyday bowls, trail mixes, and baking.',
        originTag: 'Dried Berries',
        harvestTitle: 'Honest ingredient clarity.',
        harvestBody:
          'Our Dried Sea Buckthorn Berries contain 100% berries with zero added sugar, while Dried Blueberries and Cranberries list cane sugar and sunflower oil openly on every page.',
        craftTitle: 'Steep, blend, or snack straight.',
        craftBody:
          'Steep sea buckthorn in warm water for a tangy herbal infusion, or fold blueberries and cranberries into overnight oats, salads, and muffins.',
        promiseTitle: 'Documented reference nutrition.',
        promiseBody:
          'Explore 100g, 200g, and 500g formats, with Dried Blackberries and Dried Raspberries coming soon.',
        charcoalDoodle: 'blueberry',
        accentDoodle: 'berries',
        products,
      }}
    />
  );
}
