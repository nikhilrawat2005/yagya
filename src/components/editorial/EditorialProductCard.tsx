'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { SpotlightCard } from '@/components/react-bits/SpotlightCard';
import { Doodle } from '@/components/doodles';
import { PRODUCT_CARD_DOODLES } from '@/config/doodle-placements';
import type { Product } from '@/lib/data/products';

export interface EditorialProductCardProps {
  product: Product;
  size?: 'featured' | 'compact';
  delay?: number;
  className?: string;
}

/**
 * Editorial glass card for category showcase chapters: 4:5 product photography,
 * single-line botanical note, dedicated product doodle peeking behind one corner,
 * and restrained spotlight hover.
 */
export function EditorialProductCard({
  product,
  size = 'compact',
  className = '',
}: EditorialProductCardProps) {
  const primary = product.images[0];
  const price = product.variants[0]?.price ?? 0;
  const doodleName = PRODUCT_CARD_DOODLES[product.slug];

  return (
    <div className={`relative group ${className}`}>
      {doodleName && (
        <div className="hidden sm:block absolute -top-6 -right-5 z-0 pointer-events-none transition-transform duration-300 ease-[var(--ease-smooth)] [@media(hover:hover)]:group-hover:rotate-[4deg]">
          <Doodle
            name={doodleName}
            tone="apricot"
            size={64}
            rotate={-6}
            opacity={0.78}
            inline
          />
        </div>
      )}

      <SpotlightCard
        spotlightColor={size === 'featured' ? 'rgba(223, 127, 37, 0.16)' : 'rgba(246, 239, 226, 0.10)'}
        className="relative z-10 overflow-hidden p-4 sm:p-5 bg-[#141C2B]/55 transition-transform duration-300 ease-[var(--ease-smooth)] [@media(hover:hover)]:group-hover:-translate-y-1.5"
      >
        <Link href={`/product/${product.slug}`} className="block focus-visible:outline-none">
          <div className="relative aspect-[4/5] w-full rounded-[6px] overflow-hidden border border-white/20 bg-navy/30 mb-4">
            <Image
              src={primary?.src || ''}
              alt={primary?.alt || `${product.name} harvest pack`}
              fill
              sizes={size === 'featured' ? '(max-width: 768px) 90vw, 380px' : '(max-width: 768px) 85vw, 300px'}
              className="object-cover transition-transform duration-500 ease-[var(--ease-smooth)] [@media(hover:hover)]:group-hover:scale-105"
            />
          </div>

          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <span className="font-ui-label text-[10px] text-peach block mb-1">
                {product.origin}
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-medium text-oat group-hover:text-peach transition-colors leading-snug">
                {product.name}
              </h3>
              <p className="text-xs sm:text-sm text-apricot/90 line-clamp-1 mt-1">
                {product.shortDescription}
              </p>
            </div>
            <div className="shrink-0 text-right pt-1 tabular-nums">
              <span className="font-display text-lg text-peach block leading-none">
                ₹{price}
              </span>
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
