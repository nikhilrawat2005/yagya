import { getProductsByCategory } from '@/lib/services/productService';
import { CategoryStoryPage } from '@/components/editorial/CategoryStoryPage';

export default async function MakhanaPage() {
  const products = await getProductsByCategory('flavoured-makhana');

  return (
    <CategoryStoryPage
      config={{
        pageKey: 'makhana',
        categorySlug: 'flavoured-makhana',
        eyebrow: 'Flavoured Makhana',
        titleLead: 'Slow-roasted',
        titleAccent: 'Makhana',
        introBody:
          'Hand-popped wetland lotus seeds tumbled in small drums with garden mint, Himalayan black salt, cracked black pepper, peri-peri, and warm pantry masala.',
        originTag: 'Five Artisan Spice Blends',
        harvestTitle: 'Airy crunch, whole spices.',
        harvestBody:
          'Roasted slowly without palm oil or artificial dustings, using only honest ground herbs, rock salt, and whole chilies.',
        craftTitle: 'Small-drum roasting.',
        craftBody:
          'Each lotus puff stays crisp and light, making it an effortless mid-afternoon ritual alongside chai or black coffee.',
        promiseTitle: 'Five blends, zero shortcuts.',
        promiseBody:
          'Sealed fresh right after cooling so every handful keeps its delicate crunch.',
        charcoalDoodle: 'seeds',
        accentDoodle: 'flame',
        products,
      }}
    />
  );
}
