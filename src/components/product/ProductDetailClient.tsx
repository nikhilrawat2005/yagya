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
import { Card3D, Card3DLayer } from '@/components/ui/Card3D';
import { GlowButton } from '@/components/ui/GlowButton';
import { GlowInput } from '@/components/ui/GlowInput';
import { AnimatedTabs, AnimatedTabPanel } from '@/components/ui/AnimatedTabs';
import { FadeInSection } from '@/components/motion/FadeInSection';
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger';
import { OatSheet } from '@/components/editorial/OatSheet';
import { DoodleSVG } from '@/components/editorial/DoodleSVG';
import { MOTION_EASE, MOTION_SPRING } from '@/lib/motion/tokens';
import { useInteractiveCapabilities } from '@/lib/motion/useInteractiveCapabilities';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const hasNutrition = product.nutritionFacts.length > 0;
  const isStudioPhoto = product.images[0]?.src?.includes('/images/products/');

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
    <div className="min-h-dvh bg-navy text-oat pt-[calc(5.5rem+var(--safe-top))] pb-20 md:pt-28 md:pb-24">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-14 pl-[max(1rem,var(--safe-left))] pr-[max(1rem,var(--safe-right))]">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="text-xs text-apricot/75 mb-6 flex flex-wrap items-center gap-2">
          <Link href="/" className="nav-link-underline min-h-[44px] hover:text-oat">Home</Link>
          <span>/</span>
          <Link href="/shop" className="nav-link-underline min-h-[44px] hover:text-oat">Collection</Link>
          <span>/</span>
          <Link href={`/shop?category=${product.categorySlug}`} className="nav-link-underline min-h-[44px] hover:text-oat">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-oat font-medium">{product.name}</span>
        </nav>

        {/* Main Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 landscape-phone:grid-cols-12 gap-8 lg:gap-10 landscape-phone:gap-6 items-start">
          {/* Left: Frosted Oat Sheet Frame */}
          <FadeInSection direction="right" className="lg:col-span-6 landscape-phone:col-span-5">
            <Card3D
              maxTilt={5}
              className="max-w-[440px] lg:max-w-none landscape-phone:max-w-[260px] mx-auto w-full"
              surfaceClassName={`group bg-[#F6EFE2]/[0.14] oat-sheet-blur border border-white/25 flex items-center justify-center overflow-hidden aspect-square ${
                isStudioPhoto ? 'p-3 sm:p-4' : 'p-8'
              }`}
            >
              <Card3DLayer depth={14} className="w-full h-full flex items-center justify-center">
                <div className="relative w-full h-full rounded-[4px] overflow-hidden">
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
              </Card3DLayer>
              {product.badges[0] && (
                <Card3DLayer depth={18} className="absolute top-4 left-4 z-20">
                  <span className="inline-block font-ui-label text-[10px] px-3 py-1 rounded-[4px] bg-flame text-oat">
                    {product.badges[0]}
                  </span>
                </Card3DLayer>
              )}
              <DoodleSVG
                name="star"
                tone="peach"
                delay={0.25}
                className="absolute top-4 right-4 w-7 h-7 z-20 opacity-80"
              />
            </Card3D>
          </FadeInSection>

          {/* Right: Buy Box */}
          <FadeInSection direction="left" className="lg:col-span-6 landscape-phone:col-span-7 flex flex-col">
            <span className="font-ui-label text-[11px] text-peach mb-2">
              {product.origin} · {product.provenance}
            </span>
            <h1 className="font-display text-fluid-h2 text-oat font-medium mb-3">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex items-center gap-0.5 text-flame">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-flame text-flame" />
                ))}
              </div>
              <span className="text-xs font-semibold text-oat">{product.rating}</span>
              <span className="text-xs text-apricot/75">({product.reviewCount} reviews)</span>
            </div>

            <p className="text-fluid-body text-apricot/90 mb-6">
              {product.description}
            </p>

            {/* Price */}
            <OatSheet tone="subtle" interactive={false} padding="compact" className="mb-6 flex items-baseline justify-between">
              <div>
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
                  <span className="text-sm text-apricot/50 line-through ml-2">
                    ₹{selectedVariant.mrp}
                  </span>
                )}
                <p className="text-xs text-apricot/75 mt-1">
                  {selectedVariant.weight} · Free dispatch over ₹499
                </p>
              </div>
              <span className="font-ui-label text-[10px] bg-oat/15 text-peach px-3 py-1 rounded-[4px] border border-white/20">
                In Stock
              </span>
            </OatSheet>

            {/* Pack Sizes */}
            <div className="mb-6">
              <span className="font-ui-label text-[11px] text-apricot/90 block mb-2.5">
                Pack Size: {selectedVariant.label}
              </span>
              <div className="flex flex-wrap gap-2.5">
                {product.variants.map((v) => {
                  const isSelected = selectedVariant.id === v.id;
                  return (
                    <motion.button
                      key={v.id}
                      type="button"
                      whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                      transition={MOTION_SPRING.tactile}
                      onClick={() => setSelectedVariant(v)}
                      className={`min-h-[44px] min-w-[76px] px-4 py-2 rounded-[4px] border text-left transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'border-flame bg-flame text-oat shadow-[var(--glow-level-1)]'
                          : 'border-white/25 bg-oat/[0.10] text-oat hover:border-apricot/50 hover:bg-oat/[0.18]'
                      }`}
                    >
                      <p className="text-xs font-semibold">{v.weight}</p>
                      <p className="text-xs opacity-85">₹{v.price}</p>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Quantity & CTA */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-6">
              <div className="inline-flex items-center justify-between sm:justify-start border border-white/25 rounded-[4px] bg-oat/[0.12] px-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center text-oat hover:text-peach cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-semibold">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center text-oat hover:text-peach cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <GlowButton
                type="button"
                variant={added ? 'secondary' : 'cta'}
                magnetic
                onClick={handleAddToCart}
                className="flex-1 min-h-[48px]"
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
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="add"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.16, ease: MOTION_EASE.smooth }}
                      className="inline-flex items-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag · ₹{selectedVariant.price * quantity}</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </GlowButton>
            </div>

            {/* PIN Checker */}
            <OatSheet tone="subtle" interactive={false} padding="compact" className="mb-8">
              <span className="font-ui-label text-[10px] text-peach block mb-2">
                Check Delivery PIN Code
              </span>
              <form onSubmit={handlePincodeCheck} className="flex flex-col sm:flex-row items-stretch sm:items-start gap-2.5">
                <GlowInput
                  type="text"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  placeholder="6-digit PIN"
                  aria-label="6-digit delivery PIN code"
                  containerClassName="w-full sm:w-44"
                />
                <GlowButton type="submit" variant="submit" size="sm" className="w-full sm:w-auto min-h-[48px] px-5 shrink-0">
                  Verify
                </GlowButton>
              </form>
              <AnimatePresence>
                {pincodeStatus && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.18 }}
                    className={`text-xs mt-2 ${pincodeStatus.serviceable ? 'text-peach' : 'text-flame'}`}
                  >
                    {pincodeStatus.message}
                  </motion.p>
                )}
              </AnimatePresence>
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
                    <p className="text-xs text-apricot/80">
                      Serving Size: {product.servingSize}
                    </p>
                    <OatSheet tone="subtle" interactive={false} className="overflow-x-auto">
                      <table className="w-full min-w-[300px] text-left text-xs">
                        <thead className="bg-oat/10 border-b border-white/15 font-ui-label text-[10px] text-peach">
                          <tr>
                            <th className="px-3.5 py-2.5">Nutrient</th>
                            <th className="px-3.5 py-2.5">Per 100g</th>
                            <th className="px-3.5 py-2.5">Per Serve</th>
                            <th className="px-3.5 py-2.5">% RDA</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10 text-[11px] text-oat/90">
                          {product.nutritionFacts.map((row) => (
                            <tr key={row.nutrient} className="hover:bg-oat/[0.06] transition-colors">
                              <td className="px-3.5 py-2 font-medium">{row.nutrient}</td>
                              <td className="px-3.5 py-2">{row.per100g}</td>
                              <td className="px-3.5 py-2 font-semibold text-peach">{row.perServe}</td>
                              <td className="px-3.5 py-2">{row.rda ?? '—'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </OatSheet>
                    <p className="text-[11px] text-apricot/75">{product.nutritionFootnote}</p>
                  </div>
                )}

                {activeTab === 'origin' && (
                  <div className="space-y-3 text-sm text-apricot/90 leading-relaxed">
                    <p><strong className="text-oat">Ingredients:</strong> {product.ingredients}</p>
                    <p><strong className="text-oat">Allergen Advice:</strong> {product.allergenAdvice}</p>
                  </div>
                )}

                {activeTab === 'rituals' && (
                  <ul className="list-disc pl-5 space-y-2 text-sm text-apricot/90">
                    {product.howToUse.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}

                {activeTab === 'storage' && (
                  <p className="text-sm text-apricot/90 leading-relaxed">{product.storage}</p>
                )}
              </AnimatedTabPanel>
            </div>
          </FadeInSection>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 pt-12 border-t border-white/15">
            <FadeInSection>
              <span className="font-ui-label text-[11px] text-peach block mb-2">
                Pair With
              </span>
              <h2 className="font-display text-3xl text-oat font-medium mb-8">
                More Farm-Direct{' '}
                <span className="relative inline-block italic text-peach">
                  Harvests
                  <DoodleSVG
                    name="underline"
                    tone="flame"
                    delay={0.2}
                    className="absolute -bottom-1.5 left-0 w-full h-2.5"
                  />
                </span>
              </h2>
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
