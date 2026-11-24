'use client';

import { useState, useMemo } from 'react';
import { Search, X, Sprout } from 'lucide-react';
import { Product } from '@/lib/data/products';
import { Category } from '@/lib/data/categories';
import { ProductCard } from '@/components/product/ProductCard';
import { FadeIn } from '@/components/motion/FadeIn';

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-charcoal/20 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="font-mono-meta text-xs uppercase tracking-widest text-cranberry block mb-1">
            5-Category Lineup · {products.length} Launch Harvests
          </span>
          <h1 className="font-display text-4xl sm:text-5xl text-indigo font-semibold">
            Shop All Superfoods
          </h1>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo/70" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search seeds or berries..."
            aria-label="Search harvest"
            className="w-full bg-oat border-2 border-charcoal/30 rounded-full pl-10 pr-8 py-2 text-xs text-indigo focus:outline-none focus:border-indigo"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo/70 hover:text-cranberry cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Tabs & Sort */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full font-ui-label text-[11px] transition-colors cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-indigo text-oat'
                : 'bg-apricot text-indigo border border-charcoal/25 hover:bg-peach'
            }`}
          >
            All ({products.length})
          </button>
          {categories.map((cat) => {
            const count = products.filter((p) => p.categorySlug === cat.slug).length;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-full font-ui-label text-[11px] transition-colors cursor-pointer ${
                  selectedCategory === cat.slug
                    ? 'bg-indigo text-oat'
                    : 'bg-apricot text-indigo border border-charcoal/25 hover:bg-peach'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-4 font-mono-meta text-xs text-indigo">
          <div className="flex items-center gap-2">
            <label htmlFor="max-price">Max ₹{maxPrice}</label>
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
            className="bg-apricot border border-charcoal/30 rounded-lg px-2.5 py-1.5 text-xs text-indigo focus:outline-none cursor-pointer"
          >
            <option value="featured">Featured Harvest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-apricot/45 rounded-2xl border-2 border-charcoal/25 px-6">
          <Sprout className="w-8 h-8 text-indigo mx-auto mb-3" />
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
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setMaxPrice(500);
              setSearchQuery('');
            }}
            className="btn-primary-yagya px-6 py-3 rounded-full text-xs"
          >
            VIEW LAUNCH HARVEST
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <FadeIn key={p.id}>
              <ProductCard product={p} />
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  );
}
