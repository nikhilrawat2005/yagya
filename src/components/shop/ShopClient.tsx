'use client';

import { useState, useMemo } from 'react';
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

  // Filter & Sort logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'all' && p.categorySlug !== selectedCategory) {
          return false;
        }
        // Search query
        if (
          searchQuery &&
          !p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !p.category.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }
        // Price filter (against lowest variant price)
        const minPrice = Math.min(...p.variants.map((v) => v.price));
        if (minPrice > maxPrice) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        const priceA = a.variants[0]?.price || 0;
        const priceB = b.variants[0]?.price || 0;

        if (selectedSort === 'price-low') return priceA - priceB;
        if (selectedSort === 'price-high') return priceB - priceA;
        if (selectedSort === 'rating') return b.rating - a.rating;
        return 0; // 'featured'
      });
  }, [products, selectedCategory, searchQuery, maxPrice, selectedSort]);

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8">
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-outline-variant/40 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-secondary block mb-1">
            Pantry Harvest Collection
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-primary font-normal">
            Shop All Superfoods
          </h1>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search harvest..."
            className="w-full bg-surface-container-low border border-outline-variant/60 rounded-full pl-10 pr-4 py-2 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <span className="material-symbols-outlined text-base absolute left-3.5 top-2.5 text-on-surface-variant">
            search
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-2.5 text-xs text-on-surface-variant hover:text-primary"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs & Sort Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-primary-container text-surface'
                : 'bg-surface-container-low text-on-surface-variant hover:text-primary'
            }`}
          >
            All Superfoods ({products.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                selectedCategory === cat.slug
                  ? 'bg-primary-container text-surface'
                  : 'bg-surface-container-low text-on-surface-variant hover:text-primary'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Sort & Price Filter */}
        <div className="flex items-center gap-4 text-xs font-medium text-on-surface-variant">
          <div className="flex items-center gap-2">
            <span>Max ₹{maxPrice}:</span>
            <input
              type="range"
              min="150"
              max="800"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="accent-primary cursor-pointer w-24"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <span>Sort:</span>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="bg-surface-container-low border border-outline-variant/40 rounded-lg px-2.5 py-1 text-xs text-on-surface focus:outline-none"
            >
              <option value="featured">Featured Harvest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-surface-container-low rounded-2xl border border-outline-variant/30">
          <span className="material-symbols-outlined text-4xl text-on-surface-variant/40 mb-2">
            eco
          </span>
          <p className="font-serif text-xl font-medium text-primary mb-1">No superfoods match your filter</p>
          <p className="text-xs text-on-surface-variant max-w-sm mx-auto mb-6">
            Try adjusting your price ceiling or search query to browse available seasonal crops.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setMaxPrice(800);
              setSearchQuery('');
            }}
            className="px-5 py-2 rounded-full bg-primary-container text-surface text-xs font-semibold uppercase tracking-wider"
          >
            Reset Filters
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
