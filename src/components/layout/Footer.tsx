'use client';

import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/lib/data/site';

export function Footer() {
  return (
    <footer className="relative z-20 bg-aubergine/92 backdrop-blur-md border-t border-white/15 text-oat">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
        {/* Brand Identity */}
        <Link href="/" className="flex items-center gap-3.5 group w-fit">
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
              Seeds, berries &amp; orchard harvests, straight from soil.
            </span>
          </div>
        </Link>

        {/* Minimal Editorial Links */}
        <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-6">
          <Link
            href="/about"
            className="nav-link-underline font-ui-label text-[11px] text-apricot/85 hover:text-oat py-0.5"
          >
            Our Story
          </Link>
          <Link
            href="/journal"
            className="nav-link-underline font-ui-label text-[11px] text-apricot/85 hover:text-oat py-0.5"
          >
            Journal
          </Link>
          <Link
            href="/shop"
            className="nav-link-underline font-ui-label text-[11px] text-apricot/85 hover:text-oat py-0.5"
          >
            Collection
          </Link>
          <Link
            href="/contact"
            className="nav-link-underline font-ui-label text-[11px] text-apricot/85 hover:text-oat py-0.5"
          >
            Contact
          </Link>
        </nav>

        {/* Direct Contact & Copyright */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 text-xs text-apricot/70">
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="hover:text-oat transition-colors"
          >
            {siteConfig.contact.email}
          </a>
          <span className="hidden sm:inline text-white/20">·</span>
          <span>© {new Date().getFullYear()} {siteConfig.name}</span>
        </div>
      </div>
    </footer>
  );
}
