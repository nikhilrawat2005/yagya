'use client';

import Link from 'next/link';
import { ShieldCheck, Truck, Sprout, Award } from 'lucide-react';
import { siteConfig } from '@/lib/data/site';
import { categories } from '@/lib/data/categories';
import { ASSETS } from '@/lib/assets';
import { ProductImageWithFallback } from '@/components/ui/ProductImageWithFallback';

const CATEGORY_LINKS: Record<string, string> = {
  'seeds-and-grains': '/seeds',
  berries: '/berries',
  'dried-fruits': '/dry-fruits',
  nuts: '/nuts',
  'flavoured-makhana': '/makhana',
};

const TRUST_SIGNALS = [
  { icon: Sprout, label: 'Farm-Direct Partner Growers' },
  { icon: ShieldCheck, label: 'Hygienically Lab-Checked' },
  { icon: Award, label: 'Zero Added Sugar or Glaze' },
  { icon: Truck, label: `Free Dispatch Over ${siteConfig.currencySymbol}${siteConfig.freeShippingThreshold}` },
] as const;

export function Footer() {
  return (
    <footer className="relative z-20 overflow-hidden bg-aubergine/95 backdrop-blur-md border-t border-white/15 text-oat">
      {/* Subtle Trust Ribbon */}
      <div className="border-b border-white/10 bg-[#141C2B]/60">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-4 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {TRUST_SIGNALS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2.5 text-xs text-sand">
              <Icon className="w-4 h-4 text-peach shrink-0" aria-hidden="true" />
              <span className="leading-snug">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-10">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
          {/* Brand Identity */}
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-3.5 group w-fit">
              <div className="relative w-10 h-10 rounded-[4px] overflow-hidden border border-white/25 bg-oat shrink-0">
                <ProductImageWithFallback
                  src={ASSETS.brand.logoPrimary}
                  alt={siteConfig.name}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div>
                <span translate="no" className="font-display text-xl tracking-[0.08em] font-semibold text-oat block leading-none">
                  {siteConfig.name.toUpperCase()}
                </span>
                <span className="text-xs text-sand mt-1 block">
                  {siteConfig.tagline}
                </span>
              </div>
            </Link>
            <p className="text-xs text-sand/90 leading-relaxed mt-3">
              {siteConfig.description}
            </p>
          </div>

          {/* Minimal Editorial Links */}
          <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-x-5 gap-y-2.5 lg:max-w-md lg:justify-end">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={CATEGORY_LINKS[cat.slug] || `/shop?category=${cat.slug}`}
                className="nav-link-underline font-ui-label text-[11px] text-sand hover:text-oat py-1 whitespace-nowrap"
              >
                {cat.name}
              </Link>
            ))}
            <Link
              href="/about"
              className="nav-link-underline font-ui-label text-[11px] text-sand hover:text-oat py-1 whitespace-nowrap"
            >
              Story
            </Link>
            <Link
              href="/journal"
              className="nav-link-underline font-ui-label text-[11px] text-sand hover:text-oat py-1 whitespace-nowrap"
            >
              Journal
            </Link>
            <Link
              href="/shop"
              className="nav-link-underline font-ui-label text-[11px] text-sand hover:text-oat py-1 whitespace-nowrap"
            >
              Shop All
            </Link>
            <Link
              href="/contact"
              className="nav-link-underline font-ui-label text-[11px] text-sand hover:text-oat py-1 whitespace-nowrap"
            >
              Contact
            </Link>
          </nav>
        </div>

        {/* Direct Contact & Copyright */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-sand">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="hover:text-oat transition-colors whitespace-nowrap"
            >
              {siteConfig.contact.email}
            </a>
            <span className="text-oat/40" aria-hidden="true">·</span>
            <span className="whitespace-nowrap">{siteConfig.contact.address}</span>
          </div>
          <span className="whitespace-nowrap">© {new Date().getFullYear()} {siteConfig.name}</span>
        </div>
      </div>
    </footer>
  );
}
