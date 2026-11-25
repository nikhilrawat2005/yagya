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
      <FadeInSection className="max-w-md mx-auto py-24 px-4 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-apricot border-2 border-charcoal/25 flex items-center justify-center glow-hover">
          <ShoppingBag className="w-8 h-8 text-indigo/70 icon-hover-pop" />
        </div>
        <h1 className="font-display text-3xl font-semibold text-indigo mb-2">
          No items to checkout
        </h1>
        <p className="font-script-body text-sm text-indigo/85 mb-6">
          Your harvest bag is currently empty. Explore our small-batch seeds and berries first.
        </p>
        <GlowButton href="/shop" variant="cta" magnetic>
          RETURN TO SHOP
        </GlowButton>
      </FadeInSection>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
      <FadeInSection className="mb-8">
        <span className="font-mono-meta text-xs uppercase tracking-widest text-cranberry block mb-1">
          Order Review
        </span>
        <h1 className="font-display text-4xl text-indigo font-semibold">
          Express Checkout
        </h1>
      </FadeInSection>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Form */}
        <div className="lg:col-span-7">
          <form onSubmit={handlePlaceOrder} noValidate className="space-y-6">
            <FadeInSection className="glow-border bg-apricot/45 p-6 rounded-2xl border-2 border-charcoal/25">
              <h2 className="font-sans text-base font-semibold text-indigo mb-4 flex items-center gap-2.5">
                <span className="glow-badge w-6 h-6 rounded-full bg-indigo text-oat text-xs flex items-center justify-center font-mono-meta">
                  1
                </span>
                Contact Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <GlowInput
                  label="Full Name *"
                  floatingLabel
                  type="text"
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
            </FadeInSection>

            <FadeInSection delay={0.05} className="glow-border bg-apricot/45 p-6 rounded-2xl border-2 border-charcoal/25">
              <h2 className="font-sans text-base font-semibold text-indigo mb-4 flex items-center gap-2.5">
                <span className="glow-badge w-6 h-6 rounded-full bg-indigo text-oat text-xs flex items-center justify-center font-mono-meta">
                  2
                </span>
                Shipping Address
              </h2>
              <div className="space-y-4 text-xs">
                <GlowInput
                  label="Street Address *"
                  floatingLabel
                  type="text"
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
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Gurugram"
                  />
                  <GlowInput
                    label="State"
                    floatingLabel
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  />
                  <GlowInput
                    label="Pincode *"
                    floatingLabel
                    type="text"
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
            </FadeInSection>

            <FadeInSection delay={0.1} className="glow-border bg-apricot/45 p-6 rounded-2xl border-2 border-charcoal/25">
              <h2 className="font-sans text-base font-semibold text-indigo mb-4 flex items-center gap-2.5">
                <span className="glow-badge w-6 h-6 rounded-full bg-indigo text-oat text-xs flex items-center justify-center font-mono-meta">
                  3
                </span>
                Payment Option
              </h2>
              <div className="space-y-3">
                {[
                  { id: 'upi', label: 'Instant UPI', desc: 'Fast zero-touch payment' },
                  { id: 'card', label: 'Credit or Debit Card', desc: 'Major Indian & international cards' },
                  { id: 'cod', label: 'Cash on Delivery', desc: 'Available for serviceable Indian PINs' },
                ].map((m) => {
                  const selected = formData.paymentMethod === m.id;
                  return (
                    <motion.label
                      key={m.id}
                      whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
                      transition={MOTION_SPRING.tactile}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all duration-250 ${
                        selected
                          ? 'border-charcoal bg-oat shadow-[var(--glow-level-1)]'
                          : 'border-charcoal/20 bg-oat/55 hover:bg-oat hover:border-burnt/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={selected}
                        onChange={() => setFormData({ ...formData, paymentMethod: m.id })}
                        className="mt-1 accent-indigo cursor-pointer"
                      />
                      <div>
                        <p className="text-xs font-semibold text-indigo">{m.label}</p>
                        <p className="text-[11px] text-indigo/75">{m.desc}</p>
                      </div>
                    </motion.label>
                  );
                })}
              </div>
            </FadeInSection>

            <GlowButton
              type="submit"
              variant="cta"
              magnetic
              disabled={loading}
              className="w-full py-4"
            >
              {loading ? (
                <span>Confirming harvest batch...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>CONFIRM ORDER · ₹{grandTotal}</span>
                </>
              )}
            </GlowButton>
          </form>
        </div>

        {/* Right Summary */}
        <FadeInSection direction="left" className="lg:col-span-5">
          <div className="glow-border bg-apricot/55 p-6 rounded-2xl border-2 border-charcoal sticky top-28">
            <h3 className="font-sans text-lg font-semibold text-indigo mb-4">
              Order Summary
            </h3>

            <div className="divide-y divide-charcoal/15 mb-6 max-h-72 overflow-y-auto">
              {items.map((i) => (
                <div key={i.id} className="group py-3 flex gap-3 items-center">
                  <div className="w-12 h-12 rounded-lg bg-oat border border-charcoal/20 relative overflow-hidden shrink-0 p-1">
                    <ProductImageWithFallback
                      src={i.product.images[0]?.src || ''}
                      alt={i.product.name}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-108"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-indigo line-clamp-1">{i.product.name}</p>
                    <p className="font-mono-meta text-[11px] text-indigo/75">
                      {i.variant.weight} × {i.quantity}
                    </p>
                  </div>
                  <span className="font-mono-meta text-xs font-bold text-indigo">
                    ₹{i.variant.price * i.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="mb-6 pt-4 border-t border-charcoal/15">
              <div className="flex gap-2 items-center">
                <GlowInput
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  placeholder="PROMO CODE"
                  aria-label="Promo code"
                  inputClassName="uppercase font-mono-meta"
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
                    className="text-[11px] text-indigo font-medium mt-2 flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-cranberry" />
                    HARVEST10 applied (10% harvest savings)
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-2 text-xs text-indigo pb-4 border-b border-charcoal/15">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono-meta font-bold">₹{subtotal}</span>
              </div>
              <AnimatePresence>
                {promoApplied && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex justify-between text-cranberry overflow-hidden"
                  >
                    <span>Harvest Discount (10%)</span>
                    <span className="font-mono-meta">-₹{discount}</span>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-mono-meta font-bold">
                  {shipping === 0 ? 'FREE' : `₹${shipping}`}
                </span>
              </div>
            </div>

            <div className="pt-4 flex justify-between items-baseline">
              <span className="font-sans text-base font-semibold text-indigo">Total</span>
              <span className="font-mono-meta text-2xl font-bold text-indigo">₹{grandTotal}</span>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
