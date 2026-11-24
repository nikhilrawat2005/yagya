'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { Check, Plus } from 'lucide-react';
import { Product } from '@/lib/data/products';
import { useCartStore } from '@/lib/store/cartStore';
import { ProductImageWithFallback } from '@/components/ui/ProductImageWithFallback';

export function ProductCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const prefersReducedMotion = useReducedMotion();

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
    <motion.article
      whileHover={prefersReducedMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="group bg-apricot/45 hover:bg-apricot/85 border-2 border-charcoal rounded-2xl p-4 flex flex-col justify-between transition-colors duration-250"
    >
      <Link href={`/product/${product.slug}`} className="block">
        {product.badges.length > 0 && (
          <div className="mb-2">
            <span className="inline-block font-ui-label text-[10px] px-2.5 py-0.5 rounded-full bg-peach text-indigo border border-charcoal/25">
              {product.badges[0]}
            </span>
          </div>
        )}

        <div className="relative rounded-xl aspect-square bg-oat mb-3 border border-charcoal/20 p-4 flex items-center justify-center overflow-hidden">
          <ProductImageWithFallback
            src={primaryImage?.src || ''}
            alt={primaryImage?.alt || product.name}
            fill
            className="object-contain p-3 transition-transform duration-300 ease-out group-hover:scale-105"
          />
        </div>

        <span className="font-mono-meta text-[11px] text-cranberry block mb-1">
          {product.origin}
        </span>

        <h3 className="font-sans text-base font-semibold text-indigo group-hover:text-burnt transition-colors duration-200 leading-snug line-clamp-1 mb-1.5">
          {product.name}
        </h3>

        <p className="font-script-body text-sm text-indigo/90 line-clamp-2 mb-3">
          {product.shortDescription}
        </p>
      </Link>

      <div className="pt-3 border-t border-charcoal/15 flex items-center justify-between gap-2 mt-auto">
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

        <motion.button
          type="button"
          onClick={handleAdd}
          disabled={added}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
          aria-label={`Add ${product.name} to bag`}
          className={`relative overflow-hidden px-4 py-2 rounded-full font-ui-label text-[11px] transition-colors duration-250 inline-flex items-center gap-1.5 cursor-pointer group/btn ${
            added
              ? 'bg-cranberry text-oat'
              : 'bg-indigo text-oat hover:bg-burnt'
          }`}
        >
          <span
            aria-hidden="true"
            className={`absolute inset-0 bg-burnt -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300 ease-out ${
              added ? 'hidden' : ''
            }`}
          />
          <span className="relative z-10 inline-flex items-center gap-1.5">
            {added ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            <span>{added ? 'Added' : 'Add'}</span>
          </span>
        </motion.button>
      </div>
    </motion.article>
  );
}
