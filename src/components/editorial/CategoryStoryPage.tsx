'use client';

import React from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { PageBackgroundSet, type PageChapterItem } from '@/components/editorial/PageBackgroundSet';
import { OatSheet } from '@/components/editorial/OatSheet';
import { EditorialProductCard } from '@/components/editorial/EditorialProductCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { SplitText } from '@/components/react-bits/SplitText';
import {
  ChapterDoodleLayer,
  DoodleCluster,
  DoodleDivider,
} from '@/components/doodles';
import {
  CATEGORY_DIVIDERS,
  CATEGORY_INTRO_CLUSTERS,
  PAGE_CHAPTER_PLACEMENTS,
} from '@/config/doodle-placements';
import type { PageBackgroundKey } from '@/lib/assets';
import type { Product } from '@/lib/data/products';

export interface CategoryStoryConfig {
  pageKey: Exclude<PageBackgroundKey, 'home' | 'signature'>;
  categorySlug: string;
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  introBody: string;
  originTag: string;
  harvestTitle: string;
  harvestBody: string;
  craftTitle: string;
  craftBody: string;
  promiseTitle: string;
  promiseBody: string;
  charcoalDoodle?: string;
  accentDoodle?: string;
  products: Product[];
}

/**
 * 4-chapter editorial category experience with per-page sheet positioning,
 * category-specific doodle clusters, product-matched corner doodles, and dividers.
 */
export function CategoryStoryPage({ config }: { config: CategoryStoryConfig }) {
  const { pageKey, products } = config;
  const leadProducts = products.slice(0, 2);
  const restProducts = products.slice(2);
  const placements = PAGE_CHAPTER_PLACEMENTS[pageKey];

  const introAlign: Record<CategoryStoryConfig['pageKey'], string> = {
    seeds: 'lg:col-span-6 lg:col-start-1',
    berries: 'lg:col-span-6 lg:col-start-7',
    'dry-fruits': 'lg:col-span-7 lg:col-start-3',
    nuts: 'lg:col-span-6 lg:col-start-2',
    makhana: 'lg:col-span-6 lg:col-start-6',
  };

  const chapters: PageChapterItem[] = [
    {
      id: `${pageKey}-chapter-01`,
      chapterNumber: '01',
      chapterLabel: 'The Harvest',
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className={`${introAlign[pageKey]} relative`}>
            <DoodleCluster
              layout="corner-peek"
              items={CATEGORY_INTRO_CLUSTERS[pageKey]}
              priority
            />
            <OatSheet tone="medium" delay={0.05} className="relative z-10 p-7 sm:p-9">
              <span className="font-ui-label text-[11px] text-peach block mb-3">
                {config.eyebrow}
              </span>
              <SplitText
                as="h1"
                trigger="mount"
                text={`${config.titleLead} ${config.titleAccent}`}
                accentWord={config.titleAccent}
                accentStyle="double"
                className="font-display text-4xl sm:text-5xl lg:text-[52px] font-medium tracking-tight text-oat mb-5"
              />
              <p className="text-sm sm:text-base text-apricot/95 leading-relaxed max-w-lg mb-7">
                {config.introBody}
              </p>
              <div className="flex flex-wrap items-center gap-5">
                <GlowButton href={`#${pageKey}-chapter-02`} variant="cta" magnetic>
                  <span>Explore Harvests</span>
                  <ArrowDown className="w-4 h-4" aria-hidden="true" />
                </GlowButton>
              </div>
            </OatSheet>
          </div>
        </div>
      ),
    },
    {
      id: `${pageKey}-chapter-02`,
      chapterNumber: '02',
      chapterLabel: 'First Harvests',
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className={`relative ${pageKey === 'berries' || pageKey === 'makhana' ? 'lg:col-span-5 lg:col-start-8 lg:order-2' : 'lg:col-span-5 lg:col-start-1'}`}>
              <ChapterDoodleLayer placements={placements['chapter-02']} />
              <OatSheet tone="subtle" delay={0.08} className="relative z-10 p-7 sm:p-8">
                <SplitText
                  as="h2"
                  trigger="scroll"
                  text={config.harvestTitle}
                  className="font-display text-3xl sm:text-4xl font-medium text-oat mb-4"
                />
                <p className="text-sm sm:text-base text-apricot/95 leading-relaxed">
                  {config.harvestBody}
                </p>
              </OatSheet>
            </div>

            <div className={pageKey === 'berries' || pageKey === 'makhana' ? 'lg:col-span-7 lg:col-start-1 lg:order-1' : 'lg:col-span-7 lg:col-start-6'}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
                {leadProducts.map((product, i) => (
                  <EditorialProductCard
                    key={product.id}
                    product={product}
                    size={i === 0 ? 'featured' : 'compact'}
                    delay={0.12 + i * 0.1}
                    className={i === 1 ? 'sm:mt-10' : ''}
                  />
                ))}
              </div>
            </div>
          </div>

          <DoodleDivider variant={CATEGORY_DIVIDERS[pageKey]} tone="apricot" />
        </div>
      ),
    },
    {
      id: `${pageKey}-chapter-03`,
      chapterNumber: '03',
      chapterLabel: 'The Craft',
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {restProducts.length > 0 ? (
            <>
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
                {restProducts.map((product, i) => (
                  <EditorialProductCard
                    key={product.id}
                    product={product}
                    size="compact"
                    delay={0.1 + i * 0.08}
                    className={i % 2 === 1 ? 'sm:mt-8' : ''}
                  />
                ))}
              </div>
              <div className="lg:col-span-4 relative">
                <ChapterDoodleLayer placements={placements['chapter-03']} />
                <OatSheet tone="warm" delay={0.2} className="relative z-10 p-7 sm:p-8">
                  <h2 className="font-display text-2xl sm:text-3xl font-medium text-oat mb-3">
                    {config.craftTitle}
                  </h2>
                  <p className="text-sm text-apricot/95 leading-relaxed">
                    {config.craftBody}
                  </p>
                </OatSheet>
              </div>
            </>
          ) : (
            <div className="lg:col-span-6 lg:col-start-4 relative">
              <ChapterDoodleLayer placements={placements['chapter-03']} />
              <OatSheet tone="warm" delay={0.12} className="relative z-10 p-8 sm:p-10">
                <h2 className="font-display text-3xl sm:text-4xl font-medium text-oat mb-4">
                  {config.craftTitle}
                </h2>
                <p className="text-sm sm:text-base text-apricot/95 leading-relaxed">
                  {config.craftBody}
                </p>
              </OatSheet>
            </div>
          )}
        </div>
      ),
    },
    {
      id: `${pageKey}-chapter-04`,
      chapterNumber: '04',
      chapterLabel: 'Bring It Home',
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className={`relative ${pageKey === 'nuts' ? 'lg:col-span-6 lg:col-start-7' : 'lg:col-span-6 lg:col-start-2'}`}>
            <ChapterDoodleLayer placements={placements['chapter-04']} />
            <OatSheet tone="medium" delay={0.1} className="relative z-10 p-7 sm:p-10">
              <h2 className="font-display text-3xl sm:text-4xl font-medium text-oat mb-4">
                {config.promiseTitle}
              </h2>
              <p className="text-sm sm:text-base text-apricot/95 leading-relaxed mb-7">
                {config.promiseBody}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <GlowButton href={`/shop?category=${config.categorySlug}`} variant="cta" magnetic>
                  <span>Shop {config.eyebrow}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </GlowButton>
                <GlowButton href="/journal" variant="secondary">
                  Read Journal
                </GlowButton>
              </div>
            </OatSheet>
          </div>
        </div>
      ),
    },
  ];

  return <PageBackgroundSet page={pageKey} chapters={chapters} />;
}
