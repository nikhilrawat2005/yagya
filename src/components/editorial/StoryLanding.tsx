'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BackgroundChapter } from '@/components/editorial/BackgroundChapter';
import { OatSheet } from '@/components/editorial/OatSheet';
import { GlowButton } from '@/components/ui/GlowButton';
import { SplitText } from '@/components/react-bits/SplitText';
import { SpotlightCard } from '@/components/react-bits/SpotlightCard';
import { ASSETS } from '@/lib/assets';
import {
  ChapterDoodleLayer,
  Doodle,
  DoodleDivider,
} from '@/components/doodles';
import {
  HOME_NUTRITION_DOODLES,
  PAGE_CHAPTER_PLACEMENTS,
} from '@/config/doodle-placements';

const NUTRITION_HIGHLIGHTS = [
  {
    value: '650 mg',
    nutrient: 'Vitamin C',
    source: 'Dried Sea Buckthorn Berries',
    note: '81.3% RDA per 10 g serve · 0.0 g added sugars',
    image: ASSETS.products.berries.seaBuckthorn,
    href: '/product/dried-sea-buckthorn-berries',
  },
  {
    value: '34.4 g',
    nutrient: 'Dietary Fiber',
    source: 'Central & Southern Chia Seeds',
    note: '17.8 g Omega-3 ALA · zero added sugars',
    image: ASSETS.products.seeds.chiaSeeds,
    href: '/product/chia-seeds',
  },
  {
    value: '29.8 g',
    nutrient: 'Plant Protein',
    source: 'Sun-Warmed Kaddu Kernels',
    note: 'Plump, sun-warmed plains harvest',
    image: ASSETS.products.seeds.pumpkinSeeds,
    href: '/product/pumpkin-seeds',
  },
  {
    value: '22.8 g',
    nutrient: 'Omega-3 ALA',
    source: 'Winter Rabi Alsi Flax Seeds',
    note: '27.3 g dietary fiber · earthy nutty aroma',
    image: ASSETS.products.seeds.flaxSeeds,
    href: '/product/flax-seeds',
  },
] as const;

const HOME_PEEK_PRODUCTS = [
  {
    name: 'Pine Nuts (Chilgoza)',
    note: 'Cedar forest harvest',
    image: ASSETS.products.nuts.pineNuts,
    alt: 'Wild Himalayan chilgoza pine nuts in a dark ceramic dish',
    href: '/nuts',
  },
  {
    name: 'Dried Anjeer (Figs)',
    note: 'Sun-cured, zero glaze',
    image: ASSETS.products.dryFruits.anjeer,
    alt: 'Plump sun-cured dried anjeer figs arranged on dark slate',
    href: '/dry-fruits',
  },
  {
    name: 'Garden Mint Makhana',
    note: 'Slow-roasted lotus puffs',
    image: ASSETS.products.makhana.mintMakhana,
    alt: 'Crisp roasted mint makhana fox nuts with whole dried mint leaves',
    href: '/makhana',
  },
] as const;

export function StoryLanding() {
  return (
    <div className="relative w-full text-oat">
      {/* ================================================================
          CHAPTER 01 - NEON NAVY / BLUEBERRIES - HERO
         ================================================================ */}
      <BackgroundChapter
        id="chapter-01"
        chapterNumber="01"
        chapterLabel="The Offering"
        desktopSrc={ASSETS.backgrounds.home[0].desktop}
        mobileSrc={ASSETS.backgrounds.home[0].mobile}
        imageAlt={ASSETS.backgrounds.home[0].alt}
        tone={ASSETS.backgrounds.home[0].tone}
        isHero
        enableVanta
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-end">
          {/* Tall Editorial Hero Sheet (left-offset, leaves open blueberry canvas right) */}
          <div className="lg:col-span-6 relative">
            <ChapterDoodleLayer placements={PAGE_CHAPTER_PLACEMENTS.home['chapter-01']} priority />
            <OatSheet tone="medium" delay={0.05} className="relative z-10 p-6 sm:p-8 lg:p-9">
              <div className="flex items-center gap-3.5 mb-5">
                <div className="relative w-11 h-11 rounded-[4px] overflow-hidden border border-white/25 bg-oat shrink-0">
                  <Image
                    src={ASSETS.brand.logoPrimary}
                    alt="Yagya"
                    fill
                    sizes="44px"
                    preload
                    className="object-cover"
                  />
                </div>
                <span translate="no" className="font-display text-xl sm:text-2xl tracking-[0.08em] text-oat font-semibold block leading-none">
                  YAGYA
                </span>
              </div>

              <SplitText
                as="h1"
                trigger="mount"
                text="Pure farm harvests, gathered like an offering."
                accentWord="offering"
                className="font-display text-3xl sm:text-4xl lg:text-[46px] font-medium tracking-tight text-oat mb-4"
              />

              <p className="text-sm sm:text-base text-apricot/95 leading-relaxed max-w-md mb-6">
                Mountain berries and crisp farm seeds sourced straight from partner growers, packed cleanly with zero shortcuts.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <GlowButton href="#chapter-02" variant="cta" magnetic>
                  <span>Begin Reading</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </GlowButton>
              </div>
            </OatSheet>
          </div>

          {/* Asymmetrical Small Overlapping Corner Sheet + Product Peek */}
          <div className="lg:col-span-4 lg:col-start-9 relative space-y-4">
            <OatSheet tone="subtle" delay={0.22} className="p-5">
              <p className="font-annotation text-xl text-oat">
                Small batches from Himalayan valleys &amp; fertile Rabi fields.
              </p>
            </OatSheet>

            <Link
              href={HOME_PEEK_PRODUCTS[0].href}
              className="group block sm:ml-6"
            >
              <SpotlightCard
                spotlightColor="rgba(223, 127, 37, 0.16)"
                className="p-3.5 flex items-center gap-3.5 [@media(hover:hover)]:hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="flex items-center gap-3.5">
                  <div className="relative w-16 h-20 rounded-[4px] overflow-hidden border border-white/25 shrink-0">
                    <Image
                      src={HOME_PEEK_PRODUCTS[0].image}
                      alt={HOME_PEEK_PRODUCTS[0].alt}
                      fill
                      sizes="64px"
                      className="object-cover transition-transform duration-500 [@media(hover:hover)]:group-hover:scale-105"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-base text-oat group-hover:text-peach transition-colors leading-snug">
                      {HOME_PEEK_PRODUCTS[0].name}
                    </p>
                    <p className="text-xs text-apricot/85">{HOME_PEEK_PRODUCTS[0].note}</p>
                  </div>
                </div>
              </SpotlightCard>
            </Link>
          </div>
        </div>
      </BackgroundChapter>

      {/* ================================================================
          CHAPTER 02 - OLIVE GREEN / OLIVES - THE ORIGIN
         ================================================================ */}
      <BackgroundChapter
        id="chapter-02"
        chapterNumber="02"
        chapterLabel="The Origin"
        desktopSrc={ASSETS.backgrounds.home[1].desktop}
        mobileSrc={ASSETS.backgrounds.home[1].mobile}
        imageAlt={ASSETS.backgrounds.home[1].alt}
        tone={ASSETS.backgrounds.home[1].tone}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Wide Lead Sheet (Right-aligned) */}
          <div className="lg:col-span-7 lg:col-start-6 relative">
            <ChapterDoodleLayer placements={PAGE_CHAPTER_PLACEMENTS.home['chapter-02']} />
            <OatSheet tone="medium" delay={0.08} className="relative z-10 p-7 sm:p-10">
              <SplitText
                as="h2"
                trigger="scroll"
                text="Rooted in the clarity of the Diya."
                accentWord="Diya"
                className="font-display text-3xl sm:text-5xl font-medium tracking-tight text-oat mb-6"
              />

              <p className="text-sm sm:text-base text-apricot/95 leading-relaxed max-w-xl">
                In ancient harvest tradition, a yagya is an offering of what is pure and
                unadorned. That quiet discipline guides every harvest we source directly
                from farming households across Madhya Pradesh, Rajasthan, Karnataka,
                Himachal, and Uttarakhand.
              </p>
            </OatSheet>
          </div>

          {/* Tall Overlapping Pillars Sheet (Left-aligned, staggered upward) */}
          <div className="lg:col-span-5 lg:col-start-1 lg:-mt-16 relative z-20">
            <OatSheet tone="warm" delay={0.22} className="p-7 sm:p-8">
              <div className="flex items-center justify-end mb-6">
                <span className="font-annotation text-lg text-apricot/95">
                  Pure from field to table
                </span>
              </div>

              <ul className="divide-y divide-white/15">
                <li className="pb-4">
                  <h3 className="font-ui-label text-[10px] text-peach block mb-1">
                    Grower-Direct Soil
                  </h3>
                  <p className="text-sm text-oat/90 leading-relaxed">
                    Skipping long middleman chains to preserve fresh harvest character and
                    support rural livelihoods.
                  </p>
                </li>
                <li className="py-4">
                  <h3 className="font-ui-label text-[10px] text-peach block mb-1">
                    Strict Hygiene Sorting
                  </h3>
                  <p className="text-sm text-oat/90 leading-relaxed">
                    Every batch is cleaned to keep out dust, stones, and moisture without
                    bleaching or masking flavor.
                  </p>
                </li>
                <li className="pt-4">
                  <h3 className="font-ui-label text-[10px] text-peach block mb-1">
                    Honest Tradition
                  </h3>
                  <p className="text-sm text-oat/90 leading-relaxed">
                    Traditional crops like alsi, kaddu pepitas, chia, and mountain berries, kept
                    whole and authentic.
                  </p>
                </li>
              </ul>
            </OatSheet>
          </div>
        </div>
      </BackgroundChapter>

      {/* ================================================================
          CHAPTER 03 - POTENT PURPLE / PLUMS - THE CRAFT & WHAT'S INSIDE
         ================================================================ */}
      <BackgroundChapter
        id="chapter-03"
        chapterNumber="03"
        chapterLabel="Craft & Inside"
        desktopSrc={ASSETS.backgrounds.home[2].desktop}
        mobileSrc={ASSETS.backgrounds.home[2].mobile}
        imageAlt={ASSETS.backgrounds.home[2].alt}
        tone={ASSETS.backgrounds.home[2].tone}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Tall Craft Narrative Sheet */}
          <div className="lg:col-span-5 relative">
            <OatSheet tone="medium" delay={0.08} className="p-7 sm:p-9">
              <SplitText
                as="h2"
                trigger="scroll"
                text="Gently dried. Naturally dense."
                accentWord="dense"
                className="font-display text-3xl sm:text-[44px] font-medium tracking-tight text-oat mb-5"
              />

              <p className="text-sm sm:text-base text-apricot/95 leading-relaxed mb-6">
                Whole Sea Buckthorn berries keep their nutrient-rich pulp and seed oils
                intact through gentle dehydration. Cool-season Rabi flax and chia retain
                crispness, fiber, and plant Omega oils in barrier-sealed pouches.
              </p>

              <div className="pt-4 border-t border-white/15 flex items-center justify-between gap-4">
                <span className="font-annotation text-xl text-peach">
                  Pulp, seed &amp; crunch intact
                </span>
              </div>
            </OatSheet>
          </div>

          {/* Overlapping Minimal Nutrition Highlights Sheet */}
          <div className="lg:col-span-6 lg:col-start-7 lg:mt-10 relative">
            <ChapterDoodleLayer placements={PAGE_CHAPTER_PLACEMENTS.home['chapter-03']} />
            <SpotlightCard spotlightColor="rgba(246, 239, 226, 0.10)" className="relative z-10 p-7 sm:p-9">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-5 border-b border-white/20">
                <span className="font-ui-label text-[11px] text-oat">
                  Verified Nutrition Highlights
                </span>
                <span className="font-ui-label text-[10px] text-peach">
                  Per 100 g Reference
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:gap-x-8">
                {NUTRITION_HIGHLIGHTS.map((item, idx) => {
                  const slug = item.href.replace('/product/', '');
                  const doodleName = HOME_NUTRITION_DOODLES[slug];
                  const showOn = idx < 2 ? 'all' : idx === 2 ? 'md+' : 'lg+';
                  return (
                    <Link
                      key={item.nutrient}
                      href={item.href}
                      className={`group relative py-5 flex items-start gap-3.5 hover:bg-oat/[0.06] rounded-[4px] transition-colors ${idx < 2 ? 'sm:border-b sm:border-white/15' : ''}`}
                    >
                      <div className="relative w-11 h-11 rounded-[4px] overflow-hidden border border-white/20 shrink-0 mt-0.5">
                        <Image
                          src={item.image}
                          alt={item.source}
                          fill
                          sizes="44px"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-display text-3xl sm:text-4xl font-semibold text-peach block leading-none mb-1.5 tabular-nums">
                            {item.value}
                          </span>
                          {doodleName && (
                            <Doodle
                              name={doodleName}
                              tone="apricot"
                              size={34}
                              opacity={0.78}
                              showOn={showOn}
                              inline
                              className="shrink-0"
                            />
                          )}
                        </div>
                        <h3 className="text-sm font-semibold text-oat group-hover:text-peach transition-colors mb-1">
                          {item.nutrient}
                        </h3>
                        <p className="text-xs text-apricot/90">{item.source}</p>
                        <p className="text-[11px] text-oat/80 mt-1">{item.note}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </SpotlightCard>
          </div>
        </div>
      </BackgroundChapter>

      {/* ================================================================
          CHAPTER 04 - AUBERGINE GLEAM / BLACKBERRIES - THE PROMISE + CTA
         ================================================================ */}
      <BackgroundChapter
        id="chapter-04"
        chapterNumber="04"
        chapterLabel="The Promise"
        desktopSrc={ASSETS.backgrounds.home[3].desktop}
        mobileSrc={ASSETS.backgrounds.home[3].mobile}
        imageAlt={ASSETS.backgrounds.home[3].alt}
        tone={ASSETS.backgrounds.home[3].tone}
        isLast
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Primary Promise & CTA Sheet */}
          <div className="lg:col-span-6 relative">
            <ChapterDoodleLayer placements={PAGE_CHAPTER_PLACEMENTS.home['chapter-04']} />
            <OatSheet tone="medium" delay={0.08} className="relative z-10 p-7 sm:p-10">
              <SplitText
                as="h2"
                trigger="scroll"
                text="Honest food that asks for nothing extra."
                accentWord="nothing"
                className="font-display text-3xl sm:text-5xl font-medium tracking-tight text-oat mb-5"
              />

              <p className="text-sm sm:text-base text-apricot/95 leading-relaxed max-w-lg mb-8">
                Steep whole sea buckthorn berries in warm water, fold crisp alsi into
                morning dough, or sprinkle pumpkin kernels over bowls for unhurried daily
                nourishment rooted in living soil.
              </p>

              <div className="relative flex flex-wrap items-center gap-4">
                <GlowButton href="/shop" variant="cta" magnetic>
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </GlowButton>

                <GlowButton href="/about" variant="secondary">
                  Our Philosophy
                </GlowButton>
              </div>
            </OatSheet>
          </div>

          {/* Overlapping Testimonial Sheet + Harvest Peek Cards */}
          <div className="lg:col-span-5 lg:col-start-8 lg:mt-14 relative space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {HOME_PEEK_PRODUCTS.slice(1).map((peek) => (
                <Link key={peek.name} href={peek.href} className="group block">
                  <SpotlightCard
                    spotlightColor="rgba(223, 127, 37, 0.14)"
                    className="p-3 [@media(hover:hover)]:hover:-translate-y-1 transition-transform duration-300"
                  >
                    <div className="relative aspect-[4/5] w-full rounded-[4px] overflow-hidden border border-white/20 mb-2.5">
                      <Image
                        src={peek.image}
                        alt={peek.alt}
                        fill
                        sizes="180px"
                        className="object-cover transition-transform duration-500 [@media(hover:hover)]:group-hover:scale-105"
                      />
                    </div>
                    <p className="font-display text-sm text-oat group-hover:text-peach transition-colors leading-snug">
                      {peek.name}
                    </p>
                    <p className="text-[11px] text-apricot/85">{peek.note}</p>
                  </SpotlightCard>
                </Link>
              ))}
            </div>
            <OatSheet as="blockquote" tone="warm" delay={0.22} className="p-7 sm:p-8">
              <p className="font-display text-xl sm:text-2xl italic leading-snug text-oat mb-5">
                &ldquo;Finding whole dried sea buckthorn without added sugar or syrup was
                rare until Yagya. Clean, vibrant mountain tartness.&rdquo;
              </p>

              <footer className="pt-4 border-t border-white/15 flex items-center justify-between gap-3">
                <div>
                  <cite className="not-italic text-xs font-semibold text-oat block">
                    Arundhati Roy
                  </cite>
                  <span className="text-[11px] text-apricot/85">
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
        <DoodleDivider variant="leaf" tone="peach" className="mt-12" />
      </BackgroundChapter>
    </div>
  );
}
