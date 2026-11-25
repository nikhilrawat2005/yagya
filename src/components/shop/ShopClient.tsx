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
import { MOTION_DURATION, MOTION_EASE, VIEWPORT_ONCE } from '@/lib/motion/tokens';
import { useInteractiveCapabilities } from '@/lib/motion/useInteractiveCapabilities';
import { DoodleUnderline, DoodleSeed, DoodleSparkle } from '@/components/doodles';

interface ShopClientProps {
  products: Product[];
  categories: Category[];
  initialCategory?: string;
}

export function ShopClient({ products, categories, initialCategory }: ShopClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [selectedSort, setSelectedSort] = useState<string>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(500);
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
      {/* Header */}
      <FadeInSection className="mb-8 pb-6 border-b border-charcoal/20 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="relative">
          <div className="inline-flex items-center gap-2 mb-1">
            <span className="font-mono-meta text-xs uppercase tracking-widest text-cranberry">
              5-Category Lineup · {products.length} Launch Harvests
            </span>
            <DoodleSparkle delay={0.2} className="w-5 h-5" />
          </div>
          <h1 className="font-display text-4xl sm:text-5xl text-indigo font-semibold flex flex-wrap items-center gap-3">
            <span>
              Shop All{' '}
              <span className="relative inline-block">
                Superfoods
                <DoodleUnderline
                  variant="single"
                  delay={0.2}
                  className="absolute -bottom-1.5 left-0 w-full"
                />
              </span>
            </span>
            <DoodleSeed delay={0.3} className="hidden sm:inline-block w-11 h-9 opacity-85" />
          </h1>
        </div>

        {/* Search Input with glow border & clear action */}
        <div className="w-full md:w-80">
          <GlowInput
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search seeds or berries..."
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
                    className="p-1 rounded-full text-indigo/70 hover:text-cranberry hover:bg-apricot transition-colors cursor-pointer"
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

        <div className="flex items-center gap-4 font-mono-meta text-xs text-indigo">
          <div className="flex items-center gap-2 bg-apricot/45 border border-charcoal/20 rounded-full px-3 py-1.5 glow-border">
            <label htmlFor="max-price" className="whitespace-nowrap">
              Max ₹{maxPrice}
            </label>
            <input
              id="max-price"
              type="range"
              min="150"
              max="500"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="accent-indigo cursor-pointer w-24"
            />
          </div>

          <select
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
            aria-label="Sort products"
            className="glow-input bg-apricot border border-charcoal/30 rounded-xl px-3 py-2 text-xs text-indigo cursor-pointer"
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
          <motion.div
            key="empty-state"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: MOTION_DURATION.base, ease: MOTION_EASE.smooth }}
            className="glow-border text-center py-20 bg-apricot/45 rounded-2xl border-2 border-charcoal/25 px-6"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-oat border border-charcoal/25 flex items-center justify-center glow-hover">
              <Sprout className="w-7 h-7 text-indigo icon-hover-pop" />
            </div>
            <p className="font-display text-2xl font-semibold text-indigo mb-2">
              {activeCategoryObj
                ? `${activeCategoryObj.name} — Harvest Arriving Soon`
                : 'No superfoods match your filter'}
            </p>
            <p className="font-script-body text-sm text-indigo/85 max-w-md mx-auto mb-6">
              {activeCategoryObj
                ? activeCategoryObj.description
                : 'Try adjusting your price ceiling or search query to view our active harvests.'}
            </p>
            <GlowButton
              type="button"
              variant="cta"
              onClick={() => {
                setSelectedCategory('all');
                setMaxPrice(500);
                setSearchQuery('');
              }}
            >
              VIEW LAUNCH HARVEST
            </GlowButton>
          </motion.div>
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
                      : { opacity: 0, y: 18, filter: 'blur(4px)' }
                  }
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
                  viewport={VIEWPORT_ONCE}
                  transition={{
                    duration: prefersReducedMotion ? 0.14 : MOTION_DURATION.base + 0.08,
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
  );
}
