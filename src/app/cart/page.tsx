'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/lib/store/cartStore';
import { OatSheet } from '@/components/editorial/OatSheet';
import { GlowButton } from '@/components/ui/GlowButton';

export default function CartPage() {
  const router = useRouter();
  const openCart = useCartStore((s) => s.openCart);

  useEffect(() => {
    void useCartStore.persist.rehydrate();
    openCart();
    router.replace('/shop');
  }, [openCart, router]);

  return (
    <div className="min-h-[100dvh] bg-navy text-oat pt-24 sm:pt-32 pb-24 px-4 flex items-center">
      <div className="max-w-md mx-auto w-full">
        <OatSheet tone="subtle" interactive={false} className="p-8 text-center space-y-4">
          <div className="w-14 h-14 mx-auto rounded-[6px] bg-oat/10 border border-white/25 flex items-center justify-center text-peach">
            <ShoppingBag className="w-7 h-7" aria-hidden="true" />
          </div>
          <h1 className="font-display text-3xl font-medium text-oat">
            Opening Your Harvest Bag
          </h1>
          <p className="text-sm text-sand">
            Redirecting you to the pantry collection with your Harvest Bag drawer open.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <GlowButton href="/shop" variant="cta">
              Go to Shop
            </GlowButton>
            <GlowButton href="/checkout" variant="secondary">
              Checkout
            </GlowButton>
          </div>
        </OatSheet>
      </div>
    </div>
  );
}
