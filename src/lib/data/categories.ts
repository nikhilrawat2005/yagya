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
  accentToken: 'apricot' | 'peach' | 'seabuckthorn';
  image: string;
  useDoodleEmblem?: boolean;
}

export const categories: Category[] = [
  {
    id: 'cat-seeds-grains',
    name: 'Seeds & Grains',
    slug: 'seeds-and-grains',
    description: 'Sun-ripened Indian farm seeds cleaned and packed fresh in small batches.',
    originNote: 'Madhya Pradesh · Rajasthan · Karnataka',
    accentToken: 'seabuckthorn',
    image: '/images/3d/seed-flax-01.webp',
  },
  {
    id: 'cat-berries',
    name: 'Berries',
    slug: 'berries',
    description: 'High-altitude Himalayan and orchard berries dried to preserve natural richness.',
    originNote: 'Ladakh · Himachal · Uttarakhand',
    accentToken: 'peach',
    image: '/images/3d/berry-seabuckthorn-01.webp',
  },
  {
    id: 'cat-dried-fruits',
    name: 'Dried Fruits',
    slug: 'dried-fruits',
    description: 'Naturally sun-cured orchard fruits with zero artificial glazing.',
    originNote: 'Seasonal Harvest Lineup',
    accentToken: 'apricot',
    image: '',
    useDoodleEmblem: true,
  },
  {
    id: 'cat-nuts',
    name: 'Nuts',
    slug: 'nuts',
    description: 'Single-origin whole nut kernels graded for crispness and natural oil density.',
    originNote: 'Seasonal Harvest Lineup',
    accentToken: 'peach',
    image: '',
    useDoodleEmblem: true,
  },
  {
    id: 'cat-flavoured-makhana',
    name: 'Flavoured Makhana',
    slug: 'flavoured-makhana',
    description: 'Hand-popped Mithila lotus seeds roasted in small batches with whole spices.',
    originNote: 'Mithila Wetlands, Bihar',
    accentToken: 'apricot',
    image: '',
    useDoodleEmblem: true,
  },
];
