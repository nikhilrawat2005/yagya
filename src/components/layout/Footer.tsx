'use client';

import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/lib/data/site';

export function Footer() {
  return (
    <footer className="relative z-20 bg-aubergine/92 oat-sheet-blur border-t border-white/15 text-oat pb-[calc(4.5rem+var(--safe-bottom))] lg:pb-10 pl-[max(1rem,var(--safe-left))] pr-[max(1rem,var(--safe-right))]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-14 pt-10 md:pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-white/15">
          {/* Brand Column */}
          <div className="space-y-3">
            <Link href="/" className="min-h-[44px] flex items-center gap-3.5 group w-fit">
              <div className="relative w-10 h-10 rounded-[4px] overflow-hidden border border-white/25 bg-oat shrink-0">
                <Image
                  src="/yagya-logo.png"
                  alt="Yagya Logo"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div>
                <span className="font-display text-lg tracking-[0.08em] font-semibold text-oat block leading-none">
                  {siteConfig.name.toUpperCase()}
                </span>
                <span className="text-xs text-apricot/75 mt-1 block">
                  {siteConfig.tagline}
                </span>
              </div>
            </Link>
            <p className="text-xs sm:text-sm text-apricot/80 leading-relaxed max-w-xs">
              Seeds, berries &amp; orchard harvests, straight from soil to pouch without artificial glazes.
            </p>
          </div>

          {/* Collection Column */}
          <div>
            <span className="font-ui-label text-[10px] text-peach block mb-2.5">
              Harvests
            </span>
            <nav aria-label="Footer harvest categories" className="flex flex-col gap-0.5">
              {[
                { label: 'All Harvests', href: '/shop' },
                { label: 'Seeds & Grains', href: '/shop?category=seeds-and-grains' },
                { label: 'Mountain Berries', href: '/shop?category=berries' },
                { label: 'Nuts & Dried Fruits', href: '/shop?category=nuts' },
                { label: 'Roasted Makhana', href: '/shop?category=flavoured-makhana' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-link-underline min-h-[44px] w-fit text-sm text-apricot/85 hover:text-oat py-1"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Brand & Care Column */}
          <div>
            <span className="font-ui-label text-[10px] text-peach block mb-2.5">
              Philosophy
            </span>
            <nav aria-label="Footer navigation" className="flex flex-col gap-0.5">
              {[
                { label: 'Our Story', href: '/about' },
                { label: 'Harvest Journal', href: '/journal' },
                { label: 'Contact & Care', href: '/contact' },
                { label: 'Express Checkout', href: '/checkout' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-link-underline min-h-[44px] w-fit text-sm text-apricot/85 hover:text-oat py-1"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Direct Correspondence Column */}
          <div>
            <span className="font-ui-label text-[10px] text-peach block mb-2.5">
              Direct Care
            </span>
            <div className="flex flex-col gap-1 text-sm text-apricot/85">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="min-h-[44px] inline-flex items-center hover:text-oat transition-colors w-fit"
              >
                {siteConfig.contact.email}
              </a>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
                className="min-h-[44px] inline-flex items-center hover:text-oat transition-colors w-fit"
              >
                {siteConfig.contact.phone}
              </a>
              <span className="text-xs text-apricot/65 mt-1">
                {siteConfig.contact.address}
              </span>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-apricot/65">
          <span>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</span>
          <span>Small-batch packed · Zero artificial preservatives</span>
        </div>
      </div>
    </footer>
  );
}
