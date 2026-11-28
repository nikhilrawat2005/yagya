'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Plus, Star } from 'lucide-react';
import type { Product } from '@/data/products';
import { siteConfig } from '@/config/site';
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
  const showPrices = siteConfig.featureFlags.showPrices;
  const showRatings = siteConfig.featureFlags.showRatingsAndReviews && product.rating !== null;
  const hasPrice = showPrices && defaultVariant?.priceInr !== null && defaultVariant?.priceInr !== undefined;
  const discountPercent =
    hasPrice &&
    defaultVariant.mrpInr !== null &&
    defaultVariant.mrpInr > (defaultVariant.priceInr ?? 0)
      ? Math.round(
          ((defaultVariant.mrpInr - (defaultVariant.priceInr ?? 0)) / defaultVariant.mrpInr) * 100
        )
      : 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!defaultVariant || product.comingSoon) return;
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
        <Link
          href={`/product/${product.slug}`}
          className="block rounded-[6px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oat"
        >
          {/* Consistent 4:5 Studio Image Container */}
          <div className="relative rounded-[6px] aspect-[4/5] bg-[#1C2638] border border-white/15 overflow-hidden mb-3 sm:mb-4">
            <ProductImageWithFallback
              src={primaryImage?.src || ''}
              alt={product.name}
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
                {product.comingSoon ? (
                  <span className="font-ui-label text-[8px] sm:text-[9px] px-1.5 sm:px-2 py-0.5 rounded-[4px] bg-[#141C2B]/90 text-peach border border-peach/45 font-semibold">
                    Coming Soon
                  </span>
                ) : product.zeroAddedSugar ? (
                  <span className="hidden sm:inline-block font-ui-label text-[9px] px-2 py-0.5 rounded-[4px] bg-[#141C2B]/85 text-oat border border-white/25 backdrop-blur-sm">
                    Zero Added Sugar
                  </span>
                ) : null}
              </div>

              {discountPercent > 0 && (
                <span className="font-ui-label text-[8px] sm:text-[9px] px-1.5 sm:px-2 py-0.5 rounded-[4px] bg-[#252905]/90 text-sage border border-sage/40 font-semibold shrink-0 tabular-nums">
                  {discountPercent}% Off
                </span>
              )}
            </div>
          </div>

          {/* Product Meta */}
          <div>
            <div className="flex items-center justify-between gap-1.5 mb-1">
              <span className="font-ui-label text-[9px] sm:text-[10px] text-peach truncate">
                {product.origin ?? product.category}
              </span>
              {showRatings && (
                <span className="inline-flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-[11px] text-sand shrink-0 tabular-nums">
                  <Star className="w-3 h-3 fill-flame text-flame" aria-hidden="true" />
                  <span className="font-semibold text-oat">{product.rating?.toFixed(1)}</span>
                  {product.reviewCount !== null && (
                    <span className="hidden sm:inline text-sand/85">({product.reviewCount})</span>
                  )}
                </span>
              )}
            </div>

            <h3 className="font-display text-base sm:text-[21px] font-medium text-oat group-hover:text-peach transition-colors duration-200 leading-snug line-clamp-2 mb-1 sm:mb-1.5">
              {product.name}
            </h3>

            <p className="hidden sm:line-clamp-2 text-xs sm:text-sm text-sand mb-3 leading-relaxed">
              {product.shortDescription}
            </p>
          </div>
        </Link>

        {/* Price & Action Footer */}
        <div className="pt-2.5 sm:pt-3 border-t border-white/15 flex items-center justify-between gap-1.5 mt-auto">
          <div className="flex flex-col tabular-nums">
            {hasPrice ? (
              <div className="flex items-baseline gap-1 sm:gap-1.5">
                <span className="text-sm sm:text-lg font-semibold text-oat">
                  {siteConfig.currencySymbol}{defaultVariant.priceInr}
                </span>
                {defaultVariant.mrpInr !== null &&
                  defaultVariant.mrpInr > (defaultVariant.priceInr ?? 0) && (
                    <span className="text-[11px] sm:text-xs text-sand/80 line-through">
                      {siteConfig.currencySymbol}{defaultVariant.mrpInr}
                    </span>
                  )}
              </div>
            ) : (
              <span className="text-[11px] sm:text-xs font-medium text-peach">
                {product.comingSoon ? 'Coming soon' : 'Price coming soon'}
              </span>
            )}
            <span className="text-[10px] sm:text-[11px] text-sand">
              {defaultVariant?.weight}
            </span>
          </div>

          <GlowButton
            type="button"
            variant={added ? 'secondary' : 'primary'}
            size="sm"
            onClick={handleAdd}
            disabled={added || Boolean(product.comingSoon) || (defaultVariant?.stock ?? 0) <= 0}
            aria-label={
              product.comingSoon
                ? `${product.name} is coming soon`
                : (defaultVariant?.stock ?? 0) <= 0
                ? `${product.name} is out of stock`
                : `Add ${product.name} (${defaultVariant?.weight}) to bag`
            }
            className="min-h-[36px] sm:min-h-[40px] px-2.5 sm:px-3.5 text-[10px] sm:text-[11px]"
          >
            <AnimatePresence mode="wait" initial={false}>
              {product.comingSoon ? (
                <span className="inline-flex items-center">Soon</span>
              ) : (defaultVariant?.stock ?? 0) <= 0 ? (
                <span className="inline-flex items-center">Out of Stock</span>
              ) : added ? (
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
