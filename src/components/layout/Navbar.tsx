'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { siteConfig } from '@/lib/data/site';
import { ASSETS } from '@/lib/assets';
import { useCartStore } from '@/lib/store/cartStore';
import { Doodle, DoodleUnderline } from '@/components/doodles';

const NAV_LINKS = [
  { href: '/about', label: 'Story' },
  { href: '/journal', label: 'Journal' },
  { href: '/shop', label: 'Explore' },
  { href: '/contact', label: 'Contact' },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  const totalItems = useCartStore((s) => s.getTotalItems());
  const openCart = useCartStore((s) => s.openCart);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 56);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-4 left-4 right-4 z-50 pointer-events-none">
      <header
        className={`pointer-events-auto max-w-6xl mx-auto rounded-[6px] border transition-[background-color,border-color,color,box-shadow,backdrop-filter] duration-300 ease-[var(--ease-smooth)] ${
          scrolled
            ? 'bg-[#F6EFE2]/[0.88] backdrop-blur-[22px] border-[#F6EFE2]/60 text-navy shadow-[0_14px_40px_-10px_rgba(10,12,18,0.45)]'
            : 'bg-[#F6EFE2]/[0.14] backdrop-blur-[18px] border-white/25 text-oat shadow-[0_12px_36px_-14px_rgba(10,12,18,0.35)]'
        }`}
      >
        <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
          {/* Left: Logo + Wordmark */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-9 h-9 rounded-[4px] overflow-hidden border border-white/25 bg-oat shrink-0">
              <Image
                src={ASSETS.brand.logoPrimary}
                alt="Yagya"
                fill
                sizes="36px"
                preload
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <span
              className={`font-display text-xl tracking-[0.08em] font-semibold leading-none transition-colors duration-200 ${
                scrolled ? 'text-navy' : 'text-oat'
              }`}
            >
              {siteConfig.name.toUpperCase()}
            </span>
            <Doodle
              name="flame-small-a"
              tone="flame"
              size={18}
              priority
              inline
              className="shrink-0 opacity-90"
            />
          </Link>

          {/* Right: 4 Minimal Links + Bag Trigger + Mobile Toggle */}
          <div className="flex items-center gap-5 sm:gap-7">
            <nav aria-label="Main navigation" className="hidden md:flex items-center gap-7">
              {NAV_LINKS.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    data-active={active ? 'true' : 'false'}
                    className={`font-ui-label text-[11px] py-1 transition-colors duration-200 ${
                      scrolled
                        ? active
                          ? 'text-flame font-semibold'
                          : 'text-navy/85 hover:text-navy'
                        : active
                        ? 'text-peach font-semibold'
                        : 'text-oat/90 hover:text-oat'
                    }`}
                  >
                    <DoodleUnderline
                      variant="tapered"
                      tone={scrolled ? 'flame' : 'peach'}
                      active={active}
                    >
                      {item.label}
                    </DoodleUnderline>
                  </Link>
                );
              })}
            </nav>

            <button
              type="button"
              onClick={openCart}
              aria-label={`Open harvest bag, ${totalItems} items`}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-[4px] border text-[11px] font-ui-label transition-colors duration-200 cursor-pointer ${
                scrolled
                  ? 'border-navy/25 bg-navy/10 text-navy hover:bg-flame hover:text-oat hover:border-flame'
                  : 'border-white/25 bg-oat/10 text-oat hover:bg-flame hover:border-flame'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{totalItems}</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className={`md:hidden p-1.5 rounded-[4px] transition-colors cursor-pointer ${
                scrolled ? 'text-navy hover:bg-navy/10' : 'text-oat hover:bg-oat/15'
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Sheet */}
        <AnimatePresence initial={false}>
          {mobileMenuOpen && (
            <motion.nav
              aria-label="Mobile navigation"
              initial={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className={`md:hidden overflow-hidden border-t ${
                scrolled ? 'border-navy/15' : 'border-white/20'
              }`}
            >
              <div className="px-5 py-4 flex flex-col gap-3">
                {NAV_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-ui-label text-[11px] py-1 ${
                      scrolled ? 'text-navy' : 'text-oat'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}
