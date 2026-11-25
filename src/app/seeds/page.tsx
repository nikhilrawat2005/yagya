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
          'Cool-season Rabi flax, high-fiber chia, crisp pumpkin pepitas, and golden sunflower kernels — cleaned directly at partner farms with zero bleaching or coatings.',
        originTag: 'Madhya Pradesh · Rajasthan · Karnataka',
        harvestTitle: 'Crispness locked in small batches.',
        harvestBody:
          'Each seed lot is gravity-cleaned and moisture-checked before entering barrier-sealed pouches, keeping natural Omega oils and nutty aroma intact.',
        craftTitle: 'Whole, unroasted & honest.',
        craftBody:
          'Fold alsi into morning dough, soak chia overnight, or toast pepitas lightly in a cast-iron skillet for daily nourishment.',
        promiseTitle: 'Straight from Rabi fields to your pantry.',
        promiseBody:
          'Every pouch carries full origin traceability and zero added sugar, salt, or preservatives.',
        charcoalDoodle: 'seeds',
        accentDoodle: 'seeds',
        products,
      }}
    />
  );
}
