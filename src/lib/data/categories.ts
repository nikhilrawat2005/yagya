export type CategorySlug =
  | 'seeds-and-grains'
  | 'berries'
  | 'dried-fruits'
  | 'nuts'
  | 'flavoured-makhana';

export interface Category {
  id: string;
  name: string;
  slug: CategorySlug;
  description: string;
  originNote: string;
  image: string;
}

export const categories: Category[] = [
  {
    id: 'cat-seeds-grains',
    name: 'Seeds & Grains',
    slug: 'seeds-and-grains',
    description: 'Sun-ripened farm seeds cleaned and packed fresh in small batches.',
    originNote: 'Madhya Pradesh · Rajasthan · Karnataka',
    image: '/images/products/flax-seeds.webp',
  },
  {
    id: 'cat-berries',
    name: 'Berries',
    slug: 'berries',
    description: 'High-altitude Himalayan and orchard berries dried to preserve natural richness.',
    originNote: 'Ladakh · Himachal · Uttarakhand',
    image: '/images/products/dried-sea-buckthorn-berries.webp',
  },
  {
    id: 'cat-dried-fruits',
    name: 'Dried Fruits',
    slug: 'dried-fruits',
    description: 'Naturally sun-cured orchard fruits with zero artificial glazing.',
    originNote: 'Sun-Cured Orchard Harvests',
    image: '/images/products/dried-anjeer-figs.webp',
  },
  {
    id: 'cat-nuts',
    name: 'Nuts',
    slug: 'nuts',
    description: 'Single-origin whole nut kernels graded for crispness and natural oil density.',
    originNote: 'Orchard & Cedar Forest Groves',
    image: '/images/products/almonds.webp',
  },
  {
    id: 'cat-flavoured-makhana',
    name: 'Flavoured Makhana',
    slug: 'flavoured-makhana',
    description: 'Hand-popped wetland lotus seeds roasted in small batches with whole spices.',
    originNote: 'Five Artisan Spice Blends',
    image: '/images/products/mint-makhana.webp',
  },
];
