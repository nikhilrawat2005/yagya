'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { X, ShoppingBag, Trash2, Minus, Plus, Sprout, CheckCircle2 } from 'lucide-react';
import { useCartStore } from '@/lib/store/cartStore';
import { siteConfig } from '@/config/site';
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
    getSubtotalInr,
    getShippingFeeInr,
    getGrandTotalInr,
    getFreeShippingProgress,
  } = useCartStore();

  const { prefersReducedMotion } = useInteractiveCapabilities();
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    void useCartStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const container = drawerRef.current;

    // Move initial focus inside drawer
    const focusTimer = setTimeout(() => {
      const focusable = container?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      focusable?.[0]?.focus();
    }, 20);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeCart();
        return;
      }

      if (e.key === 'Tab' && container) {
        const focusable = Array.from(
          container.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener('keydown', onKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [isOpen, closeCart]);

  const subtotal = getSubtotalInr();
  const shippingFee = getShippingFeeInr();
  const grandTotal = getGrandTotalInr();
  const freeShippingProgress = getFreeShippingProgress();
  const freeThreshold = siteConfig.operations.freeShippingThresholdInr;
  const remainingForFreeShipping =
    freeThreshold !== null && subtotal !== null ? Math.max(0, freeThreshold - subtotal) : null;
  const showPrices = siteConfig.featureFlags.showPrices;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Your Harvest Bag"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            className="absolute inset-0 bg-navy/65 backdrop-blur-sm cursor-pointer"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-8">
            <motion.div
              ref={drawerRef}
              data-lenis-prevent
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={prefersReducedMotion ? { duration: 0.12 } : MOTION_SPRING.overlay}
              className="w-screen max-w-md bg-navy/95 backdrop-blur-xl border-l border-white/25 shadow-[var(--sheet-shadow)] flex flex-col text-oat overscroll-contain"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-white/15 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-peach" aria-hidden="true" />
                  <h2 className="font-display text-xl font-medium text-oat">
                    Your Harvest Bag
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={closeCart}
                  className="p-2 rounded-[4px] text-oat/85 hover:text-oat hover:bg-oat/10 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oat"
                  aria-label="Close bag"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              {/* Free Shipping Progress (only when operations threshold & prices are configured) */}
              {freeThreshold !== null && freeShippingProgress !== null && remainingForFreeShipping !== null && (
                <div className="bg-oat/[0.08] px-6 py-3.5 border-b border-white/15">
                  <div className="flex justify-between text-xs font-sans text-apricot mb-2">
                    <span>
                      {remainingForFreeShipping === 0 ? (
                        <span className="font-medium text-oat flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-peach" aria-hidden="true" />
                          Free dispatch unlocked
                        </span>
                      ) : (
                        <>
                          Add <span className="font-semibold text-peach tabular-nums">{siteConfig.currencySymbol}{remainingForFreeShipping}</span> for free dispatch
                        </>
                      )}
                    </span>
                    <span className="text-[11px] text-apricot/85 tabular-nums">{freeShippingProgress}%</span>
                  </div>
                  <div className="w-full bg-oat/10 rounded-[2px] h-1.5 overflow-hidden">
                    <motion.div
                      initial={false}
                      animate={{ width: `${freeShippingProgress}%` }}
                      transition={{ duration: 0.4, ease: MOTION_EASE.smooth }}
                      className="h-full bg-flame"
                    />
                  </div>
                </div>
              )}

              {/* Items List */}
              <div data-lenis-prevent className="flex-1 overflow-y-auto overscroll-contain p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6">
                    <div className="w-14 h-14 rounded-[6px] bg-oat/10 border border-white/25 flex items-center justify-center mb-4">
                      <Sprout className="w-6 h-6 text-peach" aria-hidden="true" />
                    </div>
                    <p className="font-display text-2xl font-medium text-oat mb-2">
                      Your harvest bag is empty
                    </p>
                    <p className="text-sm text-apricot/90 max-w-xs mb-6">
                      Explore our whole seeds, dried berries, dry fruits, nuts, and roasted makhana.
                    </p>
                    <GlowButton href="/shop" variant="cta" onClick={closeCart}>
                      Explore Collection
                    </GlowButton>
                  </div>
                ) : (
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout={!prefersReducedMotion}
                        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 24 }}
                        transition={{ duration: 0.25, ease: MOTION_EASE.smooth }}
                        className="group flex gap-4 p-3.5 rounded-[6px] bg-oat/[0.10] border border-white/20"
                      >
                        <Link
                          href={`/product/${item.product.slug}`}
                          onClick={closeCart}
                          className="relative w-20 h-20 rounded-[4px] bg-oat/[0.12] border border-white/20 shrink-0 overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oat"
                        >
                          <ProductImageWithFallback
                            src={item.product.images[0]?.src || ''}
                            alt={item.product.name}
                            fill
                            sizes="80px"
                            className={
                              item.product.images[0]?.src?.includes('/assets/products/')
                                ? 'object-cover transition-transform duration-300 group-hover:scale-105'
                                : 'object-contain p-1.5 transition-transform duration-300 group-hover:scale-105'
                            }
                          />
                        </Link>

                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <Link
                                href={`/product/${item.product.slug}`}
                                onClick={closeCart}
                                className="text-sm font-medium text-oat hover:text-peach line-clamp-1 rounded-[4px]"
                              >
                                {item.product.name}
                              </Link>
                              <span className="text-[11px] text-apricot/85 block mt-0.5">
                                {item.variant.weight}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              aria-label={`Remove ${item.product.name}`}
                              className="p-1 text-apricot/80 hover:text-peach transition-colors cursor-pointer rounded-[4px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oat"
                            >
                              <Trash2 className="w-4 h-4" aria-hidden="true" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            <div className="inline-flex items-center border border-white/25 rounded-[4px] bg-oat/10">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, -1)}
                                aria-label="Decrease quantity"
                                className="w-7 h-7 flex items-center justify-center text-oat hover:text-peach cursor-pointer rounded-[4px]"
                              >
                                <Minus className="w-3 h-3" aria-hidden="true" />
                              </button>
                              <span className="w-7 text-center text-xs font-semibold tabular-nums">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, 1)}
                                aria-label="Increase quantity"
                                className="w-7 h-7 flex items-center justify-center text-oat hover:text-peach cursor-pointer rounded-[4px]"
                              >
                                <Plus className="w-3 h-3" aria-hidden="true" />
                              </button>
                            </div>

                            <span className="text-xs sm:text-sm font-semibold text-peach tabular-nums">
                              {showPrices && item.variant.priceInr !== null
                                ? `${siteConfig.currencySymbol}${item.variant.priceInr * item.quantity}`
                                : 'Price coming soon'}
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
                <div className="p-6 bg-oat/[0.08] border-t border-white/15 space-y-4">
                  <div className="space-y-1.5 text-xs text-apricot/90 tabular-nums">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-oat">
                        {subtotal !== null
                          ? `${siteConfig.currencySymbol}${subtotal}`
                          : 'Price coming soon'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="font-semibold text-oat">
                        {shippingFee === null
                          ? 'Calculated at confirmation'
                          : shippingFee === 0
                          ? 'FREE'
                          : `${siteConfig.currencySymbol}${shippingFee}`}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-white/15 text-sm font-semibold text-oat">
                      <span>Total</span>
                      <span className="text-peach">
                        {grandTotal !== null
                          ? `${siteConfig.currencySymbol}${grandTotal}`
                          : 'Confirmed at checkout'}
                      </span>
                    </div>
                  </div>

                  <GlowButton
                    href="/checkout"
                    variant="cta"
                    onClick={closeCart}
                    className="w-full py-3.5"
                  >
                    Proceed to Checkout
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
