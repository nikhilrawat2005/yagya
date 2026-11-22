'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { siteConfig } from '@/lib/data/site';
import { useCartStore } from '@/lib/store/cartStore';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItems = useCartStore((s) => s.getTotalItems());
  const openCart = useCartStore((s) => s.openCart);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Announcement Bar */}
      <div className="bg-primary-container text-surface py-2 text-center border-b border-outline-variant/30 px-4">
        <p className="text-xs tracking-widest uppercase font-medium">
          {siteConfig.announcement}
        </p>
      </div>

      {/* Main Navbar */}
      <header
        className={`transition-all duration-300 border-b ${
          scrolled
            ? 'bg-surface-container-low/95 backdrop-blur-md border-outline-variant shadow-xs py-3'
            : 'bg-surface/90 backdrop-blur-sm border-transparent py-4'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1 text-primary focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>

            <Link href="/" className="flex items-center gap-2 group">
              <span className="w-7 h-7 rounded-full bg-primary-container text-surface flex items-center justify-center font-serif font-bold text-sm">
                B
              </span>
              <span className="font-serif text-xl md:text-2xl font-normal text-primary tracking-tight">
                {siteConfig.name}
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
            <Link
              href="/shop"
              className="relative hover:text-primary transition-colors py-1 group"
            >
              Shop
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-200 group-hover:w-full" />
            </Link>
            <Link
              href="/shop?category=makhana"
              className="relative hover:text-primary transition-colors py-1 group"
            >
              Superfoods
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-200 group-hover:w-full" />
            </Link>
            <Link
              href="/about"
              className="relative hover:text-primary transition-colors py-1 group"
            >
              Our Story
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-200 group-hover:w-full" />
            </Link>
            <Link
              href="/journal"
              className="relative hover:text-primary transition-colors py-1 group"
            >
              Journal
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-200 group-hover:w-full" />
            </Link>
            <Link
              href="/contact"
              className="relative hover:text-primary transition-colors py-1 group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-200 group-hover:w-full" />
            </Link>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-3">
            <Link
              href="/shop"
              aria-label="Search"
              className="p-1.5 text-on-surface-variant hover:text-primary transition-colors flex items-center"
            >
              <span className="material-symbols-outlined text-xl">search</span>
            </Link>

            {/* Cart Trigger */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={openCart}
              aria-label="Open Cart Drawer"
              className="relative p-1.5 text-on-surface-variant hover:text-primary transition-colors flex items-center cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">shopping_bag</span>
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={totalItems}
                  className="absolute -top-1 -right-1 text-[10px] font-bold bg-secondary text-on-secondary w-4 h-4 rounded-full flex items-center justify-center leading-none"
                >
                  {totalItems}
                </motion.span>
              )}
            </motion.button>

            <Link
              href="/contact"
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary ml-1"
              aria-label="Account / Help"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </Link>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden border-t border-outline-variant/40 bg-surface px-6 py-4 flex flex-col gap-4 overflow-hidden"
            >
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold tracking-wider uppercase text-primary py-1"
              >
                Shop All Superfoods
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold tracking-wider uppercase text-primary py-1"
              >
                Our Story
              </Link>
              <Link
                href="/journal"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold tracking-wider uppercase text-primary py-1"
              >
                Journal
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold tracking-wider uppercase text-primary py-1"
              >
                Contact & Care
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}
