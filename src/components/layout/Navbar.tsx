'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { siteConfig } from '@/lib/data/site';
import { categories } from '@/lib/data/categories';
import { useCartStore } from '@/lib/store/cartStore';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItems = useCartStore((s) => s.getTotalItems());
  const openCart = useCartStore((s) => s.openCart);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Announcement Bar */}
      <div className="bg-indigo text-oat py-2 text-center border-b border-charcoal/15 px-4">
        <p className="font-ui-label text-[11px]">{siteConfig.announcement}</p>
      </div>

      {/* Main Navbar (solid Oat White, zero glassmorphism) */}
      <header
        className={`bg-oat transition-colors duration-200 border-b ${
          scrolled ? 'border-charcoal/25 py-2.5' : 'border-charcoal/15 py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Mobile toggle & Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-2 text-indigo hover:text-burnt transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-charcoal/20 bg-oat shrink-0">
                <Image
                  src="/yagya-logo.png"
                  alt="Yagya Superfoods"
                  fill
                  sizes="44px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl font-semibold text-indigo tracking-tight leading-none group-hover:text-burnt transition-colors">
                  {siteConfig.name}
                </span>
                <span className="font-ui-label text-[10px] text-cranberry mt-1">
                  Farm Superfoods
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links (Supports all 5 Categories + Core Pages) */}
          <nav
            aria-label="Main navigation"
            className="hidden lg:flex items-center gap-6 text-xs font-ui-label text-indigo"
          >
            <Link href="/shop" className="hover:text-burnt transition-colors py-1">
              Shop All
            </Link>
            <Link
              href={`/shop?category=${categories[0].slug}`}
              className="hover:text-burnt transition-colors py-1"
            >
              Seeds &amp; Grains
            </Link>
            <Link
              href={`/shop?category=${categories[1].slug}`}
              className="hover:text-burnt transition-colors py-1"
            >
              Berries
            </Link>
            <Link href="/about" className="hover:text-burnt transition-colors py-1">
              Our Story
            </Link>
            <Link href="/contact" className="hover:text-burnt transition-colors py-1">
              Contact
            </Link>
          </nav>

          {/* Right: Cart & Shop CTA */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/shop"
              className="group relative overflow-hidden hidden sm:inline-flex px-5 py-2.5 rounded-full bg-indigo text-oat text-xs font-ui-label transition-colors duration-250"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-burnt -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"
              />
              <span className="relative z-10">Explore Harvest</span>
            </Link>

            <button
              type="button"
              onClick={openCart}
              aria-label={`Open shopping bag, ${totalItems} items`}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border-2 border-charcoal bg-apricot hover:bg-burnt hover:text-oat hover:border-burnt text-indigo transition-colors duration-250 cursor-pointer group"
            >
              <ShoppingBag className="w-4 h-4 transition-colors duration-200" />
              <span className="font-mono-meta text-xs font-bold">{totalItems}</span>
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <nav
            aria-label="Mobile navigation"
            className="lg:hidden bg-oat border-t border-charcoal/15 px-6 py-5 space-y-3"
          >
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 font-ui-label text-xs text-indigo hover:text-burnt"
            >
              Shop All Superfoods
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1.5 font-ui-label text-xs text-indigo hover:text-burnt"
              >
                {cat.name}
              </Link>
            ))}
            <div className="pt-2 border-t border-charcoal/15 flex gap-6">
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 font-ui-label text-xs text-indigo hover:text-burnt"
              >
                Our Story
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 font-ui-label text-xs text-indigo hover:text-burnt"
              >
                Contact
              </Link>
            </div>
          </nav>
        )}
      </header>
    </div>
  );
}
