'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Plus, Star } from 'lucide-react';
import { Product } from '@/lib/data/products';
import { siteConfig } from '@/lib/data/site';
import { useCartStore } from '@/lib/store/cartStore';
import { ProductImageWithFallback } from '@/components/ui/ProductImageWithFallback';
import { SpotlightCard } from '@/components/react-bits/SpotlightCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { MOTION_EASE } from '@/lib/motion/tokens';

export function ProductCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const defaultVariant = product.variants[0];
  const primaryImage = product.images[0];
  const discountPercent =
    defaultVariant && defaultVariant.mrp > defaultVariant.price
      ? Math.round(((defaultVariant.mrp - defaultVariant.price) / defaultVariant.mrp) * 100)
      : 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!defaultVariant) return;
    addItem(product, defaultVariant, 1);
    setAdded(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setAdded(false), 1500);
  };

  return (
    <SpotlightCard
      as="article"
      spotlightColor="rgba(223, 127, 37, 0.14)"
      className="h-full p-3 sm:p-4 flex flex-col justify-between bg-[#141C2B]/80 md:bg-[#141C2B]/68"
    >
      <div className="flex flex-col justify-between h-full">
        <Link href={`/product/${product.slug}`} className="block focus-visible:outline-none">
          {/* Consistent 4:5 Studio Image Container with Overlaid Editorial Badges */}
          <div className="relative rounded-[6px] aspect-[4/5] bg-[#1C2638] border border-white/15 overflow-hidden mb-3 sm:mb-4">
            <ProductImageWithFallback
              src={primaryImage?.src || ''}
              alt={primaryImage?.alt || product.name}
              fill
              sizes="(max-width: 640px) 46vw, (max-width: 1024px) 45vw, 24vw"
              className={
                primaryImage?.src?.includes('/assets/products/')
                  ? 'object-cover transition-transform duration-500 ease-[var(--ease-smooth)] group-hover:scale-105'
                  : 'object-contain p-5 transition-transform duration-500 ease-[var(--ease-smooth)] group-hover:scale-105'
              }
            />

            {/* Top Badges */}
            <div className="absolute top-2 left-2 right-2 flex items-start justify-between gap-1.5 pointer-events-none">
              <div className="flex flex-wrap gap-1">
                {product.isBestseller && (
                  <span className="font-ui-label text-[8px] sm:text-[9px] px-1.5 sm:px-2 py-0.5 rounded-[4px] bg-flame text-navy font-semibold shadow-sm">
                    Bestseller
                  </span>
                )}
                {product.badges[0] && (
                  <span className="hidden sm:inline-block font-ui-label text-[9px] px-2 py-0.5 rounded-[4px] bg-[#141C2B]/85 text-oat border border-white/25 backdrop-blur-sm">
                    {product.badges[0]}
                  </span>
                )}
              </div>

              {discountPercent > 0 && (
                <span className="font-ui-label text-[8px] sm:text-[9px] px-1.5 sm:px-2 py-0.5 rounded-[4px] bg-[#252905]/90 text-sage border border-sage/40 font-semibold shrink-0 tabular-nums">
                  {discountPercent}% Off
                </span>
              )}
            </div>

            {/* Bottom Subtle Batch SKU Tag */}
            {defaultVariant?.sku && (
              <span className="hidden sm:inline-block absolute bottom-2 right-2 font-ui-label text-[9px] px-2 py-0.5 rounded-[4px] bg-[#141C2B]/80 text-sand border border-white/15 pointer-events-none">
                {defaultVariant.sku}
              </span>
            )}
          </div>

          {/* Product Meta */}
          <div>
            <div className="flex items-center justify-between gap-1.5 mb-1">
              <span className="font-ui-label text-[9px] sm:text-[10px] text-peach truncate">
                {product.origin}
              </span>
              <span className="inline-flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-[11px] text-sand shrink-0 tabular-nums">
                <Star className="w-3 h-3 fill-flame text-flame" aria-hidden="true" />
                <span className="font-semibold text-oat">{product.rating.toFixed(1)}</span>
                <span className="hidden sm:inline text-sand/85">({product.reviewCount})</span>
              </span>
            </div>

            <h3 className="font-display text-base sm:text-[21px] font-medium text-oat group-hover:text-peach transition-colors duration-200 leading-snug line-clamp-2 mb-1 sm:mb-1.5">
              {product.name}
            </h3>

            <p className="hidden sm:line-clamp-2 text-xs sm:text-sm text-sand mb-3 leading-relaxed">
              {product.shortDescription}
            </p>
          </div>
        </Link>

        {/* Price & Quick Add Footer */}
        <div className="pt-2.5 sm:pt-3 border-t border-white/15 flex items-center justify-between gap-1.5 mt-auto">
          <div className="flex flex-col tabular-nums">
            <div className="flex items-baseline gap-1 sm:gap-1.5">
              <span className="text-sm sm:text-lg font-semibold text-oat">
                {siteConfig.currencySymbol}{defaultVariant?.price ?? 0}
              </span>
              {defaultVariant && defaultVariant.mrp > defaultVariant.price && (
                <span className="text-[11px] sm:text-xs text-sand/80 line-through">
                  {siteConfig.currencySymbol}{defaultVariant.mrp}
                </span>
              )}
            </div>
            <span className="text-[10px] sm:text-[11px] text-sand">
              {defaultVariant?.weight}
            </span>
          </div>

          <GlowButton
            type="button"
            variant={added ? 'secondary' : 'primary'}
            size="sm"
            onClick={handleAdd}
            disabled={added}
            aria-label={`Add ${product.name} (${defaultVariant?.weight}) to bag`}
            className="min-h-[36px] sm:min-h-[40px] px-2.5 sm:px-3.5 text-[10px] sm:text-[11px]"
          >
            <AnimatePresence mode="wait" initial={false}>
              {added ? (
                <motion.span
                  key="added"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.16, ease: MOTION_EASE.smooth }}
                  className="inline-flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Added</span>
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.16, ease: MOTION_EASE.smooth }}
                  className="inline-flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Add</span>
                </motion.span>
              )}
            </AnimatePresence>
          </GlowButton>
        </div>
      </div>
    </SpotlightCard>
  );
}
