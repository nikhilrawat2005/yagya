import { getProducts, getCategories } from '@/lib/services/productService';
import { HeroSection } from '@/components/home/HeroSection';
import { LaunchHarvestSection } from '@/components/home/LaunchHarvestSection';
import { CategoryArchitectureSection } from '@/components/home/CategoryArchitectureSection';
import { NutritionSpotlightSection } from '@/components/home/NutritionSpotlightSection';
import { FarmStorySection } from '@/components/home/FarmStorySection';
import { ClosingHarvestCta } from '@/components/home/ClosingHarvestCta';

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const seaBuckthorn = products[0];

  return (
    <div className="bg-oat text-indigo w-full">
      {/* SECTION 01 — FULL-BLEED FIBONACCI HERO */}
      <HeroSection />

      {/* SECTION 02 — LAUNCH HARVEST LINEUP (7 FARM SUPERFOODS) */}
      <LaunchHarvestSection products={products} />

      {/* SECTION 03 — 5-CATEGORY LINEUP ARCHITECTURE */}
      <CategoryArchitectureSection categories={categories} products={products} />

      {/* SECTION 04 — VERIFIED NUTRITION SPOTLIGHT (SEA BUCKTHORN) */}
      {seaBuckthorn && <NutritionSpotlightSection product={seaBuckthorn} />}

      {/* SECTION 05 — FARM-TO-PACK STORY */}
      <FarmStorySection />

      {/* SECTION 06 — CLOSING CTA */}
      <ClosingHarvestCta />
    </div>
  );
}
