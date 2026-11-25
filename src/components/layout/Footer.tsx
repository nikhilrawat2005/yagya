'use client';

import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/lib/data/site';
import { ASSETS } from '@/lib/assets';
import { Doodle, DoodleDivider } from '@/components/doodles';

export function Footer() {
  return (
    <footer className="relative z-20 overflow-hidden bg-aubergine/95 backdrop-blur-md border-t border-white/15 text-oat">
      <Doodle
        name="corner-flourish-br"
        tone="apricot"
        size={48}
        opacity={0.4}
        className="hidden sm:block absolute bottom-2 right-3"
      />
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 pt-4 pb-10">
        <DoodleDivider variant="vine" tone="apricot" size={160} opacity={0.65} className="mb-6 mt-0" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          {/* Brand Identity */}
          <Link href="/" className="flex items-center gap-3.5 group w-fit">
            <div className="relative w-10 h-10 rounded-[4px] overflow-hidden border border-white/25 bg-oat shrink-0">
              <Image
                src={ASSETS.brand.logoPrimary}
                alt="Yagya Logo"
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
            <div>
              <span translate="no" className="font-display text-lg tracking-[0.08em] font-semibold text-oat block leading-none">
                {siteConfig.name.toUpperCase()}
              </span>
              <span className="text-xs text-apricot/90 mt-1 flex items-center gap-1.5">
                <Doodle name="icon-leaf-drop" tone="apricot" size={14} inline opacity={0.85} />
                <span>Seeds, berries &amp; orchard harvests, straight from soil.</span>
              </span>
            </div>
          </Link>

          {/* Minimal Editorial Links */}
          <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-5">
            <Link
              href="/seeds"
              className="nav-link-underline font-ui-label text-[11px] text-apricot/90 hover:text-oat py-0.5 whitespace-nowrap"
            >
              Seeds
            </Link>
            <Link
              href="/berries"
              className="nav-link-underline font-ui-label text-[11px] text-apricot/90 hover:text-oat py-0.5 whitespace-nowrap"
            >
              Berries
            </Link>
            <Link
              href="/dry-fruits"
              className="nav-link-underline font-ui-label text-[11px] text-apricot/90 hover:text-oat py-0.5 whitespace-nowrap"
            >
              Dry Fruits
            </Link>
            <Link
              href="/nuts"
              className="nav-link-underline font-ui-label text-[11px] text-apricot/90 hover:text-oat py-0.5 whitespace-nowrap"
            >
              Nuts
            </Link>
            <Link
              href="/makhana"
              className="nav-link-underline font-ui-label text-[11px] text-apricot/90 hover:text-oat py-0.5 whitespace-nowrap"
            >
              Makhana
            </Link>
            <Link
              href="/about"
              className="nav-link-underline font-ui-label text-[11px] text-apricot/90 hover:text-oat py-0.5 whitespace-nowrap"
            >
              Story
            </Link>
            <Link
              href="/journal"
              className="nav-link-underline font-ui-label text-[11px] text-apricot/90 hover:text-oat py-0.5 whitespace-nowrap"
            >
              Journal
            </Link>
            <Link
              href="/shop"
              className="nav-link-underline font-ui-label text-[11px] text-apricot/90 hover:text-oat py-0.5 whitespace-nowrap"
            >
              Collection
            </Link>
            <Link
              href="/contact"
              className="nav-link-underline font-ui-label text-[11px] text-apricot/90 hover:text-oat py-0.5 whitespace-nowrap"
            >
              Contact
            </Link>
          </nav>

          {/* Direct Contact & Copyright */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 text-xs text-apricot/90">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="inline-flex items-center gap-1.5 hover:text-oat transition-colors whitespace-nowrap"
            >
              <Doodle name="icon-heart" tone="peach" size={14} inline opacity={0.9} />
              <span>{siteConfig.contact.email}</span>
            </a>
            <span className="hidden sm:inline-flex items-center gap-1 text-apricot/85">
              <Doodle name="icon-location-pin" tone="apricot" size={14} inline opacity={0.85} />
              <span>India</span>
            </span>
            <span className="whitespace-nowrap">© {new Date().getFullYear()} {siteConfig.name}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
