import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getProducts, getCategories } from '@/lib/services/productService';
import { ShopClient } from '@/components/shop/ShopClient';
import { ProductCardSkeleton, Skeleton } from '@/components/ui/Skeleton';

export const metadata: Metadata = {
  title: 'Shop Pantry Collection',
};

export const dynamic = 'force-dynamic';

async function ShopContent({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const resolvedParams = await searchParams;
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return (
    <ShopClient
      products={products}
      categories={categories}
      initialCategory={resolvedParams.category}
    />
  );
}

function ShopLoadingFallback() {
  return (
    <div className="min-h-[100dvh] bg-navy pt-24 sm:pt-32 pb-16 px-5 sm:px-8 lg:px-12 max-w-6xl mx-auto space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-3 w-36" />
        <Skeleton className="h-10 w-64" />
      </div>
      <Skeleton className="h-24 w-full" />
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export default function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  return (
    <Suspense fallback={<ShopLoadingFallback />}>
      <ShopContent searchParams={searchParams} />
    </Suspense>
  );
}
