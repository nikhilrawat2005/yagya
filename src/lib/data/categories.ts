import { ASSETS } from '@/lib/assets';

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
    image: ASSETS.products.seeds.flaxSeeds,
  },
  {
    id: 'cat-berries',
    name: 'Berries',
    slug: 'berries',
    description: 'High-altitude Himalayan and orchard berries dried to preserve natural richness.',
    originNote: 'Ladakh · Himachal · Uttarakhand',
    image: ASSETS.products.berries.seaBuckthorn,
  },
  {
    id: 'cat-dried-fruits',
    name: 'Dried Fruits',
    slug: 'dried-fruits',
    description: 'Naturally sun-cured orchard fruits with zero artificial glazing.',
    originNote: 'Sun-Cured Orchard Harvests',
    image: ASSETS.products.dryFruits.anjeer,
  },
  {
    id: 'cat-nuts',
    name: 'Nuts',
    slug: 'nuts',
    description: 'Single-origin whole nut kernels graded for crispness and natural oil density.',
    originNote: 'Orchard & Cedar Forest Groves',
    image: ASSETS.products.nuts.almonds,
  },
  {
    id: 'cat-flavoured-makhana',
    name: 'Flavoured Makhana',
    slug: 'flavoured-makhana',
    description: 'Hand-popped wetland lotus seeds roasted in small batches with whole spices.',
    originNote: 'Five Artisan Spice Blends',
    image: ASSETS.products.makhana.mintMakhana,
  },
];
