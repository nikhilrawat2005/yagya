import type { Metadata } from 'next';
import { getProductsByCategory } from '@/lib/services/productService';
import { CategoryStoryPage } from '@/components/editorial/CategoryStoryPage';

export const metadata: Metadata = {
  title: 'Whole Nuts',
};

export default async function NutsPage() {
  const products = await getProductsByCategory('nuts');

  return (
    <CategoryStoryPage
      config={{
        pageKey: 'nuts',
        categorySlug: 'nuts',
        eyebrow: 'Whole Nuts',
        titleLead: 'Whole Pantry',
        titleAccent: 'Nuts',
        introBody:
          'Buttery pine nuts (chilgoza), crisp whole almonds, creamy whole cashews, and aromatic hazelnuts suited for soaking, pan-roasting, and culinary prep.',
        originTag: 'Whole Nuts',
        harvestTitle: 'Crisp kernels for daily kitchens.',
        harvestBody:
          'Whole nuts selected for clean crunch and natural nutty aroma, ready for morning soaking, trail mixes, festive cooking, and spreads.',
        craftTitle: 'Roast, blend, or snack whole.',
        craftBody:
          'Lightly warm pine nuts or hazelnuts in a dry skillet, soak almonds overnight, or blend cashews into rich culinary gravies.',
        promiseTitle: 'Flexible pack weights.',
        promiseBody:
          'Available across 100g, 200g, and 500g pack sizes to match weekly or monthly pantry needs.',
        charcoalDoodle: 'olive',
        accentDoodle: 'leaf',
        products,
      }}
    />
  );
}
