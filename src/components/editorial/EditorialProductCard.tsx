'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { OatSheet } from '@/components/editorial/OatSheet';
import { DoodleSVG, type DoodleName } from '@/components/editorial/DoodleSVG';
import type { Product } from '@/lib/data/products';

export interface EditorialProductCardProps {
  product: Product;
  doodle?: DoodleName;
  size?: 'featured' | 'compact';
  delay?: number;
  className?: string;
}

/**
 * Editorial glass card for category showcase chapters: 4:5 product photography,
 * single-line botanical note, doodle accent, and hover-capable lift only.
 */
export function EditorialProductCard({
  product,
  doodle = 'leaf',
  size = 'compact',
  delay = 0.1,
  className = '',
}: EditorialProductCardProps) {
  const primary = product.images[0];
  const price = product.variants[0]?.price ?? 0;

  return (
    <OatSheet
      tone={size === 'featured' ? 'warm' : 'medium'}
      delay={delay}
      className={`group overflow-hidden p-4 sm:p-5 transition-transform duration-300 ease-[var(--ease-smooth)] [@media(hover:hover)]:hover:-translate-y-1.5 shadow-[0_18px_45px_-16px_rgba(8,10,16,0.55)] ${className}`}
    >
      <Link href={`/product/${product.slug}`} className="block focus:outline-none">
        <div className="relative aspect-[4/5] w-full rounded-[6px] overflow-hidden border border-white/20 bg-navy/30 mb-4">
          <Image
            src={primary?.src || ''}
            alt={primary?.alt || `${product.name} harvest pack`}
            fill
            sizes={size === 'featured' ? '(max-width: 768px) 90vw, 380px' : '(max-width: 768px) 85vw, 300px'}
            className="object-cover transition-transform duration-500 ease-[var(--ease-smooth)] [@media(hover:hover)]:group-hover:scale-105"
          />
          <div className="pointer-events-none absolute top-2.5 right-2.5 opacity-80">
            <DoodleSVG name={doodle} tone="oat" className="w-7 h-7" />
          </div>
        </div>

        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <span className="font-ui-label text-[10px] text-peach/90 block mb-1">
              {product.origin}
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-medium text-oat group-hover:text-peach transition-colors leading-snug">
              {product.name}
            </h3>
            <p className="text-xs sm:text-sm text-apricot/85 line-clamp-1 mt-1">
              {product.shortDescription}
            </p>
          </div>
          <div className="shrink-0 text-right pt-1">
            <span className="font-display text-lg text-peach block leading-none">
              ₹{price}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-ui-label text-oat/75 mt-1.5 group-hover:text-oat transition-colors">
              View <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </Link>
    </OatSheet>
  );
}
