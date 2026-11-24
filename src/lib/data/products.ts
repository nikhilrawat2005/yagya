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
 * Core Launch Lineup (7 Farm Superfoods)
 * All descriptions, ingredients, serving sizes, and nutrition facts come verbatim
 * from `Yagya content/Nutrition facts and description.docx`.
 */
export const products: Product[] = [
  {
    id: 'prod-seabuckthorn',
    slug: 'dried-sea-buckthorn-berries',
    name: 'Dried Sea Buckthorn Berries',
    category: 'Berries',
    categorySlug: 'berries',
    shortDescription:
      'Whole mountain berries rich in rare plant Omega-7, Vitamin C & fiber — with zero added sugar.',
    description:
      'Harvested directly from partner farmers and packed under strict hygiene standards, our whole Dried Sea Buckthorn Berries bring consumers the authentic, local, and traditional taste of the mountains — with zero added sugar. Gently dehydrated to lock in their dense nutrition, these berries deliver a vibrant, tangy burst of rare plant-based Omega-7 alongside Omegas 3, 6, and 9, natural Vitamin C, carotenoids, and dietary fiber.',
    provenance: 'Mountain Harvest · Whole Pulp & Seeds',
    origin: 'Himalayan Valleys',
    images: [
      {
        src: '/images/3d/berry-seabuckthorn-01.webp',
        alt: '3D clay render of whole Dried Sea Buckthorn Berries with indigo stems',
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
      { nutrient: 'Protein', per100g: '5.2 g', perServe: '0.52 g', rda: '—' },
      { nutrient: 'Carbohydrate', per100g: '48.0 g', perServe: '4.8 g', rda: '—' },
      { nutrient: 'Total Sugars', per100g: '14.5 g', perServe: '1.45 g', rda: '—' },
      { nutrient: 'Added Sugars', per100g: '0.0 g', perServe: '0.0 g', rda: '0.0%' },
      { nutrient: 'Dietary Fiber', per100g: '22.0 g', perServe: '2.2 g', rda: '7.3%' },
      { nutrient: 'Total Fat', per100g: '14.8 g', perServe: '1.48 g', rda: '2.2%' },
      { nutrient: 'Saturated Fat', per100g: '3.6 g', perServe: '0.36 g', rda: '1.6%' },
      { nutrient: 'Monounsaturated Fat (incl. Omega-7 & 9)', per100g: '6.8 g', perServe: '0.68 g', rda: '—' },
      { nutrient: 'Polyunsaturated Fat (incl. Omega-3 & 6)', per100g: '4.4 g', perServe: '0.44 g', rda: '—' },
      { nutrient: 'Trans Fat', per100g: '0.0 g', perServe: '0.0 g', rda: '0.0%' },
      { nutrient: 'Cholesterol', per100g: '0 mg', perServe: '0 mg', rda: '—' },
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
    origin: 'Indian Rabi Belt',
    images: [
      {
        src: '/images/3d/seed-flax-01.webp',
        alt: '3D clay render of toasted amber-orange Flax Seeds',
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
      { nutrient: 'Carbohydrate', per100g: '28.9 g', perServe: '2.89 g', rda: '—' },
      { nutrient: 'Total Sugars', per100g: '1.6 g', perServe: '0.16 g', rda: '—' },
      { nutrient: 'Added Sugars', per100g: '0.0 g', perServe: '0.0 g', rda: '0.0%' },
      { nutrient: 'Dietary Fiber', per100g: '27.3 g', perServe: '2.73 g', rda: '9.1%' },
      { nutrient: 'Total Fat', per100g: '42.2 g', perServe: '4.22 g', rda: '6.3%' },
      { nutrient: 'Saturated Fat', per100g: '3.7 g', perServe: '0.37 g', rda: '1.7%' },
      { nutrient: 'Monounsaturated Fat', per100g: '7.5 g', perServe: '0.75 g', rda: '—' },
      { nutrient: 'Polyunsaturated Fat', per100g: '28.7 g', perServe: '2.87 g', rda: '—' },
      { nutrient: 'Omega-3 Fatty Acids (ALA)', per100g: '22.8 g', perServe: '2.28 g', rda: '—' },
      { nutrient: 'Trans Fat', per100g: '0.0 g', perServe: '0.0 g', rda: '0.0%' },
      { nutrient: 'Cholesterol', per100g: '0 mg', perServe: '0 mg', rda: '—' },
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
      'Plump Indian kaddu pepitas delivering 29.8g protein per 100g and natural crunch.',
    description:
      'Known as kaddu or sitaphal seeds across Indian households, pumpkin seeds (pepitas) are a powerhouse superfood rich in plant protein, heart-healthy unsaturated fats, dietary fiber, magnesium, zinc, and iron. Grown across India’s warm, sun-drenched plains in West Bengal, Odisha, Tamil Nadu, Karnataka, and northern belts.',
    provenance: 'Farm-Direct Pepitas · River & Southern Plains',
    origin: 'Indian Plains',
    images: [
      {
        src: '/images/3d/seed-pumpkin-01.webp',
        alt: '3D clay render of flat oval Pumpkin Seed kernels',
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
      { nutrient: 'Protein', per100g: '29.8 g', perServe: '8.3 g', rda: '—' },
      { nutrient: 'Carbohydrate', per100g: '14.7 g', perServe: '4.1 g', rda: '—' },
      { nutrient: 'Total Sugars', per100g: '1.3 g', perServe: '0.4 g', rda: '—' },
      { nutrient: 'Added Sugars', per100g: '0.0 g', perServe: '0.0 g', rda: '0%' },
      { nutrient: 'Total Fat', per100g: '49.1 g', perServe: '13.7 g', rda: '20%' },
      { nutrient: 'Saturated Fat', per100g: '8.5 g', perServe: '2.4 g', rda: '11%' },
      { nutrient: 'Trans Fat', per100g: '0.0 g', perServe: '0.0 g', rda: '0%' },
      { nutrient: 'Sodium', per100g: '18 mg', perServe: '5 mg', rda: '<1%' },
      { nutrient: 'Dietary Fiber', per100g: '6.5 g', perServe: '1.8 g', rda: '—' },
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
    origin: 'Central & Southern India',
    images: [
      {
        src: '/images/3d/seed-chia-01.webp',
        alt: '3D clay render of speckled indigo and charcoal Chia Seeds',
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
      { nutrient: 'Total Carbohydrate', per100g: '42.1 g', perServe: '6.3 g', rda: '—' },
      { nutrient: 'Total Sugars', per100g: '0.0 g', perServe: '0.0 g', rda: '—' },
      { nutrient: 'Added Sugars', per100g: '0.0 g', perServe: '0.0 g', rda: '0%' },
      { nutrient: 'Dietary Fiber', per100g: '34.4 g', perServe: '5.2 g', rda: '—' },
      { nutrient: 'Total Fat', per100g: '30.7 g', perServe: '4.6 g', rda: '6.9%' },
      { nutrient: 'Saturated Fat', per100g: '[Lab]', perServe: '[Lab]', rda: '—' },
      { nutrient: 'Trans Fat', per100g: '0.0 g', perServe: '0.0 g', rda: '0%' },
      { nutrient: 'Omega-3 Fatty Acids (ALA)', per100g: '17.8 g', perServe: '2.7 g', rda: '—' },
      { nutrient: 'Cholesterol', per100g: '0.0 mg', perServe: '0.0 mg', rda: '—' },
      { nutrient: 'Sodium', per100g: '[Lab]', perServe: '[Lab]', rda: '—' },
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
        src: '/images/3d/seed-sunflower-01.webp',
        alt: '3D clay render of striped and shelled Sunflower Seeds',
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
        src: '/images/3d/berry-blueberry-01.webp',
        alt: '3D clay render of whole indigo Dried Blueberries',
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
      { nutrient: 'Energy', per100g: '317 kcal', perServe: '95 kcal', rda: '—' },
      { nutrient: 'Total Fat', per100g: '2.5 g', perServe: '0.8 g', rda: '1%' },
      { nutrient: 'Saturated Fat', per100g: '0.2 g', perServe: '0.1 g', rda: '0%' },
      { nutrient: 'Trans Fat', per100g: '0 g', perServe: '0 g', rda: '—' },
      { nutrient: 'Cholesterol', per100g: '0 mg', perServe: '0 mg', rda: '0%' },
      { nutrient: 'Sodium', per100g: '3 mg', perServe: '1 mg', rda: '0%' },
      { nutrient: 'Total Carbohydrate', per100g: '80.0 g', perServe: '24.0 g', rda: '9%' },
      { nutrient: 'Dietary Fiber', per100g: '7.5 g', perServe: '2.3 g', rda: '8%' },
      { nutrient: 'Total Sugars', per100g: '67.5 g', perServe: '20.3 g', rda: '—' },
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
        src: '/images/3d/berry-cranberry-01.webp',
        alt: '3D clay render of plump crimson Dried Cranberries',
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
      { nutrient: 'Trans Fat', per100g: '0 g', perServe: '0 g', rda: '—' },
      { nutrient: 'Cholesterol', per100g: '0 mg', perServe: '0 mg', rda: '0%' },
      { nutrient: 'Sodium', per100g: '5 mg', perServe: '1.5 mg', rda: '0%' },
      { nutrient: 'Total Carbohydrate', per100g: '82.8 g', perServe: '24.8 g', rda: '9%' },
      { nutrient: 'Dietary Fiber', per100g: '5.3 g', perServe: '1.6 g', rda: '6%' },
      { nutrient: 'Total Sugars', per100g: '72.6 g', perServe: '21.8 g', rda: '—' },
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
];
