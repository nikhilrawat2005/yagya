export type DoodleCategory = 'connectors';

export type DoodleRecommendedUse = 'connector' | 'frame';

export interface DoodleMeta {
  readonly name: DoodleName;
  readonly path: string;
  readonly category: DoodleCategory;
  readonly tags: readonly string[];
  readonly recommendedUse: DoodleRecommendedUse;
  readonly defaultSize: number;
  readonly viewBox: string;
}

export const DOODLE_NAMES = [
  'highlight-oval-loop',
  'arrow-curved-pointer',
  'arrow-loop-delight',
  'arrow-short-nudge',
] as const;

export type DoodleName = (typeof DOODLE_NAMES)[number];

export const DOODLES: Record<DoodleName, DoodleMeta> = {
  'highlight-oval-loop': {
    name: 'highlight-oval-loop',
    path: '/assets/doodles/editorial/highlight-oval-loop.svg',
    category: 'connectors',
    tags: ['highlight', 'oval', 'circle', 'loop'],
    recommendedUse: 'frame',
    defaultSize: 140,
    viewBox: '0 0 200 120',
  },
  'arrow-curved-pointer': {
    name: 'arrow-curved-pointer',
    path: '/assets/doodles/editorial/arrow-curved-pointer.svg',
    category: 'connectors',
    tags: ['arrow', 'curved', 'pointer'],
    recommendedUse: 'connector',
    defaultSize: 96,
    viewBox: '0 0 200 200',
  },
  'arrow-loop-delight': {
    name: 'arrow-loop-delight',
    path: '/assets/doodles/editorial/arrow-loop-delight.svg',
    category: 'connectors',
    tags: ['arrow', 'loop', 'flow'],
    recommendedUse: 'connector',
    defaultSize: 140,
    viewBox: '0 0 300 140',
  },
  'arrow-short-nudge': {
    name: 'arrow-short-nudge',
    path: '/assets/doodles/editorial/arrow-short-nudge.svg',
    category: 'connectors',
    tags: ['arrow', 'nudge', 'cta'],
    recommendedUse: 'connector',
    defaultSize: 64,
    viewBox: '0 0 160 160',
  },
} as const;
