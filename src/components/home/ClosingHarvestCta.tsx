'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Floating3DAsset } from '@/components/ui/Floating3DAsset';
import {
  DoodleArrow,
  DoodleCircle,
  DoodleUnderline,
  DoodleSparkle,
  DoodleLeaf,
  DoodleSwirl,
} from '@/components/doodles';
import { GlowButton } from '@/components/ui/GlowButton';
import { FadeInSection } from '@/components/motion/FadeInSection';

export function ClosingHarvestCta() {
  return (
    <section
      aria-label="Explore All Farm Superfoods"
      className="relative w-full bg-apricot/65 border-b border-charcoal/20 py-20 lg:py-28 overflow-hidden"
    >
      {/* Subtle Fibonacci-proportioned side orange strips leaving clean Oat center breathing space */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute left-0 top-0 bottom-0 w-[12%] bg-peach/70 border-r border-charcoal/15"
      />
      <div
        aria-hidden="true"
        className="hidden md:block absolute right-0 top-0 bottom-0 w-[19%] bg-seabuckthorn/80 border-l border-charcoal/15"
      />

      {/* Soft ambient warm harvest glow behind CTA */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[320px] rounded-full animate-ambient-glow z-0"
        style={{
          background:
            'radial-gradient(circle, rgba(242,140,27,0.2) 0%, rgba(251,201,138,0.14) 50%, transparent 72%)',
        }}
      />

      <FadeInSection className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <DoodleSparkle
          delay={0.2}
          className="hidden sm:block absolute left-10 top-6 w-7 h-7 opacity-85"
        />
        <DoodleLeaf
          variant="twin"
          delay={0.25}
          className="hidden sm:block absolute right-10 top-2 w-11 h-11 opacity-85"
        />

        <div className="glow-hover relative inline-block px-5 py-1.5 mb-5 rounded-full">
          <DoodleCircle delay={0.15} className="absolute -inset-x-2 -inset-y-1 w-[calc(100%+16px)] h-[calc(100%+8px)]" />
          <span className="relative font-mono-meta text-xs font-bold uppercase tracking-widest text-indigo">
            Fresh Small Batches
          </span>
        </div>

        <h2 className="font-display text-4xl sm:text-6xl text-indigo font-semibold leading-tight mb-5">
          Pure Seeds &amp;{' '}
          <span className="relative inline-block text-cranberry italic">
            Mountain Berries
            <DoodleUnderline
              variant="double"
              delay={0.22}
              className="absolute -bottom-2 left-0 w-full"
            />
          </span>
        </h2>

        <p className="font-script-body text-base sm:text-lg text-indigo max-w-xl mx-auto mb-9">
          Pick your daily pouch size and taste the difference of unhurried, farm-direct
          Indian superfoods.
        </p>

        <div className="relative inline-flex items-center justify-center gap-4">
          <DoodleArrow direction="right" delay={0.25} className="hidden sm:block" />
          <GlowButton href="/shop" variant="cta" magnetic>
            <span>SHOP ALL 7 SUPERFOODS</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </GlowButton>
          <DoodleSwirl variant="wave" delay={0.35} className="hidden sm:block w-14 h-7 opacity-80" />
        </div>
      </FadeInSection>

      {/* Floating Pumpkin & Sunflower Seeds framing the closing section */}
      <Floating3DAsset
        src="/images/3d/seed-pumpkin-01.webp"
        alt="3D clay Pumpkin Seeds"
        width={190}
        height={190}
        floatDistance={5}
        duration={5.8}
        rotateDeg={-1.5}
        parallaxDepth={-10}
        className="hidden lg:block absolute left-[4%] bottom-4 w-44 z-20"
      />
      <Floating3DAsset
        src="/images/3d/seed-sunflower-01.webp"
        alt="3D clay Sunflower Seeds"
        width={190}
        height={190}
        floatDistance={6}
        duration={6.3}
        rotateDeg={1.5}
        parallaxDepth={10}
        className="hidden lg:block absolute right-[6%] top-4 w-44 z-20"
      />
    </section>
  );
}
