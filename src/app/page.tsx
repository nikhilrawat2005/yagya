import Link from 'next/link';
import Image from 'next/image';
import { getProducts, getCategories } from '@/lib/services/productService';
import { ProductCard } from '@/components/product/ProductCard';
import { FadeIn } from '@/components/motion/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger';
import { Marquee } from '@/components/motion/Marquee';
import { CountUp } from '@/components/motion/CountUp';

export default async function HomePage() {
  const [allProducts, allCategories] = await Promise.all([getProducts(), getCategories()]);
  const bestsellers = allProducts.filter((p) => p.isBestseller);
  const featuredBerries = allProducts.find((p) => p.slug === 'dried-sea-buckthorn-berries') || allProducts[0];

  return (
    <div className="flex flex-col w-full pb-20 bg-[#F6EFE2] text-[#2E3175]">
      {/* 1. HERO SECTION WITH FIBONACCI GOLDEN RATIO SHAPE BLOCKS */}
      <section className="relative overflow-hidden pt-6 md:pt-12 pb-16 px-4 md:px-8 max-w-[1280px] mx-auto w-full">
        {/* Fibonacci Decorative Background Shapes (PPT: Apricot Mist, Peach Glow, Sea Buckthorn Orange) */}
        <div className="absolute top-0 right-0 -z-10 w-[350px] h-[350px] md:w-[600px] md:h-[600px] rounded-full bg-[#FDE6C8]/60 blur-3xl pointer-events-none" />
        <div className="absolute top-40 left-[-100px] -z-10 w-[280px] h-[280px] rounded-full bg-[#FBC98A]/40 blur-2xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Headlines with Cranberry accents & Charcoal marker doodle */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <FadeIn delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FDE6C8] border border-[#2B2B2B]/20 text-xs font-semibold uppercase tracking-[0.08em] text-[#2E3175] mb-5">
                <span className="w-2 h-2 rounded-full bg-[#F28C1B] animate-pulse" />
                <span>Superfoods Direct From The Himalayas</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#2E3175] tracking-tight leading-[1.1] mb-6">
                Seeds & Berries, <br />
                <span className="text-[#B3122D] italic font-normal">Straight</span> From{' '}
                <span className="marker-underline">The Farm.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-base sm:text-lg text-[#2B2B2B]/85 max-w-xl mb-8 leading-relaxed font-sans">
                Experience pure mountain nutrition with 100% natural, sun-dehydrated <strong className="text-[#2E3175]">Dried Sea Buckthorn Berries</strong>. Packed with rare plant-based Omega-7, natural Vitamin C, and absolutely zero added sugar.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/shop"
                  className="px-8 py-3.5 rounded-full bg-[#2E3175] text-[#F6EFE2] hover:bg-[#D9700B] transition-all duration-300 text-xs font-semibold uppercase tracking-[0.08em] inline-flex items-center gap-2.5 shadow-md group"
                >
                  <span>SHOP NOW</span>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </Link>
                <Link
                  href="/product/dried-sea-buckthorn-berries"
                  className="px-6 py-3.5 rounded-full bg-[#F28C1B] text-white hover:bg-[#D9700B] transition-all duration-300 text-xs font-semibold uppercase tracking-[0.08em] inline-flex items-center gap-2 shadow-sm"
                >
                  <span>Explore Sea Buckthorn</span>
                  <span className="font-mono-meta text-xs opacity-90">₹249 / 100g</span>
                </Link>
              </div>
            </FadeIn>

            {/* Marker sketch doodle callout */}
            <FadeIn delay={0.5}>
              <div className="mt-8 flex items-center gap-3 text-xs text-[#2B2B2B]">
                <span className="font-script text-xl text-[#B3122D] -rotate-3">100% Zero Added Sugar</span>
                <span className="text-[#2B2B2B]/40">•</span>
                <span className="font-mono-meta text-[11px] bg-[#FDE6C8] px-2.5 py-1 rounded-md border border-[#2B2B2B]/15">
                  ICMR-NIN 2020 Compliant
                </span>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Fibonacci Visual Block Composition */}
          <div className="lg:col-span-5 relative">
            <FadeIn delay={0.3} direction="left">
              {/* Fibonacci sequence inspired nested container */}
              <div className="relative rounded-3xl p-4 bg-gradient-to-br from-[#FDE6C8] via-[#FBC98A] to-[#F28C1B] border-2 border-[#2B2B2B] shadow-[4px_6px_0px_#2B2B2B]">
                <div className="relative rounded-2xl overflow-hidden bg-[#F6EFE2] p-6 text-center">
                  <div className="w-28 h-28 mx-auto mb-4 relative rounded-full overflow-hidden border-2 border-[#2B2B2B] bg-white p-2 shadow-inner">
                    <Image
                      src="/yagya-logo.png"
                      alt="Yagya Superfoods"
                      width={112}
                      height={112}
                      className="object-contain w-full h-full"
                    />
                  </div>

                  <span className="inline-block bg-[#F28C1B] text-white text-[10px] font-bold uppercase tracking-[0.1em] px-3 py-1 rounded-full mb-2">
                    Mountain Cold Desert Harvest
                  </span>
                  
                  <h3 className="font-serif text-2xl font-bold text-[#2E3175] mb-2">
                    Whole Dried Sea Buckthorn
                  </h3>
                  <p className="text-xs text-[#2B2B2B]/80 max-w-xs mx-auto mb-4 font-sans">
                    Rich in Omega 3, 6, 7 & 9 with 650mg natural Vitamin C per 100g.
                  </p>

                  {/* Golden Ratio Key Metric Cards */}
                  <div className="grid grid-cols-3 gap-2 text-center pt-3 border-t border-[#2B2B2B]/15">
                    <div className="bg-[#FDE6C8] p-2 rounded-xl border border-[#2B2B2B]/10">
                      <p className="font-mono-meta font-bold text-sm text-[#2E3175]">81.3%</p>
                      <p className="text-[9px] uppercase tracking-wider text-[#2B2B2B]/75">Vitamin C RDA</p>
                    </div>
                    <div className="bg-[#FBC98A] p-2 rounded-xl border border-[#2B2B2B]/10">
                      <p className="font-mono-meta font-bold text-sm text-[#2E3175]">Omega-7</p>
                      <p className="text-[9px] uppercase tracking-wider text-[#2B2B2B]/75">Skin & Gut</p>
                    </div>
                    <div className="bg-[#F28C1B] text-white p-2 rounded-xl">
                      <p className="font-mono-meta font-bold text-sm">0g</p>
                      <p className="text-[9px] uppercase tracking-wider text-white/90">Added Sugar</p>
                    </div>
                  </div>
                </div>

                {/* Floating Stamp / Marker Badge */}
                <div className="absolute -bottom-4 -left-3 bg-[#B3122D] text-white px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0px_#2B2B2B] border border-[#2B2B2B] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  <span>Pure Himalayan</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* 2. FIBONACCI PROMISE STRIP (Oat White canvas with 3 orange shades) */}
        <FadeIn delay={0.5}>
          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#FDE6C8] border border-[#2B2B2B]/20 rounded-2xl p-4 shadow-sm flex items-start gap-3">
              <span className="material-symbols-outlined text-2xl text-[#F28C1B] bg-white p-2 rounded-xl">
                altitude
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#2E3175]">High Altitude</p>
                <p className="text-[11px] text-[#2B2B2B]/80 mt-0.5">Sourced above 10,000 ft</p>
              </div>
            </div>

            <div className="bg-[#FBC98A]/70 border border-[#2B2B2B]/20 rounded-2xl p-4 shadow-sm flex items-start gap-3">
              <span className="material-symbols-outlined text-2xl text-[#2E3175] bg-white p-2 rounded-xl">
                spa
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#2E3175]">Zero Preservatives</p>
                <p className="text-[11px] text-[#2B2B2B]/80 mt-0.5">No artificial colors or sugar</p>
              </div>
            </div>

            <div className="bg-[#FDE6C8] border border-[#2B2B2B]/20 rounded-2xl p-4 shadow-sm flex items-start gap-3">
              <span className="material-symbols-outlined text-2xl text-[#B3122D] bg-white p-2 rounded-xl">
                biotech
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#2E3175]">Lab Verified</p>
                <p className="text-[11px] text-[#2B2B2B]/80 mt-0.5">NABL tested purity</p>
              </div>
            </div>

            <div className="bg-[#F28C1B]/20 border border-[#2B2B2B]/20 rounded-2xl p-4 shadow-sm flex items-start gap-3">
              <span className="material-symbols-outlined text-2xl text-[#D9700B] bg-white p-2 rounded-xl">
                local_shipping
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#2E3175]">Direct Delivery</p>
                <p className="text-[11px] text-[#2B2B2B]/80 mt-0.5">Free shipping over ₹499</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 3. MARQUEE BANNER */}
      <section className="bg-[#2E3175] text-[#F6EFE2] py-3.5 border-y-2 border-[#2B2B2B] shadow-inner my-6">
        <Marquee>
          <span className="mx-6 text-xs uppercase tracking-[0.16em] font-bold flex items-center gap-3">
            <span>DRIED SEA BUCKTHORN</span>
            <span className="text-[#F28C1B]">★</span>
            <span className="text-[#FBC98A]">OMEGA-7 NUTRITION</span>
            <span className="text-[#F28C1B]">★</span>
            <span>HIMALAYAN MAKHANA</span>
            <span className="text-[#F28C1B]">★</span>
            <span className="text-[#FBC98A]">100% SUN-DEHYDRATED</span>
            <span className="text-[#F28C1B]">★</span>
            <span>ZERO ADDED SUGAR</span>
            <span className="text-[#F28C1B]">★</span>
          </span>
        </Marquee>
      </section>

      {/* 4. BESTSELLERS SECTION */}
      <section className="max-w-[1280px] w-full mx-auto px-4 md:px-8 py-12">
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
      <section className="max-w-[1280px] w-full mx-auto px-4 md:px-8 py-12">
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
                Unlike sugary fruit candies, our whole berries retain both pulp and seed oil. Every 10g daily serving provides dense restorative benefits for your skin glow, gut microbiome, and cell defense.
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
                className="px-6 py-3 rounded-full bg-[#2E3175] text-[#F6EFE2] hover:bg-[#D9700B] text-xs font-semibold uppercase tracking-[0.08em] inline-flex items-center gap-2 transition-colors"
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
