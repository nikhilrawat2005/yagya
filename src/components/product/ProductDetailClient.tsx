'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { Check, ShoppingBag, Star, Minus, Plus } from 'lucide-react';
import { Product, ProductVariant } from '@/lib/data/products';
import { useCartStore } from '@/lib/store/cartStore';
import { ProductImageWithFallback } from '@/components/ui/ProductImageWithFallback';
import { checkPincodeDelivery } from '@/lib/services/productService';
import { ProductCard } from '@/components/product/ProductCard';
import { SpotlightCard } from '@/components/react-bits/SpotlightCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { GlowInput } from '@/components/ui/GlowInput';
import { AnimatedTabs, AnimatedTabPanel } from '@/components/ui/AnimatedTabs';
import { FadeInSection } from '@/components/motion/FadeInSection';
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger';
import { OatSheet } from '@/components/editorial/OatSheet';
import { SplitText } from '@/components/react-bits/SplitText';
import { Doodle } from '@/components/doodles';
import { MOTION_EASE, MOTION_SPRING } from '@/lib/motion/tokens';
import { useInteractiveCapabilities } from '@/lib/motion/useInteractiveCapabilities';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const hasNutrition = product.nutritionFacts.length > 0;
  const isStudioPhoto = product.images[0]?.src?.includes('/assets/products/');

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<{ serviceable?: boolean; message?: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'origin' | 'nutrition' | 'rituals' | 'storage'>(
    hasNutrition ? 'nutrition' : 'origin'
  );
  const [added, setAdded] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const { prefersReducedMotion } = useInteractiveCapabilities();

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
        : { serviceable: false, message: 'Enter a valid 6-digit PIN code.' }
    );
  };

  const infoTabs = [
    ...(hasNutrition ? [{ id: 'nutrition' as const, label: 'Nutrition Facts' }] : []),
    { id: 'origin' as const, label: 'Ingredients & Allergens' },
    { id: 'rituals' as const, label: 'How to Enjoy' },
    { id: 'storage' as const, label: 'Storage' },
  ];

  return (
    <div className="min-h-[100dvh] bg-navy text-oat pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="text-xs text-apricot/85 mb-6 flex flex-wrap items-center gap-2">
          <Link href="/" className="nav-link-underline hover:text-oat">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/shop" className="nav-link-underline hover:text-oat">Collection</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/shop?category=${product.categorySlug}`} className="nav-link-underline hover:text-oat">
            {product.category}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-oat font-medium">{product.name}</span>
        </nav>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Frosted Oat Sheet Frame */}
          <FadeInSection direction="right" className="lg:col-span-6">
            <SpotlightCard
              spotlightColor="rgba(223, 127, 37, 0.14)"
              className={`group bg-[#141C2B]/55 overflow-hidden ${
                isStudioPhoto ? 'p-3 sm:p-4' : 'p-6 sm:p-8'
              }`}
            >
              <div className="relative aspect-square w-full rounded-[4px] overflow-hidden bg-navy/30">
                <ProductImageWithFallback
                  src={product.images[0]?.src || ''}
                  alt={product.images[0]?.alt || product.name}
                  fill
                  preload
                  className={`transition-transform duration-500 ease-[var(--ease-smooth)] group-hover:scale-105 ${
                    isStudioPhoto ? 'object-cover' : 'object-contain p-8'
                  }`}
                />
              </div>
            </SpotlightCard>
          </FadeInSection>

          {/* Right: Buy Box */}
          <FadeInSection direction="left" className="lg:col-span-6 flex flex-col">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="font-ui-label text-[11px] text-peach">
                {product.origin} · {product.provenance}
              </span>
              {product.badges[0] && (
                <span className="inline-flex items-center gap-1.5 font-ui-label text-[10px] px-2.5 py-0.5 rounded-[4px] bg-flame text-navy font-semibold whitespace-nowrap">
                  <span>{product.badges[0]}</span>
                  <Doodle
                    name="sparkle-trio-asymmetric"
                    preset="accent"
                    tone="navy"
                    size={16}
                    inline
                  />
                </span>
              )}
            </div>
            <SplitText
              as="h1"
              trigger="mount"
              text={product.name}
              className="font-display text-4xl sm:text-5xl text-oat font-medium mb-3"
            />

            {/* Rating */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex items-center gap-0.5 text-flame" aria-label={`Rated ${product.rating} out of 5`}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-flame text-flame" aria-hidden="true" />
                ))}
              </div>
              <span className="text-xs font-semibold text-oat tabular-nums">{product.rating}</span>
              <span className="text-xs text-apricot/85 tabular-nums">({product.reviewCount} reviews)</span>
            </div>

            <p className="text-sm sm:text-base text-apricot/95 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Price */}
            <OatSheet tone="subtle" interactive={false} className="p-4 mb-6 flex items-center justify-between gap-4">
              <div className="tabular-nums">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={selectedVariant.price}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="font-display text-3xl font-semibold text-oat inline-block"
                  >
                    ₹{selectedVariant.price}
                  </motion.span>
                </AnimatePresence>
                {selectedVariant.mrp > selectedVariant.price && (
                  <span className="text-sm text-apricot/65 line-through ml-2">
                    ₹{selectedVariant.mrp}
                  </span>
                )}
                <p className="text-[11px] text-apricot/85 mt-1">
                  {selectedVariant.weight} · Free dispatch over ₹499
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="hidden md:inline-flex items-center gap-1.5 text-xs text-apricot/95">
                  <Doodle
                    name="leaf-pair-whisper"
                    preset="botanical"
                    tone="oat"
                    size={22}
                    hover
                    showOn="md+"
                    inline
                  />
                  <span>100% Pure &amp; Unprocessed</span>
                </span>
                <span className="font-ui-label text-[10px] bg-oat/15 text-peach px-3 py-1 rounded-[4px] border border-white/20">
                  In Stock
                </span>
              </div>
            </OatSheet>

            {/* Pack Sizes */}
            <div className="mb-6">
              <span className="font-ui-label text-[11px] text-apricot/95 block mb-2.5">
                Pack Size: {selectedVariant.label}
              </span>
              <div className="flex flex-wrap gap-2.5">
                {product.variants.map((v) => {
                  const isSelected = selectedVariant.id === v.id;
                  return (
                    <motion.button
                      key={v.id}
                      type="button"
                      aria-pressed={isSelected}
                      whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                      transition={MOTION_SPRING.tactile}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-4 py-2.5 rounded-[4px] border text-left transition-[background-color,border-color,color,box-shadow] duration-200 cursor-pointer tabular-nums ${
                        isSelected
                          ? 'border-flame bg-flame text-navy font-semibold shadow-[var(--sheet-shadow)]'
                          : 'border-white/25 bg-oat/[0.10] text-oat hover:border-apricot/55 hover:bg-oat/[0.18]'
                      }`}
                    >
                      <p className="text-xs font-semibold">{v.weight}</p>
                      <p className="text-[11px] opacity-90">₹{v.price}</p>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Quantity & CTA */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-white/25 rounded-[4px] bg-oat/[0.12] px-2 py-1.5">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                  className="w-7 h-7 flex items-center justify-center text-oat hover:text-peach cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
                <span className="px-4 text-sm font-semibold tabular-nums">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                  className="w-7 h-7 flex items-center justify-center text-oat hover:text-peach cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>

              <GlowButton
                type="button"
                variant={added ? 'secondary' : 'cta'}
                magnetic
                onClick={handleAddToCart}
                className="flex-1 py-3.5"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {added ? (
                    <motion.span
                      key="added"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.16, ease: MOTION_EASE.smooth }}
                      className="inline-flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" aria-hidden="true" />
                      <span>Added to Bag</span>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="add"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.16, ease: MOTION_EASE.smooth }}
                      className="inline-flex items-center gap-2 tabular-nums"
                    >
                      <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                      <span>Add to Bag · ₹{selectedVariant.price * quantity}</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </GlowButton>
            </div>

            {/* PIN Checker */}
            <OatSheet tone="subtle" interactive={false} className="p-4 mb-8">
              <label htmlFor="delivery-pincode" className="font-ui-label text-[10px] text-peach block mb-2">
                Check Delivery PIN Code
              </label>
              <form onSubmit={handlePincodeCheck} className="flex items-start gap-2">
                <GlowInput
                  id="delivery-pincode"
                  name="pincode"
                  autoComplete="postal-code"
                  inputMode="numeric"
                  spellCheck={false}
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  placeholder="122001…"
                  aria-label="6-digit delivery PIN code"
                  containerClassName="w-44"
                />
                <GlowButton type="submit" variant="submit" size="sm" className="py-2.5 px-5">
                  Verify
                </GlowButton>
              </form>
              <div aria-live="polite">
                <AnimatePresence>
                  {pincodeStatus && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.18 }}
                      className="text-xs mt-2 text-peach"
                    >
                      {pincodeStatus.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </OatSheet>

            {/* Info Tabs */}
            <div className="border-t border-white/15 pt-6">
              <AnimatedTabs
                tabs={infoTabs}
                activeTab={activeTab}
                onChange={setActiveTab}
                layoutId="product-detail-tabs"
                variant="underline"
                className="mb-4"
              />

              <AnimatedTabPanel tabKey={activeTab}>
                {activeTab === 'nutrition' && (
                  <div className="space-y-3">
                    <p className="text-xs text-apricot/90">
                      Serving Size: {product.servingSize}
                    </p>
                    <OatSheet tone="subtle" interactive={false} className="overflow-hidden">
                      <table className="w-full text-left text-xs tabular-nums">
                        <thead className="bg-oat/10 border-b border-white/15 font-ui-label text-[10px] text-peach">
                          <tr>
                            <th className="px-3.5 py-2.5">Nutrient</th>
                            <th className="px-3.5 py-2.5">Per 100g</th>
                            <th className="px-3.5 py-2.5">Per Serve</th>
                            <th className="px-3.5 py-2.5">% RDA</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10 text-[11px] text-oat/95">
                          {product.nutritionFacts.map((row) => (
                            <tr key={row.nutrient} className="hover:bg-oat/[0.06] transition-colors">
                              <td className="px-3.5 py-2 font-medium">{row.nutrient}</td>
                              <td className="px-3.5 py-2">{row.per100g}</td>
                              <td className="px-3.5 py-2 font-semibold text-peach">{row.perServe}</td>
                              <td className="px-3.5 py-2">{row.rda ?? '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </OatSheet>
                    <p className="text-[11px] text-apricot/85">{product.nutritionFootnote}</p>
                  </div>
                )}

                {activeTab === 'origin' && (
                  <div className="space-y-3 text-sm text-apricot/95 leading-relaxed">
                    <p><strong className="text-oat">Ingredients:</strong> {product.ingredients}</p>
                    <p><strong className="text-oat">Allergen Advice:</strong> {product.allergenAdvice}</p>
                  </div>
                )}

                {activeTab === 'rituals' && (
                  <ul className="list-disc pl-5 space-y-2 text-sm text-apricot/95">
                    {product.howToUse.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}

                {activeTab === 'storage' && (
                  <p className="text-sm text-apricot/95 leading-relaxed">{product.storage}</p>
                )}
              </AnimatedTabPanel>
            </div>
          </FadeInSection>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 pt-10 border-t border-white/15">
            <FadeInSection>
              <div className="flex items-center gap-3 mb-8">
                <SplitText
                  as="h2"
                  trigger="scroll"
                  text="More Farm-Direct Harvests"
                  className="font-display text-3xl text-oat font-medium"
                />
                <Doodle
                  name="arrow-short-nudge"
                  preset="connector"
                  tone="oat"
                  size={28}
                  opacity={0.85}
                  showOn="md+"
                  inline
                  className="shrink-0 mt-1"
                />
              </div>
            </FadeInSection>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <StaggerItem key={p.id}>
                  <ProductCard product={p} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>
        )}
      </div>
    </div>
  );
}
