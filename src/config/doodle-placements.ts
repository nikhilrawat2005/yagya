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
  readonly drawDuration?: number;
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

/**
 * Unique, non-repeating botanical doodle placements across all pages.
 * Strictly berries, seeds, blossoms, orchard fruits, nuts, and spices.
 * Anchored in outer margins so headlines and body text stay unobstructed.
 */
export const PAGE_CHAPTER_PLACEMENTS: Record<
  PagePlacementKey,
  Record<string, readonly DoodlePlacement[]>
> = {
  home: {
    'chapter-01': [
      {
        name: 'blueberry-cluster-a',
        tone: 'peach',
        size: 'clamp(144px, 16vw, 208px)',
        position: '-top-24 -right-10 sm:-top-28 sm:-right-12 z-20',
        rotate: 8,
        showOn: 'all',
        opacity: 0.94,
        float: true,
        parallax: true,
        delay: 0.25,
        drawDuration: 2.3,
      },
      {
        name: 'seed-circle-ring-a',
        tone: 'apricot',
        size: 132,
        position: '-bottom-20 -right-12 z-20',
        rotate: -6,
        showOn: 'md+',
        opacity: 0.88,
        float: true,
        delay: 0.45,
        drawDuration: 2.4,
      },
    ],
    'chapter-02': [
      {
        name: 'sunflower-head-a',
        tone: 'peach',
        size: 'clamp(148px, 17vw, 212px)',
        position: '-top-28 -right-12 z-20',
        rotate: 8,
        showOn: 'md+',
        opacity: 0.94,
        float: true,
        parallax: true,
        delay: 0.15,
        drawDuration: 2.4,
      },
      {
        name: 'pumpkin-seeds-pile-a',
        tone: 'apricot',
        size: 148,
        position: '-bottom-20 -right-10 z-20',
        rotate: 6,
        showOn: 'md+',
        opacity: 0.92,
        float: true,
        delay: 0.3,
        drawDuration: 2.2,
      },
    ],
    'chapter-03': [
      {
        name: 'sea-buckthorn-berry-cluster-b',
        tone: 'peach',
        size: 164,
        position: '-top-24 -right-10 z-20',
        rotate: -6,
        showOn: 'md+',
        opacity: 0.94,
        float: true,
        delay: 0.2,
        drawDuration: 2.3,
      },
    ],
    'chapter-04': [
      {
        name: 'berry-heart-wreath-a',
        tone: 'peach',
        size: 'clamp(152px, 17vw, 216px)',
        position: '-top-28 -right-12 z-20',
        rotate: 6,
        showOn: 'all',
        opacity: 0.94,
        float: true,
        parallax: true,
        delay: 0.15,
        drawDuration: 2.4,
      },
      {
        name: 'raspberry-a',
        tone: 'apricot',
        size: 132,
        position: '-bottom-24 -left-12 z-20',
        rotate: -8,
        showOn: 'md+',
        opacity: 0.92,
        float: true,
        delay: 0.3,
        drawDuration: 2.2,
      },
    ],
  },
  seeds: {
    'chapter-02': [
      {
        name: 'seed-scoop-a',
        tone: 'peach',
        size: 'clamp(140px, 15vw, 192px)',
        position: '-bottom-20 -left-12 z-20',
        rotate: -8,
        showOn: 'md+',
        opacity: 0.92,
        float: true,
        delay: 0.2,
        drawDuration: 2.3,
      },
    ],
    'chapter-03': [
      {
        name: 'flax-plant-stem-b',
        tone: 'peach',
        size: 156,
        position: '-top-24 -right-10 z-20',
        rotate: 8,
        showOn: 'all',
        opacity: 0.92,
        float: true,
        delay: 0.2,
        drawDuration: 2.3,
      },
    ],
    'chapter-04': [
      {
        name: 'sunflower-seed-b',
        tone: 'apricot',
        size: 'clamp(136px, 14vw, 184px)',
        position: '-top-22 -right-10 z-20',
        rotate: 6,
        showOn: 'all',
        opacity: 0.92,
        float: true,
        delay: 0.2,
        drawDuration: 2.3,
      },
    ],
  },
  berries: {
    'chapter-02': [
      {
        name: 'berry-crown-top-a',
        tone: 'peach',
        size: 'clamp(144px, 15vw, 196px)',
        position: '-bottom-20 -right-10 z-20',
        rotate: 6,
        showOn: 'md+',
        opacity: 0.92,
        float: true,
        delay: 0.2,
        drawDuration: 2.3,
      },
    ],
    'chapter-03': [
      {
        name: 'cranberry-sprig-a',
        tone: 'peach',
        size: 156,
        position: '-top-24 -right-10 z-20',
        rotate: -8,
        showOn: 'all',
        opacity: 0.92,
        float: true,
        delay: 0.2,
        drawDuration: 2.3,
      },
    ],
    'chapter-04': [
      {
        name: 'blueberry-branch-a',
        tone: 'apricot',
        size: 'clamp(144px, 15vw, 196px)',
        position: '-top-24 -right-10 z-20',
        rotate: -5,
        showOn: 'all',
        opacity: 0.92,
        float: true,
        delay: 0.2,
        drawDuration: 2.3,
      },
    ],
  },
  'dry-fruits': {
    'chapter-02': [
      {
        name: 'apricot-halved-a',
        tone: 'peach',
        size: 'clamp(136px, 14vw, 184px)',
        position: '-bottom-20 -left-10 z-20',
        rotate: -5,
        showOn: 'md+',
        opacity: 0.92,
        float: true,
        delay: 0.2,
        drawDuration: 2.3,
      },
    ],
    'chapter-03': [
      {
        name: 'kiwi-halved-a',
        tone: 'apricot',
        size: 144,
        position: '-bottom-20 -left-10 z-20',
        rotate: -10,
        showOn: 'md+',
        opacity: 0.9,
        float: true,
        delay: 0.25,
        drawDuration: 2.2,
      },
    ],
    'chapter-04': [
      {
        name: 'dried-fruit-bowl-b',
        tone: 'apricot',
        size: 'clamp(144px, 15vw, 196px)',
        position: '-top-24 -right-10 z-20',
        rotate: 4,
        showOn: 'all',
        opacity: 0.92,
        float: true,
        delay: 0.2,
        drawDuration: 2.3,
      },
    ],
  },
  nuts: {
    'chapter-02': [
      {
        name: 'nut-bowl-b',
        tone: 'peach',
        size: 'clamp(140px, 15vw, 192px)',
        position: '-bottom-20 -left-10 z-20',
        rotate: -6,
        showOn: 'md+',
        opacity: 0.92,
        float: true,
        delay: 0.2,
        drawDuration: 2.3,
      },
    ],
    'chapter-03': [
      {
        name: 'cashew-apple-a',
        tone: 'peach',
        size: 152,
        position: '-top-22 -right-10 z-20',
        rotate: -7,
        showOn: 'all',
        opacity: 0.92,
        float: true,
        delay: 0.2,
        drawDuration: 2.3,
      },
    ],
    'chapter-04': [
      {
        name: 'walnut-halved-a',
        tone: 'apricot',
        size: 'clamp(140px, 15vw, 188px)',
        position: '-top-24 -right-10 z-20',
        rotate: -6,
        showOn: 'all',
        opacity: 0.92,
        float: true,
        delay: 0.2,
        drawDuration: 2.3,
      },
    ],
  },
  makhana: {
    'chapter-02': [
      {
        name: 'makhana-bowl-b',
        tone: 'peach',
        size: 'clamp(148px, 16vw, 200px)',
        position: '-bottom-20 -right-10 z-20',
        rotate: 6,
        showOn: 'md+',
        opacity: 0.92,
        float: true,
        delay: 0.2,
        drawDuration: 2.3,
      },
    ],
    'chapter-03': [
      {
        name: 'mint-sprig-b',
        tone: 'apricot',
        size: 144,
        position: '-top-22 -right-10 z-20',
        rotate: 10,
        showOn: 'all',
        opacity: 0.92,
        float: true,
        delay: 0.2,
        drawDuration: 2.3,
      },
    ],
    'chapter-04': [
      {
        name: 'pepper-plant-vine-a',
        tone: 'apricot',
        size: 'clamp(144px, 15vw, 196px)',
        position: '-top-24 -right-10 z-20',
        rotate: 6,
        showOn: 'all',
        opacity: 0.92,
        float: true,
        delay: 0.2,
        drawDuration: 2.3,
      },
    ],
  },
  about: {
    'chapter-01': [
      {
        name: 'almond-blossom-b',
        tone: 'peach',
        size: 'clamp(140px, 15vw, 192px)',
        position: '-top-24 -right-12 z-20',
        rotate: 8,
        showOn: 'all',
        opacity: 0.92,
        float: true,
        delay: 0.2,
        drawDuration: 2.3,
      },
    ],
    'chapter-02': [
      {
        name: 'goji-sprig-a',
        tone: 'peach',
        size: 152,
        position: '-top-24 -right-10 z-20',
        rotate: 8,
        showOn: 'all',
        opacity: 0.92,
        float: true,
        delay: 0.2,
        drawDuration: 2.3,
      },
    ],
    'chapter-03': [
      {
        name: 'berry-scatter-a',
        tone: 'apricot',
        size: 'clamp(136px, 14vw, 184px)',
        position: '-bottom-20 -right-10 z-20',
        rotate: 6,
        showOn: 'all',
        opacity: 0.92,
        float: true,
        delay: 0.2,
        drawDuration: 2.3,
      },
    ],
  },
  contact: {
    'chapter-01': [
      {
        name: 'sesame-pod-a',
        tone: 'peach',
        size: 144,
        position: '-top-22 -right-10 z-20',
        rotate: 8,
        showOn: 'md+',
        opacity: 0.9,
        float: true,
        delay: 0.2,
        drawDuration: 2.2,
      },
    ],
    'chapter-02': [
      {
        name: 'fruit-slice-trio-a',
        tone: 'peach',
        size: 'clamp(136px, 14vw, 184px)',
        position: '-top-22 -right-10 z-20',
        rotate: -6,
        showOn: 'all',
        opacity: 0.92,
        float: true,
        delay: 0.2,
        drawDuration: 2.3,
      },
    ],
  },
  journal: {
    'chapter-01': [
      {
        name: 'sunflower-petals-b',
        tone: 'peach',
        size: 'clamp(136px, 14vw, 184px)',
        position: '-top-12 -left-10 z-20',
        rotate: -6,
        showOn: 'sm+',
        opacity: 0.9,
        float: true,
        delay: 0.2,
        drawDuration: 2.3,
      },
    ],
    'chapter-02': [
      {
        name: 'mulberry-a',
        tone: 'peach',
        size: 148,
        position: '-top-20 -right-8 z-20',
        rotate: 5,
        showOn: 'md+',
        opacity: 0.92,
        float: true,
        delay: 0.2,
        drawDuration: 2.3,
      },
    ],
    'chapter-03': [
      {
        name: 'frame-round-berry-wreath',
        tone: 'apricot',
        size: 'clamp(140px, 14vw, 188px)',
        position: '-top-24 -right-12 z-20',
        rotate: 6,
        showOn: 'all',
        opacity: 0.92,
        float: true,
        delay: 0.2,
        drawDuration: 2.3,
      },
    ],
  },
  shop: {
    'chapter-01': [
      {
        name: 'sunflower-head-b',
        tone: 'peach',
        size: 'clamp(132px, 14vw, 180px)',
        position: '-top-20 -right-8 z-20',
        rotate: 6,
        showOn: 'sm+',
        opacity: 0.9,
        float: true,
        delay: 0.2,
        drawDuration: 2.3,
      },
    ],
    'chapter-03': [
      {
        name: 'pistachio-open-a',
        tone: 'peach',
        size: 144,
        position: '-top-20 -right-10 z-20',
        rotate: -8,
        showOn: 'md+',
        opacity: 0.92,
        float: true,
        delay: 0.2,
        drawDuration: 2.3,
      },
    ],
  },
};

export const CATEGORY_INTRO_CLUSTERS: Record<
  'seeds' | 'berries' | 'dry-fruits' | 'nuts' | 'makhana',
  readonly DoodleClusterItem[]
> = {
  seeds: [
    { name: 'flax-pod-a', tone: 'oat', size: 'clamp(136px, 15vw, 196px)', rotate: -6, float: true, showOn: 'all' },
    { name: 'chia-sprig-a', tone: 'peach', size: 128, rotate: 9, float: true, showOn: 'sm+' },
  ],
  berries: [
    { name: 'sea-buckthorn-berry-cluster-a', tone: 'peach', size: 'clamp(136px, 15vw, 196px)', rotate: 6, float: true, showOn: 'all' },
    { name: 'blackberry-b', tone: 'oat', size: 124, rotate: -8, float: true, showOn: 'sm+' },
  ],
  'dry-fruits': [
    { name: 'fig-halved-a', tone: 'oat', size: 'clamp(136px, 15vw, 196px)', rotate: -5, float: true, showOn: 'all' },
    { name: 'raisin-bunch-a', tone: 'peach', size: 120, rotate: 8, float: true, showOn: 'sm+' },
  ],
  nuts: [
    { name: 'almond-blossom-a', tone: 'oat', size: 'clamp(136px, 15vw, 196px)', rotate: 5, float: true, showOn: 'all' },
    { name: 'pine-cone-a', tone: 'peach', size: 124, rotate: -9, float: true, showOn: 'sm+' },
  ],
  makhana: [
    { name: 'makhana-puffs-heap-a', tone: 'oat', size: 'clamp(136px, 15vw, 200px)', rotate: -6, float: true, showOn: 'all' },
    { name: 'cumin-seeds-a', tone: 'peach', size: 124, rotate: 8, float: true, showOn: 'sm+' },
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
  'dried-sea-buckthorn-berries': 'sea-buckthorn-branch-a',
  'chia-seeds': 'chia-sprig-b',
  'pumpkin-seeds': 'pumpkin-seed-a',
  'flax-seeds': 'flax-pod-b',
};

export const PRODUCT_CARD_DOODLES: Record<string, DoodleName> = {
  'dried-sea-buckthorn-berries': 'sea-buckthorn-berry-cluster-a',
  'dried-blueberries': 'blueberry-single-a',
  'dried-cranberries': 'cranberry-cluster-a',
  'flax-seeds': 'flax-seeds-scatter-a',
  'pumpkin-seeds': 'pumpkin-seeds-pile-b',
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
  'spicy-masala-makhana': 'coriander-seeds-a',
};
