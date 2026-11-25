'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence, type PanInfo } from 'motion/react';
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

  const { isMobile, prefersReducedMotion, simplifyMotion } = useInteractiveCapabilities();

  const subtotal = getSubtotal();
  const shippingFee = getShippingFee();
  const grandTotal = getGrandTotal();
  const freeShippingProgress = getFreeShippingProgress();
  const remainingForFreeShipping = Math.max(0, siteConfig.freeShippingThreshold - subtotal);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, closeCart]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 85 || info.velocity.y > 400) {
      closeCart();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 overflow-hidden flex items-end md:items-center justify-center md:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Shopping Bag"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.25 }}
            onClick={closeCart}
            className="absolute inset-0 bg-navy/65 backdrop-blur-sm cursor-pointer"
          />

          {/* Mobile: Slide-up bottom sheet with swipe drag handle | Tablet & Desktop: Centered dialog */}
          <motion.div
            key={isMobile ? 'mobile-bottom-sheet' : 'desktop-dialog'}
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : isMobile
                ? { y: '100%' }
                : { opacity: 0, scale: 0.96, y: 12 }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : isMobile
                ? { y: 0 }
                : { opacity: 1, scale: 1, y: 0 }
            }
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : isMobile
                ? { y: '100%' }
                : { opacity: 0, scale: 0.96, y: 12 }
            }
            transition={
              prefersReducedMotion || simplifyMotion
                ? { duration: 0.18, ease: MOTION_EASE.smooth }
                : MOTION_SPRING.overlay
            }
            drag={isMobile && !prefersReducedMotion ? 'y' : false}
            dragConstraints={{ top: 0 }}
            dragElastic={{ top: 0, bottom: 0.35 }}
            onDragEnd={isMobile ? handleDragEnd : undefined}
            className="relative z-10 w-full md:max-w-lg max-h-[88dvh] md:max-h-[84dvh] bg-navy/95 oat-sheet-blur border-t md:border border-white/25 rounded-t-[16px] md:rounded-[8px] shadow-[var(--sheet-shadow)] flex flex-col text-oat overflow-hidden"
          >
            {/* Mobile Drag Handle */}
            <div className="md:hidden pt-3 pb-1 flex justify-center shrink-0 touch-none" aria-hidden="true">
              <span className="w-12 h-1.5 rounded-full bg-oat/35" />
            </div>

            {/* Header */}
            <div className="px-5 md:px-6 py-3.5 border-b border-white/15 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-flame" />
                <h2 className="font-display text-xl font-medium text-oat">
                  Your Harvest Bag
                </h2>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-[4px] text-oat/80 hover:text-oat hover:bg-oat/10 active:bg-oat/15 transition-colors cursor-pointer"
                aria-label="Close bag"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress */}
            <div className="bg-oat/[0.08] px-5 md:px-6 py-3 border-b border-white/15 shrink-0">
              <div className="flex justify-between text-xs font-sans text-apricot mb-2">
                <span>
                  {remainingForFreeShipping === 0 ? (
                    <span className="font-medium text-oat flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-flame" />
                      Free dispatch unlocked
                    </span>
                  ) : (
                    <>
                      Add <span className="font-semibold text-peach">₹{remainingForFreeShipping}</span> for free dispatch
                    </>
                  )}
                </span>
                <span className="text-xs text-apricot/75">{freeShippingProgress}%</span>
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

            {/* Items List */}
            <div className="flex-1 overflow-y-auto px-5 md:px-6 py-4 space-y-3">
              {items.length === 0 ? (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <div className="w-14 h-14 rounded-[6px] bg-oat/10 border border-white/25 flex items-center justify-center mb-4">
                    <Sprout className="w-6 h-6 text-peach" />
                  </div>
                  <p className="font-display text-2xl font-medium text-oat mb-2">
                    Your harvest bag is empty
                  </p>
                  <p className="text-sm text-apricot/80 max-w-xs mb-6">
                    Explore our farm-direct seeds and berries packed fresh in small batches.
                  </p>
                  <GlowButton href="/shop" variant="cta" onClick={closeCart} className="w-full sm:w-auto min-h-[48px]">
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
                      className="group flex gap-3.5 p-3 rounded-[6px] bg-oat/[0.10] border border-white/20"
                    >
                      <Link
                        href={`/product/${item.product.slug}`}
                        onClick={closeCart}
                        className="relative w-20 h-20 rounded-[4px] bg-oat/[0.12] border border-white/20 shrink-0 overflow-hidden"
                      >
                        <ProductImageWithFallback
                          src={item.product.images[0]?.src || ''}
                          alt={item.product.name}
                          fill
                          className={
                            item.product.images[0]?.src?.includes('/images/products/')
                              ? 'object-cover transition-transform duration-300 group-hover:scale-105'
                              : 'object-contain p-1.5 transition-transform duration-300 group-hover:scale-105'
                          }
                        />
                      </Link>

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <Link
                              href={`/product/${item.product.slug}`}
                              onClick={closeCart}
                              className="text-sm font-medium text-oat hover:text-peach line-clamp-1"
                            >
                              {item.product.name}
                            </Link>
                            <span className="text-xs text-apricot/75 block mt-0.5">
                              {item.variant.weight}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            aria-label={`Remove ${item.product.name}`}
                            className="min-w-[44px] min-h-[44px] -m-2 flex items-center justify-center text-apricot/70 hover:text-flame transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <div className="inline-flex items-center border border-white/25 rounded-[4px] bg-oat/10">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, -1)}
                              aria-label="Decrease quantity"
                              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-oat hover:text-peach cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-7 text-center text-xs font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, 1)}
                              aria-label="Increase quantity"
                              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-oat hover:text-peach cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <span className="text-sm font-semibold text-peach">
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
              <div className="px-5 md:px-6 pt-4 pb-[max(1.25rem,var(--safe-bottom))] md:pb-6 bg-oat/[0.08] border-t border-white/15 space-y-4 shrink-0">
                <div className="space-y-1.5 text-xs sm:text-sm text-apricot/85">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-oat">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-semibold text-oat">
                      {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-white/15 text-sm sm:text-base font-semibold text-oat">
                    <span>Total</span>
                    <span className="text-peach">₹{grandTotal}</span>
                  </div>
                </div>

                <GlowButton
                  href="/checkout"
                  variant="cta"
                  onClick={closeCart}
                  className="w-full min-h-[48px]"
                >
                  Proceed to Checkout
                </GlowButton>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
