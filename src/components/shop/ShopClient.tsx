'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Product } from '@/lib/data/products';
import { Category } from '@/lib/data/categories';
import { siteConfig } from '@/lib/data/site';
import { ProductCard } from '@/components/product/ProductCard';
import { AnimatedTabs } from '@/components/ui/AnimatedTabs';
import { GlowInput } from '@/components/ui/GlowInput';
import { GlowButton } from '@/components/ui/GlowButton';
import { OatSheet } from '@/components/editorial/OatSheet';
import { PageBackgroundSet } from '@/components/editorial/PageBackgroundSet';
import { ProductImageWithFallback } from '@/components/ui/ProductImageWithFallback';
import { SplitText } from '@/components/react-bits/SplitText';
import { SpotlightCard } from '@/components/react-bits/SpotlightCard';
import { MOTION_DURATION, MOTION_EASE } from '@/lib/motion/tokens';
import { useInteractiveCapabilities } from '@/lib/motion/useInteractiveCapabilities';

interface ShopClientProps {
  products: Product[];
  categories: Category[];
  initialCategory?: string;
}

const CATEGORY_ROUTES: Record<string, string> = {
  'seeds-and-grains': '/seeds',
  berries: '/berries',
  'dried-fruits': '/dry-fruits',
  nuts: '/nuts',
  'flavoured-makhana': '/makhana',
};

export function ShopClient({ products, categories, initialCategory }: ShopClientProps) {
  const catalogCeiling = useMemo(() => {
    const prices = products.flatMap((p) => p.variants.map((v) => v.price));
    const maxVal = prices.length > 0 ? Math.max(...prices) : 3000;
    return Math.ceil(maxVal / 100) * 100;
  }, [products]);

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [selectedSort, setSelectedSort] = useState<string>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(catalogCeiling);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { prefersReducedMotion } = useInteractiveCapabilities();

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return products
      .filter((p) => {
        if (selectedCategory !== 'all' && p.categorySlug !== selectedCategory) return false;
        if (
          q &&
          !p.name.toLowerCase().includes(q) &&
          !p.category.toLowerCase().includes(q) &&
          !p.origin.toLowerCase().includes(q) &&
          !p.tags.some((t) => t.toLowerCase().includes(q))
        ) {
          return false;
        }
        const minVariantPrice = Math.min(...p.variants.map((v) => v.price));
        if (minVariantPrice > maxPrice) return false;
        return true;
      })
      .sort((a, b) => {
        const priceA = a.variants[0]?.price || 0;
        const priceB = b.variants[0]?.price || 0;
        if (selectedSort === 'price-low') return priceA - priceB;
        if (selectedSort === 'price-high') return priceB - priceA;
        if (selectedSort === 'rating') return b.rating - a.rating;
        return Number(Boolean(b.isBestseller)) - Number(Boolean(a.isBestseller));
      });
  }, [products, selectedCategory, searchQuery, maxPrice, selectedSort]);

  const activeCategoryObj = categories.find((c) => c.slug === selectedCategory);

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    searchQuery.trim().length > 0 ||
    maxPrice < catalogCeiling ||
    selectedSort !== 'featured';

  const resetFilters = () => {
    setSelectedCategory('all');
    setMaxPrice(catalogCeiling);
    setSearchQuery('');
    setSelectedSort('featured');
  };

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
    <PageBackgroundSet
      page="signature"
      chapters={[
        {
          id: 'explore-01',
          chapterNumber: '01',
          chapterLabel: 'The Pantry',
          compact: true,
          content: (
            <div className="space-y-5 relative pt-2 sm:pt-4">
              {/* Compact Header + Search Row */}
              <div className="relative z-10 pb-4 border-b border-white/15 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <span className="font-ui-label text-[10px] text-peach block mb-1">
                    {siteConfig.name} Pantry · {products.length} Small-Batch Harvests
                  </span>
                  <SplitText
                    as="h1"
                    trigger="mount"
                    text={`Explore ${siteConfig.name}`}
                    className="font-display text-3xl sm:text-5xl text-oat font-medium leading-none"
                  />
                </div>

                <div className="w-full md:w-80">
                  <GlowInput
                    name="search"
                    autoComplete="off"
                    spellCheck={false}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search seeds, berries, nuts, makhana…"
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
                            className="p-1 rounded-[4px] text-apricot/80 hover:text-oat hover:bg-oat/15 transition-colors cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" aria-hidden="true" />
                          </motion.button>
                        )}
                      </AnimatePresence>
                    }
                  />
                </div>
              </div>

              {/* Compact Unified Filter Bar */}
              <OatSheet tone="subtle" interactive={false} className="p-3.5 sm:p-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                  <div className="overflow-x-auto pb-1 lg:pb-0 -mx-1 px-1">
                    <AnimatedTabs
                      tabs={categoryTabs}
                      activeTab={selectedCategory}
                      onChange={setSelectedCategory}
                      layoutId="shop-category-tabs"
                      className="flex-nowrap sm:flex-wrap"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 text-xs text-oat shrink-0">
                    <div className="flex items-center gap-2 bg-[#141C2B]/75 border border-white/25 rounded-[4px] px-3 py-2 min-h-[38px]">
                      <SlidersHorizontal className="w-3.5 h-3.5 text-peach shrink-0" aria-hidden="true" />
                      <label htmlFor="max-price" className="whitespace-nowrap text-sand tabular-nums">
                        Up to {siteConfig.currencySymbol}{maxPrice}
                      </label>
                      <input
                        id="max-price"
                        name="maxPrice"
                        type="range"
                        min="200"
                        max={catalogCeiling}
                        step="100"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        className="accent-flame cursor-pointer w-20 sm:w-24"
                      />
                    </div>

                    <select
                      name="sort"
                      value={selectedSort}
                      onChange={(e) => setSelectedSort(e.target.value)}
                      aria-label="Sort products"
                      className="glow-input bg-[#141C2B]/85 border border-white/25 rounded-[4px] px-3 py-2 min-h-[38px] text-xs text-oat cursor-pointer"
                    >
                      <option value="featured">Featured &amp; Bestsellers</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                  </div>
                </div>
              </OatSheet>

              {/* Results Count & Active Reset */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-display text-xl sm:text-2xl font-medium text-oat tabular-nums">
                  {activeCategoryObj ? activeCategoryObj.name : 'All Harvests'} ({filteredProducts.length})
                </h2>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="font-ui-label text-[10px] text-peach hover:text-oat underline underline-offset-4 cursor-pointer"
                  >
                    Reset Filters
                  </button>
                )}
              </div>

              {/* Immediately Visible Product Grid Above the Fold */}
              <AnimatePresence mode="wait">
                {filteredProducts.length === 0 ? (
                  <OatSheet key="empty-state" tone="subtle" className="text-center py-14 px-6">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-[6px] bg-oat/10 border border-white/25 flex items-center justify-center">
                      <Search className="w-6 h-6 text-peach" aria-hidden="true" />
                    </div>
                    <p className="font-display text-2xl font-medium text-oat mb-2">
                      {activeCategoryObj
                        ? `No ${activeCategoryObj.name} match your filters`
                        : 'No superfoods match your filter'}
                    </p>
                    <p className="text-sm text-sand max-w-md mx-auto mb-5">
                      {activeCategoryObj
                        ? activeCategoryObj.description
                        : 'Try clearing your search or increasing your maximum price limit.'}
                    </p>
                    <GlowButton type="button" variant="cta" onClick={resetFilters}>
                      Show All {products.length} Harvests
                    </GlowButton>
                  </OatSheet>
                ) : (
                  <motion.div
                    key="products-grid"
                    layout={!prefersReducedMotion}
                    className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-5"
                  >
                    <AnimatePresence mode="popLayout">
                      {filteredProducts.map((p, index) => (
                        <motion.div
                          key={p.id}
                          layout={!prefersReducedMotion}
                          initial={
                            prefersReducedMotion
                              ? { opacity: 0 }
                              : { opacity: 0, y: 12 }
                          }
                          animate={{ opacity: 1, y: 0 }}
                          exit={
                            prefersReducedMotion
                              ? { opacity: 0 }
                              : { opacity: 0, scale: 0.96 }
                          }
                          transition={{
                            duration: prefersReducedMotion ? 0.12 : MOTION_DURATION.base,
                            delay: prefersReducedMotion ? 0 : Math.min(index * 0.025, 0.15),
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
          ),
        },
        {
          id: 'explore-02',
          chapterNumber: '02',
          chapterLabel: 'By Origin',
          compact: true,
          content: (
            <div className="space-y-5 relative">
              <OatSheet tone="medium" className="relative z-10 p-5 sm:p-7 max-w-2xl">
                <SplitText
                  as="h2"
                  trigger="scroll"
                  text="Our Harvest Belts"
                  className="font-display text-3xl sm:text-4xl font-medium text-oat mb-2"
                />
                <p className="text-sm text-sand">
                  Every category has its own dedicated field story, origin notes, and curated selection.
                </p>
              </OatSheet>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 relative">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={CATEGORY_ROUTES[cat.slug] || `/shop?category=${cat.slug}`}
                    className="group block"
                  >
                    <SpotlightCard
                      spotlightColor="rgba(223, 127, 37, 0.14)"
                      className="p-3 h-full bg-[#141C2B]/80 md:bg-[#141C2B]/68 [@media(hover:hover)]:hover:-translate-y-1 transition-transform duration-300"
                    >
                      <div className="relative aspect-[4/5] w-full rounded-[4px] overflow-hidden border border-white/20 mb-2.5 bg-[#1C2638]">
                        <ProductImageWithFallback
                          src={cat.image}
                          alt={cat.name}
                          fill
                          sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 19vw"
                          className="object-cover transition-transform duration-500 [@media(hover:hover)]:group-hover:scale-105"
                        />
                      </div>
                      <span className="font-ui-label text-[9px] text-peach block mb-0.5 truncate">
                        {cat.originNote}
                      </span>
                      <h3 className="font-display text-base sm:text-lg text-oat group-hover:text-peach transition-colors">
                        {cat.name}
                      </h3>
                    </SpotlightCard>
                  </Link>
                ))}
              </div>
            </div>
          ),
        },
      ]}
    />
  );
}
