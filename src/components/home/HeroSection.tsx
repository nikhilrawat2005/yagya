'use client';

import React from 'react';
import { FibonacciBlocks } from '@/components/shapes/FibonacciBlocks';
import {
  DoodleUnderline,
  DoodleCircle,
  DoodleArrow,
  DoodleSparkle,
  DoodleLeaf,
  DoodleSwirl,
  DoodleJar,
  FloatingDoodle,
} from '@/components/doodles';
import { Floating3DAsset } from '@/components/ui/Floating3DAsset';
import { GlowButton } from '@/components/ui/GlowButton';

export function HeroSection() {
  return (
    <section
      aria-label="Yagya Farm Superfoods Hero"
      className="relative w-full bg-oat border-b border-charcoal/20 overflow-hidden"
    >
      {/* Subtle animated ambient warm glow behind Fibonacci & 3D composition */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-[8%] w-[440px] h-[440px] rounded-full animate-ambient-glow z-0"
        style={{
          background:
            'radial-gradient(circle, rgba(242,140,27,0.22) 0%, rgba(251,201,138,0.16) 45%, transparent 72%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-[12%] w-[340px] h-[340px] rounded-full animate-ambient-glow z-0"
        style={{
          animationDelay: '2.5s',
          background:
            'radial-gradient(circle, rgba(253,230,200,0.48) 0%, rgba(251,201,138,0.18) 50%, transparent 75%)',
        }}
      />

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
        <div className="relative flex items-center px-6 sm:px-10 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-12 pt-12 pb-12 lg:py-20">
          <div className="relative max-w-xl flex flex-col items-start">
            <div className="relative inline-flex items-center gap-2 mb-6">
              <span className="glow-badge font-mono-meta text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-apricot border border-charcoal/25 text-indigo">
                7 Farm-Direct Superfoods
              </span>
              <DoodleSparkle delay={0.15} className="w-6 h-6" />
            </div>

            <div className="relative">
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
              <DoodleLeaf
                variant="sprig"
                delay={0.35}
                className="hidden sm:block absolute -top-6 -right-10 w-11 h-11 opacity-85"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <h3 className="font-sans text-base sm:text-lg font-semibold text-indigo">
                Small-Batch Indian Harvests
              </h3>
              <span className="glow-badge font-mono-meta text-xs px-2.5 py-1 rounded-full bg-peach/70 text-indigo border border-charcoal/20">
                100g / 200g / 500g
              </span>
              <DoodleSwirl variant="wave" delay={0.4} className="hidden sm:block w-14 h-7 opacity-80" />
            </div>

            <p className="font-script-body text-base sm:text-lg text-indigo max-w-lg mb-9">
              Harvested directly from partner farmers and packed under strict hygiene
              standards with{' '}
              <span className="text-cranberry font-bold">zero added sugar</span> — real
              mountain berries and crisp seeds straight to your table.
            </p>

            <div className="relative flex flex-wrap items-center gap-4 sm:gap-5 pt-2">
              <GlowButton href="/shop" variant="cta" magnetic>
                SHOP NOW
              </GlowButton>

              <GlowButton variant="secondary" href="#nutrition-spotlight">
                VIEW NUTRITION
              </GlowButton>

              <div className="glow-hover relative inline-flex items-center px-7 py-3 rounded-full">
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

        {/* RIGHT 5fr (38.5%): Hand-Drawn Black Marker Jar Doodle + Floating 3D Seeds/Berries */}
        <div className="relative min-h-[340px] sm:min-h-[400px] lg:min-h-[640px] w-full flex items-center justify-center">
          {/* Mobile-only Fibonacci background blocks behind the elements */}
          <div aria-hidden="true" className="lg:hidden absolute inset-0 pointer-events-none z-0">
            <FibonacciBlocks fullBleed negativeSpaceMajor={false} showSpiralArc showIndices={false} />
          </div>

          {/* Hand-drawn Charcoal Apothecary Harvest Jar Doodle bridging the 8fr Oat space & 5fr Fibonacci zone */}
          <FloatingDoodle
            floatDistance={6}
            duration={6}
            rotateDeg={1.2}
            parallaxDepth={-12}
            className="absolute left-[4%] lg:left-[-18%] top-[6%] lg:top-[8%] w-[44%] sm:w-[36%] lg:w-[58%] z-20"
          >
            <DoodleJar delay={0.15} />
          </FloatingDoodle>

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
            parallaxDepth={14}
            className="absolute right-[4%] lg:right-[4%] top-[2%] lg:top-[6%] w-[38%] sm:w-[30%] lg:w-[46%] z-30"
          />

          {/* Decorative marker sparkles & leaf sprigs accenting the composition */}
          <DoodleSparkle
            delay={0.5}
            className="hidden lg:block absolute left-[28%] top-[52%] w-7 h-7 z-20 opacity-85"
          />
          <DoodleLeaf
            variant="twin"
            delay={0.55}
            className="hidden lg:block absolute right-[12%] top-[46%] w-10 h-10 z-20 opacity-80"
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
            parallaxDepth={8}
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
            parallaxDepth={16}
            className="absolute right-[6%] lg:right-[6%] bottom-[4%] lg:bottom-[6%] w-[30%] sm:w-[24%] lg:w-[35%] z-30"
          />
        </div>
      </div>
    </section>
  );
}
