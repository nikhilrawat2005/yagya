import { notFound } from 'next/navigation';
import { getProductBySlug, getProducts } from '@/lib/services/productService';
import { ProductDetailClient } from '@/components/product/ProductDetailClient';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const allProducts = await getProducts();
  return allProducts.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const allProducts = await getProducts();
  const relatedProducts = allProducts.filter((p) =>
    product.relatedSlugs?.includes(p.slug)
  );

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
