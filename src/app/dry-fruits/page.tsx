import { getProductsByCategory } from '@/lib/services/productService';
import { CategoryStoryPage } from '@/components/editorial/CategoryStoryPage';

export default async function DryFruitsPage() {
  const products = await getProductsByCategory('dried-fruits');

  return (
    <CategoryStoryPage
      config={{
        pageKey: 'dry-fruits',
        categorySlug: 'dried-fruits',
        eyebrow: 'Dried Fruits',
        titleLead: 'Sun-cured orchard',
        titleAccent: 'Fruits',
        introBody:
          'Plump Anjeer rings, soft hand-sorted dates, golden pineapple rings, and vibrant kiwi slices — cured slowly without artificial syrups or sulfur glazing.',
        originTag: 'Sun-Cured Orchard Harvests',
        harvestTitle: 'Natural honeyed chew.',
        harvestBody:
          'Harvested at peak ripeness and sun-cured in clean drying yards so natural fruit sugars caramelize gently.',
        craftTitle: 'Zero sulfur, zero glaze.',
        craftBody:
          'Soak anjeer overnight, pair dates with almonds before a run, or slice dried pineapple into evening infusions.',
        promiseTitle: 'Orchard warmth, sealed clean.',
        promiseBody:
          'Every batch is inspected for softness, natural aroma, and zero sticky coatings.',
        charcoalDoodle: 'blackberry',
        accentDoodle: 'leaf',
        products,
      }}
    />
  );
}
