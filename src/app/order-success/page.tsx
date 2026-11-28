import { Suspense } from 'react';
import { Check } from 'lucide-react';
import { GlowButton } from '@/components/ui/GlowButton';
import { OatSheet } from '@/components/editorial/OatSheet';

function OrderSuccessContent({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string; total?: string }>;
}) {
  return (
    <Suspense fallback={<div className="text-center py-28 text-xs text-apricot">Loading harvest receipt…</div>}>
      <OrderSuccessDetails searchParams={searchParams} />
    </Suspense>
  );
}

async function OrderSuccessDetails({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string; total?: string }>;
}) {
  const resolved = await searchParams;
  const orderId = resolved.orderId || 'YAG-847291';
  const total = resolved.total || '249';

  return (
    <div className="min-h-[100dvh] bg-aubergine text-oat pt-24 sm:pt-32 pb-24 px-4 flex items-center">
      <div className="max-w-lg mx-auto w-full text-center">
        <div className="w-16 h-16 mx-auto rounded-[6px] bg-oat/[0.14] border border-white/25 text-peach flex items-center justify-center mb-6">
          <Check className="w-8 h-8" aria-hidden="true" />
        </div>

        <span className="font-ui-label text-[11px] text-peach block mb-2">
          Harvest Reserved
        </span>
        <h1 className="font-display text-4xl text-oat font-medium mb-3">
          Order Confirmed
        </h1>
        <p className="text-sm text-apricot/95 max-w-sm mx-auto mb-8">
          Thank you for choosing Yagya farm-direct superfoods. Your batch is packed fresh and sealed carefully.
        </p>

        <OatSheet tone="medium" interactive={false} className="p-6 text-left mb-8 space-y-3 text-xs">
          <div className="flex justify-between pb-3 border-b border-white/15">
            <span className="text-apricot/90">Order Identifier</span>
            <span className="font-semibold text-oat tabular-nums">{orderId}</span>
          </div>
          <div className="flex justify-between pb-3 border-b border-white/15">
            <span className="text-apricot/90">Total Amount</span>
            <span className="font-semibold text-peach tabular-nums">₹{total}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-apricot/90">Dispatch Cadence</span>
            <span className="font-medium text-oat">Within 24-48 hours</span>
          </div>
        </OatSheet>

        <div className="relative flex flex-col sm:flex-row gap-3 justify-center items-center">
          <GlowButton href="/shop" variant="cta" magnetic>
            Explore Collection
          </GlowButton>
          <GlowButton href="/" variant="secondary">
            Return Home
          </GlowButton>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string; total?: string }>;
}) {
  return (
    <Suspense fallback={<div className="text-center py-28 text-xs text-apricot">Loading harvest receipt…</div>}>
      <OrderSuccessContent searchParams={searchParams} />
    </Suspense>
  );
}
