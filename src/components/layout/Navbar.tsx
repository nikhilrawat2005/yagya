'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
      <div className="bg-[#2E3175] text-[#F6EFE2] py-2 text-center border-b border-[#2B2B2B]/10 px-4">
        <p className="text-xs uppercase font-medium tracking-[0.08em] font-sans">
          {siteConfig.announcement}
        </p>
      </div>

      {/* Main Navbar */}
      <header
        className={`transition-all duration-300 border-b ${
          scrolled
            ? 'bg-[#F6EFE2]/95 backdrop-blur-md border-[#2B2B2B]/15 shadow-sm py-2.5'
            : 'bg-[#F6EFE2]/90 backdrop-blur-sm border-[#2B2B2B]/10 py-3.5'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Mobile menu toggle & Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-[#2E3175] hover:text-[#D9700B] transition-colors focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>

            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden border-2 border-[#2E3175]/20 group-hover:border-[#F28C1B] transition-colors bg-white flex items-center justify-center p-0.5">
                <Image
                  src="/yagya-logo.png"
                  alt="Yagya Logo"
                  width={44}
                  height={44}
                  className="object-contain w-full h-full"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl md:text-3xl font-bold text-[#2E3175] tracking-tight leading-none group-hover:text-[#D9700B] transition-colors">
                  {siteConfig.name}
                </span>
                <span className="text-[10px] tracking-[0.16em] uppercase text-[#B3122D] font-bold font-sans">
                  SUPERFOODS
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-[0.08em] text-[#2E3175]">
            <Link
              href="/shop"
              className="relative hover:text-[#D9700B] transition-colors py-1 group"
            >
              Shop All
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F28C1B] transition-all duration-200 group-hover:w-full" />
            </Link>
            <Link
              href="/shop?category=sea-buckthorn"
              className="relative hover:text-[#D9700B] transition-colors py-1 group"
            >
              Sea Buckthorn
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F28C1B] transition-all duration-200 group-hover:w-full" />
            </Link>
            <Link
              href="/about"
              className="relative hover:text-[#D9700B] transition-colors py-1 group"
            >
              Our Mountain Story
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F28C1B] transition-all duration-200 group-hover:w-full" />
            </Link>
            <Link
              href="/journal"
              className="relative hover:text-[#D9700B] transition-colors py-1 group"
            >
              Journal
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F28C1B] transition-all duration-200 group-hover:w-full" />
            </Link>
            <Link
              href="/contact"
              className="relative hover:text-[#D9700B] transition-colors py-1 group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F28C1B] transition-all duration-200 group-hover:w-full" />
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/shop"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-[0.08em] uppercase bg-[#2E3175] text-[#F6EFE2] hover:bg-[#D9700B] transition-colors shadow-xs"
            >
              <span>Explore Superfoods</span>
            </Link>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative p-2 text-[#2E3175] hover:text-[#D9700B] transition-colors rounded-full hover:bg-[#FDE6C8]/60 cursor-pointer"
              aria-label="Open cart"
            >
              <span className="material-symbols-outlined text-2xl">
                shopping_bag
              </span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#B3122D] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#F6EFE2] font-mono-meta">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden bg-[#F6EFE2] border-b border-[#2B2B2B]/15 px-6 py-6 shadow-xl"
          >
            <div className="flex flex-col gap-4">
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold uppercase tracking-[0.08em] text-[#2E3175] hover:text-[#D9700B] py-2 border-b border-[#2B2B2B]/10"
              >
                Shop All
              </Link>
              <Link
                href="/shop?category=sea-buckthorn"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold uppercase tracking-[0.08em] text-[#2E3175] hover:text-[#D9700B] py-2 border-b border-[#2B2B2B]/10"
              >
                Sea Buckthorn & Berries
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold uppercase tracking-[0.08em] text-[#2E3175] hover:text-[#D9700B] py-2 border-b border-[#2B2B2B]/10"
              >
                Our Mountain Story
              </Link>
              <Link
                href="/journal"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold uppercase tracking-[0.08em] text-[#2E3175] hover:text-[#D9700B] py-2 border-b border-[#2B2B2B]/10"
              >
                Superfood Journal
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold uppercase tracking-[0.08em] text-[#2E3175] hover:text-[#D9700B] py-2"
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
