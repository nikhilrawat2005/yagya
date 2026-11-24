'use client';

import React from 'react';
import { FibonacciBlocks } from '@/components/shapes/FibonacciBlocks';
import {
  DoodleUnderline,
  DoodleCircle,
  DoodleArrow,
} from '@/components/doodles';
import { Floating3DAsset } from '@/components/ui/Floating3DAsset';
import { Button } from '@/components/ui/Button';

export function HeroSection() {
  return (
    <section
      aria-label="Yagya Farm Superfoods Hero"
      className="relative w-full bg-oat border-b border-charcoal/20 overflow-hidden"
    >
      {/* FULL-BLEED UNSEEN FIBONACCI GRID + ORANGE BLOCKS IN RIGHT 5/13 ZONE (DESKTOP) */}
      <div
        aria-hidden="true"
        className="hidden lg:block absolute inset-0 pointer-events-none z-0"
      >
        <FibonacciBlocks
          fullBleed
          negativeSpaceMajor
          showSpiralArc
          showIndices
        />
      </div>

      {/* MOBILE / TABLET: Clean Oat White top negative space, Fibonacci orange blocks beneath */}
      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-[8fr_5fr] lg:min-h-[640px]">
        {/* LEFT 8fr (61.5%): Generous Oat White Negative Space + Hero Typography */}
        <div className="flex items-center px-6 sm:px-10 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-12 pt-12 pb-12 lg:py-20">
          <div className="max-w-xl flex flex-col items-start">
            <span className="font-mono-meta text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-apricot border border-charcoal/25 text-indigo mb-6">
              7 Farm-Direct Superfoods
            </span>

            <h1 className="font-display text-[42px] sm:text-[56px] lg:text-[66px] leading-[1.06] text-indigo font-semibold tracking-tight mb-5">
              Seeds &amp; Berries,{' '}
              <span className="text-cranberry italic">Straight</span>
              <br />
              From The{' '}
              <span className="relative inline-block">
                Farm
                <DoodleUnderline
                  variant="double"
                  delay={0.25}
                  className="absolute -bottom-2.5 left-0 w-full"
                />
              </span>
            </h1>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <h3 className="font-sans text-base sm:text-lg font-semibold text-indigo">
                Small-Batch Indian Harvests
              </h3>
              <span className="font-mono-meta text-xs px-2.5 py-1 rounded-full bg-peach/70 text-indigo border border-charcoal/20">
                100g / 200g / 500g
              </span>
            </div>

            <p className="font-script-body text-base sm:text-lg text-indigo max-w-lg mb-9">
              Harvested directly from partner farmers and packed under strict hygiene
              standards with{' '}
              <span className="text-cranberry font-bold">zero added sugar</span> — real
              mountain berries and crisp seeds straight to your table.
            </p>

            <div className="relative flex flex-wrap items-center gap-4 sm:gap-5 pt-2">
              <Button href="/shop">SHOP NOW</Button>

              <Button variant="secondary" href="#nutrition-spotlight">
                VIEW NUTRITION
              </Button>

              <div className="relative inline-flex items-center px-7 py-3">
                <DoodleCircle
                  delay={0.45}
                  className="absolute -inset-x-1 -inset-y-0.5 w-[calc(100%+8px)] h-[calc(100%+4px)]"
                />
                <span className="relative font-mono-meta text-sm font-bold text-indigo">
                  ₹249 / 100g
                </span>
              </div>

              <DoodleArrow
                direction="down-left"
                delay={0.6}
                className="hidden sm:block absolute -top-8 left-20"
              />
            </div>
          </div>
        </div>

        {/* RIGHT 5fr (38.5%): Floating 3D Clay Assets Across the Full-Bleed Fibonacci Shapes */}
        <div className="relative min-h-[340px] sm:min-h-[400px] lg:min-h-[640px] w-full flex items-center justify-center">
          {/* Mobile-only Fibonacci background blocks behind the 3D elements */}
          <div aria-hidden="true" className="lg:hidden absolute inset-0 pointer-events-none z-0">
            <FibonacciBlocks fullBleed negativeSpaceMajor={false} showSpiralArc showIndices={false} />
          </div>

          {/* 3D Reserve Jar bridging the 8fr Oat space and 5fr Peach/Apricot blocks */}
          <Floating3DAsset
            src="/images/3d/jar-reserve-01.webp"
            alt="Yagya matte clay superfood reserve jar"
            width={340}
            height={340}
            priority
            floatDistance={6}
            duration={6}
            rotateDeg={1}
            className="absolute left-[4%] lg:left-[-20%] top-[6%] lg:top-[8%] w-[46%] sm:w-[38%] lg:w-[64%] z-20"
          />

          {/* Sea Buckthorn Berries floating in the upper Peach quarter-arc */}
          <Floating3DAsset
            src="/images/3d/berry-seabuckthorn-01.webp"
            alt="3D clay Dried Sea Buckthorn Berries"
            width={240}
            height={240}
            priority
            floatDistance={7}
            duration={5.2}
            rotateDeg={2}
            className="absolute right-[4%] lg:right-[4%] top-[2%] lg:top-[6%] w-[38%] sm:w-[30%] lg:w-[46%] z-30"
          />

          {/* Cranberries resting across the lower Oat / Peach seam */}
          <Floating3DAsset
            src="/images/3d/berry-cranberry-01.webp"
            alt="3D clay Dried Cranberries"
            width={200}
            height={200}
            priority
            floatDistance={5}
            duration={6.4}
            rotateDeg={-1.5}
            className="absolute left-[6%] lg:left-[-12%] bottom-[4%] lg:bottom-[6%] w-[34%] sm:w-[26%] lg:w-[40%] z-30"
          />

          {/* Chia Seeds over the Sea Buckthorn 3x3 block */}
          <Floating3DAsset
            src="/images/3d/seed-chia-01.webp"
            alt="3D clay Chia Seeds"
            width={185}
            height={185}
            priority
            floatDistance={5}
            duration={5.8}
            rotateDeg={1.5}
            className="absolute right-[6%] lg:right-[6%] bottom-[4%] lg:bottom-[6%] w-[30%] sm:w-[24%] lg:w-[35%] z-30"
          />
        </div>
      </div>
    </section>
  );
}
