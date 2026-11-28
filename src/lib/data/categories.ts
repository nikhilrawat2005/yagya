import { ASSETS } from '@/lib/assets';

export type CategorySlug =
  | 'seeds-and-grains'
  | 'berries'
  | 'dried-fruits'
  | 'nuts'
  | 'flavoured-makhana'
  | 'mixture';

export interface Category {
  id: string;
  name: string;
  slug: CategorySlug;
  description: string;
  originNote: string | null;
  image: string;
}

export const categories: Category[] = [
  {
    id: 'cat-seeds-grains',
    name: 'Seeds & Grains',
    slug: 'seeds-and-grains',
    description: 'Whole farm seeds cleaned and packed in small batches.',
    originNote: 'Seeds & Grains',
    image: ASSETS.products.seeds.flaxSeeds,
  },
  {
    id: 'cat-berries',
    name: 'Berries',
    slug: 'berries',
    description: 'Whole dried mountain and orchard berries packed for everyday bowls and snacking.',
    originNote: 'Dried Berries',
    image: ASSETS.products.berries.seaBuckthorn,
  },
  {
    id: 'cat-dried-fruits',
    name: 'Dried Fruits',
    slug: 'dried-fruits',
    description: 'Whole and sliced dried fruits selected for natural flavour and texture.',
    originNote: 'Orchard Dried Fruits',
    image: ASSETS.products.dryFruits.anjeer,
  },
  {
    id: 'cat-nuts',
    name: 'Nuts',
    slug: 'nuts',
    description: 'Whole tree nut kernels graded for everyday snacking and kitchen prep.',
    originNote: 'Whole Nuts',
    image: ASSETS.products.nuts.almonds,
  },
  {
    id: 'cat-flavoured-makhana',
    name: 'Flavoured Makhana',
    slug: 'flavoured-makhana',
    description: 'Roasted lotus seeds seasoned in five pantry spice blends.',
    originNote: 'Roasted Fox Nuts',
    image: ASSETS.products.makhana.mintMakhana,
  },
  {
    id: 'cat-mixture',
    name: 'Mixture',
    slug: 'mixture',
    description: 'Upcoming curated seed and dry fruit blends in convenient 100g packs.',
    originNote: 'Coming Soon',
    image: ASSETS.backgrounds.signature[1].desktop,
  },
];
