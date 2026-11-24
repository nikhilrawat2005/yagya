export interface ProductVariant {
  id: string;
  label: string; // e.g., "100g Sampler", "250g Regular", "500g Sack"
  weight: string; // "100g", "250g", "500g"
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
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  shortDescription: string;
  description: string;
  provenance: string; // e.g. "Mithila Lotus Kernels · Sun-Roasted"
  origin: string; // "Bihar Origin", "Himalayan", etc.
  images: ProductImage[];
  variants: ProductVariant[];
  badges: string[]; // ["Bestseller", "Fresh Harvest Batch #084"]
  rating: number;
  reviewCount: number;
  nutritionFacts: NutritionFact[];
  howToUse: string[];
  storage: string;
  tags: string[];
  isFeatured?: boolean;
  isBestseller?: boolean;
  relatedSlugs: string[];
}

export const products: Product[] = [
  {
    id: 'prod-seabuckthorn',
    slug: 'dried-sea-buckthorn-berries',
    name: 'Dried Sea Buckthorn Berries',
    category: 'Wild Berries',
    categorySlug: 'sea-buckthorn',
    shortDescription: 'Whole dehydrated mountain berries rich in rare plant Omega-7, Vitamin C & antioxidants.',
    description:
      'Harvested directly from partner farmers and packed under strict hygiene standards, our whole Dried Sea Buckthorn Berries bring consumers the authentic, local, and traditional taste of the mountains—with zero added sugar. Gently dehydrated to lock in their dense nutrition, these berries deliver a vibrant, tangy burst of rare plant-based Omega-7 alongside Omegas 3, 6, and 9, natural Vitamin C, carotenoids, and dietary fiber. Retains nutrient-rich pulp and seeds.',
    provenance: 'Himalayan Cold-Desert Harvest · 100% Pure',
    origin: 'Ladakh & Spiti Valley',
    images: [
      {
        src: '/yagya-logo.png',
        alt: 'Whole Dried Himalayan Sea Buckthorn Berries',
      },
    ],
    variants: [
      {
        id: 'sb-100g',
        label: '100g Pouch',
        weight: '100g',
        price: 249,
        mrp: 320,
        sku: 'YAGYA-SB-100',
        stock: 50,
      },
      {
        id: 'sb-250g',
        label: '250g Daily Pack',
        weight: '250g',
        price: 549,
        mrp: 699,
        sku: 'YAGYA-SB-250',
        stock: 45,
      },
      {
        id: 'sb-500g',
        label: '500g Family Reserve',
        weight: '500g',
        price: 999,
        mrp: 1299,
        sku: 'YAGYA-SB-500',
        stock: 25,
      },
    ],
    badges: ['Bestseller', 'Zero Added Sugar', 'Omega-7 Rich'],
    rating: 4.9,
    reviewCount: 142,
    nutritionFacts: [
      { label: 'Energy', value: '34.5 kcal / 10g' },
      { label: 'Vitamin C', value: '65 mg (81.3% RDA)' },
      { label: 'Omega 7 & 9', value: '0.68 g' },
      { label: 'Dietary Fiber', value: '2.2 g' },
      { label: 'Added Sugar', value: '0.0 g' },
    ],
    howToUse: [
      'Enjoy 1 tablespoon (10g) daily straight from the pack for a tangy crunch',
      'Steep in warm water for 5 mins for an antioxidant-rich herbal infusion',
      'Blend into morning smoothies, oatmeal bowls, or sprinkle over yogurts',
    ],
    storage: 'Store in a cool, dry, and dark place away from direct sunlight. Reseal pouch tightly after every use.',
    tags: ['sea buckthorn', 'omega 7', 'vitamin c', 'wild berries', 'superfoods'],
    isFeatured: true,
    isBestseller: true,
    relatedSlugs: ['roasted-himalayan-makhana', 'organic-kashmir-walnuts'],
  },
  {
    id: 'prod-makhana',
    slug: 'roasted-himalayan-makhana',
    name: 'Roasted Himalayan Makhana',
    category: 'Fox Seeds (Makhana)',
    categorySlug: 'makhana',
    shortDescription: 'Slow-roasted popped lotus seeds crisped in pink salt & virgin cold-pressed oil.',
    description:
      'Harvested from wild wetland ponds in Mithila and sun-dried before traditional woodfire roasting. Our makhana offers a crisp, airy crunch with superior plant protein and mineral density. Lightly seasoned with hand-mined Himalayan pink salt.',
    provenance: 'Mithila Lotus Kernels · Sun-Roasted Batch #084',
    origin: 'Bihar Origin',
    images: [
      {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyPiyyHKT8sXQ-JKRD9xaQDhxG3EvcXpR5O1FqLhJ5Q9to0xp8BPJf9Yi_WglCKalDovkaUeTbyyPRfjZ_gvut__G2UMfHJMgYfQFY29BBbb5s2-z0BFvbiSWGyYKT5eE-6NazQ0PQJJWbnh4oll4mxhHCsx1jpeM1hXIseBVBd-PGdtzSFXXe7y4n_xfV7llOb2s2qsBqCRVuK1ziuAEndcumlV2mDrrY_99n0yI6',
        alt: 'Slow roasted Himalayan makhana lotus seeds in artisan kraft pouch',
      },
      {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDY9GJkKTyIXx-1DQ7wR_lU6-rJXdpng8yDILjleCstC0Zmt2eXkJDtt4Dv2SiDDvowiNSbVnx3nC2pO8SfGS6yYyVM3n9j5PhJtTh4EtXb4uZv4qTXpuXftKzqeqZV_q_H9tRCq305gS2Ouk5vwav5ZTvqMViuUL28aLOeeNiuyi7-MfPHzLg4BUOgrsQO5nn1ESh2GuS9HZGPy9a0oR5T2_MMqiG6bk0CYnR3Al7O',
        alt: 'Overhead view of roasted popped lotus seeds makhana in cream ceramic bowl',
      },
    ],
    variants: [
      { id: 'v-100', label: '100g Sampler', weight: '100g', price: 129, mrp: 159, sku: 'BP-MAK-100', stock: 45 },
      { id: 'v-250', label: '250g Regular', weight: '250g', price: 249, mrp: 299, sku: 'BP-MAK-250', stock: 120 },
      { id: 'v-500', label: '500g Value Sack', weight: '500g', price: 469, mrp: 549, sku: 'BP-MAK-500', stock: 30 },
    ],
    badges: ['Bestseller', 'Batch #084'],
    rating: 4.9,
    reviewCount: 142,
    nutritionFacts: [
      { label: 'Plant Protein', value: '9.7g / 100g' },
      { label: 'Dietary Fiber', value: '14.5g / 100g' },
      { label: 'Magnesium', value: '67mg / 100g' },
      { label: 'Total Calories', value: '347 kcal' },
    ],
    howToUse: [
      'Enjoy directly from the pouch as an afternoon mindful snack.',
      'Toss into warm heritage curries or kheer for artisanal texture.',
      'Grind into morning smoothie bowls for sustained plant energy.',
    ],
    storage: 'Store in an airtight container away from direct sunlight. Reseal pouch tightly after opening.',
    tags: ['makhana', 'roasted', 'superfood', 'high-protein', 'vegan'],
    isFeatured: true,
    isBestseller: true,
    relatedSlugs: ['raw-organic-chia-seeds', 'wild-sea-buckthorn-dried', 'heirloom-seed-duo-mix'],
  },
  {
    id: 'prod-chia',
    slug: 'raw-organic-chia-seeds',
    name: 'Raw Organic Chia Seeds',
    category: 'Chia Seeds',
    categorySlug: 'chia',
    shortDescription: 'Triple-cleaned highland black chia seeds with potent soluble fiber & Omega-3.',
    description:
      'Grown at high altitudes where cooler nights yield denser lipid profiles. Triple-cleaned using air separators to remove any chaff or sand, ensuring pristine purity and maximum mucilage gel formation.',
    provenance: 'Highland Harvest · Cold-desert Grown',
    origin: 'Highland',
    images: [
      {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjlGBV7ItO3xij8U4sjODxP6736aOCM8hMz1c3EE1LmtimxOx0j-boTtd_oeVUc-n-tfsk7ssr255qTldrgZrAQC7wKIQq5yFUPE_M7UGK-DG6-pQHClCaYm3xjYtjLnOajWvRGFFJiwbFNM00KdtfoecQi9Km2qglu4DnDYSAy7Zv45xDeIVEffaa8deQESXMnVT9pKT6Rf_cnfA6C6cS1qPommXk4hnOqp5AZuyC',
        alt: 'Kraft paper resealable pouch of raw organic chia seeds',
      },
      {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmJgYv-rkofXCeYe4T-0CEc319pGNtQzyUwSC-7CfMtfE9Y8X2DdCNmRwhCI0c_CON8qYEXuyIscJEVo7EqHlv1s7OrUcbYF1GaClJScd-0o87B4qw9cEf2LsYsM9t_9AbTe8fKslzA8GTuNnwKKZ-nYSu8yAPTal_ZmDK6jR50iwBdiZkZJtcktuFh1p37K_MAkKP0tMWFpNQQ0V_JPcwC7QZmjekTsc20f9WSaXA',
        alt: 'Close up raw black chia seeds in ceramic spoon',
      },
    ],
    variants: [
      { id: 'v-chia-250', label: '250g Jar', weight: '250g', price: 199, mrp: 249, sku: 'BP-CHI-250', stock: 80 },
      { id: 'v-chia-500', label: '500g Pantry Pouch', weight: '500g', price: 380, mrp: 460, sku: 'BP-CHI-500', stock: 65 },
    ],
    badges: ['Popular', 'Purity Certified'],
    rating: 4.8,
    reviewCount: 98,
    nutritionFacts: [
      { label: 'Omega-3 ALA', value: '17.8g / 100g' },
      { label: 'Dietary Fiber', value: '34.4g / 100g' },
      { label: 'Calcium', value: '631mg / 100g' },
      { label: 'Protein', value: '16.5g / 100g' },
    ],
    howToUse: [
      'Stir 1 tbsp into cold coconut water or almond milk and soak for 15 mins.',
      'Blend into oat bowls, yoghurt parfaits, or bake into artisan loafs.',
    ],
    storage: 'Store in a cool, dark pantry. Moisture-free sealed glass jar recommended.',
    tags: ['chia', 'omega-3', 'fiber', 'seeds', 'raw'],
    isFeatured: true,
    isBestseller: true,
    relatedSlugs: ['roasted-himalayan-makhana', 'wild-sea-buckthorn-dried'],
  },
  {
    id: 'prod-sea-buckthorn',
    slug: 'wild-sea-buckthorn-dried',
    name: 'Wild Sea Buckthorn Dried',
    category: 'Sea Buckthorn',
    categorySlug: 'sea-buckthorn',
    shortDescription: 'Cold-desert Nubra Valley harvest, naturally sun-dehydrated golden berries.',
    description:
      'Hand-plucked along glacial riverbeds in Ladakh. Known as the Golden Berry of the Himalayas, packed with rare Omega-7 fatty acids and over 12 times the Vitamin C of oranges.',
    provenance: 'Nubra Valley Glacier Basin · Wild Foraged',
    origin: 'Ladakh Gold',
    images: [
      {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCokIO3960WsBREC9yGeQ_D7DwZRhBO2EiVprc7TBSfQD8D94B-V2TkSkEG3jyErLFmkzGwJC2EmEu2K-biM3IdDgf-jp9Ru_5C3Mr69mnwH18XuSB8Iraw79brHiQfHCtMsbcE4S4J7ctjDmP2oED2oJ2IByIgydFvGV3Ym9rEJxQH2CCk3_QClfCj6WLuCe4_CHYRPBg9qAdUE0FcIYO_3Hc4vYmhasISkUgIpSBO',
        alt: 'Glass jar of golden wild sea buckthorn berries dried',
      },
      {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9lYncPXx9zA5fkVEkn9VOEq6AtzRtV1nvT-2VFDcSs5t-lqiepue8hzjW41tN59fiY3Q7nR19kRPqJrkzsJd78jzYJbc99mWjwLUIs_-avRYFkvHZHrsOzu7YkkgzhkYswTYTE_KKd9RDb8D2oqAU0GtRLnf58WT8szqvH6p7rKj4-rkP4kIzeADrbvcAT_W42YKtxwFJtrhybbjbgCJL4Tyz6SnNpFIlgojaNVMi',
        alt: 'Sun-dried golden sea buckthorn berries scattered on cream cloth',
      },
    ],
    variants: [
      { id: 'v-sbt-150', label: '150g Tin', weight: '150g', price: 389, mrp: 450, sku: 'BP-SBT-150', stock: 40 },
      { id: 'v-sbt-300', label: '300g Value Box', weight: '300g', price: 720, mrp: 850, sku: 'BP-SBT-300', stock: 25 },
    ],
    badges: ['Harvest New', 'Omega-7 Rich'],
    rating: 4.9,
    reviewCount: 64,
    nutritionFacts: [
      { label: 'Vitamin C', value: '450mg / 100g' },
      { label: 'Omega-7 Fatty Acids', value: '8.4g / 100g' },
      { label: 'Antioxidants', value: 'High ORAC score' },
    ],
    howToUse: [
      'Steep 1 tsp in hot water for a restorative citrus-herbal infusion.',
      'Garnish onto warm porridge or antioxidant superfood trail mixes.',
    ],
    storage: 'Keep sealed in a cool, dry place. Refrigerator storage preserves amber hue.',
    tags: ['sea-buckthorn', 'berries', 'vitamin-c', 'ladakh', 'antioxidants'],
    isFeatured: true,
    isBestseller: true,
    relatedSlugs: ['roasted-himalayan-makhana', 'raw-organic-chia-seeds'],
  },
  {
    id: 'prod-duo-mix',
    slug: 'heirloom-seed-duo-mix',
    name: 'Heirloom Seed Duo Mix',
    category: 'Pantry Bundles',
    categorySlug: 'pumpkin',
    shortDescription: 'Green Himalayan pepitas and sun-ripened sunflower kernels hand-sorted.',
    description:
      'Balanced ratio of raw dark green pumpkin seeds and delicate sunflower kernels. Unsalted and unroasted to preserve living enzymes and zinc potency.',
    provenance: 'Himalayan Foothills · Dual Harvest',
    origin: 'Himalayan',
    images: [
      {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLhdWTOkPbl9dZc-gYpIyPmxdmkOHmHL6gvXlbpCWApZ03Ulm2Zv1ZBacadTJHcU12V3nIcct6dcvvtqxGxEo8PMv7Q8DdEbBqyeqkd-H6rd_pSzo4kRjrVh--l-ijQ7fA4d4HgT0pSB54nFKzVFK_9WGW43_3CIiHtF4FChNyCT9SX6vWE7tvyqNxqHxItWbVsul2bgPqHnXQBeUE-mTaW-CAttOCOAeWS-Iu9j85',
        alt: 'Heirloom pumpkin and sunflower seed raw mix packed in eco brown bag',
      },
    ],
    variants: [
      { id: 'v-duo-250', label: '250g Pouch', weight: '250g', price: 239, mrp: 280, sku: 'BP-DUO-250', stock: 50 },
      { id: 'v-duo-500', label: '500g Jar', weight: '500g', price: 440, mrp: 520, sku: 'BP-DUO-500', stock: 35 },
    ],
    badges: ['Pantry Staple'],
    rating: 4.8,
    reviewCount: 112,
    nutritionFacts: [
      { label: 'Zinc', value: '7.8mg / 100g' },
      { label: 'Magnesium', value: '535mg / 100g' },
      { label: 'Protein', value: '25.2g / 100g' },
    ],
    howToUse: ['Top sourdough toast, warm grain bowls, or crunch directly as a midday energy booster.'],
    storage: 'Store airtight in cool pantry.',
    tags: ['seeds', 'pumpkin', 'sunflower', 'zinc', 'staple'],
    isFeatured: true,
    isBestseller: true,
    relatedSlugs: ['roasted-himalayan-makhana', 'raw-organic-chia-seeds'],
  },
  {
    id: 'prod-sunflower',
    slug: 'sunflower-seed-kernels',
    name: 'Raw Sunflower Seed Kernels',
    category: 'Sunflower Seeds',
    categorySlug: 'sunflower',
    shortDescription: 'Lightly shelled raw kernels loaded with Vitamin E and plant selenium.',
    description:
      'Grown under full sun in fertile soils and shelled using gentle mechanical dehulling without heat treatment. Subtle nutty sweetness.',
    provenance: 'Sun-Grown Deccan Basin',
    origin: 'Sun-Grown',
    images: [
      {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzFYqUYE2Mwzm999Q0TiupXTjvuRkJfeAbGrzTSRjh91f2wj_yYWnG3q3-DwBKGEltYX4qnMSds571lR0BDfvjkc35CZ_i7WEEcEoBHf2jZOC-2fAN1MSkNy2lKUhKua2BfjAc_xCMmmuMbxMdJ84vna1WmEqWAiZxq8o-WoQ76dSmzJpixMb_NkpDF0pINEYx419_MQ94pcFO-7aLQBGhCrb2b6y05HxHa6cKUbqN',
        alt: 'Shelled raw sunflower seed kernels arranged on pottery plate',
      },
    ],
    variants: [
      { id: 'v-sun-250', label: '250g Pouch', weight: '250g', price: 179, mrp: 210, sku: 'BP-SUN-250', stock: 60 },
      { id: 'v-sun-500', label: '500g Pantry Pouch', weight: '500g', price: 320, mrp: 380, sku: 'BP-SUN-500', stock: 40 },
    ],
    badges: ['Daily Essential'],
    rating: 4.7,
    reviewCount: 52,
    nutritionFacts: [
      { label: 'Vitamin E', value: '35.2mg / 100g' },
      { label: 'Folate', value: '227mcg / 100g' },
    ],
    howToUse: ['Sprinkle over garden salads or blend into sunflower butter.'],
    storage: 'Store in cool ambient conditions away from humidity.',
    tags: ['sunflower', 'vitamin-e', 'raw'],
    isFeatured: false,
    isBestseller: false,
    relatedSlugs: ['raw-organic-chia-seeds', 'heirloom-seed-duo-mix'],
  },
  {
    id: 'prod-black-berries',
    slug: 'sun-dried-himalayan-blackberries',
    name: 'Wild Himalayan Blackberries',
    category: 'Black Berries',
    categorySlug: 'black-berries',
    shortDescription: 'Sun-dried wild mountain berries bursting with anthocyanin antioxidants.',
    description:
      'Foraged from higher elevation forest fringes of Uttarakhand. Naturally dried under clean mountain air with zero sugar syrup or sulfites.',
    provenance: 'Uttarakhand High Forests',
    origin: 'Wild Forest',
    images: [
      {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCejakrhL5Oz9ipuPvVIOktt4NY8jNlXW02aUjTXMB5X4IJ8oRwR9inr90SMM7c8AbIz8-7PP5LwSJC1VKF8sjhisNHq9CZ4L8emAP5Qy8BnrGox_5tft0bmCTPQmTP9I9N3jadRN-Gw1Ao7PQ77jNPrfzfVm8P0vF58Id1tPrEY_s2EmVD10YEPY6U77c915xA5jMeGHK_2moF8l7hHgdr5MuVeR2GiK5ncRlv7kSx',
        alt: 'Sun-dried Himalayan wild blackberries in a terracotta bowl',
      },
    ],
    variants: [
      { id: 'v-bb-150', label: '150g Pouch', weight: '150g', price: 349, mrp: 399, sku: 'BP-BB-150', stock: 30 },
      { id: 'v-bb-300', label: '300g Tin', weight: '300g', price: 649, mrp: 749, sku: 'BP-BB-300', stock: 20 },
    ],
    badges: ['Wild Foraged'],
    rating: 4.9,
    reviewCount: 43,
    nutritionFacts: [
      { label: 'Anthocyanins', value: '380mg / 100g' },
      { label: 'Total Fiber', value: '18.2g / 100g' },
    ],
    howToUse: ['Rehydrate in herbal teas or fold into wholesome sourdough bakes.'],
    storage: 'Cool dry conditions. Reseal pouch tightly.',
    tags: ['berries', 'wild', 'blackberries', 'anthocyanins'],
    isFeatured: false,
    isBestseller: false,
    relatedSlugs: ['wild-sea-buckthorn-dried', 'tart-organic-cranberries'],
  },
  {
    id: 'prod-red-berries',
    slug: 'tart-organic-cranberries',
    name: 'Tart Organic Whole Cranberries',
    category: 'Red Berries',
    categorySlug: 'red-berries',
    shortDescription: 'Whole unadulterated red berries with vibrant natural acidity and no refined sugar.',
    description:
      'Grown ethically and slowly dried to retain their jewel-red hue and crisp, sour tang. Infused lightly with apple juice concentrate for balanced tartness.',
    provenance: 'Clean Soil Certified Harvest',
    origin: 'Organic Tart',
    images: [
      {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDm22Lm9UyIrVJOuFInDQnq1X46pmBBaD2mISjeMPNvtgAsfzM3GzUhKmWaYaUBh0q6qwJB6WOTqsfpW06-7cmqsVC1919q1nJ-NKWJVK89iaKALlOmlWzznIAb-6uLNl3J4EIfrH8H7xS7FblYU674jpdz66pr3rWtTQudXpv7PPofzn60VQPEN4m9pRdT6Kz8MOuBSjjssigEMJJ-GuO0eH5qQ8sbnbpbeGvPDzV8',
        alt: 'Tart organic dried whole red cranberries in ceramic jar',
      },
    ],
    variants: [
      { id: 'v-rb-200', label: '200g Pouch', weight: '200g', price: 299, mrp: 350, sku: 'BP-RB-200', stock: 45 },
      { id: 'v-rb-400', label: '400g Pantry Pack', weight: '400g', price: 549, mrp: 650, sku: 'BP-RB-400', stock: 30 },
    ],
    badges: ['No Added Refined Sugar'],
    rating: 4.8,
    reviewCount: 38,
    nutritionFacts: [
      { label: 'Proanthocyanidins', value: 'High concentration' },
      { label: 'Dietary Fiber', value: '11.5g / 100g' },
    ],
    howToUse: ['Top breakfast bowls or pair with artisan goat cheese boards.'],
    storage: 'Store in an airtight container in a cool spot.',
    tags: ['berries', 'cranberries', 'tart', 'organic'],
    isFeatured: false,
    isBestseller: false,
    relatedSlugs: ['sun-dried-himalayan-blackberries', 'wild-sea-buckthorn-dried'],
  },
];
