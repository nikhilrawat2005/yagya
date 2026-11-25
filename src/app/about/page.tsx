import Link from 'next/link';
import { siteConfig } from '@/lib/data/site';
import { ASSETS } from '@/lib/assets';
import { GlowButton } from '@/components/ui/GlowButton';
import { OatSheet } from '@/components/editorial/OatSheet';
import { PageBackgroundSet } from '@/components/editorial/PageBackgroundSet';
import { ProductImageWithFallback } from '@/components/ui/ProductImageWithFallback';
import { SplitText } from '@/components/react-bits/SplitText';
import { ChapterDoodleLayer, DoodleFrame } from '@/components/doodles';
import { PAGE_CHAPTER_PLACEMENTS } from '@/config/doodle-placements';

const ABOUT_HARVEST_PREVIEW = [
  {
    src: ASSETS.products.berries.seaBuckthorn,
    alt: 'Dried sea buckthorn berries in a ceramic bowl',
    label: 'Mountain Berries',
    href: '/berries',
  },
  {
    src: ASSETS.products.seeds.flaxSeeds,
    alt: 'Winter Rabi alsi flax seeds with rich brown sheen',
    label: 'Rabi Seeds',
    href: '/seeds',
  },
  {
    src: ASSETS.products.nuts.almonds,
    alt: 'Whole single-origin almonds in warm natural light',
    label: 'Orchard Nuts',
    href: '/nuts',
  },
  {
    src: ASSETS.products.makhana.mintMakhana,
    alt: 'Slow-roasted garden mint makhana fox nuts',
    label: 'Roasted Makhana',
    href: '/makhana',
  },
];

export default function AboutPage() {
  return (
    <PageBackgroundSet
      page="signature"
      chapters={[
        {
          id: 'about-01',
          chapterNumber: '01',
          chapterLabel: 'The Philosophy',
          content: (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 relative">
                <ChapterDoodleLayer placements={PAGE_CHAPTER_PLACEMENTS.about['chapter-01']} priority />
                <OatSheet tone="medium" className="relative z-10 p-8 sm:p-10 space-y-5">
                  <DoodleFrame variant="flourish" tone="apricot" size={38} opacity={0.45} />
                  <SplitText
                    as="h1"
                    trigger="mount"
                    text="The Yagya Philosophy"
                    accentWord="Yagya"
                    className="font-display text-4xl sm:text-5xl text-oat font-medium relative z-10"
                  />
                  <p className="text-sm sm:text-base text-apricot/95 leading-relaxed relative z-10">
                    {siteConfig.description}
                  </p>
                  <p className="text-sm sm:text-base text-oat/90 leading-relaxed relative z-10">
                    We partner directly with farming families across Madhya Pradesh, Rajasthan,
                    Karnataka, Himachal, and Ladakh, skipping long middleman chains and packing
                    every batch under strict hygiene controls.
                  </p>
                  <div className="pt-2 relative z-10">
                    <GlowButton href="/shop" variant="cta" magnetic>
                      Explore Collection
                    </GlowButton>
                  </div>
                </OatSheet>
              </div>

              <OatSheet tone="subtle" delay={0.18} className="lg:col-span-5 lg:col-start-8 p-7 sm:p-9 space-y-6">
                <div className="grid grid-cols-2 gap-3">
                  {ABOUT_HARVEST_PREVIEW.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="group block"
                    >
                      <div className="relative aspect-[4/5] rounded-[4px] overflow-hidden border border-white/20 mb-2">
                        <ProductImageWithFallback
                          src={item.src}
                          alt={item.alt}
                          fill
                          className="object-cover transition-transform duration-500 [@media(hover:hover)]:group-hover:scale-105"
                        />
                      </div>
                      <span className="font-ui-label text-[10px] text-oat group-hover:text-peach transition-colors block">
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </div>

                <p className="font-display text-2xl italic text-oat leading-snug">
                  &ldquo;Unhurried harvests, packed cleanly without fillers or disguised sugar.&rdquo;
                </p>
                <span className="font-annotation text-xl text-peach block">
                  Direct from partner farms
                </span>
              </OatSheet>
            </div>
          ),
        },
        {
          id: 'about-02',
          chapterNumber: '02',
          chapterLabel: 'Partner Regions',
          content: (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 lg:col-start-6 relative">
                <ChapterDoodleLayer placements={PAGE_CHAPTER_PLACEMENTS.about['chapter-02']} />
                <OatSheet tone="warm" delay={0.1} className="relative z-10 p-8 sm:p-10 space-y-4">
                  <SplitText
                    as="h2"
                    trigger="scroll"
                    text="Five distinct belts, one honest standard."
                    accentWord="honest"
                    className="font-display text-3xl sm:text-4xl text-oat font-medium"
                  />
                  <p className="text-sm sm:text-base text-apricot/95 leading-relaxed">
                    High-altitude sea buckthorn from Ladakh and Himachal, winter Rabi flax from
                    Madhya Pradesh, sesame and sunflower from Rajasthan and Karnataka, and wetland
                    lotus puffs roasted in small drums.
                  </p>
                </OatSheet>
              </div>
            </div>
          ),
        },
        {
          id: 'about-03',
          chapterNumber: '03',
          chapterLabel: 'Zero Shortcuts',
          content: (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-6 lg:col-start-2 relative">
                <ChapterDoodleLayer placements={PAGE_CHAPTER_PLACEMENTS.about['chapter-03']} />
                <OatSheet tone="medium" delay={0.1} className="relative z-10 p-8 sm:p-10 space-y-5">
                  <SplitText
                    as="h2"
                    trigger="scroll"
                    text="Cleanly sorted, sealed at peak freshness."
                    accentWord="freshness"
                    className="font-display text-3xl sm:text-4xl text-oat font-medium"
                  />
                  <p className="text-sm sm:text-base text-apricot/95 leading-relaxed">
                    No sulfur bleaching, no sugar-syrup glazing, and no middleman warehousing.
                    Just whole harvests ready for your daily ritual.
                  </p>
                  <GlowButton href="/contact" variant="secondary">
                    Write to Us
                  </GlowButton>
                </OatSheet>
              </div>
            </div>
          ),
        },
      ]}
    />
  );
}
