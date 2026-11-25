'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, X, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Product } from '@/lib/data/products';
import { Category } from '@/lib/data/categories';
import { ProductCard } from '@/components/product/ProductCard';
import { FadeInSection } from '@/components/motion/FadeInSection';
import { AnimatedTabs } from '@/components/ui/AnimatedTabs';
import { GlowInput } from '@/components/ui/GlowInput';
import { GlowButton } from '@/components/ui/GlowButton';
import { OatSheet } from '@/components/editorial/OatSheet';
import { PageBackgroundSet } from '@/components/editorial/PageBackgroundSet';
import { ProductImageWithFallback } from '@/components/ui/ProductImageWithFallback';
import { SplitText } from '@/components/react-bits/SplitText';
import { SpotlightCard } from '@/components/react-bits/SpotlightCard';
import { ChapterDoodleLayer, Doodle, DoodleDivider } from '@/components/doodles';
import { PAGE_CHAPTER_PLACEMENTS } from '@/config/doodle-placements';
import { MOTION_DURATION, MOTION_EASE, VIEWPORT_ONCE } from '@/lib/motion/tokens';
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
    <PageBackgroundSet
      page="signature"
      chapters={[
        {
          id: 'explore-01',
          chapterNumber: '01',
          chapterLabel: 'Explore Harvests',
          content: (
            <div className="space-y-8 relative">
              <ChapterDoodleLayer placements={PAGE_CHAPTER_PLACEMENTS.shop['chapter-01']} priority />
              <FadeInSection className="relative z-10 pb-6 border-b border-white/15 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="relative">
                  <span className="font-ui-label text-[11px] text-peach block mb-2">
                    Collection · {products.length} Small-Batch Harvests
                  </span>
                  <SplitText
                    as="h1"
                    trigger="mount"
                    text="Explore Yagya"
                    accentWord="Yagya"
                    className="font-display text-4xl sm:text-5xl text-oat font-medium"
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
                    placeholder="Search seeds, berries, nuts, or makhana…"
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
              </FadeInSection>

              <OatSheet tone="subtle" className="p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <AnimatedTabs
                    tabs={categoryTabs}
                    activeTab={selectedCategory}
                    onChange={setSelectedCategory}
                    layoutId="shop-category-tabs"
                  />

                  <div className="flex flex-wrap items-center gap-4 text-xs text-oat">
                    <div className="flex items-center gap-2.5 bg-[#141C2B]/65 border border-white/25 rounded-[4px] px-3 py-2">
                      <label htmlFor="max-price" className="whitespace-nowrap text-apricot tabular-nums">
                        Max ₹{maxPrice}
                      </label>
                      <input
                        id="max-price"
                        name="maxPrice"
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
                      name="sort"
                      value={selectedSort}
                      onChange={(e) => setSelectedSort(e.target.value)}
                      aria-label="Sort products"
                      className="glow-input bg-[#141C2B] border border-white/25 rounded-[4px] px-3 py-2 text-xs text-oat cursor-pointer"
                    >
                      <option value="featured">Featured Harvest</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                  </div>
                </div>
              </OatSheet>

              <div className="flex justify-start">
                <GlowButton href="#explore-02" variant="secondary" size="sm">
                  <span className="tabular-nums">View {filteredProducts.length} Matching Harvests</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </GlowButton>
              </div>
            </div>
          ),
        },
        {
          id: 'explore-02',
          chapterNumber: '02',
          chapterLabel: 'The Pantry',
          content: (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-2xl sm:text-3xl font-medium text-oat tabular-nums">
                  {activeCategoryObj ? activeCategoryObj.name : 'All Harvests'} ({filteredProducts.length})
                </h2>
                {selectedCategory !== 'all' && (
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('all')}
                    className="font-ui-label text-[11px] text-apricot hover:text-oat underline underline-offset-4 cursor-pointer"
                  >
                    Show All Categories
                  </button>
                )}
              </div>

              <AnimatePresence mode="wait">
                {filteredProducts.length === 0 ? (
                  <OatSheet key="empty-state" tone="subtle" className="text-center py-20 px-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-[6px] bg-oat/10 border border-white/25 flex items-center justify-center">
                      <Doodle name="seed-sprout-b" tone="peach" size={44} float priority inline />
                    </div>
                    <p className="font-display text-2xl font-medium text-oat mb-2">
                      {activeCategoryObj
                        ? `${activeCategoryObj.name} Harvest Arriving Soon`
                        : 'No superfoods match your filter'}
                    </p>
                    <p className="text-sm text-apricot/90 max-w-md mx-auto mb-6">
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
          ),
        },
        {
          id: 'explore-03',
          chapterNumber: '03',
          chapterLabel: 'By Origin',
          content: (
            <div className="space-y-6 relative">
              <ChapterDoodleLayer placements={PAGE_CHAPTER_PLACEMENTS.shop['chapter-03']} />
              <DoodleDivider variant="dots" tone="apricot" />
              <OatSheet tone="medium" className="relative z-10 p-6 sm:p-8 max-w-2xl">
                <h2 className="font-display text-3xl sm:text-4xl font-medium text-oat mb-2">
                  Walk through each harvest belt
                </h2>
                <p className="text-sm text-apricot/90">
                  Every category has its own dedicated field story, origin notes, and curated selection.
                </p>
              </OatSheet>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {categories.map((cat, idx) => (
                  <Link
                    key={cat.id}
                    href={CATEGORY_ROUTES[cat.slug] || `/shop?category=${cat.slug}`}
                    className={`group block ${idx % 2 === 1 ? 'lg:mt-6' : ''}`}
                  >
                    <SpotlightCard
                      spotlightColor="rgba(223, 127, 37, 0.14)"
                      className="p-3.5 h-full bg-[#141C2B]/55 [@media(hover:hover)]:hover:-translate-y-1 transition-transform duration-300"
                    >
                      <div className="relative aspect-[4/5] w-full rounded-[4px] overflow-hidden border border-white/20 mb-3">
                        <ProductImageWithFallback
                          src={cat.image}
                          alt={cat.name}
                          fill
                          className="object-cover transition-transform duration-500 [@media(hover:hover)]:group-hover:scale-105"
                        />
                      </div>
                      <span className="font-ui-label text-[9px] text-peach block mb-1">
                        {cat.originNote}
                      </span>
                      <h3 className="font-display text-lg text-oat group-hover:text-peach transition-colors">
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
