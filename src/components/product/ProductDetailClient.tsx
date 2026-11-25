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
import { MOTION_EASE, MOTION_SPRING } from '@/lib/motion/tokens';
import { useInteractiveCapabilities } from '@/lib/motion/useInteractiveCapabilities';
import { DoodleSparkle, DoodleLeaf, DoodleUnderline } from '@/components/doodles';

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
        : { serviceable: false, message: 'Enter a valid 6-digit Indian PIN code.' }
    );
  };

  const infoTabs = [
    { id: 'nutrition' as const, label: 'Nutrition Facts' },
    { id: 'origin' as const, label: 'Ingredients & Allergens' },
    { id: 'rituals' as const, label: 'How to Enjoy' },
    { id: 'storage' as const, label: 'Storage' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="font-mono-meta text-xs text-indigo/75 mb-6 flex flex-wrap items-center gap-2">
        <Link href="/" className="nav-link-underline nav-link-underline-left hover:text-burnt">
          Home
        </Link>
        <span>/</span>
        <Link href="/shop" className="nav-link-underline nav-link-underline-left hover:text-burnt">
          Superfoods
        </Link>
        <span>/</span>
        <Link
          href={`/shop?category=${product.categorySlug}`}
          className="nav-link-underline nav-link-underline-left hover:text-burnt"
        >
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-indigo font-bold">{product.name}</span>
      </nav>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: 3D Showcase Frame */}
        <FadeInSection direction="right" className="lg:col-span-6">
          <Card3D
            maxTilt={6}
            surfaceClassName="group bg-apricot/60 border-2 border-charcoal flex items-center justify-center p-8 overflow-hidden aspect-square"
          >
            <Card3DLayer depth={18} className="w-full h-full flex items-center justify-center">
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <ProductImageWithFallback
                  src={product.images[0]?.src || ''}
                  alt={product.images[0]?.alt || product.name}
                  fill
                  priority
                  className="object-contain p-8 transition-transform duration-500 ease-[var(--ease-smooth)] group-hover:scale-108"
                />
              </div>
            </Card3DLayer>
            {product.badges[0] && (
              <Card3DLayer depth={22} className="absolute top-4 left-4 z-20">
                <span className="glow-badge inline-block font-ui-label text-[10px] px-3 py-1 rounded-full bg-seabuckthorn text-oat border border-charcoal/30">
                  {product.badges[0]}
                </span>
              </Card3DLayer>
            )}
            <DoodleSparkle
              delay={0.25}
              className="absolute top-4 right-4 w-7 h-7 z-20 opacity-80"
            />
            <DoodleLeaf
              variant="sprig"
              delay={0.35}
              className="absolute bottom-3 right-3 w-11 h-11 z-20 opacity-75"
            />
          </Card3D>
        </FadeInSection>

        {/* Right: Buy Box */}
        <FadeInSection direction="left" className="lg:col-span-6 flex flex-col">
          <span className="font-mono-meta text-xs text-cranberry uppercase tracking-wider mb-1">
            {product.origin} · {product.provenance}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl text-indigo font-semibold leading-tight mb-3">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-5">
            <div className="flex items-center gap-0.5 text-seabuckthorn group">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-seabuckthorn text-seabuckthorn icon-hover-pop"
                />
              ))}
            </div>
            <span className="font-mono-meta text-xs font-bold text-indigo">{product.rating}</span>
            <span className="font-sans text-xs text-indigo/75">({product.reviewCount} reviews)</span>
          </div>

          <p className="font-script-body text-base text-indigo mb-6">
            {product.description}
          </p>

          {/* Price */}
          <div className="glow-border p-4 rounded-xl bg-apricot/50 border border-charcoal/25 mb-6 flex items-baseline justify-between">
            <div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={selectedVariant.price}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="font-mono-meta text-3xl font-bold text-indigo inline-block"
                >
                  ₹{selectedVariant.price}
                </motion.span>
              </AnimatePresence>
              {selectedVariant.mrp > selectedVariant.price && (
                <span className="font-mono-meta text-sm text-indigo/50 line-through ml-2">
                  ₹{selectedVariant.mrp}
                </span>
              )}
              <p className="font-mono-meta text-[11px] text-indigo/75 mt-1">
                {selectedVariant.weight} · Free dispatch over ₹499
              </p>
            </div>
            <span className="glow-badge font-ui-label text-[10px] bg-peach text-indigo px-3 py-1 rounded-full border border-charcoal/20">
              In Stock
            </span>
          </div>

          {/* Pack Sizes */}
          <div className="mb-6">
            <span className="font-ui-label text-xs text-indigo block mb-2">
              Pack Size: {selectedVariant.label}
            </span>
            <div className="flex flex-wrap gap-2.5">
              {product.variants.map((v) => {
                const isSelected = selectedVariant.id === v.id;
                return (
                  <motion.button
                    key={v.id}
                    type="button"
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
                    whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                    transition={MOTION_SPRING.tactile}
                    onClick={() => setSelectedVariant(v)}
                    className={`px-4 py-2.5 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'border-charcoal bg-indigo text-oat shadow-[var(--glow-level-2)]'
                        : 'border-charcoal/25 bg-oat text-indigo hover:bg-apricot hover:border-burnt hover:shadow-[var(--glow-level-1)]'
                    }`}
                  >
                    <p className="font-mono-meta text-xs font-bold">{v.weight}</p>
                    <p className="font-mono-meta text-[11px] opacity-85">₹{v.price}</p>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Quantity & CTA */}
          <div className="flex items-center gap-4 mb-6">
            <div className="glow-border flex items-center border-2 border-charcoal rounded-full bg-oat px-2 py-1.5">
              <motion.button
                type="button"
                whileTap={prefersReducedMotion ? undefined : { scale: 0.88 }}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
                className="w-7 h-7 rounded-full flex items-center justify-center text-indigo hover:text-burnt hover:bg-apricot/60 transition-colors cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </motion.button>
              <span className="px-4 font-mono-meta text-sm font-bold">{quantity}</span>
              <motion.button
                type="button"
                whileTap={prefersReducedMotion ? undefined : { scale: 0.88 }}
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Increase quantity"
                className="w-7 h-7 rounded-full flex items-center justify-center text-indigo hover:text-burnt hover:bg-apricot/60 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </motion.button>
            </div>

            <GlowButton
              type="button"
              variant="cta"
              magnetic
              onClick={handleAddToCart}
              className={`flex-1 py-3.5 ${added ? '!bg-cranberry !border-cranberry' : ''}`}
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
          <div className="glow-border p-4 rounded-xl bg-apricot/40 border border-charcoal/20 mb-8">
            <span className="font-ui-label text-[11px] text-indigo block mb-2">
              Check Delivery PIN Code
            </span>
            <form onSubmit={handlePincodeCheck} className="flex items-start gap-2">
              <GlowInput
                type="text"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                placeholder="6-digit PIN"
                aria-label="6-digit delivery PIN code"
                containerClassName="w-40"
              />
              <GlowButton type="submit" variant="submit" size="sm" className="py-2.5 px-5">
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
                  className={`text-xs mt-2 font-sans ${pincodeStatus.serviceable ? 'text-indigo font-medium' : 'text-cranberry'}`}
                >
                  {pincodeStatus.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Info Tabs */}
          <div className="border-t border-charcoal/20 pt-6">
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
                  <p className="font-mono-meta text-xs text-indigo/80">
                    Serving Size: {product.servingSize}
                  </p>
                  <div className="glow-border border border-charcoal/25 rounded-xl overflow-hidden bg-oat">
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
                          <tr key={row.nutrient} className="hover:bg-apricot/45 transition-colors">
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
                  <p>
                    <strong>Ingredients:</strong> {product.ingredients}
                  </p>
                  <p>
                    <strong>Allergen Advice:</strong> {product.allergenAdvice}
                  </p>
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
            </AnimatedTabPanel>
          </div>
        </FadeInSection>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 pt-12 border-t border-charcoal/20">
          <FadeInSection>
            <span className="font-mono-meta text-xs uppercase text-cranberry block mb-1">
              Pair With
            </span>
            <h2 className="font-display text-3xl text-indigo font-semibold mb-8">
              More Farm-Direct{' '}
              <span className="relative inline-block">
                Harvests
                <DoodleUnderline
                  variant="single"
                  delay={0.2}
                  className="absolute -bottom-1.5 left-0 w-full"
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
  );
}
