'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Product } from '@/lib/data/products';
import { FibonacciBlocks } from '@/components/shapes/FibonacciBlocks';
import { Floating3DAsset } from '@/components/ui/Floating3DAsset';
import { DoodleCircle, DoodleArrow } from '@/components/doodles';
import { Button } from '@/components/ui/Button';

interface NutritionSpotlightSectionProps {
  product: Product;
}

export function NutritionSpotlightSection({ product }: NutritionSpotlightSectionProps) {
  // Highlight 6 exact rows verbatim from Nutrition facts and description.docx
  const highlightedRows = product.nutritionFacts.filter((row) =>
    [
      'Energy',
      'Vitamin C',
      'Dietary Fiber',
      'Monounsaturated Fat (incl. Omega-7 & 9)',
      'Polyunsaturated Fat (incl. Omega-3 & 6)',
      'Added Sugars',
    ].includes(row.nutrient)
  );

  return (
    <section
      id="nutrition-spotlight"
      aria-labelledby="nutrition-heading"
      className="relative w-full bg-oat border-b border-charcoal/20 overflow-hidden"
    >
      {/* Full-Bleed Mirrored Fibonacci Background (Orange shapes on left 5fr, Oat negative space on right 8fr) */}
      <div
        aria-hidden="true"
        className="hidden lg:block absolute inset-0 pointer-events-none z-0"
      >
        <FibonacciBlocks
          fullBleed
          mirrored
          negativeSpaceMajor
          showSpiralArc
          showIndices={false}
        />
      </div>

      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-[5fr_8fr] items-center">
        {/* LEFT 5fr: Floating 3D Sea Buckthorn & Jar over Fibonacci Shapes */}
        <div className="relative min-h-[320px] lg:min-h-[600px] flex items-center justify-center p-8">
          <div aria-hidden="true" className="lg:hidden absolute inset-0 pointer-events-none z-0">
            <FibonacciBlocks fullBleed mirrored negativeSpaceMajor={false} showSpiralArc />
          </div>

          <Floating3DAsset
            src="/images/3d/berry-seabuckthorn-01.webp"
            alt="3D clay Dried Sea Buckthorn Berries"
            width={320}
            height={320}
            floatDistance={6}
            duration={5.6}
            rotateDeg={1.5}
            className="relative z-20 w-[62%] max-w-[300px]"
          />

          <Floating3DAsset
            src="/images/3d/jar-reserve-01.webp"
            alt="Yagya harvest jar"
            width={220}
            height={220}
            floatDistance={5}
            duration={6.2}
            rotateDeg={-1}
            className="hidden sm:block absolute -right-10 bottom-6 w-[44%] max-w-[210px] z-30"
          />
        </div>

        {/* RIGHT 8fr: Calm Oat White Negative Space holding Verified Nutrition Facts */}
        <div className="px-6 sm:px-10 lg:pl-16 lg:pr-[max(2rem,calc((100vw-80rem)/2+2rem))] py-14 lg:py-20">
          <span className="font-mono-meta text-xs uppercase tracking-widest text-cranberry block mb-2">
            04 · Verified Nutrition Spotlight
          </span>

          <h2
            id="nutrition-heading"
            className="font-display text-3xl sm:text-5xl text-indigo font-semibold leading-tight mb-4"
          >
            Mountain Berry{' '}
            <span className="text-cranberry italic">Nutrition</span>, Unedited
          </h2>

          <p className="font-script-body text-base text-indigo max-w-2xl mb-8">
            Whole Dried Sea Buckthorn Berries keep their nutrient-rich pulp and seed oils
            intact — delivering{' '}
            <span className="relative inline-block px-3 py-0.5 font-mono-meta font-bold text-cranberry">
              650 mg Vitamin C
              <DoodleCircle
                delay={0.25}
                className="absolute -inset-x-1 -inset-y-1 w-[calc(100%+8px)] h-[calc(100%+8px)]"
              />
            </span>{' '}
            per 100g with zero added sugar.
          </p>

          {/* Verbatim Nutrition Table */}
          <div className="bg-apricot/45 border-2 border-charcoal rounded-2xl overflow-hidden mb-8">
            <div className="px-5 py-3 bg-peach/70 border-b border-charcoal/25 flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-sans text-sm font-semibold text-indigo">
                {product.name} — Nutritional Information
              </h3>
              <span className="font-mono-meta text-[11px] text-indigo">
                Serving Size: {product.servingSize}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-charcoal/20 font-ui-label text-[10px] text-indigo/80">
                  <tr>
                    <th className="px-5 py-2.5">Nutrient</th>
                    <th className="px-5 py-2.5">Per 100 g</th>
                    <th className="px-5 py-2.5">Per Serve (10 g)</th>
                    <th className="px-5 py-2.5">% RDA*</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-charcoal/15 font-mono-meta text-xs text-indigo">
                  {highlightedRows.map((row) => (
                    <tr key={row.nutrient}>
                      <td className="px-5 py-2.5 font-sans font-medium">{row.nutrient}</td>
                      <td className="px-5 py-2.5">{row.per100g}</td>
                      <td className="px-5 py-2.5 font-bold text-cranberry">{row.perServe}</td>
                      <td className="px-5 py-2.5">{row.rda ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="px-5 py-2.5 text-[11px] font-sans text-indigo/80 border-t border-charcoal/15 bg-oat/70">
              {product.nutritionFootnote}
            </p>
          </div>

          <div className="relative inline-flex items-center gap-4">
            <Button href={`/product/${product.slug}`}>
              <span>READ FULL SPEC &amp; BUY</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
            <DoodleArrow direction="down-left" delay={0.35} className="hidden sm:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
