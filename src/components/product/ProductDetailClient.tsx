'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Product, ProductVariant } from '@/lib/data/products';
import { useCartStore } from '@/lib/store/cartStore';
import { ProductImageWithFallback } from '@/components/ui/ProductImageWithFallback';
import { checkPincodeDelivery } from '@/lib/services/productService';
import { ProductCard } from '@/components/product/ProductCard';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<{ serviceable?: boolean; message?: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'origin' | 'nutrition' | 'rituals' | 'storage'>('origin');
  const [added, setAdded] = useState(false);

  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = () => {
    addItem(product, selectedVariant, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const handlePincodeCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode) return;
    const res = await checkPincodeDelivery(pincode);
    if (res.serviceable) {
      setPincodeStatus({ serviceable: true, message: `Dispatch ready! Delivery in ${res.estimatedDays}.` });
    } else {
      setPincodeStatus({ serviceable: false, message: 'Invalid or non-serviceable 6-digit postal code.' });
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="text-xs text-on-surface-variant mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-primary">
          Superfoods
        </Link>
        <span>/</span>
        <span className="text-primary font-medium">{product.name}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Image Gallery */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="relative rounded-2xl overflow-hidden aspect-square bg-surface-container-low shadow-sm border border-outline-variant/30">
            <ProductImageWithFallback
              src={product.images[selectedImageIndex]?.src || ''}
              alt={product.images[selectedImageIndex]?.alt || product.name}
              fill
              priority
              className="object-cover"
            />
            {product.badges && product.badges.length > 0 && (
              <span className="absolute top-4 left-4 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-secondary text-surface shadow-xs">
                {product.badges[0]}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden relative border-2 transition-all cursor-pointer ${
                    selectedImageIndex === idx ? 'border-primary ring-2 ring-primary/20' : 'border-outline-variant/50 opacity-70 hover:opacity-100'
                  }`}
                >
                  <ProductImageWithFallback src={img.src} alt={img.alt} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Buy Box */}
        <div className="lg:col-span-6 flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-widest text-secondary mb-1">
            {product.origin}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-primary font-normal mb-2">
            {product.name}
          </h1>
          <p className="text-xs text-on-surface-variant font-medium mb-3">{product.provenance}</p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center text-secondary">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="material-symbols-outlined text-base fill-current text-secondary-container">
                  star
                </span>
              ))}
            </div>
            <span className="text-xs font-semibold text-primary">{product.rating}</span>
            <span className="text-xs text-on-surface-variant">({product.reviewCount} verified reviews)</span>
          </div>

          {/* Price */}
          <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 mb-6 flex items-baseline justify-between">
            <div>
              <span className="font-serif text-3xl font-semibold text-primary">
                ₹{selectedVariant.price}
              </span>
              {selectedVariant.mrp > selectedVariant.price && (
                <span className="text-sm text-on-surface-variant/60 line-through ml-2">
                  ₹{selectedVariant.mrp}
                </span>
              )}
              <p className="text-[11px] text-on-surface-variant mt-0.5">Inclusive of all taxes · Free delivery &gt; ₹499</p>
            </div>
            <span className="text-xs font-semibold text-primary-container bg-primary-fixed px-2.5 py-1 rounded-full">
              In Stock
            </span>
          </div>

          {/* Variant Selector */}
          <div className="mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary block mb-2">
              Select Pack Size: <span className="font-normal text-on-surface-variant">{selectedVariant.label}</span>
            </span>
            <div className="grid grid-cols-3 gap-2">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v)}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    selectedVariant.id === v.id
                      ? 'border-primary bg-primary-container text-surface shadow-xs'
                      : 'border-outline-variant/60 bg-surface-container-low text-on-surface hover:border-primary/40'
                  }`}
                >
                  <p className="text-xs font-bold">{v.weight}</p>
                  <p className="text-[11px] opacity-80 mt-0.5">₹{v.price}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-outline-variant rounded-full bg-surface-container-low px-3 py-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-6 h-6 flex items-center justify-center text-on-surface-variant hover:text-primary cursor-pointer text-sm font-bold"
              >
                -
              </button>
              <span className="px-4 text-xs font-bold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-6 h-6 flex items-center justify-center text-on-surface-variant hover:text-primary cursor-pointer text-sm font-bold"
              >
                +
              </button>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleAddToCart}
              className={`flex-1 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm ${
                added ? 'bg-secondary text-on-secondary' : 'bg-primary-container text-surface hover:bg-secondary'
              }`}
            >
              <span className="material-symbols-outlined text-base">{added ? 'check' : 'shopping_bag'}</span>
              <span>{added ? 'Added to Cart' : `Add ${quantity} to Cart · ₹${selectedVariant.price * quantity}`}</span>
            </motion.button>
          </div>

          {/* Postal Pincode Checker */}
          <div className="p-4 rounded-xl bg-surface-container-low/70 border border-outline-variant/30 mb-8">
            <span className="text-xs font-semibold text-primary block mb-2">Check Delivery Cadence</span>
            <form onSubmit={handlePincodeCheck} className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter 6-digit PIN"
                className="bg-surface border border-outline-variant/60 rounded-full px-3.5 py-1.5 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary w-36"
              />
              <button
                type="submit"
                className="px-4 py-1.5 rounded-full bg-surface-container border border-outline-variant text-primary text-xs font-semibold uppercase tracking-wider hover:bg-primary-fixed transition-colors"
              >
                Verify
              </button>
            </form>
            {pincodeStatus && (
              <p className={`text-xs mt-2 ${pincodeStatus.serviceable ? 'text-primary' : 'text-error'}`}>
                {pincodeStatus.message}
              </p>
            )}
          </div>

          {/* Information Tabs */}
          <div className="border-t border-outline-variant/40 pt-6">
            <div className="flex border-b border-outline-variant/30 gap-6 text-xs font-semibold uppercase tracking-wider mb-4">
              <button
                onClick={() => setActiveTab('origin')}
                className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'origin' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-primary'
                }`}
              >
                Origin & Soil
              </button>
              <button
                onClick={() => setActiveTab('nutrition')}
                className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'nutrition' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-primary'
                }`}
              >
                Nutrition Facts
              </button>
              <button
                onClick={() => setActiveTab('rituals')}
                className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'rituals' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-primary'
                }`}
              >
                Daily Rituals
              </button>
              <button
                onClick={() => setActiveTab('storage')}
                className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'storage' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-primary'
                }`}
              >
                Storage
              </button>
            </div>

            <div className="text-xs text-on-surface-variant leading-relaxed">
              {activeTab === 'origin' && <p>{product.description}</p>}

              {activeTab === 'nutrition' && (
                <div className="grid grid-cols-2 gap-2">
                  {product.nutritionFacts.map((n, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-surface-container-low flex justify-between">
                      <span className="text-on-surface-variant">{n.label}</span>
                      <span className="font-semibold text-primary">{n.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'rituals' && (
                <ul className="list-disc pl-4 space-y-1.5">
                  {product.howToUse.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              )}

              {activeTab === 'storage' && <p>{product.storage}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Add-to-Cart Bar on Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface-container-low/95 backdrop-blur-md border-t border-outline-variant p-3 px-4 flex items-center justify-between shadow-lg">
        <div>
          <span className="font-serif text-lg font-bold text-primary">₹{selectedVariant.price}</span>
          <p className="text-[10px] text-on-surface-variant">{selectedVariant.weight}</p>
        </div>
        <button
          onClick={handleAddToCart}
          className="px-6 py-2.5 rounded-full bg-primary-container text-surface font-semibold text-xs uppercase tracking-wider"
        >
          {added ? 'Added ✓' : 'Add to Cart'}
        </button>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-24 pt-12 border-t border-outline-variant/40">
          <div className="mb-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-secondary block mb-1">
              Complementary Nourishment
            </span>
            <h2 className="font-serif text-2xl text-primary font-normal">Pairs well with</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
