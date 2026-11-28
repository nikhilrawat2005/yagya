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
        titleLead: 'Roasted',
        titleAccent: 'Makhana',
        introBody:
          'Crisp popped lotus seeds in five seasoned varieties: Mint Makhana, Black Salt Makhana, Peri Peri Makhana, Black Pepper Makhana, and Spicy Masala Makhana.',
        originTag: 'Five Seasoned Blends',
        harvestTitle: 'Airy crunch, classic seasonings.',
        harvestBody:
          'Light roasted fox nuts seasoned for everyday tea-time snacking, desk jars, and travel packs without heavy deep-fried crunch.',
        craftTitle: 'Five flavours in 100g packs.',
        craftBody:
          'Choose cooling garden mint, classic black salt, cracked black pepper, tangy peri-peri, or homestyle spicy masala.',
        promiseTitle: 'Ready straight from the pouch.',
        promiseBody:
          'Serve alongside afternoon chai, coffee, or clear soups whenever a crisp savoury bite is called for.',
        charcoalDoodle: 'seeds',
        accentDoodle: 'flame',
        products,
      }}
    />
  );
}
