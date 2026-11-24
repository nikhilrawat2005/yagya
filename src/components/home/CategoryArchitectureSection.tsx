'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Category } from '@/lib/data/categories';
import { Product } from '@/lib/data/products';
import { Floating3DAsset } from '@/components/ui/Floating3DAsset';
import { DoodleSeed, DoodleBerry } from '@/components/doodles';

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
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="categories"
      aria-labelledby="categories-heading"
      className="w-full bg-apricot/45 border-b border-charcoal/20 py-16 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Seed & Berry Marker Doodles */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-mono-meta text-xs uppercase tracking-widest text-cranberry block mb-2">
              03 · Five-Category Brand Architecture
            </span>
            <h2
              id="categories-heading"
              className="font-display text-4xl sm:text-5xl text-indigo font-semibold leading-tight"
            >
              Built For Every{' '}
              <span className="text-cranberry italic">Harvest</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <DoodleSeed delay={0.2} />
            <p className="font-script-body text-sm sm:text-base text-indigo max-w-sm">
              Organized across five natural families — launching with Seeds &amp; Grains
              and Berries, ready for seasonal expansion.
            </p>
            <DoodleBerry delay={0.35} />
          </div>
        </div>

        {/* Golden Ratio 2:3 + 3-column 5-Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5">
          {categories.map((cat, idx) => {
            const count = products.filter((p) => p.categorySlug === cat.slug).length;
            const spanClass = idx < 2 ? 'lg:col-span-3' : 'lg:col-span-2';
            const cardBg = TOKEN_BG[cat.accentToken];

            return (
              <motion.div
                key={cat.id}
                whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className={spanClass}
              >
                <Link
                  href={`/shop?category=${cat.slug}`}
                  className={`group relative overflow-hidden rounded-2xl border-2 border-charcoal ${cardBg} p-6 sm:p-7 flex flex-col justify-between min-h-[220px] transition-colors duration-200 hover:bg-peach`}
                >
                  <div className="relative z-10 flex items-start justify-between gap-3">
                    <div>
                      <span className="font-mono-meta text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-oat text-indigo border border-charcoal/25 inline-block mb-3">
                        {count > 0 ? `${count} Live Harvests` : 'Seasonal Lineup'}
                      </span>
                      <h3 className="font-sans text-xl font-semibold text-indigo group-hover:text-burnt transition-colors">
                        {cat.name}
                      </h3>
                    </div>

                    <span className="w-10 h-10 rounded-full bg-indigo text-oat group-hover:bg-burnt transition-colors duration-200 flex items-center justify-center shrink-0">
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>

                  <div className="relative z-10 mt-6 pr-24">
                    <p className="font-script-body text-sm text-indigo">
                      {cat.description}
                    </p>
                    <span className="font-mono-meta text-[11px] text-indigo/80 block mt-2">
                      {cat.originNote}
                    </span>
                  </div>

                  {/* Overlapping 3D Clay Element in bottom-right corner */}
                  <Floating3DAsset
                    src={cat.image}
                    alt={`${cat.name} 3D clay emblem`}
                    width={140}
                    height={140}
                    floatDistance={4}
                    duration={5.8 + idx * 0.4}
                    rotateDeg={1}
                    className="absolute -right-3 -bottom-3 w-28 sm:w-32 z-0 opacity-95"
                  />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
