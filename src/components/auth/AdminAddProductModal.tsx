'use client';

import React, { useState } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import type { Category, CategorySlug } from '@/lib/data/categories';
import type { NutritionFact, Product, ProductVariant } from '@/data/products';
import { ASSETS } from '@/lib/assets';
import { siteConfig } from '@/config/site';
import { upsertCatalogProduct } from '@/lib/firebase/catalog';
import { OatSheet } from '@/components/editorial/OatSheet';
import { GlowInput, GlowTextarea } from '@/components/ui/GlowInput';
import { GlowButton } from '@/components/ui/GlowButton';

interface AdminAddProductModalProps {
  categories: Category[];
  initialProduct?: Product | null;
  defaultCategorySlug?: CategorySlug;
  onClose: () => void;
  onSaved: (product: Product, isEdit: boolean) => void;
}

const PRESET_PRODUCT_IMAGES: Array<{ label: string; src: string }> = [
  { label: 'Sea Buckthorn Berries', src: ASSETS.products.berries.seaBuckthorn },
  { label: 'Cranberries', src: ASSETS.products.berries.cranberry },
  { label: 'Blueberries', src: ASSETS.products.berries.blueberry },
  { label: 'Flax Seeds', src: ASSETS.products.seeds.flaxSeeds },
  { label: 'Chia Seeds', src: ASSETS.products.seeds.chiaSeeds },
  { label: 'Pumpkin Seeds', src: ASSETS.products.seeds.pumpkinSeeds },
  { label: 'Sunflower Seeds', src: ASSETS.products.seeds.sunflowerSeeds },
  { label: 'Dried Anjeer (Figs)', src: ASSETS.products.dryFruits.anjeer },
  { label: 'Dates', src: ASSETS.products.dryFruits.dates },
  { label: 'Dried Pineapple', src: ASSETS.products.dryFruits.driedPineapple },
  { label: 'Dried Kiwi', src: ASSETS.products.dryFruits.driedKiwi },
  { label: 'Pine Nuts', src: ASSETS.products.nuts.pineNuts },
  { label: 'Whole Almonds', src: ASSETS.products.nuts.almonds },
  { label: 'Whole Cashews', src: ASSETS.products.nuts.cashews },
  { label: 'Whole Hazelnuts', src: ASSETS.products.nuts.hazelnuts },
  { label: 'Mint Makhana', src: ASSETS.products.makhana.mintMakhana },
  { label: 'Black Salt Makhana', src: ASSETS.products.makhana.blackSaltMakhana },
  { label: 'Peri Peri Makhana', src: ASSETS.products.makhana.periPeriMakhana },
  { label: 'Black Pepper Makhana', src: ASSETS.products.makhana.blackPepperMakhana },
  { label: 'Spicy Masala Makhana', src: ASSETS.products.makhana.spicyMasalaMakhana },
];

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function AdminAddProductModal({
  categories,
  initialProduct = null,
  defaultCategorySlug,
  onClose,
  onSaved,
}: AdminAddProductModalProps) {
  const isEdit = Boolean(initialProduct);
  const defaultCat = categories[0];

  const [name, setName] = useState(initialProduct?.name ?? '');
  const [slug, setSlug] = useState(initialProduct?.slug ?? '');
  const [slugEdited, setSlugEdited] = useState(Boolean(initialProduct));
  const [categorySlug, setCategorySlug] = useState<CategorySlug>(
    initialProduct?.categorySlug ?? defaultCategorySlug ?? defaultCat?.slug ?? 'seeds-and-grains'
  );
  const [origin, setOrigin] = useState(initialProduct?.origin ?? '');
  const [provenance, setProvenance] = useState(initialProduct?.provenance ?? '');
  const [shortDescription, setShortDescription] = useState(initialProduct?.shortDescription ?? '');
  const [description, setDescription] = useState(initialProduct?.description ?? '');
  const [imageSrc, setImageSrc] = useState<string>(
    initialProduct?.images[0]?.src ?? PRESET_PRODUCT_IMAGES[0].src
  );
  const [imageAlt, setImageAlt] = useState(initialProduct?.images[0]?.alt ?? '');
  const [badgesText, setBadgesText] = useState(
    initialProduct ? initialProduct.badges.join(', ') : ''
  );
  const [tagsText, setTagsText] = useState(initialProduct ? initialProduct.tags.join(', ') : '');
  const [servingSize, setServingSize] = useState(initialProduct?.servingSize ?? '');
  const [ingredients, setIngredients] = useState(initialProduct?.ingredients ?? '');
  const [allergenAdvice, setAllergenAdvice] = useState(initialProduct?.allergenAdvice ?? '');
  const [howToUseText, setHowToUseText] = useState(
    initialProduct?.howToUse ? initialProduct.howToUse.join('\n') : ''
  );
  const [storage, setStorage] = useState(initialProduct?.storage ?? '');
  const [nutritionFootnote, setNutritionFootnote] = useState(initialProduct?.nutritionFootnote ?? '');
  const [zeroAddedSugar, setZeroAddedSugar] = useState(initialProduct?.zeroAddedSugar ?? false);
  const [comingSoon, setComingSoon] = useState(initialProduct?.comingSoon ?? false);
  const [isFeatured, setIsFeatured] = useState(initialProduct?.isFeatured ?? false);
  const [isBestseller, setIsBestseller] = useState(initialProduct?.isBestseller ?? false);

  const [variants, setVariants] = useState<ProductVariant[]>(
    initialProduct?.variants.length
      ? initialProduct.variants
      : [
          {
            id: 'var-100',
            label: '100g',
            weight: '100g',
            priceInr: null,
            mrpInr: null,
            sku: null,
            stock: 0,
          },
        ]
  );

  const [nutritionRows, setNutritionRows] = useState<NutritionFact[]>(
    initialProduct?.nutritionFacts ?? []
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNameChange = (val: string) => {
    setName(val);
    if (!slugEdited) {
      setSlug(slugify(val));
    }
  };

  const addVariantRow = () => {
    const idx = variants.length + 1;
    setVariants((prev) => [
      ...prev,
      {
        id: `var-${Date.now()}-${idx}`,
        label: '200g',
        weight: '200g',
        priceInr: null,
        mrpInr: null,
        sku: null,
        stock: 0,
      },
    ]);
  };

  const updateVariant = (idx: number, patch: Partial<ProductVariant>) => {
    setVariants((prev) => prev.map((v, i) => (i === idx ? { ...v, ...patch } : v)));
  };

  const removeVariant = (idx: number) => {
    if (variants.length <= 1) return;
    setVariants((prev) => prev.filter((_, i) => i !== idx));
  };

  const addNutritionRow = () => {
    setNutritionRows((prev) => [
      ...prev,
      { nutrient: '', per100g: '', perServe: '', rda: null },
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanSlug = slugify(slug || name);
    if (!name.trim() || !cleanSlug) {
      setError('Product Name and Slug are required.');
      return;
    }
    if (!shortDescription.trim() || !description.trim()) {
      setError('Short Description and Full Description are required.');
      return;
    }
    for (const v of variants) {
      if (!v.weight.trim() || v.stock < 0) {
        setError('Check variants: weight and stock >= 0 are required.');
        return;
      }
      if (v.priceInr !== null && v.priceInr <= 0) {
        setError('Entered price must be positive (or leave blank if unconfirmed).');
        return;
      }
      if (v.mrpInr !== null && v.priceInr !== null && v.mrpInr < v.priceInr) {
        setError('MRP must be greater than or equal to selling price.');
        return;
      }
    }

    const catObj = categories.find((c) => c.slug === categorySlug);
    const cleanedNutrition = nutritionRows.filter(
      (r) => r.nutrient.trim() && (r.per100g || r.perServe)
    );
    const cleanedHowToUse = howToUseText
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);

    const product: Product = {
      id: initialProduct?.id ?? `prod-${cleanSlug}`,
      slug: cleanSlug,
      name: name.trim(),
      category: catObj?.name || 'Seeds & Grains',
      categorySlug,
      shortDescription: shortDescription.trim(),
      description: description.trim(),
      provenance: provenance.trim() || null,
      origin: origin.trim() || null,
      images: imageSrc.trim()
        ? [
            {
              src: imageSrc.trim(),
              alt: imageAlt.trim() || name.trim(),
            },
            ...(initialProduct?.images.slice(1) ?? []),
          ]
        : [],
      variants: variants.map((v) => ({
        ...v,
        label: v.label.trim() || v.weight.trim(),
        weight: v.weight.trim(),
        sku: v.sku?.trim() ? v.sku.trim().toUpperCase() : null,
        priceInr: v.priceInr !== null ? Number(v.priceInr) : null,
        mrpInr: v.mrpInr !== null ? Number(v.mrpInr) : null,
        stock: Math.max(0, Math.floor(Number(v.stock))),
      })),
      badges: badgesText
        .split(',')
        .map((b) => b.trim())
        .filter(Boolean),
      zeroAddedSugar,
      needsFssaiReview: initialProduct?.needsFssaiReview ?? false,
      comingSoon,
      rating: initialProduct?.rating ?? null,
      reviewCount: initialProduct?.reviewCount ?? null,
      servingSize: servingSize.trim() || null,
      nutritionFacts: cleanedNutrition.length > 0 ? cleanedNutrition : null,
      nutritionFootnote: nutritionFootnote.trim() || null,
      ingredients: ingredients.trim() || null,
      allergenAdvice: allergenAdvice.trim() || null,
      howToUse: cleanedHowToUse.length > 0 ? cleanedHowToUse : null,
      storage: storage.trim() || null,
      tags: tagsText
        .split(',')
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean),
      isFeatured,
      isBestseller,
      relatedSlugs: initialProduct?.relatedSlugs ?? [],
    };

    setSaving(true);
    try {
      const saved = await upsertCatalogProduct(product);
      onSaved(saved, isEdit);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save product to Firestore.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={isEdit ? `Edit ${initialProduct?.name}` : 'Add New Product'}
      className="fixed inset-0 z-[70] bg-navy/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <div className="w-full max-w-3xl my-auto">
        <OatSheet tone="medium" interactive={false} className="p-5 sm:p-7 max-h-[90dvh] overflow-y-auto">
          <div className="flex items-center justify-between gap-3 pb-4 mb-5 border-b border-white/15">
            <div>
              <span className="font-ui-label text-[10px] text-peach block">
                {siteConfig.brandName} Catalog Schema
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-oat font-medium">
                {isEdit ? `Edit ${initialProduct?.name}` : 'Add New Product'}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close product modal"
              className="p-2 rounded-[4px] text-sand hover:text-oat hover:bg-oat/10 cursor-pointer"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {error && (
            <div role="alert" className="mb-4 p-3 rounded-[6px] border border-flame/60 bg-flame/20 text-xs text-oat">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <GlowInput
                name="name"
                label="Product Name *"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Amaranth (Rajgira)"
              />
              <GlowInput
                name="slug"
                label="URL Slug *"
                value={slug}
                readOnly={isEdit}
                inputClassName={isEdit ? 'opacity-75 cursor-not-allowed' : ''}
                onChange={(e) => {
                  setSlugEdited(true);
                  setSlug(e.target.value);
                }}
                placeholder="amaranth-rajgira"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label htmlFor="new-prod-cat" className="block font-ui-label text-[10px] text-apricot/95 mb-1.5">
                  Category *
                </label>
                <select
                  id="new-prod-cat"
                  value={categorySlug}
                  onChange={(e) => setCategorySlug(e.target.value as CategorySlug)}
                  className="w-full rounded-[6px] border border-white/30 bg-[#141C2B]/80 px-3 py-2.5 text-xs text-oat cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <GlowInput
                name="origin"
                label="Origin (Optional)"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="Leave blank if unconfirmed"
              />
              <GlowInput
                name="provenance"
                label="Subtitle (Optional)"
                value={provenance}
                onChange={(e) => setProvenance(e.target.value)}
                placeholder="Leave blank if unconfirmed"
              />
            </div>

            <GlowInput
              name="shortDescription"
              label="Short Description *"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Concise culinary or quality description."
            />

            <GlowTextarea
              name="description"
              label="Full Description *"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Honest taste, texture, and culinary uses…"
            />

            {/* Image Picker */}
            <div className="p-3.5 rounded-[6px] bg-oat/[0.06] border border-white/15 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="preset-img" className="block font-ui-label text-[10px] text-apricot/95 mb-1.5">
                    Pick Studio Image Preset
                  </label>
                  <select
                    id="preset-img"
                    value={PRESET_PRODUCT_IMAGES.some((p) => p.src === imageSrc) ? imageSrc : ''}
                    onChange={(e) => setImageSrc(e.target.value)}
                    className="w-full rounded-[6px] border border-white/30 bg-[#141C2B]/80 px-3 py-2.5 text-xs text-oat cursor-pointer"
                  >
                    <option value="">No image / custom URL below…</option>
                    {PRESET_PRODUCT_IMAGES.map((img) => (
                      <option key={img.src} value={img.src}>
                        {img.label}
                      </option>
                    ))}
                  </select>
                </div>
                <GlowInput
                  name="imageSrc"
                  label="Or Image Path / URL"
                  value={imageSrc}
                  onChange={(e) => setImageSrc(e.target.value)}
                  placeholder="/assets/products/..."
                />
              </div>
              <GlowInput
                name="imageAlt"
                label="Image Alt Text (Accessibility)"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                placeholder="Product name"
              />
            </div>

            {/* Pack Variants Builder */}
            <div className="p-3.5 rounded-[6px] bg-oat/[0.06] border border-white/15 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-ui-label text-[10px] text-peach">
                  Pack Variants &amp; Stock *
                </span>
                <button
                  type="button"
                  onClick={addVariantRow}
                  className="inline-flex items-center gap-1 text-[11px] text-peach hover:text-oat cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Add Variant</span>
                </button>
              </div>

              {variants.map((v, idx) => (
                <div key={v.id} className="grid grid-cols-2 sm:grid-cols-6 gap-2 items-end pb-2 border-b border-white/10 last:border-b-0 last:pb-0">
                  <GlowInput
                    label="Weight *"
                    value={v.weight}
                    onChange={(e) => updateVariant(idx, { weight: e.target.value, label: e.target.value })}
                    placeholder="100g"
                  />
                  <GlowInput
                    label="Price (₹)"
                    type="number"
                    value={v.priceInr !== null ? String(v.priceInr) : ''}
                    placeholder="Unset"
                    onChange={(e) =>
                      updateVariant(idx, {
                        priceInr: e.target.value === '' ? null : Number(e.target.value),
                      })
                    }
                  />
                  <GlowInput
                    label="MRP (₹)"
                    type="number"
                    value={v.mrpInr !== null ? String(v.mrpInr) : ''}
                    placeholder="Unset"
                    onChange={(e) =>
                      updateVariant(idx, {
                        mrpInr: e.target.value === '' ? null : Number(e.target.value),
                      })
                    }
                  />
                  <GlowInput
                    label="SKU"
                    value={v.sku ?? ''}
                    placeholder="Unset"
                    onChange={(e) =>
                      updateVariant(idx, { sku: e.target.value.trim() ? e.target.value.toUpperCase() : null })
                    }
                  />
                  <GlowInput
                    label="Stock *"
                    type="number"
                    value={String(v.stock)}
                    onChange={(e) => updateVariant(idx, { stock: Number(e.target.value) })}
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => removeVariant(idx)}
                      disabled={variants.length <= 1}
                      aria-label="Remove variant"
                      className="p-2.5 rounded-[4px] border border-white/20 text-sand hover:text-peach disabled:opacity-40 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <GlowInput
                name="ingredients"
                label="Ingredients (Optional)"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="Leave blank if unconfirmed"
              />
              <GlowInput
                name="servingSize"
                label="Serving Size (Optional)"
                value={servingSize}
                onChange={(e) => setServingSize(e.target.value)}
                placeholder="e.g. 30 g"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <GlowInput
                name="badges"
                label="Badges (comma-separated)"
                value={badgesText}
                onChange={(e) => setBadgesText(e.target.value)}
              />
              <GlowInput
                name="tags"
                label="Search Tags (comma-separated)"
                value={tagsText}
                onChange={(e) => setTagsText(e.target.value)}
              />
            </div>

            <GlowTextarea
              name="howToUse"
              label="How To Enjoy (Optional, one tip per line)"
              rows={2}
              value={howToUseText}
              onChange={(e) => setHowToUseText(e.target.value)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <GlowInput
                name="allergenAdvice"
                label="Allergen Advice (Optional)"
                value={allergenAdvice}
                onChange={(e) => setAllergenAdvice(e.target.value)}
              />
              <GlowInput
                name="storage"
                label="Storage Instructions (Optional)"
                value={storage}
                onChange={(e) => setStorage(e.target.value)}
              />
            </div>

            <div className="p-3.5 rounded-[6px] bg-oat/[0.06] border border-white/15 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-ui-label text-[10px] text-peach">
                  Nutrition Facts (Optional)
                </span>
                <button
                  type="button"
                  onClick={addNutritionRow}
                  className="inline-flex items-center gap-1 text-[11px] text-peach hover:text-oat cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Add Nutrient Row</span>
                </button>
              </div>
              {nutritionRows.map((row, idx) => (
                <div key={idx} className="grid grid-cols-4 gap-2">
                  <GlowInput
                    placeholder="Energy"
                    value={row.nutrient}
                    onChange={(e) =>
                      setNutritionRows((prev) =>
                        prev.map((r, i) => (i === idx ? { ...r, nutrient: e.target.value } : r))
                      )
                    }
                  />
                  <GlowInput
                    placeholder="534 kcal"
                    value={row.per100g ?? ''}
                    onChange={(e) =>
                      setNutritionRows((prev) =>
                        prev.map((r, i) => (i === idx ? { ...r, per100g: e.target.value || null } : r))
                      )
                    }
                  />
                  <GlowInput
                    placeholder="53 kcal"
                    value={row.perServe ?? ''}
                    onChange={(e) =>
                      setNutritionRows((prev) =>
                        prev.map((r, i) => (i === idx ? { ...r, perServe: e.target.value || null } : r))
                      )
                    }
                  />
                  <GlowInput
                    placeholder="2.7%"
                    value={row.rda ?? ''}
                    onChange={(e) =>
                      setNutritionRows((prev) =>
                        prev.map((r, i) => (i === idx ? { ...r, rda: e.target.value || null } : r))
                      )
                    }
                  />
                </div>
              ))}
              <GlowInput
                name="nutritionFootnote"
                label="Nutrition Footnote (Optional)"
                value={nutritionFootnote}
                onChange={(e) => setNutritionFootnote(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap items-center gap-5 pt-1">
              <label className="inline-flex items-center gap-2 cursor-pointer text-oat">
                <input
                  type="checkbox"
                  checked={zeroAddedSugar}
                  onChange={(e) => setZeroAddedSugar(e.target.checked)}
                  className="accent-flame"
                />
                <span>Zero Added Sugar (Verified Only)</span>
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer text-oat">
                <input
                  type="checkbox"
                  checked={comingSoon}
                  onChange={(e) => setComingSoon(e.target.checked)}
                  className="accent-flame"
                />
                <span>Coming Soon</span>
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer text-oat">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="accent-flame"
                />
                <span>Featured</span>
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer text-oat">
                <input
                  type="checkbox"
                  checked={isBestseller}
                  onChange={(e) => setIsBestseller(e.target.checked)}
                  className="accent-flame"
                />
                <span>Bestseller</span>
              </label>
            </div>

            <div className="flex flex-wrap justify-end gap-3 pt-4 border-t border-white/15">
              <GlowButton type="button" variant="secondary" size="sm" onClick={onClose}>
                Cancel
              </GlowButton>
              <GlowButton type="submit" variant="cta" size="sm" disabled={saving}>
                {saving
                  ? isEdit
                    ? 'Saving Changes…'
                    : 'Publishing Product…'
                  : isEdit
                  ? 'Save Product Changes'
                  : 'Publish to Store Catalog'}
              </GlowButton>
            </div>
          </form>
        </OatSheet>
      </div>
    </div>
  );
}
