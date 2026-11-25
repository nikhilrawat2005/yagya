'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Product } from '@/lib/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { Marquee } from '@/components/motion/Marquee';
import { FadeInSection } from '@/components/motion/FadeInSection';
import {
  DoodleUnderline,
  DoodleSparkle,
  DoodleSeed,
  DoodleBerry,
  DoodleLeaf,
} from '@/components/doodles';
import { GlowButton } from '@/components/ui/GlowButton';
import { AnimatedTabs } from '@/components/ui/AnimatedTabs';
import { MOTION_DURATION, MOTION_EASE, VIEWPORT_ONCE } from '@/lib/motion/tokens';
import { useInteractiveCapabilities } from '@/lib/motion/useInteractiveCapabilities';

interface LaunchHarvestSectionProps {
  products: Product[];
}

export function LaunchHarvestSection({ products }: LaunchHarvestSectionProps) {
  const [filter, setFilter] = useState<'all' | 'seeds-and-grains' | 'berries'>('all');
  const { prefersReducedMotion } = useInteractiveCapabilities();

  const visibleProducts =
    filter === 'all'
      ? products
      : products.filter((p) => p.categorySlug === filter);

  const filterTabs = [
    { id: 'all' as const, label: `All (${products.length})` },
    {
      id: 'seeds-and-grains' as const,
      label: `Seeds & Grains (${products.filter((p) => p.categorySlug === 'seeds-and-grains').length})`,
    },
    {
      id: 'berries' as const,
      label: `Berries (${products.filter((p) => p.categorySlug === 'berries').length})`,
    },
  ];

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
        <FadeInSection className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
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
            <DoodleSeed
              delay={0.35}
              className="hidden md:block absolute -bottom-1 -right-24 w-11 h-9 opacity-80"
            />
          </div>

          {/* Interactive Filter Tabs with spring-sliding active pill & glow */}
          <div className="flex flex-wrap items-center gap-3">
            <DoodleBerry delay={0.25} className="hidden lg:block w-9 h-9 opacity-80" />
            <AnimatedTabs
              tabs={filterTabs}
              activeTab={filter}
              onChange={setFilter}
              layoutId="launch-harvest-filter"
            />
          </div>
        </FadeInSection>

        {/* 7-Product Card Grid with staggered entrance & smooth filter transitions */}
        <motion.div
          layout={!prefersReducedMotion}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {visibleProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout={!prefersReducedMotion}
                initial={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: 18, filter: 'blur(4px)' }
                }
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 0.94 }
                }
                viewport={VIEWPORT_ONCE}
                transition={{
                  duration: prefersReducedMotion ? 0.15 : MOTION_DURATION.base + 0.1,
                  delay: prefersReducedMotion ? 0 : Math.min(index * 0.05, 0.25),
                  ease: MOTION_EASE.smooth,
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <FadeInSection delay={0.1} className="mt-10 flex items-center justify-center sm:justify-end gap-4">
          <DoodleLeaf variant="twin" delay={0.2} className="hidden sm:block w-10 h-10 opacity-80" />
          <GlowButton href="/shop" variant="cta" magnetic>
            <span>VIEW FULL SHOP CATALOGUE</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </GlowButton>
        </FadeInSection>
      </div>
    </section>
  );
}
