'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Lock, CheckCircle2 } from 'lucide-react';
import { useCartStore } from '@/lib/store/cartStore';
import { createOrder } from '@/lib/services/productService';
import { ProductImageWithFallback } from '@/components/ui/ProductImageWithFallback';
import { Button } from '@/components/ui/Button';

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
      <div className="max-w-md mx-auto py-24 px-4 text-center">
        <ShoppingBag className="w-12 h-12 text-indigo/50 mx-auto mb-3" />
        <h1 className="font-display text-3xl font-semibold text-indigo mb-2">
          No items to checkout
        </h1>
        <p className="font-script-body text-sm text-indigo/85 mb-6">
          Your harvest bag is currently empty. Explore our small-batch seeds and berries first.
        </p>
        <Button href="/shop">RETURN TO SHOP</Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
      <div className="mb-8">
        <span className="font-mono-meta text-xs uppercase tracking-widest text-cranberry block mb-1">
          Order Review
        </span>
        <h1 className="font-display text-4xl text-indigo font-semibold">
          Express Checkout
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Form */}
        <div className="lg:col-span-7">
          <form onSubmit={handlePlaceOrder} className="space-y-6">
            <div className="bg-apricot/45 p-6 rounded-2xl border-2 border-charcoal/25">
              <h2 className="font-sans text-base font-semibold text-indigo mb-4 flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-indigo text-oat text-xs flex items-center justify-center font-mono-meta">
                  1
                </span>
                Contact Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-ui-label text-[10px] text-indigo mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Aarav Singh"
                    className="w-full bg-oat border border-charcoal/30 rounded-xl px-3.5 py-2.5 text-indigo focus:outline-none focus:border-indigo"
                  />
                  {errors.name && <p className="text-cranberry text-[11px] mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block font-ui-label text-[10px] text-indigo mb-1">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="aarav@example.com"
                    className="w-full bg-oat border border-charcoal/30 rounded-xl px-3.5 py-2.5 text-indigo focus:outline-none focus:border-indigo"
                  />
                  {errors.email && <p className="text-cranberry text-[11px] mt-1">{errors.email}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-ui-label text-[10px] text-indigo mb-1">Mobile *</label>
                  <input
                    type="tel"
                    maxLength={10}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                    placeholder="9876543210"
                    className="w-full bg-oat border border-charcoal/30 rounded-xl px-3.5 py-2.5 text-indigo focus:outline-none focus:border-indigo"
                  />
                  {errors.phone && <p className="text-cranberry text-[11px] mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            <div className="bg-apricot/45 p-6 rounded-2xl border-2 border-charcoal/25">
              <h2 className="font-sans text-base font-semibold text-indigo mb-4 flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-indigo text-oat text-xs flex items-center justify-center font-mono-meta">
                  2
                </span>
                Shipping Address
              </h2>
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-ui-label text-[10px] text-indigo mb-1">Street Address *</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="House 42, Sector 15"
                    className="w-full bg-oat border border-charcoal/30 rounded-xl px-3.5 py-2.5 text-indigo focus:outline-none focus:border-indigo"
                  />
                  {errors.address && <p className="text-cranberry text-[11px] mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-ui-label text-[10px] text-indigo mb-1">City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Gurugram"
                      className="w-full bg-oat border border-charcoal/30 rounded-xl px-3.5 py-2.5 text-indigo focus:outline-none focus:border-indigo"
                    />
                  </div>
                  <div>
                    <label className="block font-ui-label text-[10px] text-indigo mb-1">State</label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full bg-oat border border-charcoal/30 rounded-xl px-3.5 py-2.5 text-indigo focus:outline-none focus:border-indigo"
                    />
                  </div>
                  <div>
                    <label className="block font-ui-label text-[10px] text-indigo mb-1">Pincode *</label>
                    <input
                      type="text"
                      maxLength={6}
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '') })}
                      placeholder="122001"
                      className="w-full bg-oat border border-charcoal/30 rounded-xl px-3.5 py-2.5 text-indigo focus:outline-none focus:border-indigo"
                    />
                    {errors.pincode && <p className="text-cranberry text-[11px] mt-1">{errors.pincode}</p>}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-apricot/45 p-6 rounded-2xl border-2 border-charcoal/25">
              <h2 className="font-sans text-base font-semibold text-indigo mb-4 flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-indigo text-oat text-xs flex items-center justify-center font-mono-meta">
                  3
                </span>
                Payment Option
              </h2>
              <div className="space-y-3">
                {[
                  { id: 'upi', label: 'Instant UPI', desc: 'Fast zero-touch payment' },
                  { id: 'card', label: 'Credit or Debit Card', desc: 'Major Indian & international cards' },
                  { id: 'cod', label: 'Cash on Delivery', desc: 'Available for serviceable Indian PINs' },
                ].map((m) => (
                  <label
                    key={m.id}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-colors ${
                      formData.paymentMethod === m.id
                        ? 'border-charcoal bg-oat'
                        : 'border-charcoal/20 bg-oat/50 hover:bg-oat'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === m.id}
                      onChange={() => setFormData({ ...formData, paymentMethod: m.id })}
                      className="mt-1 accent-indigo"
                    />
                    <div>
                      <p className="text-xs font-semibold text-indigo">{m.label}</p>
                      <p className="text-[11px] text-indigo/75">{m.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full py-4">
              {loading ? (
                <span>Confirming harvest batch...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>CONFIRM ORDER · ₹{grandTotal}</span>
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Right Summary */}
        <div className="lg:col-span-5">
          <div className="bg-apricot/55 p-6 rounded-2xl border-2 border-charcoal sticky top-28">
            <h3 className="font-sans text-lg font-semibold text-indigo mb-4">
              Order Summary
            </h3>

            <div className="divide-y divide-charcoal/15 mb-6 max-h-72 overflow-y-auto">
              {items.map((i) => (
                <div key={i.id} className="py-3 flex gap-3 items-center">
                  <div className="w-12 h-12 rounded-lg bg-oat border border-charcoal/20 relative overflow-hidden shrink-0 p-1">
                    <ProductImageWithFallback
                      src={i.product.images[0]?.src || ''}
                      alt={i.product.name}
                      fill
                      className="object-contain"
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
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  placeholder="PROMO CODE"
                  className="bg-oat border border-charcoal/30 rounded-xl px-3 py-1.5 text-xs text-indigo uppercase font-mono-meta flex-1"
                />
                <button
                  type="button"
                  onClick={() => setPromoApplied(promoCode === 'HARVEST10')}
                  className="px-4 py-1.5 rounded-xl bg-indigo text-oat hover:bg-burnt font-ui-label text-[11px] transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {promoApplied && (
                <p className="text-[11px] text-indigo font-medium mt-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cranberry" />
                  HARVEST10 applied (10% harvest savings)
                </p>
              )}
            </div>

            <div className="space-y-2 text-xs text-indigo pb-4 border-b border-charcoal/15">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono-meta font-bold">₹{subtotal}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-cranberry">
                  <span>Harvest Discount (10%)</span>
                  <span className="font-mono-meta">-₹{discount}</span>
                </div>
              )}
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
        </div>
      </div>
    </div>
  );
}
