'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SpotlightCard } from '@/components/react-bits/SpotlightCard';
import { ProductImageWithFallback } from '@/components/ui/ProductImageWithFallback';
import { siteConfig } from '@/config/site';
import type { Product } from '@/data/products';

export interface EditorialProductCardProps {
  product: Product;
  size?: 'featured' | 'compact';
  delay?: number;
  className?: string;
}

export function EditorialProductCard({
  product,
  size = 'compact',
  className = '',
}: EditorialProductCardProps) {
  const primary = product.images[0];
  const priceInr = product.variants[0]?.priceInr ?? null;
  const showPrice = siteConfig.featureFlags.showPrices && priceInr !== null;

  return (
    <div className={`relative group ${className}`}>
      <SpotlightCard
        spotlightColor={size === 'featured' ? 'rgba(223, 127, 37, 0.16)' : 'rgba(246, 239, 226, 0.10)'}
        className="relative z-10 overflow-hidden p-4 sm:p-5 bg-[#141C2B]/55 transition-transform duration-300 ease-[var(--ease-smooth)] [@media(hover:hover)]:group-hover:-translate-y-1.5"
      >
        <Link
          href={`/product/${product.slug}`}
          className="block rounded-[4px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oat"
        >
          <div className="relative aspect-[4/5] w-full rounded-[6px] overflow-hidden border border-white/20 bg-navy/30 mb-4">
            <ProductImageWithFallback
              src={primary?.src || ''}
              alt={product.name}
              fill
              sizes={size === 'featured' ? '(max-width: 768px) 90vw, 380px' : '(max-width: 768px) 85vw, 300px'}
              className="object-cover transition-transform duration-500 ease-[var(--ease-smooth)] [@media(hover:hover)]:group-hover:scale-105"
            />
          </div>

          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <span className="font-ui-label text-[10px] text-peach block mb-1">
                {product.origin ?? product.category}
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-medium text-oat group-hover:text-peach transition-colors leading-snug">
                {product.name}
              </h3>
              <p className="text-xs sm:text-sm text-apricot/90 line-clamp-1 mt-1">
                {product.shortDescription}
              </p>
            </div>
            <div className="shrink-0 text-right pt-1 tabular-nums">
              {product.comingSoon ? (
                <span className="font-ui-label text-[9px] text-peach block leading-none">
                  Coming Soon
                </span>
              ) : showPrice ? (
                <span className="font-display text-lg text-peach block leading-none">
                  {siteConfig.currencySymbol}{priceInr}
                </span>
              ) : (
                <span className="font-ui-label text-[9px] text-peach block leading-none">
                  {product.variants[0]?.weight}
                </span>
              )}
              <span className="inline-flex items-center gap-1 text-[10px] font-ui-label text-oat/85 mt-1.5 group-hover:text-oat transition-colors">
                View <ArrowRight className="w-3 h-3" aria-hidden="true" />
              </span>
            </div>
          </div>
        </Link>
      </SpotlightCard>
    </div>
  );
}
