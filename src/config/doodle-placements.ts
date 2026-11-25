import type { DoodleName } from '@/lib/doodles';
import type { DoodlePreset, DoodleShowOn, DoodleTone } from '@/components/doodles/Doodle';
import type { DoodleClusterItem } from '@/components/doodles/DoodleCluster';
import type { DoodleDividerVariant } from '@/components/doodles/DoodleDivider';

export interface DoodlePlacement {
  readonly name: DoodleName;
  readonly preset?: DoodlePreset;
  readonly tone: DoodleTone;
  readonly size: number | string;
  readonly position: string;
  readonly rotate: number;
  readonly showOn: DoodleShowOn;
  readonly opacity?: number;
  readonly float?: boolean;
  readonly parallax?: boolean;
  readonly hover?: boolean;
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
 * Editorial restraint map: at most 1 quiet corner botanical per section on desktop (`md+`)
 * and zero edge-clutter on mobile, leaving typography and photography as the focal point.
 */
export const PAGE_CHAPTER_PLACEMENTS: Record<
  PagePlacementKey,
  Record<string, readonly DoodlePlacement[]>
> = {
  home: {},
  seeds: {
    'chapter-03': [
      {
        name: 'leaf-pair-whisper',
        preset: 'botanical',
        tone: 'oat',
        size: 112,
        position: '-top-16 -right-8 z-20 transition-opacity duration-300 hover:opacity-90',
        rotate: 8,
        showOn: 'md+',
        opacity: 0.42,
        hover: true,
      },
    ],
  },
  berries: {
    'chapter-02': [
      {
        name: 'sprig-sea-buckthorn',
        preset: 'botanical',
        tone: 'oat',
        size: 132,
        position: '-bottom-16 -right-8 z-20 transition-opacity duration-300 hover:opacity-90',
        rotate: 6,
        showOn: 'md+',
        opacity: 0.44,
        hover: true,
      },
    ],
  },
  'dry-fruits': {
    'chapter-03': [
      {
        name: 'dried-fruit-bowl-b',
        preset: 'botanical',
        tone: 'apricot',
        size: 120,
        position: '-bottom-16 -left-8 z-20 transition-opacity duration-300 hover:opacity-90',
        rotate: -6,
        showOn: 'md+',
        opacity: 0.42,
        hover: true,
      },
    ],
  },
  nuts: {
    'chapter-02': [
      {
        name: 'almond-blossom-accent',
        preset: 'botanical',
        tone: 'apricot',
        size: 124,
        position: '-bottom-16 -left-8 z-20 transition-opacity duration-300 hover:opacity-90',
        rotate: -6,
        showOn: 'md+',
        opacity: 0.44,
        hover: true,
      },
    ],
  },
  makhana: {
    'chapter-02': [
      {
        name: 'makhana-puff-trio',
        preset: 'botanical',
        tone: 'oat',
        size: 132,
        position: '-bottom-16 -right-8 z-20 transition-opacity duration-300 hover:opacity-90',
        rotate: 6,
        showOn: 'md+',
        opacity: 0.44,
        hover: true,
      },
    ],
  },
  about: {},
  contact: {},
  journal: {
    'chapter-01': [
      {
        name: 'sprig-sea-buckthorn',
        preset: 'botanical',
        tone: 'oat',
        size: 112,
        position: '-top-10 -left-8 z-20 transition-opacity duration-300 hover:opacity-90',
        rotate: -8,
        showOn: 'md+',
        opacity: 0.42,
        hover: true,
      },
    ],
  },
  shop: {},
};

export const CATEGORY_INTRO_CLUSTERS: Record<
  'seeds' | 'berries' | 'dry-fruits' | 'nuts' | 'makhana',
  readonly DoodleClusterItem[]
> = {
  seeds: [
    { name: 'chia-sprig-a', preset: 'botanical', tone: 'oat', size: 116, rotate: 8, opacity: 0.44, hover: true, showOn: 'md+' },
  ],
  berries: [
    { name: 'sprig-sea-buckthorn', preset: 'botanical', tone: 'oat', size: 128, rotate: 6, opacity: 0.44, hover: true, showOn: 'md+' },
  ],
  'dry-fruits': [
    { name: 'date-bunch-b', preset: 'botanical', tone: 'apricot', size: 116, rotate: -6, opacity: 0.44, hover: true, showOn: 'md+' },
  ],
  nuts: [
    { name: 'almond-blossom-accent', preset: 'botanical', tone: 'apricot', size: 120, rotate: -6, opacity: 0.44, hover: true, showOn: 'md+' },
  ],
  makhana: [
    { name: 'makhana-puff-trio', preset: 'botanical', tone: 'oat', size: 128, rotate: 6, opacity: 0.44, hover: true, showOn: 'md+' },
  ],
};

export const CATEGORY_DIVIDERS: Record<
  'seeds' | 'berries' | 'dry-fruits' | 'nuts' | 'makhana',
  DoodleDividerVariant
> = {
  seeds: 'flame',
  berries: 'flame',
  'dry-fruits': 'flame',
  nuts: 'flame',
  makhana: 'flame',
};

export const HOME_NUTRITION_DOODLES: Record<string, DoodleName> = {};

export const PRODUCT_CARD_DOODLES: Record<string, DoodleName> = {
  'dried-sea-buckthorn-berries': 'sprig-sea-buckthorn',
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
  almonds: 'almond-blossom-accent',
  cashews: 'cashew-pair-a',
  hazelnuts: 'hazelnut-cluster-a',
  'mint-makhana': 'makhana-puff-trio',
  'black-salt-makhana': 'black-salt-crystals-a',
  'peri-peri-makhana': 'chilli-pair-a',
  'black-pepper-makhana': 'peppercorns-a',
  'spicy-masala-makhana': 'coriander-seeds-a',
};
