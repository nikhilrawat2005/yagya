'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { Check, Plus, Sparkles } from 'lucide-react';
import type { Product } from '@/data/products';
import { useCartStore } from '@/lib/store/cartStore';
import { OatSheet } from '@/components/editorial/OatSheet';
import { GlowButton } from '@/components/ui/GlowButton';
import { ProductImageWithFallback } from '@/components/ui/ProductImageWithFallback';

interface DailyBowlBuilderProps {
  products: Product[];
}

export function DailyBowlBuilder({ products }: DailyBowlBuilderProps) {
  const active = useMemo(() => products.filter((p) => !p.comingSoon), [products]);

  const seedOptions = useMemo(
    () => active.filter((p) => p.categorySlug === 'seeds-and-grains'),
    [active]
  );
  const fruitOptions = useMemo(
    () => active.filter((p) => p.categorySlug === 'berries' || p.categorySlug === 'dried-fruits'),
    [active]
  );
  const crunchOptions = useMemo(
    () => active.filter((p) => p.categorySlug === 'nuts' || p.categorySlug === 'flavoured-makhana'),
    [active]
  );

  const [selectedSeedSlug, setSelectedSeedSlug] = useState(
    () => seedOptions[0]?.slug ?? 'chia-seeds'
  );
  const [selectedFruitSlug, setSelectedFruitSlug] = useState(
    () => fruitOptions[0]?.slug ?? 'dried-sea-buckthorn-berries'
  );
  const [selectedCrunchSlug, setSelectedCrunchSlug] = useState(
    () => crunchOptions.find((p) => p.slug === 'almonds')?.slug ?? crunchOptions[0]?.slug ?? 'almonds'
  );
  const [addedTrio, setAddedTrio] = useState(false);

  const addItem = useCartStore((s) => s.addItem);

  const selectedSeed =
    seedOptions.find((p) => p.slug === selectedSeedSlug) ?? seedOptions[0];
  const selectedFruit =
    fruitOptions.find((p) => p.slug === selectedFruitSlug) ?? fruitOptions[0];
  const selectedCrunch =
    crunchOptions.find((p) => p.slug === selectedCrunchSlug) ?? crunchOptions[0];

  const selectedPair = [selectedSeed, selectedFruit, selectedCrunch].filter(
    (p): p is Product => Boolean(p)
  );

  if (selectedPair.length < 3) return null;

  const handleAddTrio = () => {
    for (const item of selectedPair) {
      const variant = item.variants[0];
      if (variant && variant.stock > 0) {
        addItem(item, variant, 1);
      }
    }
    setAddedTrio(true);
    setTimeout(() => setAddedTrio(false), 1800);
  };

  return (
    <OatSheet tone="medium" interactive={false} className="p-5 sm:p-7 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-white/15">
        <div>
          <span className="font-ui-label text-[10px] text-peach inline-flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            Interactive Pairing Studio
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-medium text-oat">
            Mix Your Daily Pantry Bowl
          </h3>
        </div>
        <span className="font-annotation text-xl text-peach">
          Pick one seed, one berry or fruit, and one crunch
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: 3 Selector Lanes */}
        <div className="lg:col-span-7 space-y-4">
          {/* Step 1: Seeds */}
          <div className="space-y-2">
            <span className="font-ui-label text-[10px] text-apricot block">
              1. Pick Your Seed Base
            </span>
            <div className="flex flex-wrap gap-2">
              {seedOptions.map((item) => {
                const isSelected = item.slug === selectedSeed?.slug;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedSeedSlug(item.slug)}
                    className={`px-3 py-1.5 rounded-[4px] border text-xs transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oat ${
                      isSelected
                        ? 'bg-flame text-navy border-flame font-semibold'
                        : 'bg-[#141C2B]/70 text-oat border-white/25 hover:border-peach/60'
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Berries & Dried Fruits */}
          <div className="space-y-2">
            <span className="font-ui-label text-[10px] text-apricot block">
              2. Add a Tangy Berry or Orchard Fruit
            </span>
            <div className="flex flex-wrap gap-2">
              {fruitOptions.map((item) => {
                const isSelected = item.slug === selectedFruit?.slug;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedFruitSlug(item.slug)}
                    className={`px-3 py-1.5 rounded-[4px] border text-xs transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oat ${
                      isSelected
                        ? 'bg-flame text-navy border-flame font-semibold'
                        : 'bg-[#141C2B]/70 text-oat border-white/25 hover:border-peach/60'
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Nuts & Makhana */}
          <div className="space-y-2">
            <span className="font-ui-label text-[10px] text-apricot block">
              3. Finish With Nutty or Roasted Crunch
            </span>
            <div className="flex flex-wrap gap-2">
              {crunchOptions.map((item) => {
                const isSelected = item.slug === selectedCrunch?.slug;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedCrunchSlug(item.slug)}
                    className={`px-3 py-1.5 rounded-[4px] border text-xs transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oat ${
                      isSelected
                        ? 'bg-flame text-navy border-flame font-semibold'
                        : 'bg-[#141C2B]/70 text-oat border-white/25 hover:border-peach/60'
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Trio Preview Card */}
        <div className="lg:col-span-5 rounded-[6px] border border-white/20 bg-[#141C2B]/80 p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-3 gap-2.5">
            {selectedPair.map((item) => (
              <Link
                key={item.id}
                href={`/product/${item.slug}`}
                className="group block rounded-[4px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oat"
              >
                <div className="relative aspect-[4/5] rounded-[4px] overflow-hidden border border-white/20 bg-[#1C2638] mb-1.5">
                  <ProductImageWithFallback
                    src={item.images[0]?.src || ''}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 28vw, 130px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <p className="text-[11px] font-medium text-oat group-hover:text-peach line-clamp-1">
                  {item.name}
                </p>
                <span className="text-[10px] text-sand block">
                  {item.variants[0]?.weight}
                </span>
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-white/15 space-y-2">
            <p className="font-annotation text-lg text-peach leading-snug">
              {selectedSeed?.name} + {selectedFruit?.name} + {selectedCrunch?.name}
            </p>
            <p className="text-xs text-sand leading-relaxed">
              Layer into morning oats or chilled curd, or pack into a travel jar for an afternoon bite.
            </p>
          </div>

          <GlowButton
            type="button"
            variant={addedTrio ? 'secondary' : 'cta'}
            size="sm"
            onClick={handleAddTrio}
            disabled={addedTrio}
            className="w-full"
          >
            {addedTrio ? (
              <>
                <Check className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Added 3 Packs to Bag</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Add Trio (100g Packs) to Bag</span>
              </>
            )}
          </GlowButton>
        </div>
      </div>
    </OatSheet>
  );
}
