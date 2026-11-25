import { Suspense } from 'react';
import { Check } from 'lucide-react';
import { GlowButton } from '@/components/ui/GlowButton';
import { FadeInSection } from '@/components/motion/FadeInSection';

function OrderSuccessContent({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string; total?: string }>;
}) {
  return (
    <Suspense fallback={<div className="text-center py-20 text-xs">Loading harvest receipt...</div>}>
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
    <FadeInSection className="max-w-lg mx-auto px-4 py-16 text-center">
      <div className="glow-hover w-20 h-20 mx-auto rounded-full bg-apricot border-2 border-charcoal text-indigo flex items-center justify-center mb-6 shadow-[var(--glow-level-2)]">
        <Check className="w-9 h-9 text-indigo icon-hover-pop" />
      </div>

      <span className="font-mono-meta text-xs uppercase tracking-widest text-cranberry block mb-1">
        Harvest Reserved
      </span>
      <h1 className="font-display text-4xl text-indigo font-semibold mb-3">
        Order Confirmed
      </h1>
      <p className="font-script-body text-sm text-indigo max-w-sm mx-auto mb-8">
        Thank you for choosing Yagya farm-direct superfoods. Your batch is packed fresh and sealed carefully.
      </p>

      <div className="glow-border bg-apricot/55 rounded-2xl p-6 border-2 border-charcoal/30 text-left mb-8 space-y-3 text-xs font-sans">
        <div className="flex justify-between pb-3 border-b border-charcoal/15">
          <span>Order Identifier</span>
          <span className="font-mono-meta font-bold text-indigo">{orderId}</span>
        </div>
        <div className="flex justify-between pb-3 border-b border-charcoal/15">
          <span>Total Amount</span>
          <span className="font-mono-meta font-bold text-cranberry">₹{total}</span>
        </div>
        <div className="flex justify-between">
          <span>Dispatch Cadence</span>
          <span className="font-medium text-indigo">Within 24–48 hours</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <GlowButton href="/shop" variant="cta" magnetic>
          EXPLORE MORE
        </GlowButton>
        <GlowButton href="/" variant="secondary">
          RETURN HOME
        </GlowButton>
      </div>
    </FadeInSection>
  );
}

export default function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string; total?: string }>;
}) {
  return (
    <Suspense fallback={<div className="text-center py-20 text-xs">Loading harvest receipt...</div>}>
      <OrderSuccessContent searchParams={searchParams} />
    </Suspense>
  );
}
