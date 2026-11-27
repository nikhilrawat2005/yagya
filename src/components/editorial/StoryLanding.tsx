'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Sprout, Truck, Award, Star, CheckCircle2 } from 'lucide-react';
import { BackgroundChapter } from '@/components/editorial/BackgroundChapter';
import { ChapterIndex, type ChapterDefinition } from '@/components/editorial/ChapterIndex';
import { OatSheet } from '@/components/editorial/OatSheet';
import { GlowButton } from '@/components/ui/GlowButton';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductImageWithFallback } from '@/components/ui/ProductImageWithFallback';
import { SplitText } from '@/components/react-bits/SplitText';
import { SpotlightCard } from '@/components/react-bits/SpotlightCard';
import { ASSETS } from '@/lib/assets';
import { siteConfig } from '@/lib/data/site';
import type { Product } from '@/lib/data/products';
import type { Category } from '@/lib/data/categories';
import type { Review } from '@/lib/data/reviews';
import { Doodle } from '@/components/doodles';

interface StoryLandingProps {
  products: Product[];
  categories: Category[];
  reviews: Review[];
}

const HOME_CHAPTERS: ReadonlyArray<ChapterDefinition> = [
  { id: 'chapter-01', number: '01', label: 'The Offering' },
  { id: 'chapter-02', number: '02', label: 'Origin & Pantry' },
  { id: 'chapter-03', number: '03', label: 'Craft & Inside' },
  { id: 'chapter-04', number: '04', label: 'Trust & Promise' },
];

const CATEGORY_ROUTE_MAP: Record<string, string> = {
  'seeds-and-grains': '/seeds',
  berries: '/berries',
  'dried-fruits': '/dry-fruits',
  nuts: '/nuts',
  'flavoured-makhana': '/makhana',
};

function findNutrientRow(product: Product, nutrientPrefix: string) {
  return product.nutritionFacts.find((row) =>
    row.nutrient.toLowerCase().startsWith(nutrientPrefix.toLowerCase())
  );
}

export function StoryLanding({ products, categories, reviews }: StoryLandingProps) {
  const heroSpotlight = useMemo(
    () => products.find((p) => p.slug === 'pine-nuts') ?? products[0],
    [products]
  );

  const bestsellerProducts = useMemo(() => {
    const picked = products.filter((p) => p.isBestseller || p.isFeatured);
    return picked.slice(0, 4);
  }, [products]);

  const harvestPeeks = useMemo(() => {
    const slugs = ['dried-anjeer-figs', 'mint-makhana'];
    return slugs
      .map((slug) => products.find((p) => p.slug === slug))
      .filter((p): p is Product => Boolean(p));
  }, [products]);

  const nutritionHighlights = useMemo(() => {
    const specs: Array<{ slug: string; nutrientMatch: string; label: string }> = [
      { slug: 'dried-sea-buckthorn-berries', nutrientMatch: 'Vitamin C', label: 'Vitamin C' },
      { slug: 'chia-seeds', nutrientMatch: 'Dietary Fiber', label: 'Dietary Fiber' },
      { slug: 'pumpkin-seeds', nutrientMatch: 'Protein', label: 'Plant Protein' },
      { slug: 'flax-seeds', nutrientMatch: 'Omega-3', label: 'Omega-3 ALA' },
    ];

    return specs
      .map((spec) => {
        const prod = products.find((p) => p.slug === spec.slug);
        if (!prod) return null;
        const row = findNutrientRow(prod, spec.nutrientMatch);
        return {
          product: prod,
          value: row?.per100g ?? '',
          nutrient: spec.label,
          note: `${prod.servingSize} serve · ${prod.badges[0] ?? prod.origin}`,
        };
      })
      .filter((item): item is NonNullable<typeof item> => Boolean(item && item.value));
  }, [products]);

  const featuredReview = reviews[2] ?? reviews[0];
  const secondaryReviews = reviews.slice(0, 2);

  return (
    <div className="relative w-full text-oat">
      <ChapterIndex chapters={HOME_CHAPTERS} />

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-end pt-1">
          {/* Primary Editorial Hero Sheet */}
          <div className="lg:col-span-7 relative">
            <OatSheet tone="medium" delay={0.04} className="relative z-10 p-6 sm:p-9 lg:p-10">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-[4px] overflow-hidden border border-white/25 bg-oat shrink-0">
                    <ProductImageWithFallback
                      src={ASSETS.brand.logoPrimary}
                      alt={siteConfig.name}
                      fill
                      sizes="40px"
                      preload
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span translate="no" className="font-display text-xl sm:text-2xl tracking-[0.08em] text-oat font-semibold block leading-none">
                      {siteConfig.name.toUpperCase()}
                    </span>
                    <span className="font-ui-label text-[9px] text-peach block mt-1">
                      Small-Batch Artisan Pantry
                    </span>
                  </div>
                </div>

                <span className="font-ui-label text-[10px] px-2.5 py-1 rounded-[4px] bg-[#252905]/85 text-sage border border-sage/35">
                  Free Dispatch {siteConfig.currencySymbol}{siteConfig.freeShippingThreshold}+
                </span>
              </div>

              <SplitText
                as="h1"
                trigger="mount"
                text="Pure farm harvests, gathered like an offering."
                accentWord="offering"
                accentStyle="circle"
                accentTone="flame"
                className="font-display text-4xl sm:text-5xl lg:text-[54px] font-medium tracking-tight text-oat mb-4 leading-[1.06]"
              />

              <p className="text-sm sm:text-base text-sand leading-relaxed max-w-xl mb-6">
                {siteConfig.description}
              </p>

              {/* Direct High-Converting Dual CTA */}
              <div className="flex flex-wrap items-center gap-3.5 mb-7">
                <GlowButton href="/shop" variant="cta" magnetic className="min-h-[46px] px-7">
                  <span>Shop Harvests</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </GlowButton>
                <GlowButton href="#chapter-02" variant="secondary" className="min-h-[46px]">
                  <span>Explore Bestsellers</span>
                </GlowButton>
              </div>

              {/* Hero Trust Bar */}
              <div className="pt-5 border-t border-white/15 grid grid-cols-3 gap-3 text-[11px] text-sand">
                <div className="flex items-center gap-2">
                  <Sprout className="w-4 h-4 text-peach shrink-0" aria-hidden="true" />
                  <span>Grower Direct</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-peach shrink-0" aria-hidden="true" />
                  <span>Zero Fillers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-peach shrink-0" aria-hidden="true" />
                  <span>Sealed Fresh</span>
                </div>
              </div>
            </OatSheet>
          </div>

          {/* Right Column: Handwritten Note + Dynamic Flagship Harvest Card */}
          <div className="lg:col-span-5 relative space-y-4">
            <OatSheet tone="subtle" delay={0.14} className="p-4 sm:p-5">
              <p className="font-annotation text-xl text-oat">
                {siteConfig.tagline}
              </p>
            </OatSheet>

            {heroSpotlight && (
              <Link
                href={`/product/${heroSpotlight.slug}`}
                className="group block sm:ml-4"
              >
                <SpotlightCard
                  spotlightColor="rgba(223, 127, 37, 0.16)"
                  className="p-4 bg-[#141C2B]/82 md:bg-[#141C2B]/70 [@media(hover:hover)]:hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="relative w-16 h-20 rounded-[4px] overflow-hidden border border-white/25 shrink-0 bg-[#1C2638]">
                        <ProductImageWithFallback
                          src={heroSpotlight.images[0]?.src || ''}
                          alt={heroSpotlight.images[0]?.alt || heroSpotlight.name}
                          fill
                          sizes="64px"
                          preload
                          className="object-cover transition-transform duration-500 [@media(hover:hover)]:group-hover:scale-105"
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="font-ui-label text-[9px] text-peach block mb-0.5">
                          {heroSpotlight.origin}
                        </span>
                        <p className="font-display text-lg text-oat group-hover:text-peach transition-colors leading-snug truncate">
                          {heroSpotlight.name}
                        </p>
                        <p className="text-xs text-sand line-clamp-1 mt-0.5">
                          {heroSpotlight.provenance}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0 tabular-nums">
                      <span className="font-display text-xl font-semibold text-peach block">
                        {siteConfig.currencySymbol}{heroSpotlight.variants[0]?.price}
                      </span>
                      <span className="font-ui-label text-[9px] text-oat/90 inline-flex items-center gap-1 mt-1">
                        View <ArrowRight className="w-3 h-3" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </SpotlightCard>
              </Link>
            )}
          </div>
        </div>
      </BackgroundChapter>

      {/* ================================================================
          CHAPTER 02 - OLIVE GREEN / OLIVES - ORIGIN & BESTSELLERS
         ================================================================ */}
      <BackgroundChapter
        id="chapter-02"
        chapterNumber="02"
        chapterLabel="Origin & Pantry"
        desktopSrc={ASSETS.backgrounds.home[1].desktop}
        mobileSrc={ASSETS.backgrounds.home[1].mobile}
        imageAlt={ASSETS.backgrounds.home[1].alt}
        tone={ASSETS.backgrounds.home[1].tone}
      >
        <div className="space-y-8">
          {/* Origin + Category Discovery Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 relative">
              <OatSheet tone="medium" delay={0.06} className="p-6 sm:p-8">
                <span className="font-ui-label text-[10px] text-peach block mb-2">
                  The Pantry · {products.length} Small-Batch Harvests
                </span>
                <SplitText
                  as="h2"
                  trigger="scroll"
                  text="Rooted in the clarity of living soil."
                  className="font-display text-3xl sm:text-4xl lg:text-[42px] font-medium tracking-tight text-oat mb-4"
                />
                <p className="text-sm sm:text-base text-sand leading-relaxed mb-6 max-w-2xl">
                  Every harvest is sourced directly from partner growers across Madhya Pradesh,
                  Rajasthan, Karnataka, Himachal, and Uttarakhand—sorted cleanly without bleaching,
                  syrups, or middleman warehousing.
                </p>

                {/* Category Quick Pills */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={CATEGORY_ROUTE_MAP[cat.slug] || `/shop?category=${cat.slug}`}
                      className="font-ui-label text-[10px] px-3.5 py-2 rounded-[4px] border border-white/25 bg-oat/10 text-oat hover:bg-flame hover:text-navy hover:border-flame transition-colors min-h-[36px] inline-flex items-center"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </OatSheet>
            </div>

            <div className="lg:col-span-5 relative">
              <OatSheet tone="warm" delay={0.14} className="p-6 sm:p-7">
                <ul className="divide-y divide-white/15">
                  <li className="pb-3.5">
                    <h3 className="font-ui-label text-[10px] text-peach mb-1">
                      Grower-Direct Sourcing
                    </h3>
                    <p className="text-xs sm:text-sm text-sand leading-relaxed">
                      Short supply chains preserve fresh harvest oils and pay farming families fairly.
                    </p>
                  </li>
                  <li className="py-3.5">
                    <h3 className="font-ui-label text-[10px] text-peach mb-1">
                      Strict Hygiene Sorting
                    </h3>
                    <p className="text-xs sm:text-sm text-sand leading-relaxed">
                      Multi-stage cleaning removes dust and chaff with zero chemical whitening.
                    </p>
                  </li>
                  <li className="pt-3.5">
                    <h3 className="font-ui-label text-[10px] text-peach mb-1">
                      Barrier-Sealed Freshness
                    </h3>
                    <p className="text-xs sm:text-sm text-sand leading-relaxed">
                      Packed in small batches so crunch, natural fats, and aroma stay intact.
                    </p>
                  </li>
                </ul>
              </OatSheet>
            </div>
          </div>

          {/* Shoppable Bestsellers Grid */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <span className="font-ui-label text-[10px] text-peach block mb-1">
                  Most Loved Daily Rituals
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-medium text-oat">
                  Signature Bestsellers
                </h2>
              </div>
              <GlowButton href="/shop" variant="secondary" size="sm">
                <span>View All {products.length} Harvests</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </GlowButton>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
              {bestsellerProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </BackgroundChapter>

      {/* ================================================================
          CHAPTER 03 - POTENT PURPLE / PLUMS - CRAFT & NUTRITION
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative">
          {/* Craft Narrative Sheet */}
          <div className="lg:col-span-5 relative">
            <OatSheet tone="medium" delay={0.06} className="relative z-10 p-6 sm:p-8">
              <div className="grid grid-cols-2 gap-3 mb-6">
                {nutritionHighlights.slice(0, 2).map((item) => (
                  <Link
                    key={item.product.id}
                    href={`/product/${item.product.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-[4/3] w-full rounded-[4px] overflow-hidden border border-white/25 bg-[#1C2638]">
                      <ProductImageWithFallback
                        src={item.product.images[0]?.src || ''}
                        alt={item.product.images[0]?.alt || item.product.name}
                        fill
                        sizes="(max-width: 640px) 42vw, 210px"
                        className="object-cover transition-transform duration-500 [@media(hover:hover)]:group-hover:scale-105"
                      />
                    </div>
                  </Link>
                ))}
              </div>

              <SplitText
                as="h2"
                trigger="scroll"
                text="Gently dried. Naturally dense."
                className="font-display text-3xl sm:text-[40px] font-medium tracking-tight text-oat mb-4"
              />

              <p className="text-sm sm:text-base text-sand leading-relaxed mb-5">
                Low-temperature dehydration and gentle cleaning keep natural plant Omegas,
                polyphenols, and crisp seed oils intact inside every barrier-sealed pack.
              </p>

              <div className="pt-4 border-t border-white/15 flex items-center justify-between gap-3">
                <span className="font-annotation text-xl text-peach">
                  Pulp, seed &amp; crunch intact
                </span>
                <Link
                  href="/journal"
                  className="font-ui-label text-[10px] text-oat hover:text-peach inline-flex items-center gap-1"
                >
                  Read Journal <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </Link>
              </div>
            </OatSheet>
          </div>

          {/* Dynamic Lab-Verified Nutrition Highlights Sheet */}
          <div className="lg:col-span-7 relative">
            <SpotlightCard
              spotlightColor="rgba(246, 239, 226, 0.10)"
              className="relative z-10 p-6 sm:p-8 bg-[#141C2B]/84 md:bg-[#141C2B]/70"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/20">
                <span className="font-ui-label text-[11px] text-oat">
                  Verified Nutrition Highlights
                </span>
                <span className="font-ui-label text-[10px] text-peach">
                  Per 100 g Reference
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:gap-x-6">
                {nutritionHighlights.map((item, idx) => (
                  <Link
                    key={item.product.id}
                    href={`/product/${item.product.slug}`}
                    className={`group relative py-5 flex items-start gap-3.5 hover:bg-oat/[0.06] rounded-[4px] transition-colors ${
                      idx < 2 ? 'sm:border-b sm:border-white/15' : ''
                    }`}
                  >
                    <div className="relative w-14 h-14 rounded-[4px] overflow-hidden border border-white/20 shrink-0 mt-0.5 bg-[#1C2638]">
                      <ProductImageWithFallback
                        src={item.product.images[0]?.src || ''}
                        alt={item.product.images[0]?.alt || item.product.name}
                        fill
                        sizes="56px"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="font-display text-2xl font-semibold text-peach whitespace-nowrap block leading-none mb-1.5 tabular-nums">
                        {item.value}
                      </span>
                      <h3 className="text-sm font-semibold text-oat group-hover:text-peach transition-colors mb-1">
                        {item.nutrient}
                      </h3>
                      <p className="text-xs text-sand">{item.product.name}</p>
                      <p className="text-[11px] text-sand/85 mt-1">{item.note}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </SpotlightCard>
          </div>
        </div>
      </BackgroundChapter>

      {/* ================================================================
          CHAPTER 04 - AUBERGINE GLEAM / BLACKBERRIES - TRUST, REVIEWS & CTA
         ================================================================ */}
      <BackgroundChapter
        id="chapter-04"
        chapterNumber="04"
        chapterLabel="Trust & Promise"
        desktopSrc={ASSETS.backgrounds.home[3].desktop}
        mobileSrc={ASSETS.backgrounds.home[3].mobile}
        imageAlt={ASSETS.backgrounds.home[3].alt}
        tone={ASSETS.backgrounds.home[3].tone}
        isLast
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Primary Promise, Trust Pillars & CTA Sheet */}
          <div className="lg:col-span-6 relative">
            <OatSheet tone="medium" delay={0.06} className="relative z-10 p-6 sm:p-9">
              <span className="font-ui-label text-[10px] text-peach block mb-2">
                {siteConfig.name} Standard
              </span>
              <SplitText
                as="h2"
                trigger="scroll"
                text="Honest food that asks for nothing extra."
                className="font-display text-3xl sm:text-5xl font-medium tracking-tight text-oat mb-5"
              />

              <p className="text-sm sm:text-base text-sand leading-relaxed max-w-lg mb-6">
                Steep mountain berries in warm water, fold crisp winter alsi into morning dough,
                or open slow-roasted wetland makhana for clean everyday nourishment.
              </p>

              {/* Trust & Provenance Grid */}
              <div className="grid grid-cols-2 gap-3 mb-7 p-4 rounded-[6px] bg-oat/[0.06] border border-white/15">
                <div className="flex items-start gap-2.5">
                  <Award className="w-4 h-4 text-peach shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-semibold text-oat">FSSAI Aligned</p>
                    <p className="text-[11px] text-sand">Hygienic batch packing</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-peach shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-semibold text-oat">Lab Checked</p>
                    <p className="text-[11px] text-sand">Zero artificial colors</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Truck className="w-4 h-4 text-peach shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-semibold text-oat">2–3 Day Dispatch</p>
                    <p className="text-[11px] text-sand">Free over {siteConfig.currencySymbol}{siteConfig.freeShippingThreshold}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-peach shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-semibold text-oat">7-Day Support</p>
                    <p className="text-[11px] text-sand">Freshness guarantee</p>
                  </div>
                </div>
              </div>

              <div className="relative flex flex-wrap items-center gap-3">
                <Doodle
                  name="arrow-curved-pointer"
                  preset="connector"
                  tone="oat"
                  size={48}
                  rotate={-4}
                  opacity={0.9}
                  showOn="md+"
                  inline
                  className="-ml-1 shrink-0"
                />
                <GlowButton href="/shop" variant="cta" magnetic className="min-h-[46px]">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </GlowButton>

                <GlowButton href="/about" variant="secondary" className="min-h-[46px]">
                  Our Philosophy
                </GlowButton>
              </div>
            </OatSheet>
          </div>

          {/* Verified Reviews + Harvest Peeks */}
          <div className="lg:col-span-6 relative space-y-4">
            <div className="grid grid-cols-2 gap-3.5">
              {harvestPeeks.map((peek) => (
                <Link key={peek.id} href={`/product/${peek.slug}`} className="group block">
                  <SpotlightCard
                    spotlightColor="rgba(223, 127, 37, 0.14)"
                    className="p-3 bg-[#141C2B]/80 md:bg-[#141C2B]/68 [@media(hover:hover)]:hover:-translate-y-1 transition-transform duration-300"
                  >
                    <div className="relative aspect-[4/5] w-full rounded-[4px] overflow-hidden border border-white/20 mb-2.5 bg-[#1C2638]">
                      <ProductImageWithFallback
                        src={peek.images[0]?.src || ''}
                        alt={peek.images[0]?.alt || peek.name}
                        fill
                        sizes="(max-width: 640px) 44vw, 220px"
                        className="object-cover transition-transform duration-500 [@media(hover:hover)]:group-hover:scale-105"
                      />
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-display text-base text-oat group-hover:text-peach transition-colors leading-snug truncate">
                        {peek.name}
                      </p>
                      <span className="text-xs font-semibold text-peach tabular-nums shrink-0">
                        {siteConfig.currencySymbol}{peek.variants[0]?.price}
                      </span>
                    </div>
                    <p className="text-[11px] text-sand truncate">{peek.origin}</p>
                  </SpotlightCard>
                </Link>
              ))}
            </div>

            {featuredReview && (
              <OatSheet as="blockquote" tone="warm" delay={0.14} className="p-6 sm:p-7">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-0.5 text-flame" aria-label={`Rated ${featuredReview.rating} out of 5`}>
                    {[...Array(featuredReview.rating)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-flame text-flame" aria-hidden="true" />
                    ))}
                  </div>
                  {featuredReview.verifiedBuyer && (
                    <span className="font-ui-label text-[9px] text-sage">
                      Verified Harvest Buyer
                    </span>
                  )}
                </div>

                <p className="font-display text-xl sm:text-2xl italic leading-snug text-oat mb-4">
                  &ldquo;{featuredReview.comment}&rdquo;
                </p>

                <footer className="pt-3.5 border-t border-white/15 flex items-center justify-between gap-3">
                  <div>
                    <cite className="not-italic text-xs font-semibold text-oat block">
                      {featuredReview.author}
                    </cite>
                    <span className="text-[11px] text-sand">
                      {featuredReview.location} · {featuredReview.date}
                    </span>
                  </div>
                  <span className="font-annotation text-lg text-peach">
                    Sealed fresh
                  </span>
                </footer>
              </OatSheet>
            )}

            {secondaryReviews.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {secondaryReviews.map((rev) => (
                  <OatSheet key={rev.id} tone="subtle" interactive={false} className="p-4">
                    <p className="text-xs font-semibold text-oat mb-1">{rev.title}</p>
                    <p className="text-[11px] text-sand line-clamp-2 mb-2">{rev.comment}</p>
                    <span className="text-[10px] text-peach block">
                      {rev.author} · {rev.location}
                    </span>
                  </OatSheet>
                ))}
              </div>
            )}
          </div>
        </div>
      </BackgroundChapter>
    </div>
  );
}
