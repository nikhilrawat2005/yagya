export type ChapterTone = 'navy' | 'olive' | 'purple' | 'aubergine';

export type PageBackgroundKey =
  | 'home'
  | 'seeds'
  | 'berries'
  | 'dry-fruits'
  | 'nuts'
  | 'makhana'
  | 'signature';

export interface BackgroundAsset {
  readonly id: string;
  readonly desktop: string;
  readonly mobile: string;
  readonly alt: string;
  readonly tone: ChapterTone;
}

export const ASSETS = {
  brand: {
    logoPrimary: '/assets/brand/logo-primary.png',
    logoFlame: '/assets/brand/logo-flame.png',
  },
  backgrounds: {
    home: [
      {
        id: 'home-01',
        desktop: '/assets/backgrounds/home/home-bg-01-navy-blueberries.webp',
        mobile: '/assets/backgrounds/mobile/home/home-bg-01-navy-blueberries-m.webp',
        alt: 'Fresh dark blueberries glistening with water droplets in deep Neon Navy light',
        tone: 'navy',
      },
      {
        id: 'home-02',
        desktop: '/assets/backgrounds/home/home-bg-02-olive-olives.webp',
        mobile: '/assets/backgrounds/mobile/home/home-bg-02-olive-olives-m.webp',
        alt: 'Glistening green olives bathed in natural oil against deep Olive Green shadow',
        tone: 'olive',
      },
      {
        id: 'home-03',
        desktop: '/assets/backgrounds/home/home-bg-03-purple-plums.webp',
        mobile: '/assets/backgrounds/mobile/home/home-bg-03-purple-plums-m.webp',
        alt: 'Deep Potent Purple plums covered in fine water droplets',
        tone: 'purple',
      },
      {
        id: 'home-04',
        desktop: '/assets/backgrounds/home/home-bg-04-aubergine-blackberries.webp',
        mobile: '/assets/backgrounds/mobile/home/home-bg-04-aubergine-blackberries-m.webp',
        alt: 'Deep Aubergine Gleam blackberries glistening with moisture',
        tone: 'aubergine',
      },
    ],
    seeds: [
      {
        id: 'seeds-01',
        desktop: '/assets/backgrounds/seeds/seeds-bg-01-river.webp',
        mobile: '/assets/backgrounds/mobile/seeds/seeds-bg-01-river-m.webp',
        alt: 'Flowing river of flax, chia, pumpkin, and sunflower seeds on deep navy slate',
        tone: 'navy',
      },
      {
        id: 'seeds-02',
        desktop: '/assets/backgrounds/seeds/seeds-bg-02-flatlay.webp',
        mobile: '/assets/backgrounds/mobile/seeds/seeds-bg-02-flatlay-m.webp',
        alt: 'Overhead flatlay of whole farm seeds in dark olive shadow',
        tone: 'olive',
      },
      {
        id: 'seeds-03',
        desktop: '/assets/backgrounds/seeds/seeds-bg-03-scatter.webp',
        mobile: '/assets/backgrounds/mobile/seeds/seeds-bg-03-scatter-m.webp',
        alt: 'Artisanal scatter of golden flax and green pepitas across moody slate',
        tone: 'navy',
      },
      {
        id: 'seeds-04',
        desktop: '/assets/backgrounds/seeds/seeds-bg-04-scoops.webp',
        mobile: '/assets/backgrounds/mobile/seeds/seeds-bg-04-scoops-m.webp',
        alt: 'Handcrafted scoops filled with raw farm seeds in warm olive light',
        tone: 'olive',
      },
    ],
    berries: [
      {
        id: 'berries-01',
        desktop: '/assets/backgrounds/berries/berries-bg-01-mosaic.webp',
        mobile: '/assets/backgrounds/mobile/berries/berries-bg-01-mosaic-m.webp',
        alt: 'Rich mosaic of sea buckthorn, cranberries, and wild mountain berries in aubergine light',
        tone: 'aubergine',
      },
      {
        id: 'berries-02',
        desktop: '/assets/backgrounds/berries/berries-bg-02-flatlay.webp',
        mobile: '/assets/backgrounds/mobile/berries/berries-bg-02-flatlay-m.webp',
        alt: 'Editorial flatlay of dried Himalayan berries on deep plum stone',
        tone: 'purple',
      },
      {
        id: 'berries-03',
        desktop: '/assets/backgrounds/berries/berries-bg-03-tumbling.webp',
        mobile: '/assets/backgrounds/mobile/berries/berries-bg-03-tumbling-m.webp',
        alt: 'Tumbling ruby cranberries and amber sea buckthorn berries in dark aubergine air',
        tone: 'aubergine',
      },
      {
        id: 'berries-04',
        desktop: '/assets/backgrounds/berries/berries-bg-04-gradient.webp',
        mobile: '/assets/backgrounds/mobile/berries/berries-bg-04-gradient-m.webp',
        alt: 'Color gradient of sun-dried orchard berries against deep plum shadow',
        tone: 'purple',
      },
    ],
    dryFruits: [
      {
        id: 'dry-fruits-01',
        desktop: '/assets/backgrounds/dry-fruits/dry-fruits-bg-01-feast.webp',
        mobile: '/assets/backgrounds/mobile/dry-fruits/dry-fruits-bg-01-feast-m.webp',
        alt: 'Abundant feast of sun-cured figs, dates, kiwi, and pineapple rings in deep purple light',
        tone: 'purple',
      },
      {
        id: 'dry-fruits-02',
        desktop: '/assets/backgrounds/dry-fruits/dry-fruits-bg-02-flatlay.webp',
        mobile: '/assets/backgrounds/mobile/dry-fruits/dry-fruits-bg-02-flatlay-m.webp',
        alt: 'Overhead flatlay of whole dried orchard fruits on dark burgundy slate',
        tone: 'aubergine',
      },
      {
        id: 'dry-fruits-03',
        desktop: '/assets/backgrounds/dry-fruits/dry-fruits-bg-03-stacked.webp',
        mobile: '/assets/backgrounds/mobile/dry-fruits/dry-fruits-bg-03-stacked-m.webp',
        alt: 'Stacked golden pineapple rings, anjeer figs, and dates in moody plum light',
        tone: 'purple',
      },
      {
        id: 'dry-fruits-04',
        desktop: '/assets/backgrounds/dry-fruits/dry-fruits-bg-04-spilled.webp',
        mobile: '/assets/backgrounds/mobile/dry-fruits/dry-fruits-bg-04-spilled-m.webp',
        alt: 'Sun-cured dried fruits spilling softly across dark aubergine stone',
        tone: 'aubergine',
      },
    ],
    nuts: [
      {
        id: 'nuts-01',
        desktop: '/assets/backgrounds/nuts/nuts-bg-01-mound.webp',
        mobile: '/assets/backgrounds/mobile/nuts/nuts-bg-01-mound-m.webp',
        alt: 'Mound of whole almonds, cashews, hazelnuts, and pine nuts in deep navy light',
        tone: 'navy',
      },
      {
        id: 'nuts-02',
        desktop: '/assets/backgrounds/nuts/nuts-bg-02-bowls.webp',
        mobile: '/assets/backgrounds/mobile/nuts/nuts-bg-02-bowls-m.webp',
        alt: 'Dark ceramic bowls of single-origin orchard nuts in olive shadow',
        tone: 'olive',
      },
      {
        id: 'nuts-03',
        desktop: '/assets/backgrounds/nuts/nuts-bg-03-falling.webp',
        mobile: '/assets/backgrounds/mobile/nuts/nuts-bg-03-falling-m.webp',
        alt: 'Whole roasted nuts falling through deep navy darkness',
        tone: 'navy',
      },
      {
        id: 'nuts-04',
        desktop: '/assets/backgrounds/nuts/nuts-bg-04-lineup.webp',
        mobile: '/assets/backgrounds/mobile/nuts/nuts-bg-04-lineup-m.webp',
        alt: 'Editorial lineup of pine nuts, almonds, cashews, and hazelnuts on olive stone',
        tone: 'olive',
      },
    ],
    makhana: [
      {
        id: 'makhana-01',
        desktop: '/assets/backgrounds/makhana/makhana-bg-01-clouds.webp',
        mobile: '/assets/backgrounds/mobile/makhana/makhana-bg-01-clouds-m.webp',
        alt: 'Clouds of hand-popped wetland lotus seeds in warm olive shadow',
        tone: 'olive',
      },
      {
        id: 'makhana-02',
        desktop: '/assets/backgrounds/makhana/makhana-bg-02-flatlay.webp',
        mobile: '/assets/backgrounds/mobile/makhana/makhana-bg-02-flatlay-m.webp',
        alt: 'Flatlay of spiced roasted makhana varieties on dark purple slate',
        tone: 'purple',
      },
      {
        id: 'makhana-03',
        desktop: '/assets/backgrounds/makhana/makhana-bg-03-spice-cloud.webp',
        mobile: '/assets/backgrounds/mobile/makhana/makhana-bg-03-spice-cloud-m.webp',
        alt: 'Whole spices and popped makhana suspended in warm olive light',
        tone: 'olive',
      },
      {
        id: 'makhana-04',
        desktop: '/assets/backgrounds/makhana/makhana-bg-04-gradient.webp',
        mobile: '/assets/backgrounds/mobile/makhana/makhana-bg-04-gradient-m.webp',
        alt: 'Five spice blends of roasted makhana arranged in a tonal purple gradient',
        tone: 'purple',
      },
    ],
    signature: [
      {
        id: 'signature-01',
        desktop: '/assets/backgrounds/signature/signature-bg-01-harvest-table.webp',
        mobile: '/assets/backgrounds/mobile/signature/signature-bg-01-harvest-table-m.webp',
        alt: 'Yagya signature harvest table laid with seeds, berries, nuts, and brass bowls',
        tone: 'navy',
      },
      {
        id: 'signature-02',
        desktop: '/assets/backgrounds/signature/signature-bg-02-trailmix-river.webp',
        mobile: '/assets/backgrounds/mobile/signature/signature-bg-02-trailmix-river-m.webp',
        alt: 'Flowing trail of berries, seeds, and orchard nuts across dark slate',
        tone: 'olive',
      },
      {
        id: 'signature-03',
        desktop: '/assets/backgrounds/signature/signature-bg-03-breakfast-bowl.webp',
        mobile: '/assets/backgrounds/mobile/signature/signature-bg-03-breakfast-bowl-m.webp',
        alt: 'Nourishing morning bowl topped with flax, chia, berries, and almonds',
        tone: 'purple',
      },
      {
        id: 'signature-04',
        desktop: '/assets/backgrounds/signature/signature-bg-04-diya-harvest.webp',
        mobile: '/assets/backgrounds/mobile/signature/signature-bg-04-diya-harvest-m.webp',
        alt: 'Warm glowing diya beside raw farm harvests in deep aubergine light',
        tone: 'aubergine',
      },
    ],
  },
  products: {
    berries: {
      seaBuckthorn: '/assets/products/berries/sea-buckthorn.webp',
      cranberry: '/assets/products/berries/cranberry.webp',
      blueberry: '/assets/products/berries/blueberry.webp',
    },
    seeds: {
      flaxSeeds: '/assets/products/seeds/flax-seeds.webp',
      pumpkinSeeds: '/assets/products/seeds/pumpkin-seeds.webp',
      chiaSeeds: '/assets/products/seeds/chia-seeds.webp',
      sunflowerSeeds: '/assets/products/seeds/sunflower-seeds.webp',
    },
    dryFruits: {
      anjeer: '/assets/products/dry-fruits/anjeer.webp',
      dates: '/assets/products/dry-fruits/dates.webp',
      driedPineapple: '/assets/products/dry-fruits/dried-pineapple.webp',
      driedKiwi: '/assets/products/dry-fruits/dried-kiwi.webp',
    },
    nuts: {
      pineNuts: '/assets/products/nuts/pine-nuts.webp',
      almonds: '/assets/products/nuts/almonds.webp',
      cashews: '/assets/products/nuts/cashews.webp',
      hazelnuts: '/assets/products/nuts/hazelnuts.webp',
    },
    makhana: {
      mintMakhana: '/assets/products/makhana/mint-makhana.webp',
      blackSaltMakhana: '/assets/products/makhana/black-salt-makhana.webp',
      periPeriMakhana: '/assets/products/makhana/peri-peri-makhana.webp',
      blackPepperMakhana: '/assets/products/makhana/black-pepper-makhana.webp',
      spicyMasalaMakhana: '/assets/products/makhana/spicy-masala-makhana.webp',
    },
  },
} as const;

export const PAGE_BACKGROUND_SETS: Record<PageBackgroundKey, readonly BackgroundAsset[]> = {
  home: ASSETS.backgrounds.home,
  seeds: ASSETS.backgrounds.seeds,
  berries: ASSETS.backgrounds.berries,
  'dry-fruits': ASSETS.backgrounds.dryFruits,
  nuts: ASSETS.backgrounds.nuts,
  makhana: ASSETS.backgrounds.makhana,
  signature: ASSETS.backgrounds.signature,
};
