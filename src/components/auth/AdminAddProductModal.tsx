'use client';

import React, { useState } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import type { Category, CategorySlug } from '@/lib/data/categories';
import type { NutritionFact, Product, ProductVariant } from '@/lib/data/products';
import { ASSETS } from '@/lib/assets';
import { siteConfig } from '@/lib/data/site';
import { upsertCatalogProduct } from '@/lib/firebase/catalog';
import { OatSheet } from '@/components/editorial/OatSheet';
import { GlowInput, GlowTextarea } from '@/components/ui/GlowInput';
import { GlowButton } from '@/components/ui/GlowButton';

interface AdminAddProductModalProps {
  categories: Category[];
  onClose: () => void;
  onCreated: (product: Product) => void;
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
  onClose,
  onCreated,
}: AdminAddProductModalProps) {
  const defaultCat = categories[0];
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [slugEdited, setSlugEdited] = useState(false);
  const [categorySlug, setCategorySlug] = useState<CategorySlug>(
    defaultCat?.slug ?? 'seeds-and-grains'
  );
  const [origin, setOrigin] = useState('');
  const [provenance, setProvenance] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [imageSrc, setImageSrc] = useState<string>(PRESET_PRODUCT_IMAGES[0].src);
  const [imageAlt, setImageAlt] = useState('');
  const [badgesText, setBadgesText] = useState('100% Natural, Small Batch');
  const [tagsText, setTagsText] = useState('');
  const [servingSize, setServingSize] = useState('25 g');
  const [ingredients, setIngredients] = useState('');
  const [allergenAdvice, setAllergenAdvice] = useState(
    'Packed in a facility that handles tree nuts, peanuts, and seeds.'
  );
  const [howToUseText, setHowToUseText] = useState(
    'Enjoy a handful straight from the pack.\nFold into morning oats, smoothies, or salads.'
  );
  const [storage, setStorage] = useState(
    'Store in a cool, dry place away from direct sunlight. Reseal tightly after use.'
  );
  const [nutritionFootnote, setNutritionFootnote] = useState(
    'Small-batch packed under clean hygiene standards.'
  );
  const [isFeatured, setIsFeatured] = useState(true);
  const [isBestseller, setIsBestseller] = useState(false);

  const [variants, setVariants] = useState<ProductVariant[]>([
    {
      id: 'var-100',
      label: '100g',
      weight: '100g',
      price: 249,
      mrp: 299,
      sku: 'YAG-NEW-100',
      stock: 50,
    },
  ]);

  const [nutritionRows, setNutritionRows] = useState<NutritionFact[]>([]);
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
        price: 449,
        mrp: 529,
        sku: `YAG-${(slug || 'NEW').slice(0, 3).toUpperCase()}-${idx}00`,
        stock: 30,
      },
    ]);
  };

  const updateVariant = (idx: number, patch: Partial<ProductVariant>) => {
    setVariants((prev) =>
      prev.map((v, i) => (i === idx ? { ...v, ...patch } : v))
    );
  };

  const removeVariant = (idx: number) => {
    if (variants.length <= 1) return;
    setVariants((prev) => prev.filter((_, i) => i !== idx));
  };

  const addNutritionRow = () => {
    setNutritionRows((prev) => [
      ...prev,
      { nutrient: '', per100g: '', perServe: '', rda: '-' },
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
    if (!origin.trim() || !provenance.trim()) {
      setError('Origin and Provenance are required.');
      return;
    }
    if (!shortDescription.trim() || !description.trim()) {
      setError('Short Description and Full Description are required.');
      return;
    }
    if (!imageSrc.trim()) {
      setError('Product Image path or URL is required.');
      return;
    }
    if (!ingredients.trim()) {
      setError('Ingredients list is required.');
      return;
    }
    for (const v of variants) {
      if (!v.weight.trim() || !v.sku.trim() || v.price <= 0 || v.mrp < v.price || v.stock < 0) {
        setError('Check variants: weight, SKU, positive price, MRP >= price, and stock >= 0 are required.');
        return;
      }
    }

    const catObj = categories.find((c) => c.slug === categorySlug);
    const product: Product = {
      id: `prod-${cleanSlug}`,
      slug: cleanSlug,
      name: name.trim(),
      category: catObj?.name || 'Seeds & Grains',
      categorySlug,
      shortDescription: shortDescription.trim(),
      description: description.trim(),
      provenance: provenance.trim(),
      origin: origin.trim(),
      images: [
        {
          src: imageSrc.trim(),
          alt: imageAlt.trim() || `${name.trim()} harvest pack`,
        },
      ],
      variants: variants.map((v) => ({
        ...v,
        label: v.label.trim() || v.weight.trim(),
        weight: v.weight.trim(),
        sku: v.sku.trim().toUpperCase(),
        price: Number(v.price),
        mrp: Number(v.mrp),
        stock: Math.max(0, Math.floor(Number(v.stock))),
      })),
      badges: badgesText
        .split(',')
        .map((b) => b.trim())
        .filter(Boolean),
      rating: 4.9,
      reviewCount: 1,
      servingSize: servingSize.trim() || '25 g',
      nutritionFacts: nutritionRows.filter((r) => r.nutrient.trim() && r.per100g.trim()),
      nutritionFootnote: nutritionFootnote.trim(),
      ingredients: ingredients.trim(),
      allergenAdvice: allergenAdvice.trim(),
      howToUse: howToUseText
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean),
      storage: storage.trim(),
      tags: tagsText
        .split(',')
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean),
      isFeatured,
      isBestseller,
      relatedSlugs: [],
    };

    setSaving(true);
    try {
      const saved = await upsertCatalogProduct(product);
      onCreated(saved);
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
      aria-label="Add New Harvest Product"
      className="fixed inset-0 z-[70] bg-navy/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <div className="w-full max-w-3xl my-auto">
        <OatSheet tone="medium" interactive={false} className="p-5 sm:p-7 max-h-[90dvh] overflow-y-auto">
          <div className="flex items-center justify-between gap-3 pb-4 mb-5 border-b border-white/15">
            <div>
              <span className="font-ui-label text-[10px] text-peach block">
                {siteConfig.name} Catalog Schema
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-oat font-medium">
                Add New Harvest Product
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close add product modal"
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
                placeholder="e.g. Kashmiri Mamra Almonds"
              />
              <GlowInput
                name="slug"
                label="URL Slug *"
                value={slug}
                onChange={(e) => {
                  setSlugEdited(true);
                  setSlug(e.target.value);
                }}
                placeholder="kashmiri-mamra-almonds"
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
                label="Origin Belt *"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="e.g. Pampore, Kashmir"
              />
              <GlowInput
                name="provenance"
                label="Provenance Subtitle *"
                value={provenance}
                onChange={(e) => setProvenance(e.target.value)}
                placeholder="Orchard Harvest · Whole Kernel"
              />
            </div>

            <GlowInput
              name="shortDescription"
              label="Short Description (1-2 lines for card) *"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Sweet, oil-rich heirloom kernels harvested in small batches."
            />

            <GlowTextarea
              name="description"
              label="Full Story & Description *"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed farm sourcing story, taste profile, and purity details…"
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
                    onChange={(e) => {
                      if (e.target.value) setImageSrc(e.target.value);
                    }}
                    className="w-full rounded-[6px] border border-white/30 bg-[#141C2B]/80 px-3 py-2.5 text-xs text-oat cursor-pointer"
                  >
                    <option value="">Custom URL below…</option>
                    {PRESET_PRODUCT_IMAGES.map((img) => (
                      <option key={img.src} value={img.src}>
                        {img.label}
                      </option>
                    ))}
                  </select>
                </div>
                <GlowInput
                  name="imageSrc"
                  label="Or Image Path / URL *"
                  value={imageSrc}
                  onChange={(e) => setImageSrc(e.target.value)}
                  placeholder="/assets/products/... or https://..."
                />
              </div>
              <GlowInput
                name="imageAlt"
                label="Image Alt Text (Accessibility)"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                placeholder="Bowl of harvest pack on dark slate…"
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
                    label="Price (₹) *"
                    type="number"
                    value={String(v.price)}
                    onChange={(e) => updateVariant(idx, { price: Number(e.target.value) })}
                  />
                  <GlowInput
                    label="MRP (₹) *"
                    type="number"
                    value={String(v.mrp)}
                    onChange={(e) => updateVariant(idx, { mrp: Number(e.target.value) })}
                  />
                  <GlowInput
                    label="SKU *"
                    value={v.sku}
                    onChange={(e) => updateVariant(idx, { sku: e.target.value.toUpperCase() })}
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
                label="Ingredients *"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="100% Natural Whole Kernels."
              />
              <GlowInput
                name="servingSize"
                label="Serving Size *"
                value={servingSize}
                onChange={(e) => setServingSize(e.target.value)}
                placeholder="25 g (approx. 2 tbsp)"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <GlowInput
                name="badges"
                label="Badges (comma-separated)"
                value={badgesText}
                onChange={(e) => setBadgesText(e.target.value)}
                placeholder="Zero Added Sugar, Small Batch"
              />
              <GlowInput
                name="tags"
                label="Search Tags (comma-separated)"
                value={tagsText}
                onChange={(e) => setTagsText(e.target.value)}
                placeholder="almonds, protein, kashmiri"
              />
            </div>

            <GlowTextarea
              name="howToUse"
              label="How To Use (one tip per line)"
              rows={2}
              value={howToUseText}
              onChange={(e) => setHowToUseText(e.target.value)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <GlowInput
                name="allergenAdvice"
                label="Allergen Advice"
                value={allergenAdvice}
                onChange={(e) => setAllergenAdvice(e.target.value)}
              />
              <GlowInput
                name="storage"
                label="Storage Instructions"
                value={storage}
                onChange={(e) => setStorage(e.target.value)}
              />
            </div>

            {/* Optional Nutrition Facts */}
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
                    value={row.per100g}
                    onChange={(e) =>
                      setNutritionRows((prev) =>
                        prev.map((r, i) => (i === idx ? { ...r, per100g: e.target.value } : r))
                      )
                    }
                  />
                  <GlowInput
                    placeholder="53 kcal"
                    value={row.perServe}
                    onChange={(e) =>
                      setNutritionRows((prev) =>
                        prev.map((r, i) => (i === idx ? { ...r, perServe: e.target.value } : r))
                      )
                    }
                  />
                  <GlowInput
                    placeholder="2.7%"
                    value={row.rda || ''}
                    onChange={(e) =>
                      setNutritionRows((prev) =>
                        prev.map((r, i) => (i === idx ? { ...r, rda: e.target.value } : r))
                      )
                    }
                  />
                </div>
              ))}
              <GlowInput
                name="nutritionFootnote"
                label="Nutrition Footnote"
                value={nutritionFootnote}
                onChange={(e) => setNutritionFootnote(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap items-center gap-5 pt-1">
              <label className="inline-flex items-center gap-2 cursor-pointer text-oat">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="accent-flame"
                />
                <span>Featured on Homepage</span>
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer text-oat">
                <input
                  type="checkbox"
                  checked={isBestseller}
                  onChange={(e) => setIsBestseller(e.target.checked)}
                  className="accent-flame"
                />
                <span>Mark as Bestseller</span>
              </label>
            </div>

            <div className="flex flex-wrap justify-end gap-3 pt-4 border-t border-white/15">
              <GlowButton type="button" variant="secondary" size="sm" onClick={onClose}>
                Cancel
              </GlowButton>
              <GlowButton type="submit" variant="cta" size="sm" disabled={saving}>
                {saving ? 'Publishing Product…' : 'Publish to Store Catalog'}
              </GlowButton>
            </div>
          </form>
        </OatSheet>
      </div>
    </div>
  );
}
