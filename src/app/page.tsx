import Link from 'next/link';
import { getProducts, getCategories } from '@/lib/services/productService';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductImageWithFallback } from '@/components/ui/ProductImageWithFallback';
import { FadeIn } from '@/components/motion/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger';
import { Marquee } from '@/components/motion/Marquee';
import { CountUp } from '@/components/motion/CountUp';

export default async function HomePage() {
  const [allProducts, allCategories] = await Promise.all([getProducts(), getCategories()]);
  const bestsellers = allProducts.filter((p) => p.isBestseller);

  return (
    <div className="flex flex-col w-full pb-16">
      {/* 1. HERO SECTION */}
      <section className="max-w-[1200px] w-full mx-auto px-4 md:px-8 pt-8 md:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-6 flex flex-col items-start pr-0 lg:pr-6">
            <FadeIn delay={0.1}>
              <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-primary-fixed text-primary text-xs font-semibold uppercase tracking-wider mb-4">
                Small-Batch Superfoods
              </span>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-primary tracking-tight leading-[1.08] mb-4">
                Clean food.
                <br />
                <span className="italic font-normal text-on-surface-variant">Nothing else.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-base sm:text-lg text-on-surface-variant max-w-xl mb-8 leading-relaxed">
                Single-origin harvests and heritage superfoods sourced directly from ethical smallholder
                farmers across India. Zero preservatives, fillers, or artificial processing.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/shop"
                  className="px-8 py-3.5 rounded-full bg-primary-container text-surface hover:bg-secondary transition-all duration-300 text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 group shadow-sm"
                >
                  <span>Shop the collection</span>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </Link>
                <Link
                  href="/about"
                  className="text-xs font-semibold uppercase tracking-wider text-primary hover:text-secondary underline underline-offset-8 decoration-outline-variant transition-colors py-2"
                >
                  Our story
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Hero Makhana Visual */}
          <div className="lg:col-span-6">
            <FadeIn delay={0.25} direction="left">
              <div className="relative rounded-2xl overflow-hidden bg-surface-container-low shadow-sm aspect-[4/3] lg:aspect-[1.15/1]">
                <ProductImageWithFallback
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDY9GJkKTyIXx-1DQ7wR_lU6-rJXdpng8yDILjleCstC0Zmt2eXkJDtt4Dv2SiDDvowiNSbVnx3nC2pO8SfGS6yYyVM3n9j5PhJtTh4EtXb4uZv4qTXpuXftKzqeqZV_q_H9tRCq305gS2Ouk5vwav5ZTvqMViuUL28aLOeeNiuyi7-MfPHzLg4BUOgrsQO5nn1ESh2GuS9HZGPy9a0oR5T2_MMqiG6bk0CYnR3Al7O"
                  alt="Mithila lotus kernels roasted makhana on linen table"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-surface/90 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-xs flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary-container animate-pulse" />
                  <div>
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider leading-none">
                      Fresh Harvest Batch #084
                    </p>
                    <p className="text-[11px] text-on-surface-variant mt-0.5">
                      Mithila Lotus Kernels · Sun-Roasted
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Trust Badges */}
        <FadeIn delay={0.5}>
          <div className="mt-12 bg-surface-container-low rounded-xl px-6 py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-lg">science</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider">Lab Tested</p>
                  <p className="text-[11px] text-on-surface-variant">Every lot tested for purity</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-lg">do_not_disturb_on</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider">Zero Additives</p>
                  <p className="text-[11px] text-on-surface-variant">No refined sugars or oils</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-lg">nature_people</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider">Trusted Growers</p>
                  <p className="text-[11px] text-on-surface-variant">Direct from smallholders</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-lg">inventory_2</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider">Resealable Kraft</p>
                  <p className="text-[11px] text-on-surface-variant">Air-tight aroma locks</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 2. MARQUEE STRIP */}
      <section className="mt-16 py-3 bg-primary text-surface overflow-hidden">
        <Marquee speedSeconds={30}>
          <span className="text-xs uppercase tracking-widest font-semibold flex items-center gap-8">
            <span>Mithila Lotus Pops</span>
            <span>·</span>
            <span>Wild Ladakh Golden Berries</span>
            <span>·</span>
            <span>Highland Chia Seeds</span>
            <span>·</span>
            <span>Zero Preservatives</span>
            <span>·</span>
            <span>100% Traceable Harvests</span>
            <span>·</span>
            <span>Ethically Compensated Smallholders</span>
            <span>·</span>
          </span>
        </Marquee>
      </section>

      {/* 3. SHOP BY SUPERFOOD SECTION (Dynamic from categories.ts) */}
      <section className="max-w-[1200px] w-full mx-auto px-4 md:px-8 mt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-secondary block mb-1">
              The Pantry Foundation
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-primary font-normal">
              Shop by superfood
            </h2>
          </div>
          <p className="text-sm text-on-surface-variant mt-2 md:mt-0 max-w-sm">
            Wholesome, nutrient-dense staples for your daily nourishment ritual.
          </p>
        </div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {allCategories.map((cat) => (
            <StaggerItem key={cat.id}>
              <Link
                href={`/shop?category=${cat.slug}`}
                className="group bg-surface-container-low rounded-xl p-4 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 shadow-xs hover:shadow-md h-full"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[11px] uppercase tracking-wider text-on-surface-variant bg-surface-container px-2.5 py-0.5 rounded-full font-medium">
                      {cat.originBadge || 'Artisan Harvest'}
                    </span>
                    <span className="material-symbols-outlined text-primary text-lg group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                      north_east
                    </span>
                  </div>

                  <div className="h-32 mb-3 rounded-lg overflow-hidden bg-surface relative">
                    <ProductImageWithFallback
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <h3 className="font-serif text-lg font-medium text-primary">{cat.name}</h3>
                  <p className="text-xs text-on-surface-variant mt-1 line-clamp-2">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-outline-variant/30 flex items-center justify-between text-xs font-semibold text-secondary uppercase">
                  <span>Explore Harvest</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* 4. BESTSELLERS SECTION (Dynamic from products.ts) */}
      <section className="max-w-[1200px] w-full mx-auto px-4 md:px-8 mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-secondary block mb-1">
              Favourites of the Harvest
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-primary font-normal">
              Artisan Bestsellers
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-semibold uppercase tracking-wider text-primary hover:text-secondary inline-flex items-center gap-1.5 transition-colors mt-2 md:mt-0"
          >
            <span>View all bestsellers</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {bestsellers.map((prod) => (
            <StaggerItem key={prod.id}>
              <ProductCard product={prod} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* 5. EDITORIAL PHILOSOPHY */}
      <section className="max-w-[1200px] w-full mx-auto px-4 md:px-8 mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6">
            <FadeIn direction="right">
              <div className="relative rounded-2xl overflow-hidden bg-surface-container-low shadow-sm aspect-[4/3] lg:aspect-[1/1.1]">
                <ProductImageWithFallback
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4Y_yLhxexFpa0Jj0wcVSGACCOsVqlxTP3X4U_acAphLNMt8lcuhLybZrpS6UT9ck5zsag6131m7mqK-Rqh3u2NNmwyed6YWfqrZVltPgtUk5va2Hzum9fBwJxrdNDVq384xTzdSX_t3Bi5kEEkd4806ux8w96IxhUElTkKfUUW8yWay3JRgkVqx7Y5rPuZfPa8IoW6l8lLnhkc8MbQ5CjIdnbRL5D6RV8gpcS-xZM"
                  alt="Glass jars in pantry in natural morning light"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-5 left-5 bg-surface/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-primary">
                  Atelier Pantry Philosophy
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-6 flex flex-col">
            <FadeIn delay={0.1}>
              <span className="text-xs font-semibold uppercase tracking-widest text-secondary mb-2 block">
                Our Philosophy
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-primary font-normal mb-4">
                Why simple matters
              </h2>
              <p className="text-base text-on-surface-variant mb-6 leading-relaxed">
                Modern wellness made nourishment complicated. We believe the most potent food comes
                directly from wholesome earth with zero intervention.
              </p>
            </FadeIn>

            <div className="space-y-4">
              <FadeIn delay={0.2}>
                <div className="bg-surface-container-low p-4 rounded-xl flex gap-4 items-start">
                  <span className="font-serif text-2xl text-secondary font-medium leading-none pt-0.5">
                    01
                  </span>
                  <div>
                    <h4 className="font-serif text-base font-medium text-primary">Sourced with care</h4>
                    <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                      Partnering directly with regional organic farms practicing regenerative
                      harvesting across Kashmir, Ladakh, and Mithila.
                    </p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="bg-surface-container-low p-4 rounded-xl flex gap-4 items-start">
                  <span className="font-serif text-2xl text-secondary font-medium leading-none pt-0.5">
                    02
                  </span>
                  <div>
                    <h4 className="font-serif text-base font-medium text-primary">Nothing added</h4>
                    <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                      No refined sugars, synthetic preservatives, artificial flavoring, or sulfur
                      dioxide. Raw and unadulterated integrity.
                    </p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div className="bg-surface-container-low p-4 rounded-xl flex gap-4 items-start">
                  <span className="font-serif text-2xl text-secondary font-medium leading-none pt-0.5">
                    03
                  </span>
                  <div>
                    <h4 className="font-serif text-base font-medium text-primary">
                      Packed at the harvest source
                    </h4>
                    <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                      Sealed directly in multi-layer resealable kraft bags to protect vital volatile
                      nutrients from heat and oxidation.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* 6. STATS & COMMUNITY TRUST */}
      <section className="max-w-[1200px] w-full mx-auto px-4 md:px-8 mt-24">
        <div className="bg-surface-container-low rounded-2xl p-8 border border-outline-variant/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="font-serif text-3xl md:text-4xl font-normal text-primary">
                <CountUp end={100} suffix="%" />
              </p>
              <p className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant mt-1">
                Single Origin
              </p>
            </div>
            <div>
              <p className="font-serif text-3xl md:text-4xl font-normal text-primary">
                <CountUp end={84} prefix="#" />
              </p>
              <p className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant mt-1">
                Active Harvest Batch
              </p>
            </div>
            <div>
              <p className="font-serif text-3xl md:text-4xl font-normal text-primary">
                <CountUp end={4.9} decimals={1} suffix="★" />
              </p>
              <p className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant mt-1">
                Average Rating
              </p>
            </div>
            <div>
              <p className="font-serif text-3xl md:text-4xl font-normal text-primary">
                <CountUp end={0} suffix="%" />
              </p>
              <p className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant mt-1">
                Chemical Additives
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
