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
      maxTilt={7}
      className="h-full"
      surfaceClassName="group bg-apricot/45 hover:bg-apricot/85 border-2 border-charcoal p-4 flex flex-col justify-between transition-colors duration-250"
    >
      <Link href={`/product/${product.slug}`} className="block">
        {product.badges.length > 0 && (
          <Card3DLayer depth={12} className="mb-2">
            <span className="glow-badge inline-block font-ui-label text-[10px] px-2.5 py-0.5 rounded-full bg-peach text-indigo border border-charcoal/25">
              {product.badges[0]}
            </span>
          </Card3DLayer>
        )}

        <Card3DLayer depth={8} className="mb-3">
          <div className="relative rounded-xl aspect-square bg-oat border border-charcoal/20 p-4 flex items-center justify-center overflow-hidden glow-border">
            <ProductImageWithFallback
              src={primaryImage?.src || ''}
              alt={primaryImage?.alt || product.name}
              fill
              className="object-contain p-3 transition-transform duration-500 ease-[var(--ease-smooth)] group-hover:scale-108"
            />
          </div>
        </Card3DLayer>

        <Card3DLayer depth={12}>
          <span className="font-mono-meta text-[11px] text-cranberry block mb-1">
            {product.origin}
          </span>

          <h3 className="font-sans text-base font-semibold text-indigo group-hover:text-burnt transition-colors duration-200 leading-snug line-clamp-1 mb-1.5">
            {product.name}
          </h3>

          <p className="font-script-body text-sm text-indigo/90 line-clamp-2 mb-3">
            {product.shortDescription}
          </p>
        </Card3DLayer>
      </Link>

      <Card3DLayer
        depth={16}
        className="pt-3 border-t border-charcoal/15 flex items-center justify-between gap-2 mt-auto"
      >
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5">
            <span className="font-mono-meta font-bold text-base text-indigo">
              ₹{defaultVariant.price}
            </span>
            {defaultVariant.mrp > defaultVariant.price && (
              <span className="font-mono-meta text-xs text-indigo/50 line-through">
                ₹{defaultVariant.mrp}
              </span>
            )}
          </div>
          <span className="font-mono-meta text-[10px] text-indigo/75">
            / {defaultVariant.weight}
          </span>
        </div>

        <GlowButton
          type="button"
          variant="primary"
          size="sm"
          onClick={handleAdd}
          disabled={added}
          aria-label={`Add ${product.name} to bag`}
          className={added ? '!bg-cranberry !border-cranberry' : ''}
        >
          <AnimatePresence mode="wait" initial={false}>
            {added ? (
              <motion.span
                key="added"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.16, ease: MOTION_EASE.smooth }}
                className="inline-flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
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
