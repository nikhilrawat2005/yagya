'use client';

import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
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
    getFreeShippingProgress,
  } = useCartStore();

  const subtotal = getSubtotal();
  const freeShippingProgress = getFreeShippingProgress();
  const remainingForFreeShipping = Math.max(0, siteConfig.freeShippingThreshold - subtotal);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            className="absolute inset-0 bg-black/40 backdrop-blur-xs cursor-pointer"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="w-screen max-w-md bg-surface border-l border-outline-variant flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-outline-variant/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-xl">shopping_bag</span>
                  <h2 className="font-serif text-xl font-medium text-primary">Your Pantry Cart</h2>
                </div>
                <button
                  onClick={closeCart}
                  className="p-1 rounded-full text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                  aria-label="Close cart"
                >
                  <span className="material-symbols-outlined text-2xl">close</span>
                </button>
              </div>

              {/* Free Shipping Meter */}
              <div className="bg-surface-container-low px-6 py-3 border-b border-outline-variant/30">
                <div className="flex justify-between text-xs font-medium text-on-surface mb-1.5">
                  <span>
                    {remainingForFreeShipping === 0 ? (
                      <span className="text-primary font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">verified</span>
                        Complimentary shipping unlocked!
                      </span>
                    ) : (
                      <>
                        Add <span className="font-bold text-secondary">₹{remainingForFreeShipping}</span> for free shipping
                      </>
                    )}
                  </span>
                  <span className="text-on-surface-variant text-[11px] font-semibold">{freeShippingProgress}%</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    className="bg-secondary-container h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${freeShippingProgress}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 text-on-surface-variant">
                    <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-4 text-primary/50">
                      <span className="material-symbols-outlined text-3xl">local_florist</span>
                    </div>
                    <p className="font-serif text-lg font-medium text-primary mb-1">Your cart is empty</p>
                    <p className="text-xs text-on-surface-variant max-w-xs mb-6">
                      Explore our small-batch harvests and add clean superfoods to your pantry ritual.
                    </p>
                    <Link
                      href="/shop"
                      onClick={closeCart}
                      className="px-6 py-2.5 rounded-full bg-primary-container text-surface hover:bg-secondary text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      Shop Superfoods
                    </Link>
                  </div>
                ) : (
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="flex gap-4 p-3 rounded-xl bg-surface-container-low border border-outline-variant/30"
                      >
                        {/* Image */}
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-surface relative shrink-0">
                          <ProductImageWithFallback
                            src={item.product.images[0]?.src || ''}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif text-sm font-medium text-primary line-clamp-1">
                            {item.product.name}
                          </h4>
                          <p className="text-xs text-on-surface-variant mt-0.5">
                            {item.variant.weight}
                          </p>

                          <div className="flex items-center justify-between mt-2">
                            {/* Stepper */}
                            <div className="flex items-center border border-outline-variant/60 rounded-full bg-surface px-2 py-0.5">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-5 h-5 flex items-center justify-center text-on-surface-variant hover:text-primary cursor-pointer"
                                aria-label="Decrease quantity"
                              >
                                -
                              </button>
                              <span className="px-2 text-xs font-semibold">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-5 h-5 flex items-center justify-center text-on-surface-variant hover:text-primary cursor-pointer"
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                            </div>

                            <span className="font-serif text-sm font-semibold text-primary">
                              ₹{item.variant.price * item.quantity}
                            </span>
                          </div>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-on-surface-variant/40 hover:text-error transition-colors p-1 self-start cursor-pointer"
                          aria-label="Remove item"
                        >
                          <span className="material-symbols-outlined text-base">delete</span>
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Checkout Footer */}
              {items.length > 0 && (
                <div className="p-6 border-t border-outline-variant/40 bg-surface-container-low">
                  <div className="flex justify-between text-sm mb-2 text-on-surface-variant">
                    <span>Subtotal</span>
                    <span className="font-serif font-medium text-primary">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-xs mb-4 text-on-surface-variant">
                    <span>Shipping</span>
                    <span>
                      {remainingForFreeShipping === 0 ? (
                        <span className="text-primary font-medium">Free</span>
                      ) : (
                        'Calculated at checkout'
                      )}
                    </span>
                  </div>

                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="w-full py-3.5 rounded-full bg-primary-container text-surface hover:bg-secondary transition-all font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Proceed to Checkout</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
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
