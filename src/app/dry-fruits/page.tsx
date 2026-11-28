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
        titleLead: 'Orchard',
        titleAccent: 'Dried Fruits',
        introBody:
          'Tender dried anjeer figs, soft dates, golden pineapple rings, and tangy-sweet dried kiwi slices for snacking, soaking, and everyday kitchen prep.',
        originTag: 'Dried Fruits',
        harvestTitle: 'Chewy orchard variety.',
        harvestBody:
          'From honeyed figs and caramel-rich dates to bright tropical pineapple and kiwi rounds, each variety brings distinct texture to snack jars and desserts.',
        craftTitle: 'Soak, dice, or snack.',
        craftBody:
          'Soak anjeer overnight, pair dates with whole nuts, or chop dried pineapple and kiwi into muesli and yogurt bowls.',
        promiseTitle: 'Everyday pantry favourites.',
        promiseBody:
          'Packaged in convenient 100g, 200g, and 500g options tailored for households and gifting.',
        charcoalDoodle: 'blackberry',
        accentDoodle: 'leaf',
        products,
      }}
    />
  );
}
