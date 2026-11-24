'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Floating3DAsset } from '@/components/ui/Floating3DAsset';
import { DoodleArrow, DoodleCircle } from '@/components/doodles';
import { Button } from '@/components/ui/Button';

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

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="relative inline-block px-5 py-1.5 mb-5">
          <DoodleCircle delay={0.15} className="absolute -inset-x-2 -inset-y-1 w-[calc(100%+16px)] h-[calc(100%+8px)]" />
          <span className="relative font-mono-meta text-xs font-bold uppercase tracking-widest text-indigo">
            Fresh Small Batches
          </span>
        </div>

        <h2 className="font-display text-4xl sm:text-6xl text-indigo font-semibold leading-tight mb-5">
          Pure Seeds &amp;{' '}
          <span className="text-cranberry italic">Mountain Berries</span>
        </h2>

        <p className="font-script-body text-base sm:text-lg text-indigo max-w-xl mx-auto mb-9">
          Pick your daily pouch size and taste the difference of unhurried, farm-direct
          Indian superfoods.
        </p>

        <div className="relative inline-flex items-center justify-center gap-4">
          <DoodleArrow direction="right" delay={0.25} className="hidden sm:block" />
          <Button href="/shop">
            <span>SHOP ALL 7 SUPERFOODS</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Floating Pumpkin & Sunflower Seeds framing the closing section */}
      <Floating3DAsset
        src="/images/3d/seed-pumpkin-01.webp"
        alt="3D clay Pumpkin Seeds"
        width={190}
        height={190}
        floatDistance={5}
        duration={5.8}
        rotateDeg={-1.5}
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
        className="hidden lg:block absolute right-[6%] top-4 w-44 z-20"
      />
    </section>
  );
}
