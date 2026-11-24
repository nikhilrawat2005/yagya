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
      className="group bg-[#FDE6C8]/40 hover:bg-[#FDE6C8]/80 border-2 border-[#2B2B2B] rounded-2xl p-4 flex flex-col justify-between shadow-[2px_3px_0px_#2B2B2B] hover:shadow-[4px_5px_0px_#2B2B2B] transition-all relative"
    >
      <Link href={`/product/${product.slug}`} className="block">
        {/* Image Container with secondary crossfade */}
        <div className="relative rounded-xl overflow-hidden aspect-square bg-[#F6EFE2] mb-3 border border-[#2B2B2B]/20">
          {product.badges && product.badges.length > 0 && (
            <span className="absolute top-2.5 left-2.5 z-10 text-[10px] font-bold tracking-[0.08em] uppercase px-2.5 py-0.5 rounded-full bg-[#B3122D] text-white shadow-xs border border-[#2B2B2B]/30">
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
                  className={`object-cover transition-opacity duration-300 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              )}
            </motion.div>
          </div>
        </div>

        {/* Provenance Tag */}
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F28C1B]" />
          <span className="text-[11px] font-medium text-[#2B2B2B]/75 uppercase tracking-[0.06em]">
            {product.origin}
          </span>
        </div>

        {/* Product Title */}
        <h3 className="font-serif text-lg font-bold text-[#2E3175] group-hover:text-[#D9700B] transition-colors leading-snug line-clamp-1 mb-1">
          {product.name}
        </h3>

        {/* Short Description */}
        <p className="text-xs text-[#2B2B2B]/80 line-clamp-2 leading-relaxed mb-3">
          {product.shortDescription}
        </p>
      </Link>

      {/* Footer: Price + Quick Add Button */}
      <div className="pt-2 border-t border-[#2B2B2B]/15 flex items-center justify-between gap-2 mt-auto">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5">
            <span className="font-mono-meta font-bold text-base text-[#2E3175]">
              ₹{defaultVariant.price}
            </span>
            {defaultVariant.mrp > defaultVariant.price && (
              <span className="font-mono-meta text-xs text-[#2B2B2B]/50 line-through">
                ₹{defaultVariant.mrp}
              </span>
            )}
          </div>
          <span className="text-[10px] text-[#2B2B2B]/70 uppercase tracking-wider font-medium">
            {defaultVariant.weight}
          </span>
        </div>

        <button
          onClick={handleAdd}
          disabled={added}
          className={`px-3.5 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.08em] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
            added
              ? 'bg-[#B3122D] text-white'
              : 'bg-[#2E3175] text-[#F6EFE2] hover:bg-[#D9700B]'
          }`}
          aria-label={`Add ${product.name} to cart`}
        >
          {added ? (
            <>
              <span className="material-symbols-outlined text-sm">check</span>
              <span>Added</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-sm">add</span>
              <span>Add</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
