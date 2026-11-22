'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store/cartStore';
import { createOrder } from '@/lib/services/productService';
import { ProductImageWithFallback } from '@/components/ui/ProductImageWithFallback';

export function CheckoutClient() {
  const router = useRouter();
  const { items, getSubtotal, getShippingFee, clearCart } = useCartStore();

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
    if (!validate()) return;
    if (items.length === 0) return;

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
      <div className="max-w-md mx-auto py-24 px-4 text-center">
        <span className="material-symbols-outlined text-5xl text-on-surface-variant/40 mb-3">
          shopping_basket
        </span>
        <h1 className="font-serif text-2xl font-medium text-primary mb-2">No items to checkout</h1>
        <p className="text-xs text-on-surface-variant mb-6">
          Your cart is currently empty. Explore our small-batch harvests before ordering.
        </p>
        <Link
          href="/shop"
          className="px-6 py-2.5 rounded-full bg-primary-container text-surface text-xs font-semibold uppercase tracking-wider inline-block"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8">
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-secondary block mb-1">
          Secure Sanctuary
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-primary font-normal">
          Express Checkout
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Form */}
        <div className="lg:col-span-7">
          <form onSubmit={handlePlaceOrder} className="space-y-8">
            {/* Step 1: Contact */}
            <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30">
              <h2 className="font-serif text-lg font-medium text-primary mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-surface text-xs flex items-center justify-center font-sans">
                  1
                </span>
                Contact & Notification Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-on-surface-variant font-medium mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nikhil Rawat"
                    className="w-full bg-surface border border-outline-variant/60 rounded-xl px-3.5 py-2.5 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  {errors.name && <p className="text-error text-[11px] mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-on-surface-variant font-medium mb-1">Email for Receipt *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="nikhil@example.com"
                    className="w-full bg-surface border border-outline-variant/60 rounded-xl px-3.5 py-2.5 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  {errors.email && <p className="text-error text-[11px] mt-1">{errors.email}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-on-surface-variant font-medium mb-1">Mobile (Dispatch SMS & Tracking) *</label>
                  <input
                    type="tel"
                    maxLength={10}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                    placeholder="9876543210"
                    className="w-full bg-surface border border-outline-variant/60 rounded-xl px-3.5 py-2.5 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  {errors.phone && <p className="text-error text-[11px] mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Step 2: Delivery Address */}
            <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30">
              <h2 className="font-serif text-lg font-medium text-primary mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-surface text-xs flex items-center justify-center font-sans">
                  2
                </span>
                Shipping Address
              </h2>
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-on-surface-variant font-medium mb-1">Street Address & Flat/House *</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="House 42, Sector 15"
                    className="w-full bg-surface border border-outline-variant/60 rounded-xl px-3.5 py-2.5 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  {errors.address && <p className="text-error text-[11px] mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-on-surface-variant font-medium mb-1">City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Gurugram"
                      className="w-full bg-surface border border-outline-variant/60 rounded-xl px-3.5 py-2.5 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-on-surface-variant font-medium mb-1">State</label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full bg-surface border border-outline-variant/60 rounded-xl px-3.5 py-2.5 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-on-surface-variant font-medium mb-1">Pincode *</label>
                    <input
                      type="text"
                      maxLength={6}
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '') })}
                      placeholder="122001"
                      className="w-full bg-surface border border-outline-variant/60 rounded-xl px-3.5 py-2.5 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    {errors.pincode && <p className="text-error text-[11px] mt-1">{errors.pincode}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Payment */}
            <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30">
              <h2 className="font-serif text-lg font-medium text-primary mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-surface text-xs flex items-center justify-center font-sans">
                  3
                </span>
                Payment Sanctuary
              </h2>
              <div className="space-y-3">
                {[
                  { id: 'upi', label: 'Instant UPI (Google Pay, PhonePe, Paytm)', desc: 'Fast, secure zero-touch payment' },
                  { id: 'card', label: 'Credit or Debit Card', desc: 'All major Indian & international cards' },
                  { id: 'cod', label: 'Cash on Delivery', desc: 'Available for verified Indian postal areas' },
                ].map((m) => (
                  <label
                    key={m.id}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      formData.paymentMethod === m.id
                        ? 'border-primary bg-surface shadow-xs'
                        : 'border-outline-variant/40 bg-surface/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === m.id}
                      onChange={() => setFormData({ ...formData, paymentMethod: m.id })}
                      className="mt-1 accent-primary"
                    />
                    <div>
                      <p className="text-xs font-semibold text-primary">{m.label}</p>
                      <p className="text-[11px] text-on-surface-variant">{m.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-full bg-primary-container text-surface hover:bg-secondary font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md disabled:opacity-50"
            >
              {loading ? (
                <span>Securing your harvest batch...</span>
              ) : (
                <>
                  <span className="material-symbols-outlined text-base">lock</span>
                  <span>Confirm Order · ₹{grandTotal}</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 sticky top-28">
            <h3 className="font-serif text-lg font-medium text-primary mb-4">Order Summary</h3>

            {/* Items List */}
            <div className="divide-y divide-outline-variant/30 mb-6 max-h-72 overflow-y-auto">
              {items.map((i) => (
                <div key={i.id} className="py-3 flex gap-3 items-center">
                  <div className="w-12 h-12 rounded-lg bg-surface relative overflow-hidden shrink-0">
                    <ProductImageWithFallback
                      src={i.product.images[0]?.src || ''}
                      alt={i.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-primary line-clamp-1">{i.product.name}</p>
                    <p className="text-[11px] text-on-surface-variant">
                      {i.variant.weight} × {i.quantity}
                    </p>
                  </div>
                  <span className="text-xs font-serif font-semibold text-primary">
                    ₹{i.variant.price * i.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Promo code */}
            <div className="mb-6 pt-4 border-t border-outline-variant/30">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  placeholder="PROMO CODE"
                  className="bg-surface border border-outline-variant/60 rounded-xl px-3 py-1.5 text-xs text-on-surface uppercase font-semibold flex-1"
                />
                <button
                  type="button"
                  onClick={() => setPromoApplied(promoCode === 'HARVEST10')}
                  className="px-4 py-1.5 rounded-xl bg-surface-container border border-outline-variant text-xs font-semibold uppercase text-primary hover:bg-primary-fixed"
                >
                  Apply
                </button>
              </div>
              {promoApplied && (
                <p className="text-[11px] text-primary font-medium mt-1.5 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">check_circle</span>
                  HARVEST10 applied (10% festive harvest savings)
                </p>
              )}
            </div>

            {/* Calculations */}
            <div className="space-y-2 text-xs text-on-surface-variant pb-4 border-b border-outline-variant/30">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="text-on-surface font-medium">₹{subtotal}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-secondary">
                  <span>Harvest Discount (10%)</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? <span className="text-primary font-semibold">Free</span> : `₹${shipping}`}
                </span>
              </div>
            </div>

            <div className="pt-4 flex justify-between items-baseline">
              <span className="font-serif text-base font-medium text-primary">Total Amount</span>
              <span className="font-serif text-2xl font-bold text-primary">₹{grandTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
