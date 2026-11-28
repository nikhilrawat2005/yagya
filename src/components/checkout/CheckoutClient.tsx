'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { ShoppingBag, Lock } from 'lucide-react';
import { useCartStore } from '@/lib/store/cartStore';
import { useAuth } from '@/components/auth/AuthProvider';
import { createOrder } from '@/lib/services/productService';
import { siteConfig } from '@/config/site';
import { INDIAN_STATES_AND_UTS, validateCheckoutForm } from '@/lib/validation/forms';
import { ProductImageWithFallback } from '@/components/ui/ProductImageWithFallback';
import { GlowButton } from '@/components/ui/GlowButton';
import { GlowInput } from '@/components/ui/GlowInput';
import { FadeInSection } from '@/components/motion/FadeInSection';
import { OatSheet } from '@/components/editorial/OatSheet';
import { Doodle } from '@/components/doodles';
import { MOTION_SPRING } from '@/lib/motion/tokens';
import { useInteractiveCapabilities } from '@/lib/motion/useInteractiveCapabilities';

export function CheckoutClient() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const { items, getSubtotalInr, getShippingFeeInr, getGrandTotalInr, clearCart } = useCartStore();
  const { user } = useAuth();
  const { prefersReducedMotion } = useInteractiveCapabilities();

  useEffect(() => {
    void useCartStore.persist.rehydrate();
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'upi',
  });

  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const showPrices = siteConfig.featureFlags.showPrices;
  const subtotal = getSubtotalInr();
  const shipping = getShippingFeeInr();
  const grandTotal = getGrandTotalInr();

  const validate = () => {
    const errs = validateCheckoutForm(formData);
    setErrors(errs);

    const firstErrorKey = Object.keys(errs)[0];
    if (firstErrorKey && formRef.current) {
      const target = formRef.current.querySelector<HTMLElement>(`[name="${firstErrorKey}"]`);
      target?.focus();
    }

    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || items.length === 0) return;

    setLoading(true);
    setSubmitError(null);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          items: items.map((i) => ({
            productId: i.product.id,
            variantId: i.variant.id,
            quantity: i.quantity,
            priceInr: i.variant.priceInr,
          })),
        }),
      });

      const validationRes = (await res.json()) as {
        ok?: boolean;
        errors?: Record<string, string>;
        message?: string;
      };

      if (!res.ok || !validationRes.ok) {
        if (validationRes.errors) setErrors(validationRes.errors);
        setSubmitError(validationRes.message || 'Please check your delivery details.');
        setLoading(false);
        return;
      }

      const order = await createOrder({
        userId: user?.uid || null,
        customerName: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        pincode: formData.pincode.trim(),
        state: formData.state.trim(),
        paymentMethod: formData.paymentMethod,
        items: items.map((i) => ({
          productId: i.product.id,
          variantId: i.variant.id,
          quantity: i.quantity,
          priceInr: i.variant.priceInr,
        })),
        totalInr: grandTotal,
      });

      clearCart();
      const totalQuery = grandTotal !== null ? `&total=${grandTotal}` : '';
      router.push(`/order-success?orderId=${order.orderId}${totalQuery}`);
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Unable to confirm order right now. Please try again.'
      );
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[100dvh] bg-navy text-oat pt-24 sm:pt-32 pb-24 px-4 flex items-center">
        <OatSheet tone="subtle" className="max-w-md mx-auto w-full p-10 text-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-[6px] bg-oat/10 border border-white/25 flex items-center justify-center">
            <ShoppingBag className="w-7 h-7 text-peach" aria-hidden="true" />
          </div>
          <h1 className="font-display text-3xl font-medium text-oat mb-2">
            No items to checkout
          </h1>
          <p className="text-sm text-apricot/90 mb-6">
            Your harvest bag is currently empty. Explore our collection first.
          </p>
          <GlowButton href="/shop" variant="cta" magnetic>
            Explore Collection
          </GlowButton>
        </OatSheet>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-navy text-oat pt-24 sm:pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection className="mb-8">
          <span className="font-ui-label text-[11px] text-peach block mb-1.5">
            Order Review
          </span>
          <h1 className="font-display text-4xl text-oat font-medium">
            {showPrices ? 'Express Checkout' : 'Order & Batch Enquiry'}
          </h1>
        </FadeInSection>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <form ref={formRef} onSubmit={handlePlaceOrder} noValidate className="space-y-6">
              <OatSheet tone="subtle" interactive={false} className="p-6">
                <h2 className="font-display text-xl font-medium text-oat mb-4 flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-[4px] bg-flame text-navy text-xs flex items-center justify-center font-sans font-semibold tabular-nums">
                    1
                  </span>
                  Contact Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <GlowInput
                    name="name"
                    autoComplete="name"
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
                    name="email"
                    autoComplete="email"
                    spellCheck={false}
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
                    name="phone"
                    autoComplete="tel"
                    inputMode="tel"
                    label="10-Digit Mobile *"
                    floatingLabel
                    type="tel"
                    maxLength={10}
                    value={formData.phone}
                    error={errors.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') });
                      if (errors.phone) setErrors({ ...errors, phone: '' });
                    }}
                    placeholder="9123456789"
                    containerClassName="sm:col-span-2"
                  />
                </div>
              </OatSheet>

              <div className="hidden md:flex justify-center py-2">
                <Doodle
                  name="arrow-loop-delight"
                  preset="connector"
                  tone="apricot"
                  size={58}
                  rotate={90}
                  opacity={0.85}
                  showOn="md+"
                  inline
                />
              </div>

              <OatSheet tone="subtle" interactive={false} delay={0.05} className="p-6">
                <h2 className="font-display text-xl font-medium text-oat mb-4 flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-[4px] bg-flame text-navy text-xs flex items-center justify-center font-sans font-semibold tabular-nums">
                    2
                  </span>
                  Shipping Address
                </h2>
                <div className="space-y-4 text-xs">
                  <GlowInput
                    name="address"
                    autoComplete="street-address"
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
                      name="city"
                      autoComplete="address-level2"
                      label="City *"
                      floatingLabel
                      type="text"
                      value={formData.city}
                      error={errors.city}
                      onChange={(e) => {
                        setFormData({ ...formData, city: e.target.value });
                        if (errors.city) setErrors({ ...errors, city: '' });
                      }}
                      placeholder="New Delhi"
                    />

                    <div>
                      <label
                        htmlFor="checkout-state"
                        className="block font-ui-label text-[10px] mb-1.5 text-apricot/95"
                      >
                        State / UT *
                      </label>
                      <select
                        id="checkout-state"
                        name="state"
                        autoComplete="address-level1"
                        value={formData.state}
                        aria-invalid={Boolean(errors.state)}
                        onChange={(e) => {
                          setFormData({ ...formData, state: e.target.value });
                          if (errors.state) setErrors({ ...errors, state: '' });
                        }}
                        className={`w-full rounded-[6px] border px-3 py-2.5 text-xs bg-[#141C2B]/85 text-oat cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oat ${
                          errors.state ? 'border-peach' : 'border-white/30'
                        }`}
                      >
                        <option value="">Select State</option>
                        {INDIAN_STATES_AND_UTS.map((stateName) => (
                          <option key={stateName} value={stateName}>
                            {stateName}
                          </option>
                        ))}
                      </select>
                      {errors.state && (
                        <p role="alert" className="text-peach text-[11px] font-medium mt-1.5">
                          {errors.state}
                        </p>
                      )}
                    </div>

                    <GlowInput
                      name="pincode"
                      autoComplete="postal-code"
                      inputMode="numeric"
                      spellCheck={false}
                      label="6-Digit PIN Code *"
                      floatingLabel
                      type="text"
                      maxLength={6}
                      value={formData.pincode}
                      error={errors.pincode}
                      onChange={(e) => {
                        setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '') });
                        if (errors.pincode) setErrors({ ...errors, pincode: '' });
                      }}
                      placeholder="110001"
                    />
                  </div>
                </div>
              </OatSheet>

              <OatSheet tone="subtle" interactive={false} delay={0.1} className="p-6">
                <h2 className="font-display text-xl font-medium text-oat mb-4 flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-[4px] bg-flame text-navy text-xs flex items-center justify-center font-sans font-semibold tabular-nums">
                    3
                  </span>
                  Preferred Payment Method
                </h2>
                <div className="space-y-3">
                  {[
                    { id: 'upi', label: 'UPI', desc: 'Instant UPI transfer once confirmed' },
                    { id: 'card', label: 'Credit or Debit Card', desc: 'Domestic & international cards' },
                    { id: 'cod', label: 'Cash on Delivery', desc: 'Subject to PIN code eligibility' },
                  ].map((m) => {
                    const selected = formData.paymentMethod === m.id;
                    return (
                      <motion.label
                        key={m.id}
                        whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
                        transition={MOTION_SPRING.tactile}
                        className={`flex items-start gap-3 p-3.5 rounded-[6px] border cursor-pointer transition-[border-color,background-color] duration-200 ${
                          selected
                            ? 'border-flame bg-oat/[0.18]'
                            : 'border-white/25 bg-oat/[0.08] hover:border-apricot/55'
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
                          <p className="text-[11px] text-apricot/85">{m.desc}</p>
                        </div>
                      </motion.label>
                    );
                  })}
                </div>
              </OatSheet>

              {submitError && (
                <div
                  role="alert"
                  className="p-3.5 rounded-[6px] border border-flame/60 bg-flame/20 text-xs text-oat"
                >
                  {submitError}
                </div>
              )}

              <GlowButton
                type="submit"
                variant="cta"
                magnetic
                disabled={loading}
                className="w-full py-4"
              >
                {loading ? (
                  <span>Submitting order details…</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" aria-hidden="true" />
                    <span className="tabular-nums">
                      {grandTotal !== null
                        ? `Confirm Order · ${siteConfig.currencySymbol}${grandTotal}`
                        : 'Submit Order Request'}
                    </span>
                  </>
                )}
              </GlowButton>
            </form>
          </div>

          <div className="lg:col-span-5">
            <OatSheet tone="medium" interactive={false} className="p-6 sticky top-24">
              <h2 className="font-display text-xl font-medium text-oat mb-4">
                Order Summary
              </h2>

              <div data-lenis-prevent className="divide-y divide-white/15 mb-6 max-h-72 overflow-y-auto overscroll-contain">
                {items.map((i) => (
                  <div key={i.id} className="py-3 flex gap-3 items-center">
                    <div className="w-12 h-12 rounded-[4px] bg-oat/[0.12] border border-white/20 relative overflow-hidden shrink-0">
                      <ProductImageWithFallback
                        src={i.product.images[0]?.src || ''}
                        alt={i.product.name}
                        fill
                        sizes="48px"
                        className={
                          i.product.images[0]?.src?.includes('/assets/products/')
                            ? 'object-cover'
                            : 'object-contain p-1'
                        }
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-oat line-clamp-1">{i.product.name}</p>
                      <p className="text-[11px] text-apricot/85 tabular-nums">
                        {i.variant.weight} × {i.quantity}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-peach tabular-nums">
                      {showPrices && i.variant.priceInr !== null
                        ? `${siteConfig.currencySymbol}${i.variant.priceInr * i.quantity}`
                        : 'Price coming soon'}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-xs text-apricot/90 pb-4 border-b border-white/15 tabular-nums">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-oat">
                    {subtotal !== null
                      ? `${siteConfig.currencySymbol}${subtotal}`
                      : 'Confirmed on review'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-oat text-right">
                    {shipping === null
                      ? 'Shipping calculated at confirmation'
                      : shipping === 0
                      ? 'FREE'
                      : `${siteConfig.currencySymbol}${shipping}`}
                  </span>
                </div>
              </div>

              <div className="pt-4 flex justify-between items-baseline tabular-nums">
                <span className="text-base font-medium text-oat">Total</span>
                <span className="font-display text-2xl font-semibold text-peach">
                  {grandTotal !== null
                    ? `${siteConfig.currencySymbol}${grandTotal}`
                    : 'Confirmed on review'}
                </span>
              </div>
            </OatSheet>
          </div>
        </div>
      </div>
    </div>
  );
}
