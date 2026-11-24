'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Product } from '@/lib/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { Marquee } from '@/components/motion/Marquee';
import { DoodleUnderline, DoodleSparkle } from '@/components/doodles';
import { Button } from '@/components/ui/Button';

interface LaunchHarvestSectionProps {
  products: Product[];
}

export function LaunchHarvestSection({ products }: LaunchHarvestSectionProps) {
  const [filter, setFilter] = useState<'all' | 'seeds-and-grains' | 'berries'>('all');
  const prefersReducedMotion = useReducedMotion();

  const visibleProducts =
    filter === 'all'
      ? products
      : products.filter((p) => p.categorySlug === filter);

  return (
    <section
      id="launch-harvest"
      aria-labelledby="launch-harvest-heading"
      className="w-full bg-oat border-b border-charcoal/20"
    >
      {/* Harvest Marquee Ribbon */}
      <div className="bg-indigo text-oat py-3.5 border-b-2 border-charcoal">
        <Marquee>
          <span className="mx-6 font-ui-label text-xs flex items-center gap-4">
            <span>DRIED SEA BUCKTHORN</span>
            <span className="text-seabuckthorn">•</span>
            <span className="text-peach">INDIAN RABI FLAX &amp; CHIA</span>
            <span className="text-seabuckthorn">•</span>
            <span>PUMPKIN &amp; SUNFLOWER KERNELS</span>
            <span className="text-seabuckthorn">•</span>
            <span className="text-peach">BLUEBERRIES &amp; CRANBERRIES</span>
            <span className="text-seabuckthorn">•</span>
            <span>FARM-DIRECT SMALL BATCHES</span>
            <span className="text-seabuckthorn">•</span>
          </span>
        </Marquee>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="relative max-w-2xl">
            <span className="font-mono-meta text-xs uppercase tracking-widest text-cranberry block mb-2">
              02 · Launch Superfoods ({products.length} Active Harvests)
            </span>
            <h2
              id="launch-harvest-heading"
              className="font-display text-4xl sm:text-5xl text-indigo font-semibold leading-tight"
            >
              Seven Honest{' '}
              <span className="relative inline-block text-cranberry italic">
                Farm Crops
                <DoodleUnderline
                  variant="single"
                  delay={0.15}
                  className="absolute -bottom-2 left-0 w-full"
                />
              </span>
            </h2>
            <p className="font-script-body text-base text-indigo mt-4 max-w-xl">
              Every seed and dried berry below carries verified lab nutrition data from our
              partner farms — packed clean without shortcuts.
            </p>
            <DoodleSparkle
              delay={0.3}
              className="hidden sm:block absolute -top-2 -right-8"
            />
          </div>

          {/* Interactive Filter Tabs with Burnt Orange hover / smooth active state */}
          <div className="flex flex-wrap items-center gap-2.5">
            {(
              [
                { key: 'all', label: `All (${products.length})` },
                {
                  key: 'seeds-and-grains',
                  label: `Seeds & Grains (${products.filter((p) => p.categorySlug === 'seeds-and-grains').length})`,
                },
                {
                  key: 'berries',
                  label: `Berries (${products.filter((p) => p.categorySlug === 'berries').length})`,
                },
              ] as const
            ).map((tab) => {
              const active = filter === tab.key;
              return (
                <motion.button
                  key={tab.key}
                  type="button"
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
                  onClick={() => setFilter(tab.key)}
                  className={`px-5 py-2.5 rounded-full font-ui-label text-xs border-2 transition-colors duration-200 cursor-pointer ${
                    active
                      ? 'bg-indigo text-oat border-indigo'
                      : 'bg-apricot text-indigo border-charcoal/30 hover:bg-burnt hover:text-oat hover:border-burnt'
                  }`}
                >
                  {tab.label}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* 7-Product Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 flex justify-center sm:justify-end">
          <Button href="/shop">
            <span>VIEW FULL SHOP CATALOGUE</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
