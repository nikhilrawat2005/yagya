import { getProductsByCategory } from '@/lib/services/productService';
import { CategoryStoryPage } from '@/components/editorial/CategoryStoryPage';

export default async function NutsPage() {
  const products = await getProductsByCategory('nuts');

  return (
    <CategoryStoryPage
      config={{
        pageKey: 'nuts',
        categorySlug: 'nuts',
        eyebrow: 'Orchard Nuts',
        titleLead: 'Single-origin',
        titleAccent: 'Nuts',
        introBody:
          'Rare Himalayan chilgoza pine nuts, crisp whole almonds, creamy cashews, and fragrant hazelnuts — graded for size, crunch, and natural oil density.',
        originTag: 'Orchard & Cedar Forest Groves',
        harvestTitle: 'Graded for crispness.',
        harvestBody:
          'We source single-harvest whole kernels rather than mixed commodity lots, preserving sweet creaminess and clean snap.',
        craftTitle: 'Raw, whole & unbleached.',
        craftBody:
          'From morning soaked almonds to roasted hazelnut butter, these kernels carry pure plant fats and steady energy.',
        promiseTitle: 'Forest & orchard harvests.',
        promiseBody:
          'Packed in nitrogen-flushed barrier pouches so natural nut oils never turn stale.',
        charcoalDoodle: 'olive',
        accentDoodle: 'leaf',
        products,
      }}
    />
  );
}
