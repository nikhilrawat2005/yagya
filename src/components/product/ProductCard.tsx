'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Plus } from 'lucide-react';
import { Product } from '@/lib/data/products';
import { useCartStore } from '@/lib/store/cartStore';
import { ProductImageWithFallback } from '@/components/ui/ProductImageWithFallback';
import { Card3D, Card3DLayer } from '@/components/ui/Card3D';
import { GlowButton } from '@/components/ui/GlowButton';
import { MOTION_EASE } from '@/lib/motion/tokens';

export function ProductCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const defaultVariant = product.variants[0];
  const primaryImage = product.images[0];

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, defaultVariant, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Card3D
      as="article"
      maxTilt={5}
      className="h-full"
      surfaceClassName="group bg-[#F6EFE2]/[0.13] hover:bg-[#F6EFE2]/[0.20] backdrop-blur-[18px] border border-white/25 p-5 flex flex-col justify-between transition-colors duration-300"
    >
      <Link href={`/product/${product.slug}`} className="block">
        {product.badges.length > 0 && (
          <Card3DLayer depth={10} className="mb-3">
            <span className="inline-block font-ui-label text-[10px] px-2.5 py-0.5 rounded-[4px] bg-oat/15 text-peach border border-white/20">
              {product.badges[0]}
            </span>
          </Card3DLayer>
        )}

        <Card3DLayer depth={8} className="mb-4">
          <div className="relative rounded-[6px] aspect-square bg-[#F6EFE2]/[0.10] border border-white/20 flex items-center justify-center overflow-hidden">
            <ProductImageWithFallback
              src={primaryImage?.src || ''}
              alt={primaryImage?.alt || product.name}
              fill
              className={
                primaryImage?.src?.includes('/assets/products/')
                  ? 'object-cover transition-transform duration-500 ease-[var(--ease-smooth)] group-hover:scale-106'
                  : 'object-contain p-5 transition-transform duration-500 ease-[var(--ease-smooth)] group-hover:scale-106'
              }
            />
          </div>
        </Card3DLayer>

        <Card3DLayer depth={10}>
          <span className="font-ui-label text-[10px] text-peach/90 block mb-1.5">
            {product.origin}
          </span>

          <h3 className="font-display text-xl font-medium text-oat group-hover:text-peach transition-colors duration-200 leading-snug line-clamp-1 mb-1.5">
            {product.name}
          </h3>

          <p className="text-xs sm:text-sm text-apricot/85 line-clamp-2 mb-4 leading-relaxed">
            {product.shortDescription}
          </p>
        </Card3DLayer>
      </Link>

      <Card3DLayer
        depth={12}
        className="pt-3.5 border-t border-white/15 flex items-center justify-between gap-2 mt-auto"
      >
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-semibold text-oat">
              ₹{defaultVariant.price}
            </span>
            {defaultVariant.mrp > defaultVariant.price && (
              <span className="text-xs text-apricot/50 line-through">
                ₹{defaultVariant.mrp}
              </span>
            )}
          </div>
          <span className="text-[11px] text-apricot/75">
            / {defaultVariant.weight}
          </span>
        </div>

        <GlowButton
          type="button"
          variant={added ? 'secondary' : 'primary'}
          size="sm"
          onClick={handleAdd}
          disabled={added}
          aria-label={`Add ${product.name} to bag`}
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
                <Check className="w-3.5 h-3.5" />
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
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </motion.span>
            )}
          </AnimatePresence>
        </GlowButton>
      </Card3DLayer>
    </Card3D>
  );
}
