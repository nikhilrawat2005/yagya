import React from 'react';

export interface SkeletonProps {
  className?: string;
}

/**
 * Editorial dark-botanical shimmer placeholder respecting reduced-motion.
 */
export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={`rounded-[6px] bg-oat/10 animate-pulse motion-reduce:animate-none ${className}`}
    />
  );
}

/**
 * Matching aspect-[4/5] product card skeleton for shop/collection loading states.
 */
export function ProductCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="rounded-[8px] border border-white/15 bg-[#141C2B]/75 p-4 sm:p-5 flex flex-col justify-between"
    >
      <div>
        <Skeleton className="aspect-[4/5] w-full mb-4" />
        <Skeleton className="h-3 w-24 mb-2" />
        <Skeleton className="h-5 w-3/4 mb-2" />
        <Skeleton className="h-3.5 w-full mb-1.5" />
        <Skeleton className="h-3.5 w-2/3 mb-4" />
      </div>
      <div className="pt-3.5 border-t border-white/10 flex items-center justify-between gap-2">
        <div className="space-y-1.5">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-3 w-12" />
        </div>
        <Skeleton className="h-9 w-20" />
      </div>
    </div>
  );
}
