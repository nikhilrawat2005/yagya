import { Suspense } from 'react';
import Link from 'next/link';

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
  const orderId = resolved.orderId || 'BP-847291';
  const total = resolved.total || '499';

  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      {/* Calm Animated Checkmark */}
      <div className="w-20 h-20 mx-auto rounded-full bg-primary-fixed text-primary flex items-center justify-center mb-6 shadow-sm">
        <span className="material-symbols-outlined text-4xl">check</span>
      </div>

      <span className="text-xs font-semibold uppercase tracking-widest text-secondary block mb-1">
        Harvest Reserved
      </span>
      <h1 className="font-serif text-3xl sm:text-4xl text-primary font-normal mb-3">
        Order Confirmed
      </h1>
      <p className="text-xs text-on-surface-variant max-w-sm mx-auto mb-8 leading-relaxed">
        Thank you for choosing unadulterated nourishment. Your batch is being freshly packed and
        sealed at our atelier source.
      </p>

      {/* Order Details Card */}
      <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/30 text-left mb-8 space-y-3 text-xs">
        <div className="flex justify-between pb-3 border-b border-outline-variant/30">
          <span className="text-on-surface-variant">Order Identifier</span>
          <span className="font-mono font-semibold text-primary">{orderId}</span>
        </div>
        <div className="flex justify-between pb-3 border-b border-outline-variant/30">
          <span className="text-on-surface-variant">Amount Paid</span>
          <span className="font-serif font-bold text-primary">₹{total}</span>
        </div>
        <div className="flex justify-between pb-3 border-b border-outline-variant/30">
          <span className="text-on-surface-variant">Estimated Dispatch</span>
          <span className="font-medium text-primary">Within 24 hours</span>
        </div>
        <div className="flex justify-between">
          <span className="text-on-surface-variant">Tracking Notice</span>
          <span className="font-medium text-primary">SMS & Email sent</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/shop"
          className="px-6 py-3 rounded-full bg-primary-container text-surface hover:bg-secondary text-xs font-semibold uppercase tracking-wider transition-colors"
        >
          Explore More Superfoods
        </Link>
        <Link
          href="/"
          className="px-6 py-3 rounded-full bg-surface-container border border-outline-variant text-primary text-xs font-semibold uppercase tracking-wider hover:bg-surface-variant transition-colors"
        >
          Return to Home
        </Link>
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
    <Suspense fallback={<div className="text-center py-20 text-xs">Loading harvest receipt...</div>}>
      <OrderSuccessContent searchParams={searchParams} />
    </Suspense>
  );
}
