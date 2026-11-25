'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { BackgroundChapter } from '@/components/editorial/BackgroundChapter';
import { OatSheet } from '@/components/editorial/OatSheet';
import { DoodleSVG } from '@/components/editorial/DoodleSVG';
import { ChapterIndex, type ChapterDefinition } from '@/components/editorial/ChapterIndex';
import { GlowButton } from '@/components/ui/GlowButton';
import { useInteractiveCapabilities } from '@/lib/motion/useInteractiveCapabilities';

const CHAPTERS: ReadonlyArray<ChapterDefinition> = [
  { id: 'chapter-01', number: '01', label: 'The Offering' },
  { id: 'chapter-02', number: '02', label: 'The Origin' },
  { id: 'chapter-03', number: '03', label: 'Craft & Inside' },
  { id: 'chapter-04', number: '04', label: 'The Promise' },
];

const NUTRITION_HIGHLIGHTS = [
  {
    value: '650 mg',
    nutrient: 'Vitamin C',
    source: 'Dried Sea Buckthorn Berries',
    note: '81.3% RDA per 10 g serve · 0.0 g added sugars',
    image: '/images/products/dried-sea-buckthorn-berries.webp',
    href: '/product/dried-sea-buckthorn-berries',
  },
  {
    value: '34.4 g',
    nutrient: 'Dietary Fiber',
    source: 'Central & Southern Chia Seeds',
    note: '17.8 g Omega-3 ALA · zero added sugars',
    image: '/images/products/chia-seeds.webp',
    href: '/product/chia-seeds',
  },
  {
    value: '29.8 g',
    nutrient: 'Plant Protein',
    source: 'Sun-Warmed Kaddu Kernels',
    note: 'Plump, sun-warmed plains harvest',
    image: '/images/products/pumpkin-seeds.webp',
    href: '/product/pumpkin-seeds',
  },
  {
    value: '22.8 g',
    nutrient: 'Omega-3 ALA',
    source: 'Winter Rabi Alsi Flax Seeds',
    note: '27.3 g dietary fiber · earthy nutty aroma',
    image: '/images/products/flax-seeds.webp',
    href: '/product/flax-seeds',
  },
] as const;

export function StoryLanding() {
  const { prefersReducedMotion, simplifyMotion } = useInteractiveCapabilities();

  return (
    <div className="relative w-full text-oat">
      <ChapterIndex chapters={CHAPTERS} />

      {/* ================================================================
          CHAPTER 01 — NEON NAVY / BLUEBERRIES — HERO
         ================================================================ */}
      <BackgroundChapter
        id="chapter-01"
        chapterNumber="01"
        chapterLabel="The Offering"
        imageSrc="/background/1.png"
        imageAlt="Fresh dark blueberries glistening with water droplets in deep Neon Navy light"
        objectPositionClass="object-[50%_40%] md:object-center"
        tone="navy"
        isHero
      >
        {/* Top photographic breathing zone on portrait mobile so blueberries shine above & around the sheet */}
        <div className="h-10 md:hidden landscape-phone:hidden" aria-hidden="true" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-5 md:gap-6 items-end landscape-phone:grid-cols-12 landscape-phone:items-center landscape-phone:gap-4">
          {/* Primary Hero Sheet */}
          <div className="md:col-span-11 lg:col-span-6 2xl:col-span-6 tablet-landscape:col-span-7 landscape-phone:col-span-7 relative">
            <DoodleSVG
              name="flame"
              tone="flame"
              delay={0.2}
              className="absolute -top-7 right-2 md:-top-10 md:-right-5 w-9 h-11 md:w-12 md:h-14 z-20"
            />

            <OatSheet tone="medium" padding="compact" delay={0.05} className="md:p-7 lg:p-9">
              {/* Desktop/Tablet brand stamp (omitted on small mobile since floating Navbar displays logo right above) */}
              <div className="hidden md:flex items-center gap-3 mb-5">
                <div className="relative w-11 h-11 rounded-[4px] overflow-hidden border border-white/25 bg-oat shrink-0">
                  <Image
                    src="/yagya-logo.png"
                    alt="Yagya"
                    fill
                    sizes="44px"
                    preload
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="font-display text-xl md:text-2xl tracking-[0.08em] text-oat font-semibold block leading-none">
                    YAGYA
                  </span>
                  <span className="font-ui-label text-[10px] text-apricot/80 mt-1 block">
                    01 · Seeds &amp; Berries
                  </span>
                </div>
              </div>

              <span className="md:hidden font-ui-label text-[10px] text-peach block mb-2">
                01 · Seeds &amp; Berries
              </span>

              <h1 className="font-display text-fluid-hero font-medium text-oat mb-3 md:mb-4 max-w-2xl">
                Pure farm harvests, gathered like an{' '}
                <span className="italic text-peach">offering</span>.
              </h1>

              <p className="text-fluid-body text-apricot/90 max-w-lg mb-5 md:mb-6">
                Mountain berries and crisp farm seeds sourced straight from partner
                growers — packed under strict hygiene with zero shortcuts.
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3.5 sm:gap-5">
                <GlowButton
                  href="#chapter-02"
                  variant="cta"
                  magnetic
                  className="w-full sm:w-auto min-h-[48px]"
                >
                  <span>Begin the Story</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </GlowButton>

                <span className="font-annotation text-lg sm:text-xl text-peach/90 text-center sm:text-left">
                  Zero added sugar
                </span>
              </div>
            </OatSheet>
          </div>

          {/* Asymmetrical Overlapping / Side Corner Sheet */}
          <div className="md:col-span-8 md:col-start-5 lg:col-span-4 lg:col-start-9 tablet-landscape:col-span-5 tablet-landscape:col-start-8 landscape-phone:col-span-5 relative -mt-1 md:-mt-3 lg:mt-0 landscape-phone:mt-0 z-20">
            <DoodleSVG
              name="swirl"
              tone="apricot"
              delay={0.45}
              visibility="desktop-only"
              className="absolute -top-9 -left-16 w-24 h-11 opacity-80"
            />
            <OatSheet tone="subtle" padding="compact" delay={0.2}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="font-ui-label text-[10px] text-peach block mb-1">
                    Farm-To-Pack
                  </span>
                  <p className="font-annotation text-lg sm:text-xl text-oat">
                    Small batches from Himalayan valleys &amp; fertile Rabi fields.
                  </p>
                </div>
                <DoodleSVG
                  name="berries"
                  tone="apricot"
                  delay={0.35}
                  className="w-9 h-9 md:w-10 md:h-10 shrink-0"
                />
              </div>
            </OatSheet>
          </div>
        </div>

        {/* Quiet Scroll Cue (>=44px height tap target) */}
        <div className="mt-5 md:mt-8 landscape-phone:hidden flex items-center justify-between">
          <motion.a
            href="#chapter-02"
            aria-label="Scroll to Chapter 2: The Origin"
            animate={prefersReducedMotion || simplifyMotion ? undefined : { y: [0, 5, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            className="min-h-[44px] inline-flex items-center gap-2.5 text-[11px] font-ui-label text-apricot/85 hover:text-oat transition-colors pr-4"
          >
            <ArrowDown className="w-4 h-4 text-flame" />
            <span>Scroll to read</span>
          </motion.a>
        </div>
      </BackgroundChapter>

      {/* ================================================================
          CHAPTER 02 — OLIVE GREEN / OLIVES — THE ORIGIN
         ================================================================ */}
      <BackgroundChapter
        id="chapter-02"
        chapterNumber="02"
        chapterLabel="The Origin"
        imageSrc="/background/3.png"
        imageAlt="Glistening green olives bathed in natural oil against deep Olive Green shadow"
        objectPositionClass="object-center md:object-[42%_50%]"
        tone="olive"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-5 md:gap-6 items-start landscape-phone:grid-cols-12 landscape-phone:items-center">
          {/* Wide Lead Sheet (Right-aligned on desktop & landscape tablet) */}
          <div className="md:col-span-10 md:col-start-2 lg:col-span-7 lg:col-start-6 tablet-landscape:col-span-7 tablet-landscape:col-start-6 relative">
            <DoodleSVG
              name="leaf"
              tone="apricot"
              delay={0.3}
              className="absolute -top-7 right-2 md:-top-10 md:right-6 w-10 h-10 md:w-14 md:h-14 z-20"
            />
            <OatSheet tone="medium" padding="spacious" delay={0.08}>
              <span className="font-ui-label text-[11px] text-peach block mb-3 md:mb-4">
                02 · The Origin
              </span>

              <h2 className="font-display text-fluid-h2 font-medium text-oat mb-4 md:mb-6">
                Rooted in the clarity of the{' '}
                <span className="relative inline-block italic text-peach">
                  Diya
                  <DoodleSVG
                    name="underline"
                    tone="flame"
                    delay={0.25}
                    className="absolute -bottom-1.5 md:-bottom-2 left-0 w-full h-2.5 md:h-3"
                  />
                </span>
                .
              </h2>

              <p className="text-fluid-body text-apricot/90 max-w-xl">
                In ancient harvest tradition, a yagya is an offering of what is pure and
                unadorned. That quiet discipline guides every harvest we source directly
                from farming households across Madhya Pradesh, Rajasthan, Karnataka,
                Himachal, and Uttarakhand.
              </p>
            </OatSheet>
          </div>

          {/* Overlapping Pillars Sheet (Left-aligned on desktop & landscape tablet) */}
          <div className="md:col-span-10 lg:col-span-5 lg:col-start-1 lg:-mt-16 tablet-landscape:col-span-5 tablet-landscape:col-start-1 tablet-landscape:row-start-1 relative z-20">
            <DoodleSVG
              name="swirl"
              tone="peach"
              delay={0.35}
              visibility="desktop-only"
              className="absolute -top-8 -right-12 w-24 h-11 z-20"
            />

            <OatSheet tone="warm" padding="default" delay={0.2}>
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <DoodleSVG name="diya" tone="flame" delay={0.2} className="w-11 h-10 md:w-14 md:h-12" />
                <span className="font-annotation text-base sm:text-lg text-apricot/90">
                  Pure from field to table
                </span>
              </div>

              <ul className="divide-y divide-white/15">
                <li className="pb-3.5 md:pb-4">
                  <span className="font-ui-label text-[10px] text-peach block mb-1">
                    Grower-Direct Soil
                  </span>
                  <p className="text-sm md:text-base text-oat/90 leading-relaxed">
                    Skipping long middleman chains to preserve fresh harvest character and
                    support rural livelihoods.
                  </p>
                </li>
                <li className="py-3.5 md:py-4">
                  <span className="font-ui-label text-[10px] text-peach block mb-1">
                    Strict Hygiene Sorting
                  </span>
                  <p className="text-sm md:text-base text-oat/90 leading-relaxed">
                    Every batch is cleaned to keep out dust, stones, and moisture without
                    bleaching or masking flavor.
                  </p>
                </li>
                <li className="pt-3.5 md:pt-4">
                  <span className="font-ui-label text-[10px] text-peach block mb-1">
                    Honest Tradition
                  </span>
                  <p className="text-sm md:text-base text-oat/90 leading-relaxed">
                    Traditional crops — alsi, kaddu pepitas, chia, and mountain berries — kept
                    whole and authentic.
                  </p>
                </li>
              </ul>
            </OatSheet>
          </div>
        </div>
      </BackgroundChapter>

      {/* ================================================================
          CHAPTER 03 — POTENT PURPLE / PLUMS — THE CRAFT & WHAT'S INSIDE
         ================================================================ */}
      <BackgroundChapter
        id="chapter-03"
        chapterNumber="03"
        chapterLabel="Craft & Inside"
        imageSrc="/background/2.png"
        imageAlt="Deep Potent Purple plums covered in fine water droplets"
        objectPositionClass="object-[50%_45%] md:object-center"
        tone="purple"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-5 md:gap-6 items-center">
          {/* Tall Craft Narrative Sheet */}
          <div className="md:col-span-11 lg:col-span-5 tablet-landscape:col-span-5 relative">
            <OatSheet tone="medium" padding="default" delay={0.08}>
              <span className="font-ui-label text-[11px] text-peach block mb-3 md:mb-4">
                03 · The Craft &amp; What&apos;s Inside
              </span>

              <h2 className="font-display text-fluid-h2 font-medium text-oat mb-4 md:mb-5">
                Gently dried. <br />
                <span className="italic text-apricot">Naturally dense.</span>
              </h2>

              <p className="text-fluid-body text-apricot/90 mb-5 md:mb-6">
                Whole Sea Buckthorn berries keep their nutrient-rich pulp and seed oils
                intact through gentle dehydration. Cool-season Rabi flax and chia retain
                crispness, fiber, and plant Omega oils in barrier-sealed pouches.
              </p>

              <div className="pt-4 border-t border-white/15 flex items-center justify-between gap-4">
                <span className="font-annotation text-lg sm:text-xl text-peach">
                  Pulp, seed &amp; crunch intact
                </span>
                <DoodleSVG name="seeds" tone="apricot" delay={0.3} className="w-11 h-8 md:w-14 md:h-10 shrink-0" />
              </div>
            </OatSheet>
          </div>

          {/* Overlapping Minimal Nutrition Highlights Sheet */}
          <div className="md:col-span-11 md:col-start-2 lg:col-span-6 lg:col-start-7 lg:mt-10 tablet-landscape:col-span-7 tablet-landscape:col-start-6 relative">
            <DoodleSVG
              name="swirl"
              tone="apricot"
              delay={0.35}
              visibility="desktop-only"
              className="absolute -top-9 -left-14 w-24 h-11 z-20"
            />
            <DoodleSVG
              name="star"
              tone="flame"
              delay={0.4}
              visibility="tablet-up"
              className="absolute -bottom-5 -right-3 md:-bottom-6 md:-right-5 w-8 h-8 md:w-9 md:h-9 z-20"
            />

            <OatSheet tone="warm" padding="default" delay={0.2}>
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 md:pb-5 border-b border-white/20">
                <span className="font-ui-label text-[11px] text-oat">
                  Verified Nutrition Highlights
                </span>
                <span className="font-ui-label text-[10px] text-peach">
                  Per 100 g Reference
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:gap-x-6 lg:gap-x-8">
                {NUTRITION_HIGHLIGHTS.map((item, idx) => (
                  <Link
                    key={item.nutrient}
                    href={item.href}
                    className={`group py-4 md:py-5 min-h-[44px] flex items-start gap-3.5 hover:bg-oat/[0.04] active:bg-oat/[0.08] rounded-[4px] transition-colors ${idx < 2 ? 'sm:border-b sm:border-white/15' : ''}`}
                  >
                    <div className="relative w-12 h-12 rounded-[4px] overflow-hidden border border-white/20 shrink-0 mt-0.5">
                      <Image
                        src={item.image}
                        alt={item.source}
                        fill
                        sizes="48px"
                        className="object-cover transition-transform duration-300 group-hover:scale-106"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-peach block leading-none mb-1.5">
                        {item.value}
                      </span>
                      <h3 className="text-sm font-semibold text-oat group-hover:text-peach transition-colors mb-1">
                        {item.nutrient}
                      </h3>
                      <p className="text-xs sm:text-sm text-apricot/85">{item.source}</p>
                      <p className="text-xs text-oat/70 mt-1">{item.note}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </OatSheet>
          </div>
        </div>
      </BackgroundChapter>

      {/* ================================================================
          CHAPTER 04 — AUBERGINE GLEAM / BLACKBERRIES — THE PROMISE + CTA
         ================================================================ */}
      <BackgroundChapter
        id="chapter-04"
        chapterNumber="04"
        chapterLabel="The Promise"
        imageSrc="/background/4.png"
        imageAlt="Deep Aubergine Gleam blackberries glistening with moisture"
        objectPositionClass="object-center md:object-[50%_45%]"
        tone="aubergine"
        isLast
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-5 md:gap-6 items-center">
          {/* Primary Promise & CTA Sheet */}
          <div className="md:col-span-11 lg:col-span-6 tablet-landscape:col-span-7 relative">
            <OatSheet tone="medium" padding="spacious" delay={0.08}>
              <span className="font-ui-label text-[11px] text-peach block mb-3 md:mb-4">
                04 · The Promise
              </span>

              <h2 className="font-display text-fluid-h2 font-medium text-oat mb-4 md:mb-5">
                Honest food that asks for{' '}
                <span className="relative inline-block italic text-peach">
                  nothing
                  <DoodleSVG
                    name="underline"
                    tone="flame"
                    delay={0.25}
                    className="absolute -bottom-1.5 md:-bottom-2 left-0 w-full h-2.5 md:h-3"
                  />
                </span>{' '}
                extra.
              </h2>

              <p className="text-fluid-body text-apricot/90 max-w-lg mb-6 md:mb-8">
                Steep whole sea buckthorn berries in warm water, fold crisp alsi into
                morning dough, or sprinkle pumpkin kernels over bowls — unhurried daily
                nourishment rooted in honest living soil.
              </p>

              <div className="relative flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4">
                <DoodleSVG
                  name="arrow"
                  direction="down-right"
                  tone="peach"
                  delay={0.35}
                  visibility="tablet-up"
                  className="absolute -top-9 left-2 w-11 h-9"
                />
                <GlowButton
                  href="/shop"
                  variant="cta"
                  magnetic
                  className="w-full sm:w-auto min-h-[48px]"
                >
                  <span>Explore Yagya</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </GlowButton>

                <GlowButton
                  href="/about"
                  variant="secondary"
                  className="w-full sm:w-auto min-h-[48px]"
                >
                  Our Story
                </GlowButton>
              </div>
            </OatSheet>
          </div>

          {/* Overlapping Testimonial Sheet */}
          <div className="md:col-span-9 md:col-start-4 lg:col-span-5 lg:col-start-8 lg:mt-20 tablet-landscape:col-span-5 tablet-landscape:col-start-8 relative -mt-1 lg:mt-20 z-20">
            <DoodleSVG
              name="leaf"
              tone="apricot"
              delay={0.35}
              visibility="tablet-up"
              className="absolute -bottom-8 -right-4 w-12 h-12 z-20"
            />
            <OatSheet as="blockquote" tone="warm" padding="default" delay={0.2}>
              <div className="flex items-center justify-between mb-4">
                <DoodleSVG name="flame" tone="flame" delay={0.2} className="w-7 h-8 md:w-8 md:h-9" />
                <span className="font-ui-label text-[10px] text-apricot/75">
                  Verified Harvest Note
                </span>
              </div>

              <p className="font-display text-lg sm:text-xl md:text-2xl italic leading-snug text-oat mb-5">
                &ldquo;Finding whole dried sea buckthorn without added sugar or syrup was
                rare until Yagya. Clean, vibrant mountain tartness.&rdquo;
              </p>

              <footer className="pt-4 border-t border-white/15 flex items-center justify-between gap-3">
                <div>
                  <cite className="not-italic text-sm font-semibold text-oat block">
                    Arundhati Roy
                  </cite>
                  <span className="text-xs text-apricot/75">
                    Dehradun, Uttarakhand
                  </span>
                </div>
                <span className="font-annotation text-lg text-peach">
                  Sealed fresh
                </span>
              </footer>
            </OatSheet>
          </div>
        </div>
      </BackgroundChapter>
    </div>
  );
}
