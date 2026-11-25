import { siteConfig } from '@/lib/data/site';
import { FibonacciBlocks } from '@/components/shapes/FibonacciBlocks';
import { GlowButton } from '@/components/ui/GlowButton';
import { FadeInSection } from '@/components/motion/FadeInSection';
import {
  DoodleJar,
  DoodleLeaf,
  DoodleSparkle,
  DoodleSeed,
  DoodleUnderline,
  FloatingDoodle,
} from '@/components/doodles';

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
        <FadeInSection direction="right" className="lg:col-span-6 space-y-5 relative">
          <div className="inline-flex items-center gap-2">
            <span className="font-mono-meta text-xs uppercase tracking-widest text-cranberry">
              Our Story &amp; Soil
            </span>
            <DoodleSeed delay={0.15} className="w-10 h-8" />
          </div>
          <h1 className="font-display text-4xl sm:text-5xl text-indigo font-semibold leading-tight">
            The{' '}
            <span className="relative inline-block text-cranberry italic">
              Yagya
              <DoodleUnderline
                variant="double"
                delay={0.2}
                className="absolute -bottom-1.5 left-0 w-full"
              />
            </span>{' '}
            Farm Philosophy
          </h1>
          <p className="font-script-body text-base sm:text-lg text-indigo">
            {siteConfig.description}
          </p>
          <p className="font-script-body text-base text-indigo/90">
            We partner directly with farming families across Madhya Pradesh, Rajasthan,
            Karnataka, Himachal, and Ladakh — skipping long middleman chains and packing
            every batch under strict hygiene controls.
          </p>
          <div className="pt-2 flex items-center gap-4">
            <GlowButton href="/shop" variant="cta" magnetic>
              EXPLORE HARVEST
            </GlowButton>
            <DoodleSparkle delay={0.3} className="w-7 h-7" />
          </div>
        </FadeInSection>

        <FadeInSection direction="left" className="lg:col-span-6 relative flex items-center justify-center py-4">
          <div className="relative w-full max-w-[460px]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 rounded-full animate-ambient-glow z-0"
              style={{
                background:
                  'radial-gradient(circle, rgba(242,140,27,0.2) 0%, rgba(251,201,138,0.12) 55%, transparent 75%)',
              }}
            />
            <div className="relative z-10 glow-border rounded-2xl">
              <FibonacciBlocks unit={36} showSpiralArc showIndices />
            </div>
            <FloatingDoodle
              floatDistance={6}
              duration={5.8}
              rotateDeg={1.4}
              parallaxDepth={12}
              className="absolute left-[18%] -top-[10%] w-[48%] z-20"
            >
              <DoodleJar delay={0.15} />
            </FloatingDoodle>
            <DoodleLeaf
              variant="sprig"
              delay={0.35}
              className="hidden sm:block absolute -right-4 bottom-4 w-14 h-14 z-30 opacity-85"
            />
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
