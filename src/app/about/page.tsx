import Link from 'next/link';
import { siteConfig } from '@/lib/data/site';
import { GlowButton } from '@/components/ui/GlowButton';
import { OatSheet } from '@/components/editorial/OatSheet';
import { DoodleSVG } from '@/components/editorial/DoodleSVG';
import { ProductImageWithFallback } from '@/components/ui/ProductImageWithFallback';

const ABOUT_HARVEST_PREVIEW = [
  {
    src: '/images/products/dried-sea-buckthorn-berries.webp',
    label: 'Mountain Berries',
    href: '/shop?category=berries',
  },
  {
    src: '/images/products/flax-seeds.webp',
    label: 'Rabi Seeds',
    href: '/shop?category=seeds-and-grains',
  },
  {
    src: '/images/products/almonds.webp',
    label: 'Orchard Nuts',
    href: '/shop?category=nuts',
  },
  {
    src: '/images/products/mint-makhana.webp',
    label: 'Roasted Makhana',
    href: '/shop?category=flavoured-makhana',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-dvh bg-olive-deep text-oat pt-[calc(5.5rem+var(--safe-top))] pb-20 md:pt-28 md:pb-24">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-14 pl-[max(1rem,var(--safe-left))] pr-[max(1rem,var(--safe-right))]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-center">
          <OatSheet tone="medium" padding="spacious" className="lg:col-span-6 space-y-5">
            <span className="font-ui-label text-[11px] text-peach block">
              Our Story &amp; Soil
            </span>
            <h1 className="font-display text-fluid-h2 text-oat font-medium">
              The{' '}
              <span className="relative inline-block italic text-peach">
                Yagya
                <DoodleSVG
                  name="underline"
                  tone="flame"
                  delay={0.2}
                  className="absolute -bottom-1.5 left-0 w-full h-2.5"
                />
              </span>{' '}
              Philosophy
            </h1>
            <p className="text-fluid-body text-apricot/90">
              {siteConfig.description}
            </p>
            <p className="text-fluid-body text-oat/85">
              We partner directly with farming families across Madhya Pradesh, Rajasthan,
              Karnataka, Himachal, and Ladakh — skipping long middleman chains and packing
              every batch under strict hygiene controls.
            </p>
            <div className="pt-2">
              <GlowButton href="/shop" variant="cta" magnetic className="w-full sm:w-auto min-h-[48px]">
                Explore Yagya
              </GlowButton>
            </div>
          </OatSheet>

          <OatSheet tone="subtle" padding="default" delay={0.18} className="lg:col-span-5 lg:col-start-8 space-y-6">
            <div className="flex items-center justify-between">
              <DoodleSVG name="diya" tone="flame" className="w-16 h-14" />
              <DoodleSVG name="leaf" tone="apricot" className="w-12 h-12" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {ABOUT_HARVEST_PREVIEW.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group relative aspect-square rounded-[4px] overflow-hidden border border-white/20"
                >
                  <ProductImageWithFallback
                    src={item.src}
                    alt={item.label}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-106"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 via-navy/45 to-transparent px-2.5 py-2">
                    <span className="font-ui-label text-[10px] text-oat block">
                      {item.label}
                    </span>
                  </div>
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
      </div>
    </div>
  );
}
