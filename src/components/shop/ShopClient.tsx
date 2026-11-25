'use client';

import { useState, useMemo } from 'react';
import { Search, X, Sprout } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Product } from '@/lib/data/products';
import { Category } from '@/lib/data/categories';
import { ProductCard } from '@/components/product/ProductCard';
import { FadeInSection } from '@/components/motion/FadeInSection';
import { AnimatedTabs } from '@/components/ui/AnimatedTabs';
import { GlowInput } from '@/components/ui/GlowInput';
import { GlowButton } from '@/components/ui/GlowButton';
import { OatSheet } from '@/components/editorial/OatSheet';
import { DoodleSVG } from '@/components/editorial/DoodleSVG';
import { MOTION_DURATION, MOTION_EASE, VIEWPORT_ONCE } from '@/lib/motion/tokens';
import { useInteractiveCapabilities } from '@/lib/motion/useInteractiveCapabilities';

interface ShopClientProps {
  products: Product[];
  categories: Category[];
  initialCategory?: string;
}

export function ShopClient({ products, categories, initialCategory }: ShopClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [selectedSort, setSelectedSort] = useState<string>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { prefersReducedMotion } = useInteractiveCapabilities();

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategory !== 'all' && p.categorySlug !== selectedCategory) return false;
        if (
          searchQuery &&
          !p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !p.category.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }
        const minPrice = Math.min(...p.variants.map((v) => v.price));
        if (minPrice > maxPrice) return false;
        return true;
      })
      .sort((a, b) => {
        const priceA = a.variants[0]?.price || 0;
        const priceB = b.variants[0]?.price || 0;
        if (selectedSort === 'price-low') return priceA - priceB;
        if (selectedSort === 'price-high') return priceB - priceA;
        if (selectedSort === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [products, selectedCategory, searchQuery, maxPrice, selectedSort]);

  const activeCategoryObj = categories.find((c) => c.slug === selectedCategory);

  const categoryTabs = useMemo(
    () => [
      { id: 'all', label: `All (${products.length})` },
      ...categories.map((cat) => {
        const count = products.filter((p) => p.categorySlug === cat.slug).length;
        return { id: cat.slug, label: `${cat.name} (${count})` };
      }),
    ],
    [categories, products]
  );

  return (
    <div className="min-h-screen bg-navy text-oat pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeInSection className="mb-8 pb-6 border-b border-white/15 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="relative">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="font-ui-label text-[11px] text-peach">
                Collection · {products.length} Small-Batch Harvests
              </span>
              <DoodleSVG name="star" tone="flame" delay={0.2} className="w-5 h-5" />
            </div>
            <h1 className="font-display text-4xl sm:text-5xl text-oat font-medium">
              Explore{' '}
              <span className="relative inline-block italic text-peach">
                Yagya
                <DoodleSVG
                  name="underline"
                  tone="flame"
                  delay={0.2}
                  className="absolute -bottom-1.5 left-0 w-full h-3"
                />
              </span>
            </h1>
          </div>

          <div className="w-full md:w-80">
            <GlowInput
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search seeds, berries, nuts, or makhana..."
              aria-label="Search harvest"
              leadingIcon={<Search className="w-4 h-4" />}
              trailingSlot={
                <AnimatePresence>
                  {searchQuery && (
                    <motion.button
                      type="button"
                      initial={{ opacity: 0, scale: 0.75 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.75 }}
                      transition={{ duration: 0.14 }}
                      onClick={() => setSearchQuery('')}
                      aria-label="Clear search"
                      className="p-1 rounded-[4px] text-apricot/70 hover:text-oat hover:bg-oat/15 transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </motion.button>
                  )}
                </AnimatePresence>
              }
            />
          </div>
        </FadeInSection>

        {/* Category Filter Tabs & Sort */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <AnimatedTabs
            tabs={categoryTabs}
            activeTab={selectedCategory}
            onChange={setSelectedCategory}
            layoutId="shop-category-tabs"
          />

          <div className="flex items-center gap-4 text-xs text-oat">
            <div className="flex items-center gap-2.5 bg-oat/[0.12] border border-white/25 rounded-[4px] px-3 py-2">
              <label htmlFor="max-price" className="whitespace-nowrap text-apricot">
                Max ₹{maxPrice}
              </label>
              <input
                id="max-price"
                type="range"
                min="150"
                max="1000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="accent-flame cursor-pointer w-24"
              />
            </div>

            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              aria-label="Sort products"
              className="glow-input bg-navy border border-white/25 rounded-[4px] px-3 py-2 text-xs text-oat cursor-pointer"
            >
              <option value="featured">Featured Harvest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          {filteredProducts.length === 0 ? (
            <OatSheet key="empty-state" tone="subtle" className="text-center py-20 px-6">
              <div className="w-14 h-14 mx-auto mb-4 rounded-[6px] bg-oat/10 border border-white/25 flex items-center justify-center">
                <Sprout className="w-7 h-7 text-peach" />
              </div>
              <p className="font-display text-2xl font-medium text-oat mb-2">
                {activeCategoryObj
                  ? `${activeCategoryObj.name} — Harvest Arriving Soon`
                  : 'No superfoods match your filter'}
              </p>
              <p className="text-sm text-apricot/80 max-w-md mx-auto mb-6">
                {activeCategoryObj
                  ? activeCategoryObj.description
                  : 'Try adjusting your price ceiling or search query to view our active harvests.'}
              </p>
              <GlowButton
                type="button"
                variant="cta"
                onClick={() => {
                  setSelectedCategory('all');
                  setMaxPrice(1000);
                  setSearchQuery('');
                }}
              >
                View Active Harvests
              </GlowButton>
            </OatSheet>
          ) : (
            <motion.div
              key="products-grid"
              layout={!prefersReducedMotion}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((p, index) => (
                  <motion.div
                    key={p.id}
                    layout={!prefersReducedMotion}
                    initial={
                      prefersReducedMotion
                        ? { opacity: 0 }
                        : { opacity: 0, y: 18 }
                    }
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={
                      prefersReducedMotion
                        ? { opacity: 0 }
                        : { opacity: 0, scale: 0.95 }
                    }
                    viewport={VIEWPORT_ONCE}
                    transition={{
                      duration: prefersReducedMotion ? 0.14 : MOTION_DURATION.base + 0.1,
                      delay: prefersReducedMotion ? 0 : Math.min(index * 0.04, 0.2),
                      ease: MOTION_EASE.smooth,
                    }}
                  >
                    <ProductCard product={p} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
