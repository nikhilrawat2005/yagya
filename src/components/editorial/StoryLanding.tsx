'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { BackgroundChapter } from '@/components/editorial/BackgroundChapter';
import { OatSheet } from '@/components/editorial/OatSheet';
import { DoodleSVG } from '@/components/editorial/DoodleSVG';
import { CharcoalDoodle } from '@/components/editorial/CharcoalDoodle';
import { ChapterIndex, type ChapterDefinition } from '@/components/editorial/ChapterIndex';
import { GlowButton } from '@/components/ui/GlowButton';

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
  const prefersReducedMotion = useReducedMotion();

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
        tone="navy"
        isHero
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-end">
          {/* Tall Editorial Hero Sheet (left-offset, leaves open blueberry canvas right) */}
          <div className="lg:col-span-6 relative">
            <CharcoalDoodle
              name="blueberry"
              variant="halo"
              size="md"
              rotate={6}
              delay={0.2}
              className="hidden sm:block absolute -top-12 -right-8 z-20"
            />

            <OatSheet tone="medium" delay={0.05} className="p-6 sm:p-8 lg:p-9">
              <div className="flex items-center gap-3.5 mb-5">
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
                  <span className="font-display text-xl sm:text-2xl tracking-[0.08em] text-oat font-semibold block leading-none">
                    YAGYA
                  </span>
                  <span className="font-ui-label text-[10px] text-apricot/80 mt-1 block">
                    01 · Seeds &amp; Berries
                  </span>
                </div>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-[48px] font-medium leading-[1.06] tracking-tight text-oat mb-4">
                Pure farm harvests, gathered like an{' '}
                <span className="italic text-peach">offering</span>.
              </h1>

              <p className="text-sm sm:text-base text-apricot/90 leading-relaxed max-w-md mb-6">
                Mountain berries and crisp farm seeds sourced straight from partner
                growers — packed under strict hygiene with zero shortcuts.
              </p>

              <div className="flex flex-wrap items-center gap-5">
                <GlowButton href="#chapter-02" variant="cta" magnetic>
                  <span>Begin the Story</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </GlowButton>

                <span className="font-annotation text-xl text-peach/90">
                  Zero added sugar
                </span>
              </div>
            </OatSheet>
          </div>

          {/* Asymmetrical Small Overlapping Corner Sheet */}
          <div className="lg:col-span-4 lg:col-start-9 relative">
            <DoodleSVG
              name="swirl"
              tone="charcoal"
              delay={0.45}
              className="hidden lg:block absolute -top-9 -left-16 w-24 h-11"
            />
            <OatSheet tone="subtle" delay={0.22} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-ui-label text-[10px] text-peach block mb-1">
                    Farm-To-Pack
                  </span>
                  <p className="font-annotation text-xl text-oat">
                    Small batches from Himalayan valleys &amp; fertile Rabi fields.
                  </p>
                </div>
                <DoodleSVG
                  name="berries"
                  tone="charcoal"
                  delay={0.35}
                  className="w-12 h-12 shrink-0"
                />
              </div>
            </OatSheet>
          </div>
        </div>

        {/* Quiet Scroll Cue */}
        <motion.a
          href="#chapter-02"
          aria-label="Scroll to Chapter 2: The Origin"
          animate={prefersReducedMotion ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          className="mt-7 lg:mt-8 inline-flex items-center gap-2.5 text-[11px] font-ui-label text-apricot/85 hover:text-oat transition-colors"
        >
          <ArrowDown className="w-3.5 h-3.5 text-flame" />
          <span>Scroll to read</span>
        </motion.a>
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
        tone="olive"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Wide Lead Sheet (Right-aligned) */}
          <div className="lg:col-span-7 lg:col-start-6 relative">
            <CharcoalDoodle
              name="olive"
              variant="halo"
              size="md"
              rotate={-5}
              delay={0.28}
              className="hidden sm:block absolute -top-12 right-4 z-20"
            />
            <OatSheet tone="medium" delay={0.08} className="p-7 sm:p-10">
              <span className="font-ui-label text-[11px] text-peach block mb-4">
                02 · The Origin
              </span>

              <h2 className="font-display text-3xl sm:text-5xl font-medium leading-[1.08] tracking-tight text-oat mb-6">
                Rooted in the clarity of the{' '}
                <span className="relative inline-block italic text-peach">
                  Diya
                  <DoodleSVG
                    name="underline"
                    tone="charcoal"
                    delay={0.25}
                    className="absolute -bottom-2 left-0 w-full h-3"
                  />
                </span>
                .
              </h2>

              <p className="text-sm sm:text-base text-apricot/90 leading-relaxed max-w-xl">
                In ancient harvest tradition, a yagya is an offering of what is pure and
                unadorned. That quiet discipline guides every harvest we source directly
                from farming households across Madhya Pradesh, Rajasthan, Karnataka,
                Himachal, and Uttarakhand.
              </p>
            </OatSheet>
          </div>

          {/* Tall Overlapping Pillars Sheet (Left-aligned, staggered upward) */}
          <div className="lg:col-span-5 lg:col-start-1 lg:-mt-16 relative z-20">
            <DoodleSVG
              name="swirl"
              tone="charcoal"
              delay={0.35}
              className="hidden lg:block absolute -top-8 -right-12 w-24 h-11 z-20"
            />

            <OatSheet tone="warm" delay={0.22} className="p-7 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <DoodleSVG name="leaf" tone="charcoal" delay={0.2} className="w-12 h-12" />
                <span className="font-annotation text-lg text-apricot/90">
                  Pure from field to table
                </span>
              </div>

              <ul className="divide-y divide-white/15">
                <li className="pb-4">
                  <span className="font-ui-label text-[10px] text-peach block mb-1">
                    Grower-Direct Soil
                  </span>
                  <p className="text-sm text-oat/90 leading-relaxed">
                    Skipping long middleman chains to preserve fresh harvest character and
                    support rural livelihoods.
                  </p>
                </li>
                <li className="py-4">
                  <span className="font-ui-label text-[10px] text-peach block mb-1">
                    Strict Hygiene Sorting
                  </span>
                  <p className="text-sm text-oat/90 leading-relaxed">
                    Every batch is cleaned to keep out dust, stones, and moisture without
                    bleaching or masking flavor.
                  </p>
                </li>
                <li className="pt-4">
                  <span className="font-ui-label text-[10px] text-peach block mb-1">
                    Honest Tradition
                  </span>
                  <p className="text-sm text-oat/90 leading-relaxed">
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
        tone="purple"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Tall Craft Narrative Sheet */}
          <div className="lg:col-span-5 relative">
            <OatSheet tone="medium" delay={0.08} className="p-7 sm:p-9">
              <span className="font-ui-label text-[11px] text-peach block mb-4">
                03 · The Craft &amp; What&apos;s Inside
              </span>

              <h2 className="font-display text-3xl sm:text-[44px] font-medium leading-[1.08] tracking-tight text-oat mb-5">
                Gently dried. <br />
                <span className="italic text-apricot">Naturally dense.</span>
              </h2>

              <p className="text-sm sm:text-base text-apricot/90 leading-relaxed mb-6">
                Whole Sea Buckthorn berries keep their nutrient-rich pulp and seed oils
                intact through gentle dehydration. Cool-season Rabi flax and chia retain
                crispness, fiber, and plant Omega oils in barrier-sealed pouches.
              </p>

              <div className="pt-4 border-t border-white/15 flex items-center justify-between gap-4">
                <span className="font-annotation text-xl text-peach">
                  Pulp, seed &amp; crunch intact
                </span>
                <DoodleSVG name="seeds" tone="charcoal" delay={0.3} className="w-14 h-10 shrink-0" />
              </div>
            </OatSheet>
          </div>

          {/* Overlapping Minimal Nutrition Highlights Sheet */}
          <div className="lg:col-span-6 lg:col-start-7 lg:mt-10 relative">
            <DoodleSVG
              name="swirl"
              tone="charcoal"
              delay={0.35}
              className="hidden lg:block absolute -top-9 -left-14 w-24 h-11 z-20"
            />
            <CharcoalDoodle
              name="seeds"
              variant="halo"
              size="md"
              rotate={-4}
              delay={0.3}
              className="hidden sm:block absolute -top-11 -right-4 z-20"
            />
            <DoodleSVG
              name="berries"
              tone="charcoal"
              delay={0.4}
              className="hidden sm:block absolute -bottom-7 -right-5 w-11 h-11 z-20"
            />

            <OatSheet tone="warm" delay={0.2} className="p-7 sm:p-9">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-5 border-b border-white/20">
                <span className="font-ui-label text-[11px] text-oat">
                  Verified Nutrition Highlights
                </span>
                <span className="font-ui-label text-[10px] text-peach">
                  Per 100 g Reference
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:gap-x-8">
                {NUTRITION_HIGHLIGHTS.map((item, idx) => (
                  <Link
                    key={item.nutrient}
                    href={item.href}
                    className={`group py-5 flex items-start gap-3.5 hover:bg-oat/[0.04] rounded-[4px] transition-colors ${idx < 2 ? 'sm:border-b sm:border-white/15' : ''}`}
                  >
                    <div className="relative w-11 h-11 rounded-[4px] overflow-hidden border border-white/20 shrink-0 mt-0.5">
                      <Image
                        src={item.image}
                        alt={item.source}
                        fill
                        sizes="44px"
                        className="object-cover transition-transform duration-300 group-hover:scale-106"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="font-display text-3xl sm:text-4xl font-semibold text-peach block leading-none mb-1.5">
                        {item.value}
                      </span>
                      <h3 className="text-sm font-semibold text-oat group-hover:text-peach transition-colors mb-1">
                        {item.nutrient}
                      </h3>
                      <p className="text-xs text-apricot/85">{item.source}</p>
                      <p className="text-[11px] text-oat/65 mt-1">{item.note}</p>
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
        tone="aubergine"
        isLast
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Primary Promise & CTA Sheet */}
          <div className="lg:col-span-6 relative">
            <OatSheet tone="medium" delay={0.08} className="p-7 sm:p-10">
              <span className="font-ui-label text-[11px] text-peach block mb-4">
                04 · The Promise
              </span>

              <h2 className="font-display text-3xl sm:text-5xl font-medium leading-[1.08] tracking-tight text-oat mb-5">
                Honest food that asks for{' '}
                <span className="relative inline-block italic text-peach">
                  nothing
                  <DoodleSVG
                    name="underline"
                    tone="charcoal"
                    delay={0.25}
                    className="absolute -bottom-2 left-0 w-full h-3"
                  />
                </span>{' '}
                extra.
              </h2>

              <p className="text-sm sm:text-base text-apricot/90 leading-relaxed max-w-lg mb-8">
                Steep whole sea buckthorn berries in warm water, fold crisp alsi into
                morning dough, or sprinkle pumpkin kernels over bowls — unhurried daily
                nourishment rooted in honest living soil.
              </p>

              <div className="relative flex flex-wrap items-center gap-4">
                <DoodleSVG
                  name="arrow"
                  direction="down-right"
                  tone="charcoal"
                  delay={0.35}
                  className="hidden sm:block absolute -top-9 left-2 w-11 h-9"
                />
                <GlowButton href="/shop" variant="cta" magnetic>
                  <span>Explore Yagya</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </GlowButton>

                <GlowButton href="/about" variant="secondary">
                  Our Story
                </GlowButton>
              </div>
            </OatSheet>
          </div>

          {/* Overlapping Testimonial Sheet */}
          <div className="lg:col-span-5 lg:col-start-8 lg:mt-20 relative">
            <DoodleSVG
              name="leaf"
              tone="charcoal"
              delay={0.35}
              className="hidden sm:block absolute -bottom-8 -right-4 w-12 h-12 z-20"
            />
            <OatSheet as="blockquote" tone="warm" delay={0.22} className="p-7 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <CharcoalDoodle name="blackberry" variant="halo" size="sm" rotate={-4} delay={0.2} />
                <span className="font-ui-label text-[10px] text-apricot/75">
                  Verified Harvest Note
                </span>
              </div>

              <p className="font-display text-xl sm:text-2xl italic leading-snug text-oat mb-5">
                &ldquo;Finding whole dried sea buckthorn without added sugar or syrup was
                rare until Yagya. Clean, vibrant mountain tartness.&rdquo;
              </p>

              <footer className="pt-4 border-t border-white/15 flex items-center justify-between gap-3">
                <div>
                  <cite className="not-italic text-xs font-semibold text-oat block">
                    Arundhati Roy
                  </cite>
                  <span className="text-[11px] text-apricot/75">
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
