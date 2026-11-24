'use client';

import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { X, ShoppingBag, Trash2, Minus, Plus, Sprout, CheckCircle2 } from 'lucide-react';
import { useCartStore } from '@/lib/store/cartStore';
import { siteConfig } from '@/lib/data/site';
import { ProductImageWithFallback } from '@/components/ui/ProductImageWithFallback';

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

  const subtotal = getSubtotal();
  const shippingFee = getShippingFee();
  const grandTotal = getGrandTotal();
  const freeShippingProgress = getFreeShippingProgress();
  const remainingForFreeShipping = Math.max(0, siteConfig.freeShippingThreshold - subtotal);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label="Shopping Bag">
          {/* Backdrop using Charcoal tint (no pure black) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            className="absolute inset-0 bg-charcoal/50 cursor-pointer"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-8">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="w-screen max-w-md bg-oat border-l-2 border-charcoal flex flex-col text-indigo"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-charcoal/20 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-indigo" />
                  <h2 className="font-sans text-lg font-semibold text-indigo">
                    Your Harvest Bag
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={closeCart}
                  className="p-1.5 rounded-full text-indigo hover:bg-apricot transition-colors cursor-pointer"
                  aria-label="Close bag"
                >
                  <X className="w-5 h-5" />
                </button>
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
                        Add <span className="font-mono-meta font-bold text-cranberry">₹{remainingForFreeShipping}</span> for free shipping
                      </>
                    )}
                  </span>
                  <span className="font-mono-meta text-[11px]">{freeShippingProgress}%</span>
                </div>
                <div className="w-full bg-oat rounded-full h-2 border border-charcoal/20 overflow-hidden">
                  <div
                    className="bg-seabuckthorn h-full transition-[width] duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6">
                    <div className="w-16 h-16 rounded-full bg-apricot border-2 border-charcoal/25 flex items-center justify-center mb-4">
                      <Sprout className="w-7 h-7 text-indigo" />
                    </div>
                    <p className="font-display text-xl font-semibold text-indigo mb-2">
                      Your harvest bag is empty
                    </p>
                    <p className="font-script-body text-sm text-indigo/85 max-w-xs mb-6">
                      Explore our farm-direct seeds and berries packed fresh in small batches.
                    </p>
                    <Link
                      href="/shop"
                      onClick={closeCart}
                      className="btn-primary-yagya px-6 py-3 rounded-full text-xs"
                    >
                      SHOP SUPERFOODS
                    </Link>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-3 rounded-xl bg-apricot/45 border border-charcoal/20"
                    >
                      <div className="relative w-20 h-20 rounded-lg bg-oat border border-charcoal/15 shrink-0 overflow-hidden p-1">
                        <ProductImageWithFallback
                          src={item.product.images[0]?.src || ''}
                          alt={item.product.name}
                          fill
                          className="object-contain"
                        />
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <Link
                              href={`/product/${item.product.slug}`}
                              onClick={closeCart}
                              className="font-sans text-sm font-semibold text-indigo hover:text-burnt line-clamp-1"
                            >
                              {item.product.name}
                            </Link>
                            <span className="font-mono-meta text-[11px] text-cranberry block">
                              {item.variant.weight}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            aria-label={`Remove ${item.product.name}`}
                            className="p-1 text-indigo/70 hover:text-cranberry transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <div className="inline-flex items-center border border-charcoal/30 rounded-full bg-oat">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, -1)}
                              aria-label="Decrease quantity"
                              className="w-7 h-7 flex items-center justify-center text-indigo hover:text-burnt cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center font-mono-meta text-xs font-bold">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, 1)}
                              aria-label="Increase quantity"
                              className="w-7 h-7 flex items-center justify-center text-indigo hover:text-burnt cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="font-mono-meta text-sm font-bold text-indigo">
                            ₹{item.variant.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
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

                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="btn-primary-yagya w-full py-3.5 rounded-full text-xs flex items-center justify-center"
                  >
                    PROCEED TO CHECKOUT
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
