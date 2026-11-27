import { ASSETS } from '@/lib/assets';

import type { CategorySlug } from './categories';

export interface ProductVariant {
  id: string;
  label: string;
  weight: string;
  price: number;
  mrp: number;
  sku: string;
  stock: number;
}

export interface ProductImage {
  src: string;
  alt: string;
}

export interface NutritionFact {
  nutrient: string;
  per100g: string;
  perServe: string;
  rda?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: CategorySlug;
  shortDescription: string;
  description: string;
  provenance: string;
  origin: string;
  images: ProductImage[];
  variants: ProductVariant[];
  badges: string[];
  rating: number;
  reviewCount: number;
  servingSize: string;
  nutritionFacts: NutritionFact[];
  nutritionFootnote: string;
  ingredients: string;
  allergenAdvice: string;
  howToUse: string[];
  storage: string;
  tags: string[];
  isFeatured?: boolean;
  isBestseller?: boolean;
  relatedSlugs: string[];
}

/**
 * Complete Yagya Harvest Lineup (20 Small-Batch Products)
 * Core 7 farm seeds & berries carry reference tables from `Yagya content/Nutrition facts and description.docx`.
 * Orchard dried fruits, whole nuts, and seasoned makhana pack variants follow the documented catalog lineup.
 */
export const products: Product[] = [
  {
    id: 'prod-seabuckthorn',
    slug: 'dried-sea-buckthorn-berries',
    name: 'Dried Sea Buckthorn Berries',
    category: 'Berries',
    categorySlug: 'berries',
    shortDescription:
      'Whole mountain berries rich in rare plant Omega-7, Vitamin C & fiber, with zero added sugar.',
    description:
      'Harvested directly from partner farmers and packed under strict hygiene standards, our whole Dried Sea Buckthorn Berries bring consumers the authentic, local, and traditional taste of the mountains with zero added sugar. Gently dehydrated to lock in their dense nutrition, these berries deliver a vibrant, tangy burst of rare plant-based Omega-7 alongside Omegas 3, 6, and 9, natural Vitamin C, carotenoids, and dietary fiber.',
    provenance: 'Mountain Harvest · Whole Pulp & Seeds',
    origin: 'Himalayan Valleys',
    images: [
      {
        src: ASSETS.products.berries.seaBuckthorn,
        alt: 'Bowl of amber Dried Sea Buckthorn Berries with leafy stem on dark slate',
      },
    ],
    variants: [
      { id: 'sbt-100', label: '100g', weight: '100g', price: 249, mrp: 299, sku: 'YAG-SBT-100', stock: 50 },
      { id: 'sbt-200', label: '200g', weight: '200g', price: 469, mrp: 549, sku: 'YAG-SBT-200', stock: 40 },
      { id: 'sbt-500', label: '500g', weight: '500g', price: 999, mrp: 1199, sku: 'YAG-SBT-500', stock: 25 },
    ],
    badges: ['Zero Added Sugar', 'Omega-7 Rich'],
    rating: 4.9,
    reviewCount: 142,
    servingSize: '10 g (approx. 1 tbsp)',
    nutritionFacts: [
      { nutrient: 'Energy', per100g: '345 kcal', perServe: '34.5 kcal', rda: '1.7%' },
      { nutrient: 'Protein', per100g: '5.2 g', perServe: '0.52 g', rda: '-' },
      { nutrient: 'Carbohydrate', per100g: '48.0 g', perServe: '4.8 g', rda: '-' },
      { nutrient: 'Total Sugars', per100g: '14.5 g', perServe: '1.45 g', rda: '-' },
      { nutrient: 'Added Sugars', per100g: '0.0 g', perServe: '0.0 g', rda: '0.0%' },
      { nutrient: 'Dietary Fiber', per100g: '22.0 g', perServe: '2.2 g', rda: '7.3%' },
      { nutrient: 'Total Fat', per100g: '14.8 g', perServe: '1.48 g', rda: '2.2%' },
      { nutrient: 'Saturated Fat', per100g: '3.6 g', perServe: '0.36 g', rda: '1.6%' },
      { nutrient: 'Monounsaturated Fat (incl. Omega-7 & 9)', per100g: '6.8 g', perServe: '0.68 g', rda: '-' },
      { nutrient: 'Polyunsaturated Fat (incl. Omega-3 & 6)', per100g: '4.4 g', perServe: '0.44 g', rda: '-' },
      { nutrient: 'Trans Fat', per100g: '0.0 g', perServe: '0.0 g', rda: '0.0%' },
      { nutrient: 'Cholesterol', per100g: '0 mg', perServe: '0 mg', rda: '-' },
      { nutrient: 'Sodium', per100g: '12 mg', perServe: '1.2 mg', rda: '0.1%' },
      { nutrient: 'Vitamin C', per100g: '650 mg', perServe: '65 mg', rda: '81.3%' },
      { nutrient: 'Vitamin E', per100g: '12.5 mg', perServe: '1.25 mg', rda: '12.5%' },
      { nutrient: 'Beta-Carotene (Pro-Vitamin A)', per100g: '1800 µg', perServe: '180 µg', rda: '3.8%' },
      { nutrient: 'Potassium', per100g: '780 mg', perServe: '78 mg', rda: '2.2%' },
      { nutrient: 'Iron', per100g: '4.2 mg', perServe: '0.42 mg', rda: '2.2%' },
    ],
    nutritionFootnote:
      '% RDA values per serve (10 g) are calculated based on ICMR-NIN 2020 guidelines for a sedentary adult man (2000 kcal diet).',
    ingredients:
      '100% Dried Sea Buckthorn Berries (Hippophae rhamnoides). No added sugar, preservatives, artificial colors, or flavors.',
    allergenAdvice: 'Packed in a facility that also handles tree nuts and seeds.',
    howToUse: [
      'Enjoy 1 tablespoon (10 g) daily straight from the pack for a tangy crunch.',
      'Steep in warm water for an antioxidant herbal infusion.',
      'Blend into smoothies, yogurt bowls, oatmeal, and trail mixes.',
    ],
    storage:
      'Store in a cool, dry, and dark place away from direct sunlight and heat to protect natural Omega oils. Reseal pouch tightly after every use.',
    tags: ['sea buckthorn', 'berries', 'omega 7', 'vitamin c', 'zero added sugar'],
    isFeatured: true,
    isBestseller: true,
    relatedSlugs: ['dried-cranberries', 'dried-blueberries', 'chia-seeds'],
  },
  {
    id: 'prod-flax-seeds',
    slug: 'flax-seeds',
    name: 'Flax Seeds',
    category: 'Seeds & Grains',
    categorySlug: 'seeds-and-grains',
    shortDescription:
      'Traditional Rabi alsi packed with plant Omega-3 (ALA), dietary fiber & lignans.',
    description:
      'Known traditionally as Alsi in Hindi and Jawas in Marathi, our flax seeds are a nutrient-dense superfood packed with plant-based Omega-3 fatty acids, gut-friendly dietary fiber, lignans, and protein. Grown as a cool-season winter crop across fertile belts in Madhya Pradesh, Uttar Pradesh, Rajasthan, and Chhattisgarh, and cleaned and packed straight from farming communities.',
    provenance: 'Rabi Harvest · Madhya Pradesh & Rajasthan',
    origin: 'Winter Rabi Belt',
    images: [
      {
        src: ASSETS.products.seeds.flaxSeeds,
        alt: 'Wooden scoop pouring amber-brown Flax Seeds with dried flax pods on slate',
      },
    ],
    variants: [
      { id: 'flx-100', label: '100g', weight: '100g', price: 149, mrp: 179, sku: 'YAG-FLX-100', stock: 65 },
      { id: 'flx-200', label: '200g', weight: '200g', price: 279, mrp: 329, sku: 'YAG-FLX-200', stock: 45 },
    ],
    badges: ['100% Natural', 'Omega-3 ALA'],
    rating: 4.9,
    reviewCount: 86,
    servingSize: '10 g (approx. 1 tbsp)',
    nutritionFacts: [
      { nutrient: 'Energy', per100g: '534 kcal', perServe: '53.4 kcal', rda: '2.7%' },
      { nutrient: 'Protein', per100g: '18.3 g', perServe: '1.83 g', rda: '3.4%' },
      { nutrient: 'Carbohydrate', per100g: '28.9 g', perServe: '2.89 g', rda: '-' },
      { nutrient: 'Total Sugars', per100g: '1.6 g', perServe: '0.16 g', rda: '-' },
      { nutrient: 'Added Sugars', per100g: '0.0 g', perServe: '0.0 g', rda: '0.0%' },
      { nutrient: 'Dietary Fiber', per100g: '27.3 g', perServe: '2.73 g', rda: '9.1%' },
      { nutrient: 'Total Fat', per100g: '42.2 g', perServe: '4.22 g', rda: '6.3%' },
      { nutrient: 'Saturated Fat', per100g: '3.7 g', perServe: '0.37 g', rda: '1.7%' },
      { nutrient: 'Monounsaturated Fat', per100g: '7.5 g', perServe: '0.75 g', rda: '-' },
      { nutrient: 'Polyunsaturated Fat', per100g: '28.7 g', perServe: '2.87 g', rda: '-' },
      { nutrient: 'Omega-3 Fatty Acids (ALA)', per100g: '22.8 g', perServe: '2.28 g', rda: '-' },
      { nutrient: 'Trans Fat', per100g: '0.0 g', perServe: '0.0 g', rda: '0.0%' },
      { nutrient: 'Cholesterol', per100g: '0 mg', perServe: '0 mg', rda: '-' },
      { nutrient: 'Sodium', per100g: '30 mg', perServe: '3.0 mg', rda: '0.2%' },
    ],
    nutritionFootnote:
      'Approximate values. % Recommended Dietary Allowance (RDA) is calculated per serving based on a 2000 kcal adult diet.',
    ingredients: '100% Natural Flax Seeds (Alsi).',
    allergenAdvice: 'Packed in a facility that also processes tree nuts, peanuts, sesame, and soy.',
    howToUse: [
      'Add 1 tbsp (10 g) daily to smoothies, yogurt, oats, salads, or roti dough.',
    ],
    storage: 'Store in a cool, dry place away from direct sunlight. Reseal tightly after use.',
    tags: ['flax seeds', 'alsi', 'omega 3', 'fiber', 'seeds'],
    isFeatured: true,
    isBestseller: true,
    relatedSlugs: ['chia-seeds', 'pumpkin-seeds', 'sunflower-seeds'],
  },
  {
    id: 'prod-pumpkin-seeds',
    slug: 'pumpkin-seeds',
    name: 'Pumpkin Seeds',
    category: 'Seeds & Grains',
    categorySlug: 'seeds-and-grains',
    shortDescription:
      'Plump kaddu pepitas delivering 29.8g protein per 100g and natural crunch.',
    description:
      'Known traditionally as kaddu or sitaphal seeds, pumpkin seeds (pepitas) are a powerhouse superfood rich in plant protein, heart-healthy unsaturated fats, dietary fiber, magnesium, zinc, and iron. Grown across warm, sun-drenched plains in West Bengal, Odisha, Tamil Nadu, Karnataka, and northern belts.',
    provenance: 'Farm-Direct Pepitas · River & Southern Plains',
    origin: 'Sun-Drenched Plains',
    images: [
      {
        src: ASSETS.products.seeds.pumpkinSeeds,
        alt: 'Dark bowl of plump green Pumpkin Seeds beside sliced gourd on slate',
      },
    ],
    variants: [
      { id: 'pmp-100', label: '100g', weight: '100g', price: 219, mrp: 259, sku: 'YAG-PMP-100', stock: 55 },
      { id: 'pmp-200', label: '200g', weight: '200g', price: 399, mrp: 479, sku: 'YAG-PMP-200', stock: 38 },
    ],
    badges: ['High Protein', 'Zero Added Sugar'],
    rating: 4.8,
    reviewCount: 74,
    servingSize: '28 g',
    nutritionFacts: [
      { nutrient: 'Energy', per100g: '574 kcal', perServe: '161 kcal', rda: '8%' },
      { nutrient: 'Protein', per100g: '29.8 g', perServe: '8.3 g', rda: '-' },
      { nutrient: 'Carbohydrate', per100g: '14.7 g', perServe: '4.1 g', rda: '-' },
      { nutrient: 'Total Sugars', per100g: '1.3 g', perServe: '0.4 g', rda: '-' },
      { nutrient: 'Added Sugars', per100g: '0.0 g', perServe: '0.0 g', rda: '0%' },
      { nutrient: 'Total Fat', per100g: '49.1 g', perServe: '13.7 g', rda: '20%' },
      { nutrient: 'Saturated Fat', per100g: '8.5 g', perServe: '2.4 g', rda: '11%' },
      { nutrient: 'Trans Fat', per100g: '0.0 g', perServe: '0.0 g', rda: '0%' },
      { nutrient: 'Sodium', per100g: '18 mg', perServe: '5 mg', rda: '<1%' },
      { nutrient: 'Dietary Fiber', per100g: '6.5 g', perServe: '1.8 g', rda: '-' },
    ],
    nutritionFootnote:
      '% Recommended Dietary Allowance (RDA) per serve based on a 2,000 kcal reference diet.',
    ingredients: 'Pumpkin Seed Kernels (100%).',
    allergenAdvice: 'May contain traces of tree nuts, peanuts, sesame, or soy.',
    howToUse: [
      'Enjoy a 28 g handful straight from the pack or lightly dry-toast.',
      'Scatter over warm salads, soups, oatmeal bowls, or granola.',
    ],
    storage: 'Store in a cool, dry place away from direct sunlight. Keep airtight after opening.',
    tags: ['pumpkin seeds', 'pepitas', 'protein', 'seeds'],
    isFeatured: true,
    isBestseller: false,
    relatedSlugs: ['sunflower-seeds', 'flax-seeds', 'chia-seeds'],
  },
  {
    id: 'prod-chia-seeds',
    slug: 'chia-seeds',
    name: 'Chia Seeds',
    category: 'Seeds & Grains',
    categorySlug: 'seeds-and-grains',
    shortDescription:
      'Clean-sorted Salvia hispanica seeds with 34.4g fiber and 17.8g Omega-3 ALA per 100g.',
    description:
      'Chia seeds (Salvia hispanica) pack high dietary fiber, plant-based omega-3 fatty acids, protein, and key minerals like calcium and magnesium. Grown during rabi and winter months in Madhya Pradesh, Maharashtra, Karnataka, and Rajasthan, and sourced directly from local farmers under strict hygiene packing to keep out dust and moisture.',
    provenance: 'Madhya Pradesh & Karnataka Rabi Harvest',
    origin: 'Central & Southern Belt',
    images: [
      {
        src: ASSETS.products.seeds.chiaSeeds,
        alt: 'Glass jar of Chia Seeds with wooden spoon and soaked chia drink on slate',
      },
    ],
    variants: [
      { id: 'chi-100', label: '100g', weight: '100g', price: 189, mrp: 229, sku: 'YAG-CHI-100', stock: 70 },
      { id: 'chi-200', label: '200g', weight: '200g', price: 349, mrp: 419, sku: 'YAG-CHI-200', stock: 50 },
    ],
    badges: ['34.4g Fiber', 'Farm Direct'],
    rating: 4.9,
    reviewCount: 98,
    servingSize: '15 g (approx. 1 tbsp)',
    nutritionFacts: [
      { nutrient: 'Energy', per100g: '486.0 kcal', perServe: '73.0 kcal', rda: '3.7%' },
      { nutrient: 'Protein', per100g: '16.5 g', perServe: '2.5 g', rda: '[Check]' },
      { nutrient: 'Total Carbohydrate', per100g: '42.1 g', perServe: '6.3 g', rda: '-' },
      { nutrient: 'Total Sugars', per100g: '0.0 g', perServe: '0.0 g', rda: '-' },
      { nutrient: 'Added Sugars', per100g: '0.0 g', perServe: '0.0 g', rda: '0%' },
      { nutrient: 'Dietary Fiber', per100g: '34.4 g', perServe: '5.2 g', rda: '-' },
      { nutrient: 'Total Fat', per100g: '30.7 g', perServe: '4.6 g', rda: '6.9%' },
      { nutrient: 'Saturated Fat', per100g: '[Lab]', perServe: '[Lab]', rda: '-' },
      { nutrient: 'Trans Fat', per100g: '0.0 g', perServe: '0.0 g', rda: '0%' },
      { nutrient: 'Omega-3 Fatty Acids (ALA)', per100g: '17.8 g', perServe: '2.7 g', rda: '-' },
      { nutrient: 'Cholesterol', per100g: '0.0 mg', perServe: '0.0 mg', rda: '-' },
      { nutrient: 'Sodium', per100g: '[Lab]', perServe: '[Lab]', rda: '-' },
    ],
    nutritionFootnote:
      '% Recommended Dietary Allowance (RDA) per serve based on 2,000 kcal adult diet (FSSAI standard).',
    ingredients: '100% Natural Chia Seeds (Salvia hispanica).',
    allergenAdvice: 'Packed in a facility that handles tree nuts, peanuts, sesame, and soy.',
    howToUse: [
      'Stir 1 tbsp (15 g) into water, curd, porridge, or smoothies.',
      'Soak for 15 minutes in milk or coconut water for a quick chia pudding.',
    ],
    storage: 'Store in a cool, dry place away from moisture and direct sunlight.',
    tags: ['chia seeds', 'omega 3', 'fiber', 'seeds'],
    isFeatured: true,
    isBestseller: true,
    relatedSlugs: ['flax-seeds', 'sunflower-seeds', 'dried-sea-buckthorn-berries'],
  },
  {
    id: 'prod-sunflower-seeds',
    slug: 'sunflower-seeds',
    name: 'Sunflower Seeds',
    category: 'Seeds & Grains',
    categorySlug: 'seeds-and-grains',
    shortDescription:
      'Crisp kernels rich in Vitamin E (35.2 mg/100g), magnesium, zinc, and plant protein.',
    description:
      'Packed with plant protein, dietary fiber, heart-healthy unsaturated fats, vitamin E, magnesium, and selenium. Sourced from sun-drenched farming belts across Karnataka, Maharashtra, and Andhra Pradesh, cleaned, sorted, and packed gently to preserve natural freshness and crunch.',
    provenance: 'Sun-Drenched Deccan Belt · Gently Sorted',
    origin: 'Karnataka & Maharashtra',
    images: [
      {
        src: ASSETS.products.seeds.sunflowerSeeds,
        alt: 'Cream bowl of hulled Sunflower Seeds beside dried sunflower head on slate',
      },
    ],
    variants: [
      { id: 'sun-100', label: '100g', weight: '100g', price: 159, mrp: 199, sku: 'YAG-SUN-100', stock: 60 },
      { id: 'sun-200', label: '200g', weight: '200g', price: 289, mrp: 349, sku: 'YAG-SUN-200', stock: 42 },
    ],
    badges: ['Vitamin E Rich', 'Zero Added Sugar'],
    rating: 4.8,
    reviewCount: 52,
    servingSize: '30 g (approx. 2 tbsp)',
    nutritionFacts: [
      { nutrient: 'Energy', per100g: '584 kcal', perServe: '175 kcal' },
      { nutrient: 'Protein', per100g: '20.8 g', perServe: '6.2 g' },
      { nutrient: 'Total Carbohydrate', per100g: '20.0 g', perServe: '6.0 g' },
      { nutrient: 'Dietary Fiber', per100g: '8.6 g', perServe: '2.6 g' },
      { nutrient: 'Total Sugars', per100g: '2.6 g', perServe: '0.8 g' },
      { nutrient: 'Added Sugars', per100g: '0.0 g', perServe: '0.0 g' },
      { nutrient: 'Total Fat', per100g: '51.5 g', perServe: '15.5 g' },
      { nutrient: 'Saturated Fat', per100g: '4.5 g', perServe: '1.3 g' },
      { nutrient: 'Trans Fat', per100g: '0.0 g', perServe: '0.0 g' },
      { nutrient: 'Cholesterol', per100g: '0 mg', perServe: '0 mg' },
      { nutrient: 'Sodium', per100g: '9 mg', perServe: '3 mg' },
      { nutrient: 'Vitamin E', per100g: '35.2 mg', perServe: '10.6 mg' },
      { nutrient: 'Magnesium', per100g: '325 mg', perServe: '97.5 mg' },
      { nutrient: 'Selenium', per100g: '53 mcg', perServe: '15.9 mcg' },
      { nutrient: 'Iron', per100g: '5.3 mg', perServe: '1.6 mg' },
      { nutrient: 'Zinc', per100g: '5.0 mg', perServe: '1.5 mg' },
    ],
    nutritionFootnote:
      '% Recommended Dietary Allowance (RDA) per serve based on 2,000 kcal adult diet (FSSAI standard).',
    ingredients: '100% Shelled Sunflower Seeds.',
    allergenAdvice: 'Packed in a facility that handles tree nuts, peanuts, sesame, and soy.',
    howToUse: [
      'Sprinkle 2 tbsp (30 g) over garden salads, roasted vegetables, or porridge.',
      'Blend lightly into homemade nut-free seed butter.',
    ],
    storage: 'Store in a cool, dry place sealed tightly against humidity.',
    tags: ['sunflower seeds', 'vitamin e', 'magnesium', 'seeds'],
    isFeatured: false,
    isBestseller: false,
    relatedSlugs: ['pumpkin-seeds', 'flax-seeds', 'chia-seeds'],
  },
  {
    id: 'prod-blueberries',
    slug: 'dried-blueberries',
    name: 'Dried Blueberries',
    category: 'Berries',
    categorySlug: 'berries',
    shortDescription:
      'Highland-grown whole dried berries rich in antioxidants, polyphenols & vitamins C and K.',
    description:
      'Packed with antioxidants, dietary fiber, vitamins C and K, and natural polyphenols, blueberries deliver concentrated sweetness when dried. Cultivated across cool hill and highland pockets in Himachal Pradesh, Uttarakhand, the Nilgiris, and controlled farms in Maharashtra, and sourced directly from dedicated local growers.',
    provenance: 'Hill & Highland Groves · Whole Berry',
    origin: 'Himachal & Nilgiris',
    images: [
      {
        src: ASSETS.products.berries.blueberry,
        alt: 'Matte dark ceramic bowl of plump Dried Blueberries with fresh sprig on slate',
      },
    ],
    variants: [
      { id: 'blu-100', label: '100g', weight: '100g', price: 299, mrp: 349, sku: 'YAG-BLU-100', stock: 45 },
      { id: 'blu-200', label: '200g', weight: '200g', price: 549, mrp: 649, sku: 'YAG-BLU-200', stock: 30 },
    ],
    badges: ['Whole Berries', 'Polyphenol Rich'],
    rating: 4.9,
    reviewCount: 61,
    servingSize: '30 g (~1/4 cup)',
    nutritionFacts: [
      { nutrient: 'Energy', per100g: '317 kcal', perServe: '95 kcal', rda: '-' },
      { nutrient: 'Total Fat', per100g: '2.5 g', perServe: '0.8 g', rda: '1%' },
      { nutrient: 'Saturated Fat', per100g: '0.2 g', perServe: '0.1 g', rda: '0%' },
      { nutrient: 'Trans Fat', per100g: '0 g', perServe: '0 g', rda: '-' },
      { nutrient: 'Cholesterol', per100g: '0 mg', perServe: '0 mg', rda: '0%' },
      { nutrient: 'Sodium', per100g: '3 mg', perServe: '1 mg', rda: '0%' },
      { nutrient: 'Total Carbohydrate', per100g: '80.0 g', perServe: '24.0 g', rda: '9%' },
      { nutrient: 'Dietary Fiber', per100g: '7.5 g', perServe: '2.3 g', rda: '8%' },
      { nutrient: 'Total Sugars', per100g: '67.5 g', perServe: '20.3 g', rda: '-' },
      { nutrient: 'Protein', per100g: '2.5 g', perServe: '0.8 g', rda: '2%' },
      { nutrient: 'Calcium', per100g: '19 mg', perServe: '6 mg', rda: '0%' },
      { nutrient: 'Iron', per100g: '0.9 mg', perServe: '0.3 mg', rda: '2%' },
      { nutrient: 'Potassium', per100g: '214 mg', perServe: '64 mg', rda: '1%' },
      { nutrient: 'Vitamin C', per100g: '24.0 mg', perServe: '7.2 mg', rda: '8%' },
      { nutrient: 'Vitamin E', per100g: '2.4 mg', perServe: '0.7 mg', rda: '5%' },
      { nutrient: 'Vitamin K', per100g: '59.0 µg', perServe: '17.7 µg', rda: '15%' },
    ],
    nutritionFootnote:
      'Percent Daily Values (% DV) are based on a 2,000-calorie diet per 30 g serving.',
    ingredients: 'Blueberries (99.5%), Cane Sugar, Sunflower Oil (anti-clumping glaze).',
    allergenAdvice:
      'Naturally free from major allergens. May occasionally contain whole berries, stems, or seed fragments.',
    howToUse: [
      'Enjoy straight from the pouch as a convenient between-meal portion (approx. 30 g / 1/4 cup).',
      'Stir into overnight oats, hot porridge, Greek yogurt, chia pudding, or granola.',
      'Fold into muffins, banana bread, scones, or toss into leafy green salads.',
    ],
    storage:
      'Store in a cool, dry place away from direct sunlight, heat, and strong odors. Reseal the pouch tightly after each use.',
    tags: ['blueberries', 'berries', 'antioxidants', 'vitamin k'],
    isFeatured: true,
    isBestseller: false,
    relatedSlugs: ['dried-cranberries', 'dried-sea-buckthorn-berries', 'chia-seeds'],
  },
  {
    id: 'prod-cranberries',
    slug: 'dried-cranberries',
    name: 'Dried Cranberries',
    category: 'Berries',
    categorySlug: 'berries',
    shortDescription:
      'Lively, tart ruby-red dried cranberries rich in polyphenols and vitamin E.',
    description:
      'Cranberries are tart, nutrient-dense superfruits packed with vitamin C, dietary fiber, manganese, and proanthocyanidin polyphenols. Harvested at thoughtful maturity and packed under strict hygiene standards to lock in natural tartness, vibrant ruby aroma, and clean food safety.',
    provenance: 'Select Orchard Harvest · Ruby Whole Fruit',
    origin: 'Cool-Climate Orchards',
    images: [
      {
        src: ASSETS.products.berries.cranberry,
        alt: 'Speckled bowl of ruby-red Dried Cranberries with fresh berries on dark slate',
      },
    ],
    variants: [
      { id: 'crn-100', label: '100g', weight: '100g', price: 249, mrp: 299, sku: 'YAG-CRN-100', stock: 55 },
      { id: 'crn-200', label: '200g', weight: '200g', price: 469, mrp: 549, sku: 'YAG-CRN-200', stock: 35 },
    ],
    badges: ['Tart & Lively', 'Whole Fruit'],
    rating: 4.8,
    reviewCount: 49,
    servingSize: '30 g (approx. 1/4 cup)',
    nutritionFacts: [
      { nutrient: 'Energy (Calories)', per100g: '308 kcal (1,290 kJ)', perServe: '92 kcal (387 kJ)', rda: '5%' },
      { nutrient: 'Total Fat', per100g: '1.1 g', perServe: '0.3 g', rda: '0%' },
      { nutrient: 'Saturated Fat', per100g: '0.09 g', perServe: '0.03 g', rda: '0%' },
      { nutrient: 'Trans Fat', per100g: '0 g', perServe: '0 g', rda: '-' },
      { nutrient: 'Cholesterol', per100g: '0 mg', perServe: '0 mg', rda: '0%' },
      { nutrient: 'Sodium', per100g: '5 mg', perServe: '1.5 mg', rda: '0%' },
      { nutrient: 'Total Carbohydrate', per100g: '82.8 g', perServe: '24.8 g', rda: '9%' },
      { nutrient: 'Dietary Fiber', per100g: '5.3 g', perServe: '1.6 g', rda: '6%' },
      { nutrient: 'Total Sugars', per100g: '72.6 g', perServe: '21.8 g', rda: '-' },
      { nutrient: 'Includes Added Sugars (if sweetened)', per100g: '[Verify Batch]', perServe: '[Verify Batch]', rda: '[Verify %]' },
      { nutrient: 'Protein', per100g: '0.17 g', perServe: '0.05 g', rda: '0%' },
      { nutrient: 'Vitamin E', per100g: '2.1 mg', perServe: '0.63 mg', rda: '4%' },
      { nutrient: 'Vitamin K', per100g: '7.6 mcg', perServe: '2.3 mcg', rda: '2%' },
      { nutrient: 'Niacin (Vitamin B3)', per100g: '0.55 mg', perServe: '0.16 mg', rda: '1%' },
      { nutrient: 'Potassium', per100g: '49 mg', perServe: '14.7 mg', rda: '0%' },
      { nutrient: 'Calcium', per100g: '9 mg', perServe: '2.7 mg', rda: '0%' },
      { nutrient: 'Iron', per100g: '0.39 mg', perServe: '0.12 mg', rda: '1%' },
      { nutrient: 'Manganese', per100g: '0.18 mg', perServe: '0.05 mg', rda: '2%' },
    ],
    nutritionFootnote:
      'Percent Daily Values (% DV) are based on a 2,000 kcal diet. Exact values depend on moisture level.',
    ingredients: 'Cranberries (99.5%), Sugar, Sunflower Oil.',
    allergenAdvice:
      'Naturally free from major food allergens. Processed in a facility that handles tree nuts, peanuts, soy, sesame, or milk.',
    howToUse: [
      'Enjoy straight from the pouch as a sweet-tart superfood snack between meals.',
      'Stir into oatmeal, overnight oats, muesli, granola, smoothie bowls, or Greek yogurt.',
      'Toss into leafy green salads, grain pilafs, quinoa bowls, or homemade trail mixes.',
    ],
    storage:
      'Store in a cool, dry place away from direct sunlight, heat sources, and strong odours. Reseal tightly after opening.',
    tags: ['cranberries', 'berries', 'tart', 'polyphenols'],
    isFeatured: true,
    isBestseller: true,
    relatedSlugs: ['dried-blueberries', 'dried-sea-buckthorn-berries', 'pumpkin-seeds'],
  },
  // --- Dried Fruits ---
  {
    id: 'prod-anjeer',
    slug: 'dried-anjeer-figs',
    name: 'Dried Anjeer (Figs)',
    category: 'Dried Fruits',
    categorySlug: 'dried-fruits',
    shortDescription:
      'Sun-cured orchard figs prized for soft honeyed texture, natural seeds, and unglazed purity.',
    description:
      'Hand-picked from sunny orchard rows and cured slowly to lock in deep honeyed flavour without added sugar or glazing agents. Enjoy our whole Dried Anjeer soaked overnight or sliced into warm morning bowls.',
    provenance: 'Orchard Harvest · Whole Sun-Cured Rings',
    origin: 'Sun-Cured Orchard Belt',
    images: [
      {
        src: ASSETS.products.dryFruits.anjeer,
        alt: 'Whole and halved Dried Anjeer figs with fig leaf on dark slate',
      },
    ],
    variants: [
      { id: 'anj-100', label: '100g', weight: '100g', price: 299, mrp: 349, sku: 'YAG-ANJ-100', stock: 45 },
      { id: 'anj-200', label: '200g', weight: '200g', price: 569, mrp: 649, sku: 'YAG-ANJ-200', stock: 35 },
      { id: 'anj-500', label: '500g', weight: '500g', price: 1299, mrp: 1499, sku: 'YAG-ANJ-500', stock: 20 },
    ],
    badges: ['Sun Cured', 'Zero Added Sugar'],
    rating: 4.9,
    reviewCount: 64,
    servingSize: '30 g (2-3 figs)',
    nutritionFacts: [],
    nutritionFootnote:
      '100% single-origin sun-cured dried figs. Batch-specific nutritional assays are printed on each sealed pouch.',
    ingredients: '100% Whole Dried Figs (Anjeer).',
    allergenAdvice: 'Packed in a facility that handles tree nuts, peanuts, sesame, and seeds.',
    howToUse: [
      'Soak 2 whole figs overnight in water or milk for a traditional morning ritual.',
      'Chop into warm porridge, halwa, artisanal trail mixes, or energy laddoos.',
    ],
    storage: 'Store in a cool, dry, airtight pantry jar away from heat and moisture.',
    tags: ['anjeer', 'dried figs', 'dried fruits', 'zero added sugar'],
    isFeatured: true,
    isBestseller: false,
    relatedSlugs: ['dates', 'almonds', 'dried-cranberries'],
  },
  {
    id: 'prod-dates',
    slug: 'dates',
    name: 'Dates',
    category: 'Dried Fruits',
    categorySlug: 'dried-fruits',
    shortDescription:
      'Glossy, tender orchard dates with natural caramel richness and zero added syrup.',
    description:
      'Selected for soft bite and deep caramel sweetness directly off the palm. Free from glucose glazing or artificial preservatives, these dates deliver quick natural carbohydrates alongside warm kitchen versatility.',
    provenance: 'Palm Grove Harvest · Soft & Natural',
    origin: 'Warm Palm Orchards',
    images: [
      {
        src: ASSETS.products.dryFruits.dates,
        alt: 'Stacked glossy Dates with halved fruit and brass spoon',
      },
    ],
    variants: [
      { id: 'dat-100', label: '100g', weight: '100g', price: 199, mrp: 239, sku: 'YAG-DAT-100', stock: 60 },
      { id: 'dat-200', label: '200g', weight: '200g', price: 369, mrp: 429, sku: 'YAG-DAT-200', stock: 45 },
    ],
    badges: ['Zero Glaze', 'Natural Sweetener'],
    rating: 4.8,
    reviewCount: 53,
    servingSize: '30 g (3-4 dates)',
    nutritionFacts: [],
    nutritionFootnote:
      'Single-ingredient orchard dates. Exact nutritional values vary mildly across seasonal harvests.',
    ingredients: '100% Whole Natural Dates.',
    allergenAdvice: 'May contain natural date pits; handle gently. Facility handles tree nuts and seeds.',
    howToUse: [
      'Enjoy two dates with a whole almond before workouts or long commutes.',
      'Blend into smoothies, plant milks, or date-and-seed energy bars as a sugar alternative.',
    ],
    storage: 'Store in a cool, dry place; refrigerate in warm humid months for lasting tenderness.',
    tags: ['dates', 'khajoor', 'dried fruits', 'natural sweetener'],
    isFeatured: false,
    isBestseller: false,
    relatedSlugs: ['dried-anjeer-figs', 'almonds', 'cashews'],
  },
  {
    id: 'prod-pineapple',
    slug: 'dried-pineapple',
    name: 'Dried Pineapple Rings',
    category: 'Dried Fruits',
    categorySlug: 'dried-fruits',
    shortDescription:
      'Sun-ripened golden pineapple slices gently dehydrated for chewy tropical brightness.',
    description:
      'Thick-cut rings of ripe pineapple dried carefully in warm airflow tunnels to preserve golden colour, floral aroma, and satisfying chewy bite for effortless snacking and baking.',
    provenance: 'Hillside Orchard Cut · Slow Dried',
    origin: 'Foothill Tropical Groves',
    images: [
      {
        src: ASSETS.products.dryFruits.driedPineapple,
        alt: 'Stacked golden Dried Pineapple Rings on deep navy slate',
      },
    ],
    variants: [
      { id: 'pin-100', label: '100g', weight: '100g', price: 229, mrp: 269, sku: 'YAG-PIN-100', stock: 50 },
      { id: 'pin-200', label: '200g', weight: '200g', price: 429, mrp: 499, sku: 'YAG-PIN-200', stock: 30 },
    ],
    badges: ['Golden Rings', 'Small Batch'],
    rating: 4.7,
    reviewCount: 38,
    servingSize: '30 g',
    nutritionFacts: [],
    nutritionFootnote:
      'Gentle low-temperature fruit dehydration with lot traceability printed on pack.',
    ingredients: 'Sliced Tropical Pineapple, Cane Sugar (light osmotic cure).',
    allergenAdvice: 'Facility processes tree nuts, peanuts, and seeds.',
    howToUse: [
      'Tear golden rings for trail packs, lunchboxes, or tea-time platters.',
      'Dice over yogurt bowls or infused sparkling water.',
    ],
    storage: 'Reseal barrier pouch firmly away from direct sunlight and humidity.',
    tags: ['pineapple', 'dried pineapple', 'dried fruits', 'tropical'],
    isFeatured: false,
    isBestseller: false,
    relatedSlugs: ['dried-kiwi', 'dried-cranberries', 'pumpkin-seeds'],
  },
  {
    id: 'prod-kiwi',
    slug: 'dried-kiwi',
    name: 'Dried Kiwi Slices',
    category: 'Dried Fruits',
    categorySlug: 'dried-fruits',
    shortDescription:
      'Emerald dehydrated kiwi rounds balancing crisp tang and gentle orchard sweetness.',
    description:
      'Picked at peak orchard firmness and sliced evenly to retain characteristic speckled seeds, emerald vibrancy, and refreshing tangy sweetness.',
    provenance: 'Orchard Harvest · Whole Seeded Slices',
    origin: 'Cool Highland Orchards',
    images: [
      {
        src: ASSETS.products.dryFruits.driedKiwi,
        alt: 'Translucent green Dried Kiwi slices arranged beside fresh kiwi on olive slate',
      },
    ],
    variants: [
      { id: 'kiw-100', label: '100g', weight: '100g', price: 239, mrp: 279, sku: 'YAG-KIW-100', stock: 45 },
      { id: 'kiw-200', label: '200g', weight: '200g', price: 449, mrp: 519, sku: 'YAG-KIW-200', stock: 30 },
    ],
    badges: ['Bright & Tangy', 'Orchard Sliced'],
    rating: 4.8,
    reviewCount: 41,
    servingSize: '30 g',
    nutritionFacts: [],
    nutritionFootnote:
      'High-barrier pouch preserves vibrant natural pigment and moisture balance.',
    ingredients: 'Dehydrated Green Kiwi Slices, Cane Sugar.',
    allergenAdvice: 'Processed in a clean unit that handles tree nuts and seeds.',
    howToUse: [
      'Pack into travel tins for a bright, palate-refreshing snack.',
      'Chop finely into muesli, chia puddings, or chilled fruit salads.',
    ],
    storage: 'Store sealed in a cool, dark cabinet away from heat sources.',
    tags: ['kiwi', 'dried kiwi', 'dried fruits', 'tangy'],
    isFeatured: false,
    isBestseller: false,
    relatedSlugs: ['dried-pineapple', 'dried-sea-buckthorn-berries', 'chia-seeds'],
  },
  // --- Nuts ---
  {
    id: 'prod-pine-nuts',
    slug: 'pine-nuts',
    name: 'Pine Nuts (Chilgoza)',
    category: 'Nuts',
    categorySlug: 'nuts',
    shortDescription:
      'Delicate, buttery shelled mountain pine kernels hand-sorted for creamy crunch.',
    description:
      'Revered across high cedar forests for their rich resinous aroma and melt-in-the-mouth texture, our shelled chilgoza pine nuts are hand-graded in small lots for raw snacking, pestos, and celebratory dishes.',
    provenance: 'Mountain Cedar Forests · Shelled Kernels',
    origin: 'High-Altitude Cedar Forests',
    images: [
      {
        src: ASSETS.products.nuts.pineNuts,
        alt: 'Dark bowl of shelled Pine Nuts with pine needles and pinecone',
      },
    ],
    variants: [
      { id: 'pnu-100', label: '100g', weight: '100g', price: 649, mrp: 749, sku: 'YAG-PNU-100', stock: 28 },
      { id: 'pnu-200', label: '200g', weight: '200g', price: 1249, mrp: 1449, sku: 'YAG-PNU-200', stock: 18 },
      { id: 'pnu-500', label: '500g', weight: '500g', price: 2899, mrp: 3299, sku: 'YAG-PNU-500', stock: 10 },
    ],
    badges: ['Mountain Harvest', 'Hand Sorted'],
    rating: 5.0,
    reviewCount: 44,
    servingSize: '20 g',
    nutritionFacts: [],
    nutritionFootnote:
      'Nitrogen-flushed small-batch pouch protects delicate pine kernel oils.',
    ingredients: '100% Shelled Pine Nut Kernels.',
    allergenAdvice: 'Contains Tree Nuts. Packed where almonds, cashews, and seeds are handled.',
    howToUse: [
      'Lightly warm in a dry skillet for 60 seconds and fold over fresh herbs or pasta.',
      'Enjoy a small spoonful raw with honey or saffron milk.',
    ],
    storage: 'Store chilled or in a dark cool place after opening to preserve fresh oils.',
    tags: ['pine nuts', 'chilgoza', 'nuts', 'mountain'],
    isFeatured: true,
    isBestseller: false,
    relatedSlugs: ['almonds', 'hazelnuts', 'cashews'],
  },
  {
    id: 'prod-almonds',
    slug: 'almonds',
    name: 'Whole Almonds',
    category: 'Nuts',
    categorySlug: 'nuts',
    shortDescription:
      'Crisp, unbroken whole almond kernels graded for sweet nutty bite and skin-on fiber.',
    description:
      'Selected for uniform size, thin amber skin, and clean snap without bitter kernels. Ideal for overnight soaking, homemade almond milk, or roasting with warming pantry spices.',
    provenance: 'Orchard Harvest · Unbroken Whole Kernels',
    origin: 'Northern Valley Orchards',
    images: [
      {
        src: ASSETS.products.nuts.almonds,
        alt: 'Wooden bowl of whole skin-on Almonds with almond blossoms',
      },
    ],
    variants: [
      { id: 'alm-100', label: '100g', weight: '100g', price: 219, mrp: 259, sku: 'YAG-ALM-100', stock: 75 },
      { id: 'alm-200', label: '200g', weight: '200g', price: 419, mrp: 489, sku: 'YAG-ALM-200', stock: 55 },
      { id: 'alm-500', label: '500g', weight: '500g', price: 949, mrp: 1099, sku: 'YAG-ALM-500', stock: 30 },
    ],
    badges: ['100% Natural', 'Skin-On Whole'],
    rating: 4.9,
    reviewCount: 82,
    servingSize: '28 g (approx. 23 kernels)',
    nutritionFacts: [],
    nutritionFootnote:
      'Raw unroasted almonds sorted under clean food-safety controls.',
    ingredients: '100% Whole Natural Almonds.',
    allergenAdvice: 'Contains Tree Nuts. Facility handles cashews, hazelnuts, and seeds.',
    howToUse: [
      'Soak 8-10 almonds overnight and peel in the morning for gentle digestion.',
      'Sliver over kheer, oats, and salads, or stone-grind into almond butter.',
    ],
    storage: 'Keep airtight in a cool, dry place away from strong odours.',
    tags: ['almonds', 'badam', 'nuts', 'protein'],
    isFeatured: true,
    isBestseller: true,
    relatedSlugs: ['cashews', 'dates', 'dried-anjeer-figs'],
  },
  {
    id: 'prod-cashews',
    slug: 'cashews',
    name: 'Whole Cashews',
    category: 'Nuts',
    categorySlug: 'nuts',
    shortDescription:
      'Plump ivory whole cashews selected for natural sweet creaminess and unbroken halves.',
    description:
      'Whole W240-grade style cashews harvested from coastal groves and gently drum-cured so every crescent snaps cleanly and blends effortlessly into creamy gravies, desserts, and everyday snacking.',
    provenance: 'Coastal Groves · Ivory Whole Grade',
    origin: 'Coastal Grove Farms',
    images: [
      {
        src: ASSETS.products.nuts.cashews,
        alt: 'Cream ceramic bowl of Whole Cashews on olive slate',
      },
    ],
    variants: [
      { id: 'cas-100', label: '100g', weight: '100g', price: 229, mrp: 269, sku: 'YAG-CAS-100', stock: 65 },
      { id: 'cas-200', label: '200g', weight: '200g', price: 439, mrp: 519, sku: 'YAG-CAS-200', stock: 45 },
      { id: 'cas-500', label: '500g', weight: '500g', price: 999, mrp: 1149, sku: 'YAG-CAS-500', stock: 25 },
    ],
    badges: ['Ivory Whole', 'Zero Salt Added'],
    rating: 4.9,
    reviewCount: 71,
    servingSize: '28 g',
    nutritionFacts: [],
    nutritionFootnote:
      'Packed fresh in high-barrier laminated pouches to prevent oxidation.',
    ingredients: '100% Whole Ivory Cashew Kernels.',
    allergenAdvice: 'Contains Tree Nuts.',
    howToUse: [
      'Lightly toast in ghee with a pinch of rock salt or whole pepper.',
      'Soak and blend into silky plant-based creams, smoothies, and festive curries.',
    ],
    storage: 'Store tightly sealed in a cool, dark place.',
    tags: ['cashews', 'kaju', 'nuts', 'creamy'],
    isFeatured: false,
    isBestseller: true,
    relatedSlugs: ['almonds', 'hazelnuts', 'black-pepper-makhana'],
  },
  {
    id: 'prod-hazelnuts',
    slug: 'hazelnuts',
    name: 'Whole Hazelnuts',
    category: 'Nuts',
    categorySlug: 'nuts',
    shortDescription:
      'Round, fragrant orchard hazelnuts ideal for warm roasting, praline crunch, and cocoa pairings.',
    description:
      'Whole skin-on hazelnuts bursting with aromatic nutty oil. Delicious raw for crisp snacking, or slow-toasted in a skillet until their papery skins loosen and release rich, warm café aromatics.',
    provenance: 'Cool Orchard Lots · Unroasted Whole',
    origin: 'Temperate Hill Groves',
    images: [
      {
        src: ASSETS.products.nuts.hazelnuts,
        alt: 'Wooden bowl of Whole Hazelnuts with cracked shells and green leaves',
      },
    ],
    variants: [
      { id: 'haz-100', label: '100g', weight: '100g', price: 299, mrp: 349, sku: 'YAG-HAZ-100', stock: 40 },
      { id: 'haz-200', label: '200g', weight: '200g', price: 569, mrp: 649, sku: 'YAG-HAZ-200', stock: 28 },
    ],
    badges: ['Raw & Whole', 'Rich Aroma'],
    rating: 4.8,
    reviewCount: 36,
    servingSize: '28 g',
    nutritionFacts: [],
    nutritionFootnote:
      'Sealed fresh per small batch for deep natural hazelnut crunch.',
    ingredients: '100% Whole Natural Hazelnuts.',
    allergenAdvice: 'Contains Tree Nuts.',
    howToUse: [
      'Roast gently at low heat for 8 minutes, rub off skins, and crush over dark chocolate oats.',
      'Blend with cocoa powder and dates for an honest homemade chocolate-nut spread.',
    ],
    storage: 'Reseal tightly and keep in a dry, cool cabinet.',
    tags: ['hazelnuts', 'nuts', 'baking', 'roasting'],
    isFeatured: false,
    isBestseller: false,
    relatedSlugs: ['almonds', 'pine-nuts', 'dried-blueberries'],
  },
  // --- Flavoured Makhana (100g Seasoned Fox Nuts) ---
  {
    id: 'prod-mint-makhana',
    slug: 'mint-makhana',
    name: 'Mint Makhana',
    category: 'Flavoured Makhana',
    categorySlug: 'flavoured-makhana',
    shortDescription:
      'Airy slow-roasted fox nuts dusted with cooling garden mint and mild aromatic herbs.',
    description:
      'Hand-harvested wetland lotus seeds popped clean and roasted slowly without heavy deep-frying, then tumbled gently with dried mint leaf powder and pantry spices for a featherlight afternoon crunch.',
    provenance: 'Wetland Lotus Seeds · Small-Batch Roasted',
    origin: 'Wetland Pond Harvest',
    images: [
      {
        src: ASSETS.products.makhana.mintMakhana,
        alt: 'Matte black bowl of Mint Makhana with fresh green mint leaves',
      },
    ],
    variants: [
      { id: 'mkh-mnt-100', label: '100g', weight: '100g', price: 179, mrp: 219, sku: 'YAG-MKH-MNT', stock: 60 },
    ],
    badges: ['Slow Roasted', '100g Jar Pack'],
    rating: 4.9,
    reviewCount: 58,
    servingSize: '25 g',
    nutritionFacts: [],
    nutritionFootnote:
      'Air-popped and drum-roasted without palm oil or artificial synthetic flavours.',
    ingredients: 'Popped Lotus Seeds (Makhana), Cold-Pressed Edible Oil, Dried Mint Leaf Powder, Spices & Salt.',
    allergenAdvice: 'Processed in a clean unit that handles tree nuts, peanuts, and dairy seasonings.',
    howToUse: [
      'Serve crisp straight from the pouch alongside afternoon herbal tea or buttermilk.',
      'Crush lightly as a cool crunchy topper for chaat bowls and tomato soup.',
    ],
    storage: 'Keep zip lock firmly closed immediately after opening so puffs stay crisp.',
    tags: ['makhana', 'mint makhana', 'fox nuts', 'roasted snacks'],
    isFeatured: true,
    isBestseller: true,
    relatedSlugs: ['black-salt-makhana', 'black-pepper-makhana', 'spicy-masala-makhana'],
  },
  {
    id: 'prod-black-salt-makhana',
    slug: 'black-salt-makhana',
    name: 'Black Salt Makhana',
    category: 'Flavoured Makhana',
    categorySlug: 'flavoured-makhana',
    shortDescription:
      'Classic dry-roasted lotus puffs seasoned simply with mineral-rich pink kala namak.',
    description:
      'Comforting everyday simplicity: crisp whole fox nuts lightly tumbled with crushed black salt crystals and a hint of black pepper, clean, light, and satisfying with tea or late-evening reading.',
    provenance: 'Wetland Lotus Seeds · Kala Namak Blend',
    origin: 'Wetland Pond Harvest',
    images: [
      {
        src: ASSETS.products.makhana.blackSaltMakhana,
        alt: 'Speckled bowl of Black Salt Makhana beside brass spoon of pink kala namak',
      },
    ],
    variants: [
      { id: 'mkh-slt-100', label: '100g', weight: '100g', price: 169, mrp: 199, sku: 'YAG-MKH-SLT', stock: 65 },
    ],
    badges: ['Light & Crisp', 'Minimal Spice'],
    rating: 4.8,
    reviewCount: 47,
    servingSize: '25 g',
    nutritionFacts: [],
    nutritionFootnote:
      'Small-batch slow roasted for consistent snap without greasiness.',
    ingredients: 'Popped Lotus Seeds (Makhana), Cold-Pressed Edible Oil, Black Salt (Kala Namak).',
    allergenAdvice: 'Facility handles tree nuts, sesame, and dairy.',
    howToUse: [
      'Enjoy plain as a zero-guilt movie or desk crunch.',
      'Pair alongside roasted cashews and almonds for a balanced tea tray.',
    ],
    storage: 'Reseal tightly after every handful to lock out humidity.',
    tags: ['makhana', 'black salt', 'kala namak', 'fox nuts'],
    isFeatured: false,
    isBestseller: false,
    relatedSlugs: ['mint-makhana', 'black-pepper-makhana', 'pumpkin-seeds'],
  },
  {
    id: 'prod-peri-peri-makhana',
    slug: 'peri-peri-makhana',
    name: 'Peri Peri Makhana',
    category: 'Flavoured Makhana',
    categorySlug: 'flavoured-makhana',
    shortDescription:
      'Fiery, tangy slow-roasted fox nuts tossed with red chili flakes, citrus zest, and garlic.',
    description:
      'Bright chili warmth meets airy fox-nut crispness. Tumbled in warm batch drums with crushed red chilies, paprika, garlic notes, and tangy dry lime for bold snacking without refined-flour chips.',
    provenance: 'Wetland Lotus Seeds · Spiced Chili Drum',
    origin: 'Wetland Pond Harvest',
    images: [
      {
        src: ASSETS.products.makhana.periPeriMakhana,
        alt: 'Dark matte bowl of Peri Peri Makhana surrounded by dried red chilies',
      },
    ],
    variants: [
      { id: 'mkh-per-100', label: '100g', weight: '100g', price: 179, mrp: 219, sku: 'YAG-MKH-PER', stock: 55 },
    ],
    badges: ['Bold Heat', 'Slow Roasted'],
    rating: 4.9,
    reviewCount: 62,
    servingSize: '25 g',
    nutritionFacts: [],
    nutritionFootnote:
      'Coloured naturally with red chili and paprika rather than artificial dyes.',
    ingredients: 'Popped Lotus Seeds (Makhana), Cold-Pressed Edible Oil, Peri Peri Spice Blend (Chili, Garlic, Onion, Dry Citrus, Salt).',
    allergenAdvice: 'Facility processes tree nuts, peanuts, and milk solids.',
    howToUse: [
      'Pour straight into snack bowls when craving spicy evening crunch.',
      'Toss whole over tortilla soups or roasted sweet corn salads.',
    ],
    storage: 'Keep away from dampness and seal pouch immediately after serving.',
    tags: ['makhana', 'peri peri', 'spicy snack', 'fox nuts'],
    isFeatured: false,
    isBestseller: true,
    relatedSlugs: ['spicy-masala-makhana', 'black-pepper-makhana', 'cashews'],
  },
  {
    id: 'prod-black-pepper-makhana',
    slug: 'black-pepper-makhana',
    name: 'Black Pepper Makhana',
    category: 'Flavoured Makhana',
    categorySlug: 'flavoured-makhana',
    shortDescription:
      'Fragrant cracked black peppercorns folded over warm dry-roasted lotus puffs.',
    description:
      'Sharp, warming black peppercorn cracks cling lightly to every crisp white puff, delivering bright aromatics and clean savouriness without overwhelming the delicate lotus kernel.',
    provenance: 'Wetland Lotus Seeds · Cracked Peppermill',
    origin: 'Wetland Pond Harvest',
    images: [
      {
        src: ASSETS.products.makhana.blackPepperMakhana,
        alt: 'Cream ceramic bowl of Black Pepper Makhana next to pepper mill and peppercorns',
      },
    ],
    variants: [
      { id: 'mkh-pep-100', label: '100g', weight: '100g', price: 179, mrp: 219, sku: 'YAG-MKH-PEP', stock: 50 },
    ],
    badges: ['Cracked Pepper', 'Slow Roasted'],
    rating: 4.8,
    reviewCount: 43,
    servingSize: '25 g',
    nutritionFacts: [],
    nutritionFootnote:
      'Seasoned immediately post-roast so coarse pepper adheres evenly.',
    ingredients: 'Popped Lotus Seeds (Makhana), Cold-Pressed Edible Oil, Cracked Black Pepper, Rock Salt.',
    allergenAdvice: 'Facility handles tree nuts, peanuts, and seeds.',
    howToUse: [
      'Serve alongside hot masala chai or clear vegetable broths.',
      'Mix with toasted sunflower and pumpkin seeds for an office desk jar.',
    ],
    storage: 'Store dry and airtight.',
    tags: ['makhana', 'black pepper', 'peppercorn', 'fox nuts'],
    isFeatured: false,
    isBestseller: false,
    relatedSlugs: ['black-salt-makhana', 'mint-makhana', 'cashews'],
  },
  {
    id: 'prod-spicy-masala-makhana',
    slug: 'spicy-masala-makhana',
    name: 'Spicy Masala Makhana',
    category: 'Flavoured Makhana',
    categorySlug: 'flavoured-makhana',
    shortDescription:
      'Toasted cumin, coriander, dry mango, and red chili blended over crunchy fox nuts.',
    description:
      'Our classic pantry spice mix: aromatic roasted cumin and coriander seeds ground fresh with tangy amchoor and red chili, coating every popped lotus kernel in unmistakable homestyle warmth.',
    provenance: 'Wetland Lotus Seeds · Roasted Cumin & Chili',
    origin: 'Wetland Pond Harvest',
    images: [
      {
        src: ASSETS.products.makhana.spicyMasalaMakhana,
        alt: 'Dark bowl of Spicy Masala Makhana with cumin seeds, coriander seeds, and chilies',
      },
    ],
    variants: [
      { id: 'mkh-mas-100', label: '100g', weight: '100g', price: 179, mrp: 219, sku: 'YAG-MKH-MAS', stock: 58 },
    ],
    badges: ['Homestyle Spice', 'Slow Roasted'],
    rating: 4.9,
    reviewCount: 54,
    servingSize: '25 g',
    nutritionFacts: [],
    nutritionFootnote:
      'Crafted with whole ground pantry spices and zero synthetic MSG.',
    ingredients: 'Popped Lotus Seeds (Makhana), Cold-Pressed Edible Oil, Cumin, Coriander, Dry Mango Powder, Chili & Black Salt.',
    allergenAdvice: 'Facility processes tree nuts, peanuts, sesame, and dairy.',
    howToUse: [
      'Open straight for festive tea platters or travel road-trip jars.',
      'Garnish warm moong dal chilla or spiced yogurt raita.',
    ],
    storage: 'Zip lock tightly immediately after opening to keep full crunch.',
    tags: ['makhana', 'masala makhana', 'fox nuts', 'cumin chili'],
    isFeatured: false,
    isBestseller: false,
    relatedSlugs: ['peri-peri-makhana', 'black-salt-makhana', 'mint-makhana'],
  },
];
