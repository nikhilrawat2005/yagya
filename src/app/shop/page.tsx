import { Suspense } from 'react';
import { getProducts, getCategories } from '@/lib/services/productService';
import { ShopClient } from '@/components/shop/ShopClient';

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

export default function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  return (
    <Suspense fallback={<div className="text-center py-20 text-xs">Loading harvest catalog…</div>}>
      <ShopContent searchParams={searchParams} />
    </Suspense>
  );
}
