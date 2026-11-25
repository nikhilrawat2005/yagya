'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { ShoppingBag, Lock, CheckCircle2 } from 'lucide-react';
import { useCartStore } from '@/lib/store/cartStore';
import { createOrder } from '@/lib/services/productService';
import { ProductImageWithFallback } from '@/components/ui/ProductImageWithFallback';
import { GlowButton } from '@/components/ui/GlowButton';
import { GlowInput } from '@/components/ui/GlowInput';
import { FadeInSection } from '@/components/motion/FadeInSection';
import { OatSheet } from '@/components/editorial/OatSheet';
import { MOTION_EASE, MOTION_SPRING } from '@/lib/motion/tokens';
import { useInteractiveCapabilities } from '@/lib/motion/useInteractiveCapabilities';

export function CheckoutClient() {
  const router = useRouter();
  const { items, getSubtotal, getShippingFee, clearCart } = useCartStore();
  const { prefersReducedMotion } = useInteractiveCapabilities();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'Delhi NCR',
    pincode: '',
    paymentMethod: 'upi',
  });

  const [promoCode, setPromoCode] = useState('HARVEST10');
  const [promoApplied, setPromoApplied] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotal = getSubtotal();
  const shipping = getShippingFee();
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const grandTotal = Math.max(0, subtotal - discount + shipping);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email required';
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone.trim())) errs.phone = '10-digit mobile required';
    if (!formData.address.trim()) errs.address = 'Delivery address required';
    if (!formData.pincode.trim() || !/^\d{6}$/.test(formData.pincode.trim())) errs.pincode = '6-digit postal PIN required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || items.length === 0) return;

    setLoading(true);
    try {
      const order = await createOrder({
        customerName: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        pincode: formData.pincode,
        state: formData.state,
        paymentMethod: formData.paymentMethod,
        items: items.map((i) => ({
          productId: i.product.id,
          variantId: i.variant.id,
          quantity: i.quantity,
          price: i.variant.price,
        })),
        total: grandTotal,
      });

      clearCart();
      router.push(`/order-success?orderId=${order.orderId}&total=${grandTotal}`);
    } catch {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-dvh bg-navy text-oat pt-32 pb-24 px-4">
        <OatSheet tone="subtle" className="max-w-md mx-auto p-6 sm:p-10 text-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-[6px] bg-oat/10 border border-white/25 flex items-center justify-center">
            <ShoppingBag className="w-7 h-7 text-peach" />
          </div>
          <h1 className="font-display text-3xl font-medium text-oat mb-2">
            No items to checkout
          </h1>
          <p className="text-sm text-apricot/80 mb-6">
            Your harvest bag is currently empty. Explore our small-batch seeds and berries first.
          </p>
          <GlowButton href="/shop" variant="cta" magnetic className="w-full sm:w-auto min-h-[48px]">
            Explore Collection
          </GlowButton>
        </OatSheet>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-navy text-oat pt-[calc(5.5rem+var(--safe-top))] pb-[calc(6rem+var(--safe-bottom))] md:pt-28 md:pb-24">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-14 pl-[max(1rem,var(--safe-left))] pr-[max(1rem,var(--safe-right))]">
        <FadeInSection className="mb-8">
          <span className="font-ui-label text-[11px] text-peach block mb-1.5">
            Order Review
          </span>
          <h1 className="font-display text-fluid-h2 text-oat font-medium">
            Express Checkout
          </h1>
        </FadeInSection>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          <div className="lg:col-span-7">
            <form onSubmit={handlePlaceOrder} noValidate className="space-y-6 scroll-mb-24">
              <OatSheet tone="subtle" interactive={false} padding="compact">
                <h2 className="font-display text-xl font-medium text-oat mb-4 flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-[4px] bg-flame text-oat text-xs flex items-center justify-center font-sans font-semibold">
                    1
                  </span>
                  Contact Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <GlowInput
                    label="Full Name *"
                    floatingLabel
                    type="text"
                    autoComplete="name"
                    value={formData.name}
                    error={errors.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    placeholder="Aarav Singh"
                  />
                  <GlowInput
                    label="Email *"
                    floatingLabel
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    error={errors.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    placeholder="aarav@example.com"
                  />
                  <GlowInput
                    label="Mobile *"
                    floatingLabel
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    maxLength={10}
                    value={formData.phone}
                    error={errors.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') });
                      if (errors.phone) setErrors({ ...errors, phone: '' });
                    }}
                    placeholder="9876543210"
                    containerClassName="sm:col-span-2"
                  />
                </div>
              </OatSheet>

              <OatSheet tone="subtle" interactive={false} delay={0.05} padding="compact">
                <h2 className="font-display text-xl font-medium text-oat mb-4 flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-[4px] bg-flame text-oat text-xs flex items-center justify-center font-sans font-semibold">
                    2
                  </span>
                  Shipping Address
                </h2>
                <div className="space-y-4">
                  <GlowInput
                    label="Street Address *"
                    floatingLabel
                    type="text"
                    autoComplete="street-address"
                    value={formData.address}
                    error={errors.address}
                    onChange={(e) => {
                      setFormData({ ...formData, address: e.target.value });
                      if (errors.address) setErrors({ ...errors, address: '' });
                    }}
                    placeholder="House 42, Sector 15"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <GlowInput
                      label="City"
                      floatingLabel
                      type="text"
                      autoComplete="address-level2"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Gurugram"
                    />
                    <GlowInput
                      label="State"
                      floatingLabel
                      type="text"
                      autoComplete="address-level1"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    />
                    <GlowInput
                      label="Pincode *"
                      floatingLabel
                      type="text"
                      inputMode="numeric"
                      autoComplete="postal-code"
                      maxLength={6}
                      value={formData.pincode}
                      error={errors.pincode}
                      onChange={(e) => {
                        setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '') });
                        if (errors.pincode) setErrors({ ...errors, pincode: '' });
                      }}
                      placeholder="122001"
                    />
                  </div>
                </div>
              </OatSheet>

              <OatSheet tone="subtle" interactive={false} delay={0.1} className="p-6">
                <h2 className="font-display text-xl font-medium text-oat mb-4 flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-[4px] bg-flame text-oat text-xs flex items-center justify-center font-sans font-semibold">
                    3
                  </span>
                  Payment Option
                </h2>
                <div className="space-y-3">
                  {[
                    { id: 'upi', label: 'Instant UPI', desc: 'Fast zero-touch payment' },
                    { id: 'card', label: 'Credit or Debit Card', desc: 'Major domestic & international cards' },
                    { id: 'cod', label: 'Cash on Delivery', desc: 'Available for serviceable PIN codes' },
                  ].map((m) => {
                    const selected = formData.paymentMethod === m.id;
                    return (
                      <motion.label
                        key={m.id}
                        whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
                        transition={MOTION_SPRING.tactile}
                        className={`flex items-start gap-3 p-3.5 rounded-[6px] border cursor-pointer transition-all duration-200 ${
                          selected
                            ? 'border-flame bg-oat/[0.18]'
                            : 'border-white/20 bg-oat/[0.08] hover:border-apricot/45'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          checked={selected}
                          onChange={() => setFormData({ ...formData, paymentMethod: m.id })}
                          className="mt-1 accent-flame cursor-pointer"
                        />
                        <div>
                          <p className="text-xs font-semibold text-oat">{m.label}</p>
                          <p className="text-[11px] text-apricot/75">{m.desc}</p>
                        </div>
                      </motion.label>
                    );
                  })}
                </div>
              </OatSheet>

              <GlowButton
                type="submit"
                variant="cta"
                magnetic
                disabled={loading}
                className="w-full min-h-[48px] py-4"
              >
                {loading ? (
                  <span>Confirming harvest batch...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Confirm Order · ₹{grandTotal}</span>
                  </>
                )}
              </GlowButton>
            </form>
          </div>

          <div className="lg:col-span-5">
            <OatSheet tone="medium" interactive={false} className="p-6 sticky top-24">
              <h3 className="font-display text-xl font-medium text-oat mb-4">
                Order Summary
              </h3>

              <div className="divide-y divide-white/15 mb-6 max-h-72 overflow-y-auto">
                {items.map((i) => (
                  <div key={i.id} className="py-3 flex gap-3 items-center">
                    <div className="w-12 h-12 rounded-[4px] bg-oat/[0.12] border border-white/20 relative overflow-hidden shrink-0">
                      <ProductImageWithFallback
                        src={i.product.images[0]?.src || ''}
                        alt={i.product.name}
                        fill
                        className={
                          i.product.images[0]?.src?.includes('/images/products/')
                            ? 'object-cover'
                            : 'object-contain p-1'
                        }
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-oat line-clamp-1">{i.product.name}</p>
                      <p className="text-[11px] text-apricot/75">
                        {i.variant.weight} × {i.quantity}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-peach">
                      ₹{i.variant.price * i.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mb-6 pt-4 border-t border-white/15">
                <div className="flex gap-2 items-center">
                  <GlowInput
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    placeholder="PROMO CODE"
                    aria-label="Promo code"
                    inputClassName="uppercase"
                  />
                  <GlowButton
                    type="button"
                    variant="submit"
                    size="sm"
                    onClick={() => setPromoApplied(promoCode === 'HARVEST10')}
                    className="py-2.5 px-5 shrink-0"
                  >
                    Apply
                  </GlowButton>
                </div>
                <AnimatePresence>
                  {promoApplied && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.18, ease: MOTION_EASE.smooth }}
                      className="text-[11px] text-peach font-medium mt-2 flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-flame" />
                      HARVEST10 applied (10% harvest savings)
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="space-y-2 text-xs text-apricot/85 pb-4 border-b border-white/15">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-oat">₹{subtotal}</span>
                </div>
                <AnimatePresence>
                  {promoApplied && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex justify-between text-peach overflow-hidden"
                    >
                      <span>Harvest Discount (10%)</span>
                      <span>-₹{discount}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-oat">
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
              </div>

              <div className="pt-4 flex justify-between items-baseline">
                <span className="text-base font-medium text-oat">Total</span>
                <span className="font-display text-2xl font-semibold text-peach">₹{grandTotal}</span>
              </div>
            </OatSheet>
          </div>
        </div>
      </div>
    </div>
  );
}
