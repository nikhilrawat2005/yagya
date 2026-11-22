'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Product } from '@/lib/data/products';
import { useCartStore } from '@/lib/store/cartStore';
import { ProductImageWithFallback } from '@/components/ui/ProductImageWithFallback';

export function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const defaultVariant = product.variants[0];
  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, defaultVariant, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-surface-container-low rounded-xl p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative"
    >
      <Link href={`/product/${product.slug}`} className="block">
        {/* Image Container with secondary crossfade */}
        <div className="relative rounded-lg overflow-hidden aspect-square bg-surface mb-3">
          {product.badges && product.badges.length > 0 && (
            <span className="absolute top-2.5 left-2.5 z-10 text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-secondary text-surface shadow-xs">
              {product.badges[0]}
            </span>
          )}

          <div className="w-full h-full relative overflow-hidden">
            <motion.div
              animate={{ scale: isHovered ? 1.04 : 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full relative"
            >
              <ProductImageWithFallback
                src={primaryImage?.src || ''}
                alt={primaryImage?.alt || product.name}
                fill
                className={`object-cover transition-opacity duration-300 ${
                  isHovered && product.images.length > 1 ? 'opacity-0' : 'opacity-100'
                }`}
              />
              {product.images.length > 1 && (
                <ProductImageWithFallback
                  src={secondaryImage?.src || ''}
                  alt={secondaryImage?.alt || product.name}
                  fill
                  className={`object-cover absolute inset-0 transition-opacity duration-300 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              )}
            </motion.div>
          </div>
        </div>

        {/* Metadata */}
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-on-surface-variant font-medium">
            {defaultVariant?.weight || '250g'}
          </span>
          <div className="flex items-center gap-1 text-secondary">
            <span className="material-symbols-outlined text-[15px] fill-current text-secondary-container">
              star
            </span>
            <span className="text-xs font-semibold text-on-surface">{product.rating}</span>
            <span className="text-[11px] text-on-surface-variant">({product.reviewCount})</span>
          </div>
        </div>

        <h3 className="font-serif text-lg font-medium text-primary line-clamp-1 group-hover:text-secondary transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-on-surface-variant mt-1 line-clamp-2">
          {product.shortDescription}
        </p>
      </Link>

      {/* Price & Add Button */}
      <div className="mt-4 pt-2 border-t border-outline-variant/30 flex items-center justify-between gap-2">
        <div className="flex items-baseline gap-1.5">
          <span className="font-serif text-lg font-semibold text-primary">
            ₹{defaultVariant?.price}
          </span>
          {defaultVariant?.mrp && defaultVariant.mrp > defaultVariant.price && (
            <span className="text-xs text-on-surface-variant/60 line-through">
              ₹{defaultVariant.mrp}
            </span>
          )}
        </div>

        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={handleAdd}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer ${
            added
              ? 'bg-secondary text-on-secondary'
              : 'bg-primary-container text-surface hover:bg-secondary'
          }`}
        >
          {added ? (
            <>
              <span className="material-symbols-outlined text-[15px]">check</span>
              <span>Added</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[15px]">add</span>
              <span>Add</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
