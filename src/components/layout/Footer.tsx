'use client';

import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { categories } from '@/lib/data/categories';
import { ASSETS } from '@/lib/assets';
import { ProductImageWithFallback } from '@/components/ui/ProductImageWithFallback';

const CATEGORY_LINKS: Record<string, string> = {
  'seeds-and-grains': '/seeds',
  berries: '/berries',
  'dried-fruits': '/dry-fruits',
  nuts: '/nuts',
  'flavoured-makhana': '/makhana',
  mixture: '/shop?category=mixture',
};

const POLICY_LINKS = [
  { href: '/privacy-policy', label: 'Privacy Policy (Draft)' },
  { href: '/terms-and-conditions', label: 'Terms & Conditions (Draft)' },
  { href: '/refund-return-cancellation-policy', label: 'Refund & Cancellation (Draft)' },
  { href: '/shipping-policy', label: 'Shipping Policy (Draft)' },
] as const;

export function Footer() {
  const companyLinks = [
    { href: '/about', label: 'Our Story' },
    { href: '/shop', label: 'Shop All' },
    ...(siteConfig.featureFlags.showJournal ? [{ href: '/journal', label: 'Journal' }] : []),
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <footer className="relative z-20 overflow-hidden bg-aubergine/95 backdrop-blur-md border-t border-white/15 text-oat">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">
          {/* Brand & Tagline */}
          <div className="lg:col-span-4 space-y-3">
            <Link
              href="/"
              className="flex items-center gap-3.5 group w-fit rounded-[4px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oat"
            >
              <div className="relative w-10 h-10 rounded-[4px] overflow-hidden border border-white/25 bg-oat shrink-0">
                <ProductImageWithFallback
                  src={ASSETS.brand.logoPrimary}
                  alt={`${siteConfig.brandName} logo`}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div>
                <span
                  translate="no"
                  className="font-display text-xl tracking-[0.08em] font-semibold text-oat block leading-none"
                >
                  {siteConfig.brandName.toUpperCase()}
                </span>
                <span className="text-xs text-peach mt-1 block">
                  {siteConfig.tagline}
                </span>
              </div>
            </Link>
            <p className="text-xs text-sand/90 leading-relaxed max-w-xs">
              {siteConfig.description}
            </p>
            {siteConfig.legalEntityName && (
              <p className="text-[11px] text-sand/80">{siteConfig.legalEntityName}</p>
            )}
            {siteConfig.fssaiLicenseNo && (
              <p className="text-[11px] text-sand/80">FSSAI: {siteConfig.fssaiLicenseNo}</p>
            )}
            {siteConfig.gstin && (
              <p className="text-[11px] text-sand/80">GSTIN: {siteConfig.gstin}</p>
            )}
          </div>

          {/* Shop Categories */}
          <nav aria-label="Shop categories" className="lg:col-span-2 space-y-3">
            <h2 className="font-ui-label text-[10px] text-peach">Shop Categories</h2>
            <ul className="space-y-2 text-xs">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={CATEGORY_LINKS[cat.slug] || `/shop?category=${cat.slug}`}
                    className="nav-link-underline text-sand hover:text-oat py-0.5 rounded-[4px]"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company links" className="lg:col-span-2 space-y-3">
            <h2 className="font-ui-label text-[10px] text-peach">Company</h2>
            <ul className="space-y-2 text-xs">
              {companyLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="nav-link-underline text-sand hover:text-oat py-0.5 rounded-[4px]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Policies */}
          <nav aria-label="Compliance policies" className="lg:col-span-2 space-y-3">
            <h2 className="font-ui-label text-[10px] text-peach">Policies</h2>
            <ul className="space-y-2 text-xs">
              {POLICY_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="nav-link-underline text-sand hover:text-oat py-0.5 rounded-[4px]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-2 space-y-3">
            <h2 className="font-ui-label text-[10px] text-peach">Contact</h2>
            <ul className="space-y-2.5 text-xs text-sand">
              <li>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="inline-flex items-center gap-2 hover:text-oat transition-colors break-all"
                >
                  <Mail className="w-3.5 h-3.5 text-peach shrink-0" aria-hidden="true" />
                  <span>{siteConfig.contactEmail}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:+91${siteConfig.contactPhoneRaw}`}
                  className="inline-flex items-center gap-2 hover:text-oat transition-colors whitespace-nowrap"
                >
                  <Phone className="w-3.5 h-3.5 text-peach shrink-0" aria-hidden="true" />
                  <span>{siteConfig.contactPhone}</span>
                </a>
              </li>
              {siteConfig.registeredAddress && (
                <li className="text-[11px] text-sand/85 leading-relaxed">
                  {siteConfig.registeredAddress}
                </li>
              )}
              {siteConfig.supportHours && (
                <li className="text-[11px] text-sand/85">{siteConfig.supportHours}</li>
              )}
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] text-sand/90">
          <p className="max-w-2xl leading-relaxed">
            {siteConfig.disclaimers.healthAndMedical}
          </p>
          <span className="whitespace-nowrap shrink-0">
            © {new Date().getFullYear()} {siteConfig.brandName}
          </span>
        </div>
      </div>
    </footer>
  );
}
