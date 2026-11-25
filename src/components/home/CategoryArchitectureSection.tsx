'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Category } from '@/lib/data/categories';
import { Product } from '@/lib/data/products';
import { Floating3DAsset } from '@/components/ui/Floating3DAsset';
import {
  DoodleSeed,
  DoodleBerry,
  DoodleUnderline,
  DoodleSparkle,
  DoodleCategorySketch,
  FloatingDoodle,
} from '@/components/doodles';
import { Card3D, Card3DLayer } from '@/components/ui/Card3D';
import { FadeInSection } from '@/components/motion/FadeInSection';
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger';

interface CategoryArchitectureSectionProps {
  categories: Category[];
  products: Product[];
}

const TOKEN_BG: Record<Category['accentToken'], string> = {
  apricot: 'bg-apricot',
  peach: 'bg-peach',
  seabuckthorn: 'bg-seabuckthorn',
};

export function CategoryArchitectureSection({
  categories,
  products,
}: CategoryArchitectureSectionProps) {
  return (
    <section
      id="categories"
      aria-labelledby="categories-heading"
      className="w-full bg-apricot/45 border-b border-charcoal/20 py-16 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Seed, Berry & Sparkle Marker Doodles */}
        <FadeInSection className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="relative">
            <span className="font-mono-meta text-xs uppercase tracking-widest text-cranberry block mb-2">
              03 · Five-Category Brand Architecture
            </span>
            <h2
              id="categories-heading"
              className="font-display text-4xl sm:text-5xl text-indigo font-semibold leading-tight"
            >
              Built For Every{' '}
              <span className="relative inline-block text-cranberry italic">
                Harvest
                <DoodleUnderline
                  variant="single"
                  delay={0.2}
                  className="absolute -bottom-1.5 left-0 w-full"
                />
              </span>
            </h2>
            <DoodleSparkle
              delay={0.3}
              className="hidden sm:block absolute -top-3 -right-8 w-7 h-7"
            />
          </div>

          <div className="flex items-center gap-4">
            <DoodleSeed delay={0.2} />
            <p className="font-script-body text-sm sm:text-base text-indigo max-w-sm">
              Organized across five natural families — launching with Seeds &amp; Grains
              and Berries, ready for seasonal expansion.
            </p>
            <DoodleBerry delay={0.35} />
          </div>
        </FadeInSection>

        {/* Golden Ratio 2:3 + 3-column 5-Category Cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5">
          {categories.map((cat, idx) => {
            const count = products.filter((p) => p.categorySlug === cat.slug).length;
            const spanClass = idx < 2 ? 'lg:col-span-3' : 'lg:col-span-2';
            const cardBg = TOKEN_BG[cat.accentToken];

            return (
              <StaggerItem key={cat.id} className={spanClass}>
                <Card3D
                  maxTilt={7}
                  className="h-full"
                  surfaceClassName={`group border-2 border-charcoal ${cardBg} hover:bg-peach transition-colors duration-250`}
                >
                  <Link
                    href={`/shop?category=${cat.slug}`}
                    className="relative overflow-hidden rounded-2xl p-6 sm:p-7 flex flex-col justify-between min-h-[220px] h-full"
                  >
                    <Card3DLayer depth={14} className="z-10 flex items-start justify-between gap-3">
                      <div>
                        <span className="glow-badge font-mono-meta text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-oat text-indigo border border-charcoal/25 inline-block mb-3">
                          {count > 0 ? `${count} Live Harvests` : 'Seasonal Lineup'}
                        </span>
                        <h3 className="font-sans text-xl font-semibold text-indigo group-hover:text-burnt transition-colors duration-200">
                          {cat.name}
                        </h3>
                      </div>

                      <span className="w-10 h-10 rounded-full bg-indigo text-oat group-hover:bg-burnt group-hover:shadow-[var(--glow-level-2)] transition-all duration-250 flex items-center justify-center shrink-0">
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-110" />
                      </span>
                    </Card3DLayer>

                    <Card3DLayer depth={10} className="z-10 mt-6 pr-24">
                      <p className="font-script-body text-sm text-indigo">
                        {cat.description}
                      </p>
                      <span className="font-mono-meta text-[11px] text-indigo/80 block mt-2">
                        {cat.originNote}
                      </span>
                    </Card3DLayer>

                    {/* Overlapping 3D Clay or Hand-Drawn Black Marker Botanical Doodle in bottom-right corner */}
                    {cat.useDoodleEmblem || !cat.image ? (
                      <FloatingDoodle
                        floatDistance={4}
                        duration={5.8 + idx * 0.4}
                        rotateDeg={1.5}
                        parallaxDepth={6}
                        className="absolute right-1 bottom-1 w-24 sm:w-28 z-0 opacity-85 transition-transform duration-500 ease-[var(--ease-smooth)] group-hover:scale-108"
                      >
                        <DoodleCategorySketch slug={cat.slug} delay={0.15 + idx * 0.08} />
                      </FloatingDoodle>
                    ) : (
                      <Floating3DAsset
                        src={cat.image}
                        alt={`${cat.name} 3D clay emblem`}
                        width={140}
                        height={140}
                        floatDistance={4}
                        duration={5.8 + idx * 0.4}
                        rotateDeg={1}
                        parallaxDepth={6}
                        className="absolute -right-3 -bottom-3 w-28 sm:w-32 z-0 opacity-95 transition-transform duration-500 ease-[var(--ease-smooth)] group-hover:scale-108"
                      />
                    )}
                  </Link>
                </Card3D>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
