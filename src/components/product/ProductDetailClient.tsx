'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, ShoppingBag, Star, Minus, Plus } from 'lucide-react';
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
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<{ serviceable?: boolean; message?: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'origin' | 'nutrition' | 'rituals' | 'storage'>('nutrition');
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
    setPincodeStatus(
      res.serviceable
        ? { serviceable: true, message: `Dispatch ready. Estimated delivery in ${res.estimatedDays}.` }
        : { serviceable: false, message: 'Enter a valid 6-digit Indian PIN code.' }
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="font-mono-meta text-xs text-indigo/75 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-burnt">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-burnt">Superfoods</Link>
        <span>/</span>
        <Link href={`/shop?category=${product.categorySlug}`} className="hover:text-burnt">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-indigo font-bold">{product.name}</span>
      </nav>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: 3D Showcase Frame */}
        <div className="lg:col-span-6">
          <div className="relative rounded-2xl aspect-square bg-apricot/60 border-2 border-charcoal flex items-center justify-center p-8 overflow-hidden">
            <ProductImageWithFallback
              src={product.images[0]?.src || ''}
              alt={product.images[0]?.alt || product.name}
              fill
              priority
              className="object-contain p-8"
            />
            {product.badges[0] && (
              <span className="absolute top-4 left-4 font-ui-label text-[10px] px-3 py-1 rounded-full bg-seabuckthorn text-oat border border-charcoal/30">
                {product.badges[0]}
              </span>
            )}
          </div>
        </div>

        {/* Right: Buy Box */}
        <div className="lg:col-span-6 flex flex-col">
          <span className="font-mono-meta text-xs text-cranberry uppercase tracking-wider mb-1">
            {product.origin} · {product.provenance}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl text-indigo font-semibold leading-tight mb-3">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-5">
            <div className="flex items-center gap-0.5 text-seabuckthorn">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-seabuckthorn text-seabuckthorn" />
              ))}
            </div>
            <span className="font-mono-meta text-xs font-bold text-indigo">{product.rating}</span>
            <span className="font-sans text-xs text-indigo/75">({product.reviewCount} reviews)</span>
          </div>

          <p className="font-script-body text-base text-indigo mb-6">
            {product.description}
          </p>

          {/* Price */}
          <div className="p-4 rounded-xl bg-apricot/50 border border-charcoal/25 mb-6 flex items-baseline justify-between">
            <div>
              <span className="font-mono-meta text-3xl font-bold text-indigo">
                ₹{selectedVariant.price}
              </span>
              {selectedVariant.mrp > selectedVariant.price && (
                <span className="font-mono-meta text-sm text-indigo/50 line-through ml-2">
                  ₹{selectedVariant.mrp}
                </span>
              )}
              <p className="font-mono-meta text-[11px] text-indigo/75 mt-1">
                {selectedVariant.weight} · Free dispatch over ₹499
              </p>
            </div>
            <span className="font-ui-label text-[10px] bg-peach text-indigo px-3 py-1 rounded-full border border-charcoal/20">
              In Stock
            </span>
          </div>

          {/* Pack Sizes */}
          <div className="mb-6">
            <span className="font-ui-label text-xs text-indigo block mb-2">
              Pack Size: {selectedVariant.label}
            </span>
            <div className="flex flex-wrap gap-2.5">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSelectedVariant(v)}
                  className={`px-4 py-2.5 rounded-xl border-2 text-left transition-colors cursor-pointer ${
                    selectedVariant.id === v.id
                      ? 'border-charcoal bg-indigo text-oat'
                      : 'border-charcoal/25 bg-oat text-indigo hover:bg-apricot'
                  }`}
                >
                  <p className="font-mono-meta text-xs font-bold">{v.weight}</p>
                  <p className="font-mono-meta text-[11px] opacity-85">₹{v.price}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & CTA */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border-2 border-charcoal rounded-full bg-oat px-2 py-1.5">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
                className="w-7 h-7 flex items-center justify-center text-indigo hover:text-burnt cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-4 font-mono-meta text-sm font-bold">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Increase quantity"
                className="w-7 h-7 flex items-center justify-center text-indigo hover:text-burnt cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className={`flex-1 py-3.5 rounded-full font-ui-label text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                added ? 'bg-cranberry text-oat' : 'bg-indigo text-oat hover:bg-burnt'
              }`}
            >
              {added ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
              <span>{added ? 'Added to Bag' : `Add to Bag · ₹${selectedVariant.price * quantity}`}</span>
            </button>
          </div>

          {/* PIN Checker */}
          <div className="p-4 rounded-xl bg-apricot/40 border border-charcoal/20 mb-8">
            <span className="font-ui-label text-[11px] text-indigo block mb-2">
              Check Delivery PIN Code
            </span>
            <form onSubmit={handlePincodeCheck} className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                placeholder="6-digit PIN"
                className="bg-oat border border-charcoal/30 rounded-full px-3.5 py-1.5 text-xs text-indigo focus:outline-none w-36"
              />
              <button
                type="submit"
                className="px-4 py-1.5 rounded-full bg-indigo text-oat hover:bg-burnt font-ui-label text-[11px] transition-colors cursor-pointer"
              >
                Verify
              </button>
            </form>
            {pincodeStatus && (
              <p className={`text-xs mt-2 font-sans ${pincodeStatus.serviceable ? 'text-indigo' : 'text-cranberry'}`}>
                {pincodeStatus.message}
              </p>
            )}
          </div>

          {/* Info Tabs */}
          <div className="border-t border-charcoal/20 pt-6">
            <div className="flex flex-wrap border-b border-charcoal/20 gap-6 font-ui-label text-xs mb-4">
              {(['nutrition', 'origin', 'rituals', 'storage'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                    activeTab === tab
                      ? 'border-charcoal text-indigo'
                      : 'border-transparent text-indigo/65 hover:text-indigo'
                  }`}
                >
                  {tab === 'nutrition'
                    ? 'Nutrition Facts'
                    : tab === 'origin'
                    ? 'Ingredients & Allergens'
                    : tab === 'rituals'
                    ? 'How to Enjoy'
                    : 'Storage'}
                </button>
              ))}
            </div>

            {activeTab === 'nutrition' && (
              <div className="space-y-3">
                <p className="font-mono-meta text-xs text-indigo/80">
                  Serving Size: {product.servingSize}
                </p>
                <div className="border border-charcoal/25 rounded-xl overflow-hidden bg-oat">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-apricot border-b border-charcoal/20 font-ui-label text-[10px]">
                      <tr>
                        <th className="px-3 py-2">Nutrient</th>
                        <th className="px-3 py-2">Per 100g</th>
                        <th className="px-3 py-2">Per Serve</th>
                        <th className="px-3 py-2">% RDA</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-charcoal/10 font-mono-meta text-[11px]">
                      {product.nutritionFacts.map((row) => (
                        <tr key={row.nutrient}>
                          <td className="px-3 py-1.5 font-sans font-medium">{row.nutrient}</td>
                          <td className="px-3 py-1.5">{row.per100g}</td>
                          <td className="px-3 py-1.5 font-bold text-indigo">{row.perServe}</td>
                          <td className="px-3 py-1.5">{row.rda ?? '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[11px] font-sans text-indigo/75">{product.nutritionFootnote}</p>
              </div>
            )}

            {activeTab === 'origin' && (
              <div className="space-y-3 font-script-body text-sm text-indigo">
                <p><strong>Ingredients:</strong> {product.ingredients}</p>
                <p><strong>Allergen Advice:</strong> {product.allergenAdvice}</p>
              </div>
            )}

            {activeTab === 'rituals' && (
              <ul className="list-disc pl-5 space-y-2 font-script-body text-sm text-indigo">
                {product.howToUse.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}

            {activeTab === 'storage' && (
              <p className="font-script-body text-sm text-indigo">{product.storage}</p>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 pt-12 border-t border-charcoal/20">
          <span className="font-mono-meta text-xs uppercase text-cranberry block mb-1">
            Pair With
          </span>
          <h2 className="font-display text-3xl text-indigo font-semibold mb-8">
            More Farm-Direct Harvests
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
