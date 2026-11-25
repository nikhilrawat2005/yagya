'use client';

import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { X, ShoppingBag, Trash2, Minus, Plus, Sprout, CheckCircle2 } from 'lucide-react';
import { useCartStore } from '@/lib/store/cartStore';
import { siteConfig } from '@/lib/data/site';
import { ProductImageWithFallback } from '@/components/ui/ProductImageWithFallback';
import { MOTION_EASE, MOTION_SPRING } from '@/lib/motion/tokens';
import { useInteractiveCapabilities } from '@/lib/motion/useInteractiveCapabilities';
import { GlowButton } from '@/components/ui/GlowButton';

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getSubtotal,
    getShippingFee,
    getGrandTotal,
    getFreeShippingProgress,
  } = useCartStore();

  const { prefersReducedMotion } = useInteractiveCapabilities();

  const subtotal = getSubtotal();
  const shippingFee = getShippingFee();
  const grandTotal = getGrandTotal();
  const freeShippingProgress = getFreeShippingProgress();
  const remainingForFreeShipping = Math.max(0, siteConfig.freeShippingThreshold - subtotal);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Shopping Bag"
        >
          {/* Backdrop using Charcoal tint + soft backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={closeCart}
            className="absolute inset-0 bg-charcoal/45 backdrop-blur-sm cursor-pointer"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-8">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={prefersReducedMotion ? { duration: 0.12 } : MOTION_SPRING.overlay}
              className="w-screen max-w-md bg-oat border-l-2 border-charcoal shadow-[var(--glow-level-3)] flex flex-col text-indigo"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-charcoal/20 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-indigo icon-hover-pop" />
                  <h2 className="font-sans text-lg font-semibold text-indigo">
                    Your Harvest Bag
                  </h2>
                </div>
                <motion.button
                  type="button"
                  whileHover={prefersReducedMotion ? undefined : { rotate: 90 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.9 }}
                  transition={MOTION_SPRING.tactile}
                  onClick={closeCart}
                  className="p-2 rounded-full text-indigo hover:bg-apricot hover:text-burnt glow-hover transition-colors cursor-pointer"
                  aria-label="Close bag"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Free Shipping Progress */}
              <div className="bg-apricot px-6 py-3 border-b border-charcoal/15">
                <div className="flex justify-between text-xs font-sans font-medium text-indigo mb-1.5">
                  <span>
                    {remainingForFreeShipping === 0 ? (
                      <span className="font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-cranberry" />
                        Free shipping unlocked!
                      </span>
                    ) : (
                      <>
                        Add{' '}
                        <span className="font-mono-meta font-bold text-cranberry">
                          ₹{remainingForFreeShipping}
                        </span>{' '}
                        for free shipping
                      </>
                    )}
                  </span>
                  <span className="font-mono-meta text-[11px]">{freeShippingProgress}%</span>
                </div>
                <div className="w-full bg-oat rounded-full h-2 border border-charcoal/20 overflow-hidden">
                  <motion.div
                    initial={false}
                    animate={{ width: `${freeShippingProgress}%` }}
                    transition={{ duration: 0.4, ease: MOTION_EASE.smooth }}
                    className={`h-full transition-shadow duration-300 ${
                      remainingForFreeShipping === 0
                        ? 'bg-gradient-to-r from-seabuckthorn to-burnt shadow-[0_0_12px_var(--glow-primary-strong)]'
                        : 'bg-seabuckthorn'
                    }`}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6">
                    <div className="w-16 h-16 rounded-full bg-apricot border-2 border-charcoal/25 flex items-center justify-center mb-4 glow-hover">
                      <Sprout className="w-7 h-7 text-indigo icon-hover-pop" />
                    </div>
                    <p className="font-display text-xl font-semibold text-indigo mb-2">
                      Your harvest bag is empty
                    </p>
                    <p className="font-script-body text-sm text-indigo/85 max-w-xs mb-6">
                      Explore our farm-direct seeds and berries packed fresh in small batches.
                    </p>
                    <GlowButton href="/shop" variant="cta" onClick={closeCart}>
                      SHOP SUPERFOODS
                    </GlowButton>
                  </div>
                ) : (
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout={!prefersReducedMotion}
                        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 24, scale: 0.96 }}
                        transition={{ duration: 0.24, ease: MOTION_EASE.smooth }}
                        className="group flex gap-4 p-3 rounded-xl bg-apricot/45 hover:bg-apricot/80 border border-charcoal/20 glow-border"
                      >
                        <Link
                          href={`/product/${item.product.slug}`}
                          onClick={closeCart}
                          className="relative w-20 h-20 rounded-lg bg-oat border border-charcoal/15 shrink-0 overflow-hidden p-1"
                        >
                          <ProductImageWithFallback
                            src={item.product.images[0]?.src || ''}
                            alt={item.product.name}
                            fill
                            className="object-contain transition-transform duration-300 ease-out group-hover:scale-108"
                          />
                        </Link>

                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <Link
                                href={`/product/${item.product.slug}`}
                                onClick={closeCart}
                                className="nav-link-underline nav-link-underline-left font-sans text-sm font-semibold text-indigo hover:text-burnt line-clamp-1"
                              >
                                {item.product.name}
                              </Link>
                              <span className="font-mono-meta text-[11px] text-cranberry block mt-0.5">
                                {item.variant.weight}
                              </span>
                            </div>
                            <motion.button
                              type="button"
                              whileTap={prefersReducedMotion ? undefined : { scale: 0.88 }}
                              onClick={() => removeItem(item.id)}
                              aria-label={`Remove ${item.product.name}`}
                              className="p-1.5 rounded-full text-indigo/70 hover:text-cranberry hover:bg-oat glow-hover transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4 icon-hover-pop" />
                            </motion.button>
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            <div className="inline-flex items-center border border-charcoal/30 rounded-full bg-oat glow-border">
                              <motion.button
                                type="button"
                                whileTap={prefersReducedMotion ? undefined : { scale: 0.88 }}
                                onClick={() => updateQuantity(item.id, -1)}
                                aria-label="Decrease quantity"
                                className="w-7 h-7 flex items-center justify-center rounded-l-full text-indigo hover:text-burnt hover:bg-apricot/60 transition-colors cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </motion.button>
                              <span className="w-7 text-center font-mono-meta text-xs font-bold">
                                {item.quantity}
                              </span>
                              <motion.button
                                type="button"
                                whileTap={prefersReducedMotion ? undefined : { scale: 0.88 }}
                                onClick={() => updateQuantity(item.id, 1)}
                                aria-label="Increase quantity"
                                className="w-7 h-7 flex items-center justify-center rounded-r-full text-indigo hover:text-burnt hover:bg-apricot/60 transition-colors cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </motion.button>
                            </div>

                            <span className="font-mono-meta text-sm font-bold text-indigo">
                              ₹{item.variant.price * item.quantity}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="p-6 bg-apricot/60 border-t-2 border-charcoal/20 space-y-4">
                  <div className="space-y-1.5 text-xs font-sans">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-mono-meta font-bold">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="font-mono-meta font-bold">
                        {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-charcoal/15 text-sm font-semibold">
                      <span>Total</span>
                      <span className="font-mono-meta font-bold text-cranberry">₹{grandTotal}</span>
                    </div>
                  </div>

                  <GlowButton
                    href="/checkout"
                    variant="cta"
                    onClick={closeCart}
                    className="w-full py-3.5"
                  >
                    PROCEED TO CHECKOUT
                  </GlowButton>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
