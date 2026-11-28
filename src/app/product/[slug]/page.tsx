import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, getProducts } from '@/lib/services/productService';
import { ProductDetailClient } from '@/components/product/ProductDetailClient';
import { siteConfig } from '@/config/site';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const allProducts = await getProducts();
  return allProducts.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return {
      title: `Product Not Found — ${siteConfig.brandName}`,
    };
  }
  return {
    title: `${product.name} — ${siteConfig.brandName}`,
    description: product.shortDescription,
  };
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

  // Clean Product JSON-LD without unconfirmed prices, fake SKUs, or fake ratings/reviews
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription,
    category: product.category,
    brand: {
      '@type': 'Brand',
      name: siteConfig.brandName,
    },
    ...(product.images[0]?.src
      ? {
          image: [`${siteConfig.siteUrl}${product.images[0].src}`],
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
    </>
  );
}
