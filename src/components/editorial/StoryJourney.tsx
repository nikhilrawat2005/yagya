'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Sparkles, Sprout, ShieldCheck, PackageCheck, Coffee } from 'lucide-react';
import { siteConfig } from '@/config/site';
import type { Product } from '@/data/products';
import type { Category } from '@/lib/data/categories';
import { PageBackgroundSet } from '@/components/editorial/PageBackgroundSet';
import { ChapterIndex, type ChapterDefinition } from '@/components/editorial/ChapterIndex';
import { OatSheet } from '@/components/editorial/OatSheet';
import { GlowButton } from '@/components/ui/GlowButton';
import { ProductImageWithFallback } from '@/components/ui/ProductImageWithFallback';
import { SplitText } from '@/components/react-bits/SplitText';
import { SpotlightCard } from '@/components/react-bits/SpotlightCard';
import { Doodle } from '@/components/doodles';

interface StoryJourneyProps {
  products: Product[];
  categories: Category[];
}

const STORY_CHAPTERS: ReadonlyArray<ChapterDefinition> = [
  { id: 'story-01', number: '01', label: 'The Spark' },
  { id: 'story-02', number: '02', label: 'Journey Map' },
  { id: 'story-03', number: '03', label: 'Pantry Explorer' },
  { id: 'story-04', number: '04', label: 'Daily Ritual' },
];

const JOURNEY_STEPS = [
  { id: 'step-soil', num: '01', title: 'Sourcing', sub: 'Partner farming communities', icon: Sprout },
  { id: 'step-sort', num: '02', title: 'Clean Sort', sub: 'Hygienic batch cleaning', icon: ShieldCheck },
  { id: 'step-seal', num: '03', title: 'Small-Batch Pack', sub: 'Resealable barrier pouches', icon: PackageCheck },
  { id: 'step-bowl', num: '04', title: 'Morning Bowl', sub: 'Your daily offering', icon: Coffee },
] as const;

const CATEGORY_LINKS: Record<string, string> = {
  'seeds-and-grains': '/seeds',
  berries: '/berries',
  'dried-fruits': '/dry-fruits',
  nuts: '/nuts',
  'flavoured-makhana': '/makhana',
  mixture: '/shop?category=mixture',
};

export function StoryJourney({ products, categories }: StoryJourneyProps) {
  const activeProducts = useMemo(() => products.filter((p) => !p.comingSoon), [products]);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>(
    categories[0]?.slug ?? 'seeds-and-grains'
  );

  const activeCategory = useMemo(
    () => categories.find((c) => c.slug === selectedCategorySlug) ?? categories[0],
    [categories, selectedCategorySlug]
  );

  const activeCategoryProducts = useMemo(
    () => products.filter((p) => p.categorySlug === activeCategory?.slug).slice(0, 3),
    [products, activeCategory]
  );

  const seaBuckthorn = useMemo(
    () => activeProducts.find((p) => p.slug === 'dried-sea-buckthorn-berries') ?? activeProducts[0],
    [activeProducts]
  );
  const flaxSeeds = useMemo(
    () => activeProducts.find((p) => p.slug === 'flax-seeds') ?? activeProducts[1],
    [activeProducts]
  );
  const makhana = useMemo(
    () => activeProducts.find((p) => p.slug === 'mint-makhana') ?? activeProducts[2],
    [activeProducts]
  );

  const showPrices = siteConfig.featureFlags.showPrices;

  return (
    <div className="relative w-full text-oat">
      <ChapterIndex chapters={STORY_CHAPTERS} />

      <PageBackgroundSet
        page="signature"
        chapters={[
          {
            id: 'story-01',
            chapterNumber: '01',
            chapterLabel: 'The Spark',
            compact: true,
            content: (
              <div className="space-y-6 pt-2">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-7 relative">
                    <OatSheet tone="medium" delay={0.04} className="p-6 sm:p-9 relative overflow-visible">
                      <span className="font-ui-label text-[10px] text-peach block mb-2">
                        Why {siteConfig.brandName} Exists
                      </span>
                      <SplitText
                        as="h1"
                        trigger="mount"
                        text="Honest ingredients, gathered for everyday kitchens."
                        accentWord="everyday"
                        accentStyle="circle"
                        accentTone="flame"
                        className="font-display text-4xl sm:text-5xl lg:text-[54px] text-oat font-medium leading-[1.06] mb-4"
                      />
                      <p className="text-sm sm:text-base text-sand leading-relaxed max-w-2xl mb-6">
                        {siteConfig.description}
                      </p>

                      {/* 4-Node Visual Journey Strip inside Hero */}
                      <div className="pt-4 border-t border-white/15">
                        <span className="font-annotation text-lg text-peach block mb-3">
                          From partner fields to your kitchen pantry:
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                          {JOURNEY_STEPS.map((st, idx) => {
                            const Icon = st.icon;
                            return (
                              <a
                                key={st.id}
                                href="#story-02"
                                className="group relative rounded-[6px] border border-white/20 bg-oat/[0.08] hover:bg-oat/[0.15] hover:border-peach/50 p-3 transition-colors"
                              >
                                <div className="flex items-center justify-between mb-1.5">
                                  <span className="font-ui-label text-[9px] text-peach tabular-nums">{st.num}</span>
                                  <Icon className="w-3.5 h-3.5 text-peach" aria-hidden="true" />
                                </div>
                                <p className="font-display text-base text-oat leading-tight">{st.title}</p>
                                <p className="text-[11px] text-sand/90 mt-0.5">{st.sub}</p>
                                {idx < JOURNEY_STEPS.length - 1 && (
                                  <Doodle
                                    name="arrow-short-nudge"
                                    preset="connector"
                                    tone="peach"
                                    size={22}
                                    showOn="lg+"
                                    className="absolute -right-4 top-1/2 -translate-y-1/2 z-20"
                                  />
                                )}
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    </OatSheet>
                  </div>

                  {/* Visual Collage Card */}
                  <div className="lg:col-span-5 relative">
                    <OatSheet tone="subtle" delay={0.14} className="p-5 sm:p-6">
                      <div className="grid grid-cols-3 gap-2.5 mb-4">
                        {[seaBuckthorn, flaxSeeds, makhana].filter(Boolean).map((item) => (
                          <Link
                            key={item.id}
                            href={`/product/${item.slug}`}
                            className="group block"
                          >
                            <div className="relative aspect-[4/5] rounded-[4px] overflow-hidden border border-white/20 bg-[#1C2638]">
                              <ProductImageWithFallback
                                src={item.images[0]?.src || ''}
                                alt={item.name}
                                fill
                                sizes="(max-width: 640px) 28vw, 150px"
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="flex items-center justify-between gap-3 pt-2 border-t border-white/15">
                        <div>
                          <p className="font-display text-lg italic text-oat">
                            &ldquo;{siteConfig.tagline}&rdquo;
                          </p>
                          <span className="font-annotation text-base text-peach">
                            Small-batch pantry staples
                          </span>
                        </div>
                        <Doodle
                          name="arrow-curved-pointer"
                          preset="connector"
                          tone="oat"
                          size={44}
                          rotate={90}
                          inline
                          className="shrink-0"
                        />
                      </div>
                    </OatSheet>
                  </div>
                </div>
              </div>
            ),
          },
          {
            id: 'story-02',
            chapterNumber: '02',
            chapterLabel: 'Journey Map',
            compact: true,
            content: (
              <div className="space-y-6 relative">
                <div className="max-w-2xl">
                  <span className="font-ui-label text-[10px] text-peach block mb-1">
                    Field-to-Pantry Approach
                  </span>
                  <SplitText
                    as="h2"
                    trigger="scroll"
                    text="How a small-batch harvest reaches your kitchen."
                    className="font-display text-3xl sm:text-4xl text-oat font-medium"
                  />
                </div>

                <div className="relative space-y-5">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                    <OatSheet tone="medium" delay={0.05} className="lg:col-span-5 p-5 sm:p-6">
                      <div className="flex items-start gap-4">
                        <div className="relative w-20 h-24 rounded-[4px] overflow-hidden border border-white/25 shrink-0 bg-[#1C2638]">
                          <ProductImageWithFallback
                            src={seaBuckthorn?.images[0]?.src || ''}
                            alt={seaBuckthorn?.name || 'Harvest'}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <span className="font-ui-label text-[10px] text-peach block mb-1">
                            Stage 01 · Partner Sourcing
                          </span>
                          <h3 className="font-display text-2xl text-oat mb-1.5">
                            Direct From Partner Growers
                          </h3>
                          <p className="text-xs sm:text-sm text-sand leading-relaxed">
                            Our documented seeds and berries are sourced from partner farming
                            communities across key Indian growing regions.
                          </p>
                        </div>
                      </div>
                    </OatSheet>

                    <div className="hidden lg:flex lg:col-span-2 justify-center">
                      <Doodle
                        name="arrow-loop-delight"
                        preset="connector"
                        tone="peach"
                        size={110}
                        inline
                      />
                    </div>

                    <OatSheet tone="warm" delay={0.12} className="lg:col-span-5 p-5 sm:p-6">
                      <div className="flex items-start gap-4">
                        <div className="relative w-20 h-24 rounded-[4px] overflow-hidden border border-white/25 shrink-0 bg-[#1C2638]">
                          <ProductImageWithFallback
                            src={flaxSeeds?.images[0]?.src || ''}
                            alt={flaxSeeds?.name || 'Sorted Seeds'}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <span className="font-ui-label text-[10px] text-peach block mb-1">
                            Stage 02 · Hygienic Sorting
                          </span>
                          <h3 className="font-display text-2xl text-oat mb-1.5">
                            Cleaned &amp; Sorted Batches
                          </h3>
                          <p className="text-xs sm:text-sm text-sand leading-relaxed">
                            Seeds and berries are cleaned to remove dust and chaff and packed under
                            hygienic standards for everyday pantry use.
                          </p>
                        </div>
                      </div>
                    </OatSheet>
                  </div>

                  <div className="flex justify-center py-1">
                    <Doodle
                      name="arrow-curved-pointer"
                      preset="connector"
                      tone="oat"
                      size={52}
                      rotate={115}
                      inline
                    />
                  </div>

                  {/* Honest Stage 03 */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                    <OatSheet tone="subtle" delay={0.08} className="lg:col-span-6 p-5 sm:p-6 border-sage/30">
                      <span className="font-ui-label text-[10px] text-sage block mb-2">
                        Stage 03A · Transparent Product Information
                      </span>
                      <ul className="space-y-2.5 text-xs sm:text-sm text-oat">
                        <li className="flex items-center gap-2.5">
                          <Check className="w-4 h-4 text-sage shrink-0" aria-hidden="true" />
                          <span>Indicative nutritional tables per 100 g &amp; per serve on documented items</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                          <Check className="w-4 h-4 text-sage shrink-0" aria-hidden="true" />
                          <span>Resealable packaging guidance to help keep moisture out</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                          <Check className="w-4 h-4 text-sage shrink-0" aria-hidden="true" />
                          <span>Explicit ingredient and allergen notes where confirmed</span>
                        </li>
                      </ul>
                    </OatSheet>

                    <OatSheet tone="warm" delay={0.14} className="lg:col-span-6 p-5 sm:p-6">
                      <span className="font-ui-label text-[10px] text-peach block mb-2">
                        Stage 03B · Label Clarity
                      </span>
                      <ul className="space-y-2.5 text-xs sm:text-sm text-sand">
                        <li className="flex items-center gap-2.5">
                          <Check className="w-4 h-4 text-peach shrink-0" aria-hidden="true" />
                          <span>Zero added sugar highlighted strictly on unsweetened seeds and sea buckthorn</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                          <Check className="w-4 h-4 text-peach shrink-0" aria-hidden="true" />
                          <span>Sweetened berries (Blueberries &amp; Cranberries) declare cane sugar and sunflower oil clearly</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                          <Check className="w-4 h-4 text-peach shrink-0" aria-hidden="true" />
                          <span>{siteConfig.disclaimers.nutritionIndicative}</span>
                        </li>
                      </ul>
                    </OatSheet>
                  </div>
                </div>
              </div>
            ),
          },
          {
            id: 'story-03',
            chapterNumber: '03',
            chapterLabel: 'Pantry Explorer',
            compact: true,
            content: (
              <div className="space-y-6 relative">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <span className="font-ui-label text-[10px] text-peach block mb-1">
                      Interactive Category Explorer
                    </span>
                    <SplitText
                      as="h2"
                      trigger="scroll"
                      text="Explore our pantry categories."
                      className="font-display text-3xl sm:text-4xl text-oat font-medium"
                    />
                  </div>
                  <span className="font-annotation text-xl text-peach">
                    Select a category below
                  </span>
                </div>

                {/* Category Selector Tabs */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => {
                    const isSelected = cat.slug === activeCategory?.slug;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategorySlug(cat.slug)}
                        aria-pressed={isSelected}
                        className={`px-4 py-2 rounded-[4px] border font-ui-label text-[11px] transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-flame text-navy border-flame font-semibold'
                            : 'bg-[#141C2B]/75 text-oat border-white/25 hover:border-peach/60'
                        }`}
                      >
                        {cat.name}
                      </button>
                    );
                  })}
                </div>

                {activeCategory && (
                  <OatSheet tone="medium" interactive={false} className="p-5 sm:p-7">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                      <div className="lg:col-span-5 space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="relative w-20 h-24 rounded-[6px] overflow-hidden border border-white/25 shrink-0 bg-[#1C2638]">
                            <ProductImageWithFallback
                              src={activeCategory.image}
                              alt={activeCategory.name}
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            {activeCategory.originNote && (
                              <span className="font-ui-label text-[10px] text-peach block mb-1">
                                {activeCategory.originNote}
                              </span>
                            )}
                            <h3 className="font-display text-2xl sm:text-3xl text-oat">
                              {activeCategory.name}
                            </h3>
                          </div>
                        </div>
                        <p className="text-sm text-sand leading-relaxed">
                          {activeCategory.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 pt-1">
                          <GlowButton
                            href={CATEGORY_LINKS[activeCategory.slug] || `/shop?category=${activeCategory.slug}`}
                            variant="cta"
                            size="sm"
                          >
                            <span>Explore {activeCategory.name}</span>
                            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </GlowButton>
                          <Doodle
                            name="arrow-short-nudge"
                            preset="connector"
                            tone="peach"
                            size={28}
                            showOn="sm+"
                            inline
                          />
                        </div>
                      </div>

                      <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                        {activeCategoryProducts.map((prod) => (
                          <Link
                            key={prod.id}
                            href={`/product/${prod.slug}`}
                            className="group block"
                          >
                            <SpotlightCard
                              spotlightColor="rgba(223, 127, 37, 0.14)"
                              className="p-3 bg-[#141C2B]/80 h-full"
                            >
                              <div className="relative aspect-[4/5] rounded-[4px] overflow-hidden border border-white/15 mb-2.5 bg-[#1C2638]">
                                <ProductImageWithFallback
                                  src={prod.images[0]?.src || ''}
                                  alt={prod.name}
                                  fill
                                  sizes="(max-width: 640px) 80vw, 180px"
                                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                              </div>
                              <p className="font-display text-base text-oat group-hover:text-peach transition-colors line-clamp-1">
                                {prod.name}
                              </p>
                              <div className="flex items-center justify-between text-[11px] text-sand mt-1 tabular-nums">
                                <span>{prod.variants[0]?.weight}</span>
                                <span className="font-semibold text-peach">
                                  {prod.comingSoon
                                    ? 'Coming Soon'
                                    : showPrices && prod.variants[0]?.priceInr !== null
                                    ? `${siteConfig.currencySymbol}${prod.variants[0].priceInr}`
                                    : 'View'}
                                </span>
                              </div>
                            </SpotlightCard>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </OatSheet>
                )}
              </div>
            ),
          },
          {
            id: 'story-04',
            chapterNumber: '04',
            chapterLabel: 'Daily Ritual',
            compact: true,
            content: (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7 relative">
                  <OatSheet tone="medium" delay={0.08} className="p-6 sm:p-9 space-y-5">
                    <div className="flex items-center gap-2 text-peach">
                      <Sparkles className="w-4 h-4" aria-hidden="true" />
                      <span className="font-ui-label text-[10px]">
                        Stage 04 · Everyday Pantry
                      </span>
                    </div>
                    <SplitText
                      as="h2"
                      trigger="scroll"
                      text="Honest everyday staples for bowls, baking, and snacking."
                      className="font-display text-3xl sm:text-5xl text-oat font-medium"
                    />
                    <p className="text-sm sm:text-base text-sand leading-relaxed max-w-xl">
                      Explore seeds, berries, dried fruits, whole nuts, and seasoned makhana packed
                      for daily kitchen routines.
                    </p>
                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <Doodle
                        name="arrow-curved-pointer"
                        preset="connector"
                        tone="oat"
                        size={44}
                        rotate={-6}
                        showOn="md+"
                        inline
                      />
                      <GlowButton href="/shop" variant="cta" magnetic>
                        <span>Shop All {activeProducts.length} Products</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </GlowButton>
                      <GlowButton href="/contact" variant="secondary">
                        Write to Us
                      </GlowButton>
                    </div>
                  </OatSheet>
                </div>

                <div className="lg:col-span-5 space-y-3">
                  {[seaBuckthorn, flaxSeeds, makhana]
                    .filter((item) => Boolean(item && item.howToUse?.[0]))
                    .map((item, idx) => (
                      <OatSheet key={item.id} tone="subtle" delay={0.1 + idx * 0.05} className="p-4">
                        <Link href={`/product/${item.slug}`} className="flex items-start gap-3.5 group">
                          <div className="relative w-12 h-14 rounded-[4px] overflow-hidden border border-white/20 shrink-0 bg-[#1C2638]">
                            <ProductImageWithFallback
                              src={item.images[0]?.src || ''}
                              alt={item.name}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <span className="font-ui-label text-[9px] text-peach block mb-0.5">
                              {item.name}
                            </span>
                            <p className="text-xs text-sand leading-relaxed line-clamp-2 group-hover:text-oat transition-colors">
                              {item.howToUse?.[0]}
                            </p>
                          </div>
                        </Link>
                      </OatSheet>
                    ))}
                </div>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
