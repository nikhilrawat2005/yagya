import Link from 'next/link';
import { siteConfig } from '@/lib/data/site';
import { ProductImageWithFallback } from '@/components/ui/ProductImageWithFallback';

export default function AboutPage() {
  return (
    <div className="max-w-[1000px] mx-auto px-4 md:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-semibold uppercase tracking-widest text-secondary block mb-1">
          Our Story & Soil
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-primary font-normal mb-4">
          The Botanica Pantry Philosophy
        </h1>
        <p className="text-base text-on-surface-variant leading-relaxed">
          {siteConfig.description}
        </p>
      </div>

      <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-surface-container-low mb-12 shadow-sm border border-outline-variant/30">
        <ProductImageWithFallback
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4Y_yLhxexFpa0Jj0wcVSGACCOsVqlxTP3X4U_acAphLNMt8lcuhLybZrpS6UT9ck5zsag6131m7mqK-Rqh3u2NNmwyed6YWfqrZVltPgtUk5va2Hzum9fBwJxrdNDVq384xTzdSX_t3Bi5kEEkd4806ux8w96IxhUElTkKfUUW8yWay3JRgkVqx7Y5rPuZfPa8IoW6l8lLnhkc8MbQ5CjIdnbRL5D6RV8gpcS-xZM"
          alt="Natural pantry shelves with wholesome seeds"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="prose prose-stone max-w-none text-xs sm:text-sm text-on-surface-variant leading-relaxed space-y-6">
        <p>
          In a world dominated by ultra-processed food and synthetic supplements, we founded{' '}
          <strong>{siteConfig.name}</strong> on a solitary conviction: true vitality has always been
          simple. Nature crafted complete nutritional matrixes thousands of years before laboratories
          formulated isolated pills.
        </p>
        <p>
          We source directly from smallholder farming families practicing traditional, chemical-free
          agriculture across Mithila, Kashmir, and high Himalayan valleys. Every seed is sun-dried,
          gently woodfire roasted or mechanically shelled, and packed at source in resealable multi-barrier
          pouches.
        </p>
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/shop"
          className="px-8 py-3.5 rounded-full bg-primary-container text-surface hover:bg-secondary text-xs font-semibold uppercase tracking-wider inline-block"
        >
          Explore the Harvest
        </Link>
      </div>
    </div>
  );
}
