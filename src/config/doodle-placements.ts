import type { DoodleName } from '@/lib/doodles';
import type { DoodleShowOn, DoodleTone } from '@/components/doodles/Doodle';
import type { DoodleClusterItem } from '@/components/doodles/DoodleCluster';
import type { DoodleDividerVariant } from '@/components/doodles/DoodleDivider';

export interface DoodlePlacement {
  readonly name: DoodleName;
  readonly tone: DoodleTone;
  readonly size: number | string;
  readonly position: string;
  readonly rotate: number;
  readonly showOn: DoodleShowOn;
  readonly opacity?: number;
  readonly float?: boolean;
  readonly parallax?: boolean;
  readonly delay?: number;
}

export type PagePlacementKey =
  | 'home'
  | 'seeds'
  | 'berries'
  | 'dry-fruits'
  | 'nuts'
  | 'makhana'
  | 'about'
  | 'contact'
  | 'journal'
  | 'shop';

export const PAGE_CHAPTER_PLACEMENTS: Record<
  PagePlacementKey,
  Record<string, readonly DoodlePlacement[]>
> = {
  home: {
    'chapter-01': [
      {
        name: 'sun-rays-a',
        tone: 'peach',
        size: 'clamp(112px, 14vw, 176px)',
        position: '-top-14 -right-6 sm:-top-16 sm:-right-10 z-20',
        rotate: 6,
        showOn: 'all',
        opacity: 0.92,
        float: true,
        parallax: true,
        delay: 0.1,
      },
      {
        name: 'star-tiny-sparkle-trio',
        tone: 'apricot',
        size: 64,
        position: '-top-10 right-28 sm:right-32 z-20',
        rotate: -10,
        showOn: 'md+',
        opacity: 0.88,
        float: true,
        delay: 0.25,
      },
      {
        name: 'arrow-curved-01',
        tone: 'peach',
        size: 84,
        position: '-bottom-10 left-48 z-20',
        rotate: 8,
        showOn: 'md+',
        opacity: 0.92,
        float: true,
        delay: 0.4,
      },
    ],
    'chapter-02': [
      {
        name: 'wheat-field-line-a',
        tone: 'peach',
        size: 'clamp(132px, 15vw, 196px)',
        position: '-top-20 right-2 z-20',
        rotate: -4,
        showOn: 'all',
        opacity: 0.9,
        float: true,
        parallax: true,
        delay: 0.1,
      },
      {
        name: 'mountain-with-sun-a',
        tone: 'peach',
        size: 108,
        position: '-top-14 -left-6 z-20',
        rotate: 5,
        showOn: 'md+',
        opacity: 0.92,
        float: true,
        delay: 0.2,
      },
      {
        name: 'seed-to-plant-growth-a',
        tone: 'apricot',
        size: 112,
        position: '-bottom-14 -right-6 z-20',
        rotate: 7,
        showOn: 'md+',
        opacity: 0.92,
        float: true,
        delay: 0.3,
      },
    ],
    'chapter-03': [
      {
        name: 'berry-vine-curl-a',
        tone: 'peach',
        size: 112,
        position: '-top-14 -right-6 z-20',
        rotate: -6,
        showOn: 'md+',
        opacity: 0.92,
        float: true,
        delay: 0.15,
      },
      {
        name: 'seed-sprout-a',
        tone: 'apricot',
        size: 96,
        position: '-bottom-12 -right-4 z-20',
        rotate: 8,
        showOn: 'sm+',
        opacity: 0.9,
        float: true,
        delay: 0.25,
      },
    ],
    'chapter-04': [
      {
        name: 'seed-in-hand-open-palm-b',
        tone: 'apricot',
        size: 'clamp(128px, 15vw, 192px)',
        position: '-top-24 right-4 z-20',
        rotate: -5,
        showOn: 'all',
        opacity: 0.94,
        float: true,
        parallax: true,
        delay: 0.1,
      },
      {
        name: 'star-sparkle-burst',
        tone: 'peach',
        size: 68,
        position: '-bottom-8 left-48 z-20',
        rotate: 12,
        showOn: 'md+',
        opacity: 0.92,
        float: true,
        delay: 0.3,
      },
    ],
  },
  seeds: {
    'chapter-02': [
      {
        name: 'seed-bowl-a',
        tone: 'oat',
        size: 'clamp(100px, 12vw, 156px)',
        position: '-bottom-14 -left-6 z-0',
        rotate: -6,
        showOn: 'md+',
        opacity: 0.72,
        delay: 0.15,
      },
    ],
    'chapter-03': [
      {
        name: 'seed-sprout-a',
        tone: 'peach',
        size: 76,
        position: '-top-10 -right-4 z-0',
        rotate: 8,
        showOn: 'all',
        opacity: 0.82,
        delay: 0.15,
      },
      {
        name: 'wheat-stalk-a',
        tone: 'oat',
        size: 84,
        position: '-bottom-10 -left-5 z-0',
        rotate: -9,
        showOn: 'md+',
        opacity: 0.7,
        delay: 0.25,
      },
    ],
    'chapter-04': [
      {
        name: 'seed-in-hand-open-palm-a',
        tone: 'apricot',
        size: 'clamp(110px, 14vw, 175px)',
        position: '-top-14 -right-6 z-0',
        rotate: 5,
        showOn: 'all',
        opacity: 0.82,
        float: true,
        delay: 0.15,
      },
      {
        name: 'star-4-point-star',
        tone: 'peach',
        size: 48,
        position: '-bottom-6 right-12 z-0',
        rotate: 12,
        showOn: 'md+',
        opacity: 0.75,
        delay: 0.3,
      },
    ],
  },
  berries: {
    'chapter-02': [
      {
        name: 'berry-bowl-a',
        tone: 'oat',
        size: 'clamp(100px, 12vw, 156px)',
        position: '-bottom-14 -right-6 z-0',
        rotate: 6,
        showOn: 'md+',
        opacity: 0.72,
        delay: 0.15,
      },
    ],
    'chapter-03': [
      {
        name: 'berry-vine-curl-a',
        tone: 'peach',
        size: 82,
        position: '-top-10 -right-5 z-0',
        rotate: -8,
        showOn: 'all',
        opacity: 0.82,
        delay: 0.15,
      },
      {
        name: 'goji-sprig-a',
        tone: 'apricot',
        size: 74,
        position: '-bottom-10 -left-4 z-0',
        rotate: 9,
        showOn: 'md+',
        opacity: 0.74,
        delay: 0.25,
      },
    ],
    'chapter-04': [
      {
        name: 'berry-heart-wreath-a',
        tone: 'apricot',
        size: 'clamp(110px, 14vw, 172px)',
        position: '-top-14 -right-6 z-0',
        rotate: -5,
        showOn: 'all',
        opacity: 0.82,
        float: true,
        delay: 0.15,
      },
      {
        name: 'star-twinkle',
        tone: 'peach',
        size: 48,
        position: '-bottom-6 left-10 z-0',
        rotate: -10,
        showOn: 'md+',
        opacity: 0.78,
        delay: 0.3,
      },
    ],
  },
  'dry-fruits': {
    'chapter-02': [
      {
        name: 'dried-fruit-bowl-a',
        tone: 'oat',
        size: 'clamp(100px, 12vw, 156px)',
        position: '-bottom-14 -left-6 z-0',
        rotate: -5,
        showOn: 'md+',
        opacity: 0.74,
        delay: 0.15,
      },
    ],
    'chapter-03': [
      {
        name: 'fruit-branch-a',
        tone: 'peach',
        size: 84,
        position: '-top-10 -right-5 z-0',
        rotate: 7,
        showOn: 'all',
        opacity: 0.8,
        delay: 0.15,
      },
      {
        name: 'raisin-bunch-a',
        tone: 'apricot',
        size: 72,
        position: '-bottom-9 -left-4 z-0',
        rotate: -11,
        showOn: 'md+',
        opacity: 0.72,
        delay: 0.25,
      },
    ],
    'chapter-04': [
      {
        name: 'fruit-basket-a',
        tone: 'apricot',
        size: 'clamp(112px, 14vw, 174px)',
        position: '-top-14 -right-6 z-0',
        rotate: 4,
        showOn: 'all',
        opacity: 0.82,
        float: true,
        delay: 0.15,
      },
      {
        name: 'star-plus-sparkle',
        tone: 'peach',
        size: 46,
        position: '-bottom-6 left-12 z-0',
        rotate: 10,
        showOn: 'md+',
        opacity: 0.76,
        delay: 0.3,
      },
    ],
  },
  nuts: {
    'chapter-02': [
      {
        name: 'nut-bowl-a',
        tone: 'oat',
        size: 'clamp(100px, 12vw, 156px)',
        position: '-bottom-14 -left-6 z-0',
        rotate: -6,
        showOn: 'md+',
        opacity: 0.74,
        delay: 0.15,
      },
    ],
    'chapter-03': [
      {
        name: 'almond-branch-a',
        tone: 'peach',
        size: 84,
        position: '-top-10 -right-5 z-0',
        rotate: -7,
        showOn: 'all',
        opacity: 0.82,
        delay: 0.15,
      },
      {
        name: 'pine-branch-a',
        tone: 'apricot',
        size: 78,
        position: '-bottom-9 -left-5 z-0',
        rotate: 8,
        showOn: 'md+',
        opacity: 0.74,
        delay: 0.25,
      },
    ],
    'chapter-04': [
      {
        name: 'walnut-halved-a',
        tone: 'apricot',
        size: 'clamp(104px, 13vw, 164px)',
        position: '-top-14 -left-6 z-0',
        rotate: -6,
        showOn: 'all',
        opacity: 0.82,
        float: true,
        delay: 0.15,
      },
      {
        name: 'star-5-point-star',
        tone: 'peach',
        size: 48,
        position: '-bottom-6 right-12 z-0',
        rotate: 11,
        showOn: 'md+',
        opacity: 0.76,
        delay: 0.3,
      },
    ],
  },
  makhana: {
    'chapter-02': [
      {
        name: 'makhana-bowl-a',
        tone: 'oat',
        size: 'clamp(100px, 12vw, 156px)',
        position: '-bottom-14 -right-6 z-0',
        rotate: 6,
        showOn: 'md+',
        opacity: 0.74,
        delay: 0.15,
      },
    ],
    'chapter-03': [
      {
        name: 'chilli-single-a',
        tone: 'flame',
        size: 76,
        position: '-top-10 -right-5 z-0',
        rotate: 12,
        showOn: 'all',
        opacity: 0.86,
        delay: 0.15,
      },
      {
        name: 'fox-nut-plant-a',
        tone: 'apricot',
        size: 82,
        position: '-bottom-10 -left-5 z-0',
        rotate: -8,
        showOn: 'md+',
        opacity: 0.74,
        delay: 0.25,
      },
    ],
    'chapter-04': [
      {
        name: 'lotus-leaf-a',
        tone: 'apricot',
        size: 'clamp(110px, 14vw, 170px)',
        position: '-top-14 -right-6 z-0',
        rotate: 6,
        showOn: 'all',
        opacity: 0.82,
        float: true,
        delay: 0.15,
      },
      {
        name: 'star-shining-star-rays',
        tone: 'peach',
        size: 48,
        position: '-bottom-6 left-12 z-0',
        rotate: -9,
        showOn: 'md+',
        opacity: 0.78,
        delay: 0.3,
      },
    ],
  },
  about: {
    'chapter-01': [
      {
        name: 'farmer-hand-open-a',
        tone: 'apricot',
        size: 'clamp(98px, 12vw, 154px)',
        position: '-top-12 -left-6 z-0',
        rotate: -7,
        showOn: 'all',
        opacity: 0.82,
        float: true,
        delay: 0.15,
      },
    ],
    'chapter-02': [
      {
        name: 'olive-sprig-a',
        tone: 'peach',
        size: 88,
        position: '-top-10 -right-5 z-0',
        rotate: 8,
        showOn: 'all',
        opacity: 0.8,
        delay: 0.15,
      },
      {
        name: 'sack-grain-a',
        tone: 'oat',
        size: 80,
        position: '-bottom-10 left-8 z-0',
        rotate: -6,
        showOn: 'md+',
        opacity: 0.72,
        delay: 0.25,
      },
    ],
    'chapter-03': [
      {
        name: 'sun-rays-b',
        tone: 'peach',
        size: 'clamp(100px, 13vw, 160px)',
        position: '-top-14 -right-6 z-0',
        rotate: 6,
        showOn: 'all',
        opacity: 0.86,
        float: true,
        delay: 0.15,
      },
    ],
  },
  contact: {
    'chapter-01': [
      {
        name: 'swirl-01',
        tone: 'apricot',
        size: 74,
        position: '-top-8 -right-4 z-0',
        rotate: 8,
        showOn: 'md+',
        opacity: 0.72,
        delay: 0.2,
      },
    ],
    'chapter-02': [
      {
        name: 'basket-woven-a',
        tone: 'peach',
        size: 'clamp(96px, 12vw, 150px)',
        position: '-top-12 -right-6 z-0',
        rotate: -6,
        showOn: 'all',
        opacity: 0.8,
        float: true,
        delay: 0.15,
      },
    ],
  },
  journal: {
    'chapter-01': [
      {
        name: 'river-wave-lines-a',
        tone: 'apricot',
        size: 'clamp(100px, 13vw, 160px)',
        position: '-top-10 -left-6 z-0',
        rotate: -6,
        showOn: 'sm+',
        opacity: 0.72,
        float: true,
        delay: 0.15,
      },
    ],
    'chapter-02': [
      {
        name: 'tree-big-a',
        tone: 'peach',
        size: 92,
        position: '-top-12 -right-4 z-0',
        rotate: 5,
        showOn: 'md+',
        opacity: 0.75,
        delay: 0.2,
      },
    ],
    'chapter-03': [
      {
        name: 'scale-balance-a',
        tone: 'oat',
        size: 'clamp(96px, 12vw, 148px)',
        position: '-top-12 -left-6 z-0',
        rotate: -4,
        showOn: 'all',
        opacity: 0.78,
        float: true,
        delay: 0.15,
      },
    ],
  },
  shop: {
    'chapter-01': [
      {
        name: 'sun-rays-a',
        tone: 'peach',
        size: 'clamp(96px, 12vw, 152px)',
        position: '-top-12 -right-4 z-0',
        rotate: 6,
        showOn: 'sm+',
        opacity: 0.78,
        float: true,
        delay: 0.15,
      },
    ],
    'chapter-03': [
      {
        name: 'star-dot-star-cluster',
        tone: 'apricot',
        size: 76,
        position: '-top-10 -right-5 z-0',
        rotate: -8,
        showOn: 'md+',
        opacity: 0.75,
        delay: 0.2,
      },
    ],
  },
};

export const CATEGORY_INTRO_CLUSTERS: Record<
  'seeds' | 'berries' | 'dry-fruits' | 'nuts' | 'makhana',
  readonly DoodleClusterItem[]
> = {
  seeds: [
    { name: 'flax-pod-a', tone: 'oat', size: 'clamp(96px, 13vw, 168px)', rotate: -6, float: true, showOn: 'all' },
    { name: 'sunflower-head-a', tone: 'peach', size: 84, rotate: 9, showOn: 'sm+' },
    { name: 'chia-sprig-a', tone: 'apricot', size: 74, rotate: -11, showOn: 'md+' },
  ],
  berries: [
    { name: 'sea-buckthorn-branch-a', tone: 'peach', size: 'clamp(96px, 13vw, 168px)', rotate: 6, float: true, showOn: 'all' },
    { name: 'cranberry-sprig-a', tone: 'oat', size: 82, rotate: -8, showOn: 'sm+' },
    { name: 'blueberry-cluster-a', tone: 'apricot', size: 76, rotate: 10, showOn: 'md+' },
  ],
  'dry-fruits': [
    { name: 'fig-halved-a', tone: 'oat', size: 'clamp(96px, 13vw, 168px)', rotate: -5, float: true, showOn: 'all' },
    { name: 'date-palm-leaf-a', tone: 'peach', size: 84, rotate: 8, showOn: 'sm+' },
    { name: 'pineapple-crown-a', tone: 'apricot', size: 78, rotate: -10, showOn: 'md+' },
  ],
  nuts: [
    { name: 'almond-blossom-a', tone: 'oat', size: 'clamp(96px, 13vw, 168px)', rotate: 5, float: true, showOn: 'all' },
    { name: 'pine-cone-a', tone: 'peach', size: 82, rotate: -9, showOn: 'sm+' },
    { name: 'hazelnut-with-leaf-a', tone: 'apricot', size: 76, rotate: 11, showOn: 'md+' },
  ],
  makhana: [
    { name: 'lotus-flower-a', tone: 'oat', size: 'clamp(96px, 13vw, 168px)', rotate: -6, float: true, showOn: 'all' },
    { name: 'makhana-puffs-heap-a', tone: 'peach', size: 84, rotate: 8, showOn: 'sm+' },
    { name: 'mint-leaf-a', tone: 'apricot', size: 72, rotate: -10, showOn: 'md+' },
  ],
};

export const CATEGORY_DIVIDERS: Record<
  'seeds' | 'berries' | 'dry-fruits' | 'nuts' | 'makhana',
  DoodleDividerVariant
> = {
  seeds: 'dots',
  berries: 'vine',
  'dry-fruits': 'leaf',
  nuts: 'diamond',
  makhana: 'wave',
};

export const HOME_NUTRITION_DOODLES: Record<string, DoodleName> = {
  'dried-sea-buckthorn-berries': 'sea-buckthorn-berry-cluster-a',
  'chia-seeds': 'chia-sprig-b',
  'pumpkin-seeds': 'pumpkin-seed-a',
  'flax-seeds': 'flax-pod-b',
};

export const PRODUCT_CARD_DOODLES: Record<string, DoodleName> = {
  'dried-sea-buckthorn-berries': 'sea-buckthorn-leaf-a',
  'dried-blueberries': 'blueberry-single-a',
  'dried-cranberries': 'cranberry-cluster-a',
  'flax-seeds': 'flax-plant-stem-a',
  'pumpkin-seeds': 'pumpkin-seeds-pile-a',
  'chia-seeds': 'chia-seeds-scatter-a',
  'sunflower-seeds': 'sunflower-seed-a',
  'dried-anjeer-figs': 'fig-whole-a',
  dates: 'date-bunch-a',
  'dried-pineapple': 'pineapple-ring-a',
  'dried-kiwi': 'kiwi-slice-a',
  'pine-nuts': 'pine-nuts-scatter-a',
  almonds: 'almond-single-a',
  cashews: 'cashew-pair-a',
  hazelnuts: 'hazelnut-cluster-a',
  'mint-makhana': 'mint-sprig-a',
  'black-salt-makhana': 'black-salt-crystals-a',
  'peri-peri-makhana': 'chilli-pair-a',
  'black-pepper-makhana': 'peppercorns-a',
  'spicy-masala-makhana': 'masala-leaves-mix-a',
};
