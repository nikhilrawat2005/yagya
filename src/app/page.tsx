import Link from 'next/link';
import { getProducts, getCategories } from '@/lib/services/productService';
import { ProductCard } from '@/components/product/ProductCard';
import { FibonacciHero } from '@/components/hero/FibonacciHero';
import { ProductJarsStrip } from '@/components/hero/ProductJarsStrip';
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger';
import { Marquee } from '@/components/motion/Marquee';

export default async function HomePage() {
  const [allProducts] = await Promise.all([getProducts()]);
  const bestsellers = allProducts.filter((p) => p.isBestseller);

  return (
    <div className="flex flex-col w-full pb-20 bg-[#F6EFE2] text-[#2E3175]">
      {/* 1. EXACT MOCKUP HERO WITH CHARCOAL & CRANBERRY DOODLES, FIBONACCI GRID & MARKER */}
      <FibonacciHero />

      {/* 2. 6 PRODUCT JARS HORIZONTAL SHELF WITH PILL BADGES */}
      <ProductJarsStrip />

      {/* 3. MARQUEE STRIP */}
      <section className="bg-[#2E3175] text-[#F6EFE2] py-3.5 border-y-2 border-[#2B2B2B] shadow-inner my-6">
        <Marquee>
          <span className="mx-6 text-xs uppercase tracking-[0.16em] font-bold flex items-center gap-3">
            <span>DRIED SEA BUCKTHORN</span>
            <span className="text-[#F28C1B]">★</span>
            <span className="text-[#FBC98A]">OMEGA-7 NUTRITION</span>
            <span className="text-[#F28C1B]">★</span>
            <span>HIMALAYAN SUPERFOODS</span>
            <span className="text-[#F28C1B]">★</span>
            <span className="text-[#FBC98A]">100% DIRECT FROM FARMERS</span>
            <span className="text-[#F28C1B]">★</span>
            <span>ZERO ADDED SUGAR</span>
            <span className="text-[#F28C1B]">★</span>
          </span>
        </Marquee>
      </section>

      {/* 4. FEATURED CATALOG ITEMS */}
      <section className="max-w-[1360px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="font-script text-2xl text-[#B3122D] block mb-1">Authentic Harvest</span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#2E3175] font-bold tracking-tight">
              Featured Superfoods
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-semibold uppercase tracking-[0.08em] text-[#2E3175] hover:text-[#D9700B] inline-flex items-center gap-1.5 group"
          >
            <span>View All Products</span>
            <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </Link>
        </div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.slice(0, 4).map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* 5. NUTRITION SPOTLIGHT - THE SEA BUCKTHORN DIFFERENCE */}
      <section className="max-w-[1360px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-[#FDE6C8] border-2 border-[#2B2B2B] rounded-3xl p-6 md:p-10 shadow-[4px_6px_0px_#2B2B2B]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6">
              <span className="bg-[#B3122D] text-white text-[10px] font-bold uppercase tracking-[0.1em] px-3 py-1 rounded-full inline-block mb-3">
                Pure Nutrition Breakdown
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#2E3175] font-bold leading-tight mb-4">
                The Himalayan Holy Fruit: <br />
                <span className="text-[#B3122D]">Sea Buckthorn</span> (Hippophae rhamnoides)
              </h2>
              <p className="text-sm md:text-base text-[#2B2B2B]/85 leading-relaxed mb-6 font-sans">
                Unlike sugary fruit snacks, our whole berries retain pulp and seed oil. Every 10g daily serving provides dense restorative benefits for your skin glow, gut microbiome, and cell defense.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#F28C1B] text-white flex items-center justify-center text-xs font-bold">✓</span>
                  <p className="text-xs md:text-sm font-semibold text-[#2E3175]">
                    650 mg natural Vitamin C per 100g (over 80% daily value per serve)
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#F28C1B] text-white flex items-center justify-center text-xs font-bold">✓</span>
                  <p className="text-xs md:text-sm font-semibold text-[#2E3175]">
                    Complete Omegas 3, 6, 7 & 9 for internal and external hydration
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#F28C1B] text-white flex items-center justify-center text-xs font-bold">✓</span>
                  <p className="text-xs md:text-sm font-semibold text-[#2E3175]">
                    Zero added sugar, zero preservatives, unbleached & non-GMO
                  </p>
                </div>
              </div>

              <Link
                href="/product/dried-sea-buckthorn-berries"
                className="px-6 py-3 rounded-full bg-[#2E3175] text-[#F6EFE2] hover:bg-[#D9700B] text-xs font-semibold uppercase tracking-[0.08em] inline-flex items-center gap-2 transition-colors shadow-[2px_3px_0px_#2B2B2B]"
              >
                <span>Read Full Lab Spec</span>
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </Link>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-white rounded-2xl border-2 border-[#2B2B2B] p-5 shadow-sm">
                <h4 className="font-serif text-lg font-bold text-[#2E3175] border-b border-[#2B2B2B]/15 pb-2 mb-3">
                  Nutritional Value (Per 100g)
                </h4>
                <div className="space-y-2.5 text-xs font-sans">
                  <div className="flex justify-between py-1 border-b border-[#2B2B2B]/10">
                    <span className="text-[#2B2B2B]/80">Energy</span>
                    <span className="font-mono-meta font-bold text-[#2E3175]">345 kcal</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#2B2B2B]/10">
                    <span className="text-[#2B2B2B]/80">Natural Vitamin C</span>
                    <span className="font-mono-meta font-bold text-[#B3122D]">650 mg</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#2B2B2B]/10">
                    <span className="text-[#2B2B2B]/80">Dietary Fiber</span>
                    <span className="font-mono-meta font-bold text-[#2E3175]">22.0 g</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#2B2B2B]/10">
                    <span className="text-[#2B2B2B]/80">Monounsaturated Fat (Omega-7 & 9)</span>
                    <span className="font-mono-meta font-bold text-[#2E3175]">6.8 g</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#2B2B2B]/10">
                    <span className="text-[#2B2B2B]/80">Polyunsaturated Fat (Omega-3 & 6)</span>
                    <span className="font-mono-meta font-bold text-[#2E3175]">4.4 g</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#2B2B2B]/80">Added Sugar</span>
                    <span className="font-mono-meta font-bold text-[#F28C1B]">0.0 g (100% Pure)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
