'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { siteConfig } from '@/lib/data/site';
import { useCartStore } from '@/lib/store/cartStore';
import { useInteractiveCapabilities } from '@/lib/motion/useInteractiveCapabilities';

const NAV_LINKS = [
  { href: '/about', label: 'Story', subtitle: 'Roots & farm philosophy' },
  { href: '/journal', label: 'Journal', subtitle: 'Notes from field harvests' },
  { href: '/shop', label: 'Explore', subtitle: 'All 20 small-batch harvests' },
  { href: '/contact', label: 'Contact', subtitle: 'Batch care & wholesale' },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openOnPath, setOpenOnPath] = useState<string | null>(null);
  const pathname = usePathname();
  const mobileMenuOpen = openOnPath === pathname;
  const setMobileMenuOpen = (open: boolean) => setOpenOnPath(open ? pathname : null);
  const { prefersReducedMotion, simplifyMotion } = useInteractiveCapabilities();

  const totalItems = useCartStore((s) => s.getTotalItems());
  const openCart = useCartStore((s) => s.openCart);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 56);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenOnPath(null);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <div
        className="fixed z-50 pointer-events-none top-[max(0.75rem,var(--safe-top))] left-[max(1rem,var(--safe-left))] right-[max(1rem,var(--safe-right))] md:top-4 md:left-6 md:right-6"
      >
        <header
          className={`pointer-events-auto max-w-[1440px] mx-auto rounded-[6px] border oat-sheet-blur transition-[background-color,border-color,color,box-shadow] duration-300 ease-[var(--ease-smooth)] ${
            scrolled
              ? 'bg-[#F6EFE2]/[0.90] border-[#F6EFE2]/60 text-navy shadow-[0_14px_40px_-10px_rgba(10,12,18,0.45)]'
              : 'bg-[#F6EFE2]/[0.14] border-white/25 text-oat shadow-[0_12px_36px_-14px_rgba(10,12,18,0.35)]'
          }`}
        >
          <div className="px-3 sm:px-5 md:px-6 py-2 flex items-center justify-between gap-3">
            {/* Left: Logo + Wordmark (minimum 44px touch height) */}
            <Link
              href="/"
              className="min-h-[44px] flex items-center gap-2.5 sm:gap-3 group shrink-0 pr-1"
            >
              <div className="relative w-9 h-9 rounded-[4px] overflow-hidden border border-white/25 bg-oat shrink-0">
                <Image
                  src="/yagya-logo.png"
                  alt="Yagya"
                  fill
                  sizes="36px"
                  preload
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span
                className={`font-display text-lg sm:text-xl tracking-[0.08em] font-semibold leading-none transition-colors duration-200 ${
                  scrolled ? 'text-navy' : 'text-oat'
                }`}
              >
                {siteConfig.name.toUpperCase()}
              </span>
            </Link>

            {/* Right: Inline links on tablet landscape (640+) / iPad+ (768+), Bag + Hamburger on mobile/portrait */}
            <div className="flex items-center gap-2 md:gap-5 lg:gap-7">
              <nav
                aria-label="Main navigation"
                className="hidden tablet-landscape:flex min-[768px]:flex items-center gap-4 md:gap-5 lg:gap-7"
              >
                {NAV_LINKS.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      data-active={active ? 'true' : 'false'}
                      className={`nav-link-underline font-ui-label text-[11px] min-h-[44px] px-1 transition-colors duration-200 ${
                        scrolled
                          ? active
                            ? 'text-flame font-semibold'
                            : 'text-navy/85 hover:text-navy'
                          : active
                          ? 'text-peach font-semibold'
                          : 'text-oat/90 hover:text-oat'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <button
                type="button"
                onClick={openCart}
                aria-label={`Open harvest bag, ${totalItems} items`}
                className={`min-w-[44px] min-h-[44px] inline-flex items-center justify-center gap-2 px-3 rounded-[4px] border text-[11px] font-ui-label transition-colors duration-200 cursor-pointer active:scale-95 ${
                  scrolled
                    ? 'border-navy/25 bg-navy/10 text-navy hover:bg-flame hover:text-oat hover:border-flame'
                    : 'border-white/25 bg-oat/10 text-oat hover:bg-flame hover:border-flame'
                }`}
              >
                <ShoppingBag className="w-4 h-4 shrink-0" />
                <span>{totalItems}</span>
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-oat-overlay"
                className={`min-[768px]:hidden tablet-landscape:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-[4px] border transition-colors cursor-pointer active:scale-95 ${
                  scrolled
                    ? 'border-navy/20 text-navy hover:bg-navy/10'
                    : 'border-white/20 text-oat hover:bg-oat/15'
                }`}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Full-Screen Oat-Glass Navigation Overlay for Mobile & Portrait Foldables/Tablets */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-oat-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0.1 : simplifyMotion ? 0.2 : 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed inset-0 z-[70] min-[768px]:hidden tablet-landscape:hidden bg-navy/82 backdrop-blur-[16px] flex flex-col justify-between pt-[max(1rem,var(--safe-top))] pb-[max(1.5rem,var(--safe-bottom))] pl-[max(1rem,var(--safe-left))] pr-[max(1rem,var(--safe-right))]"
          >
            {/* Overlay Top Bar */}
            <div className="flex items-center justify-between px-2 py-2 border-b border-white/15">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[44px] flex items-center gap-3"
              >
                <div className="relative w-9 h-9 rounded-[4px] overflow-hidden border border-white/25 bg-oat shrink-0">
                  <Image
                    src="/yagya-logo.png"
                    alt="Yagya"
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </div>
                <span className="font-display text-xl tracking-[0.08em] font-semibold text-oat">
                  {siteConfig.name.toUpperCase()}
                </span>
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                autoFocus
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-[4px] border border-white/25 bg-[#F6EFE2]/[0.14] text-oat hover:bg-flame hover:border-flame transition-colors cursor-pointer active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Frosted Oat-Sheet Tappable Link Stack */}
            <nav
              aria-label="Mobile full-screen navigation"
              className="my-auto py-4 flex flex-col gap-3"
            >
              {NAV_LINKS.map((item, idx) => {
                const active = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={prefersReducedMotion ? undefined : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: prefersReducedMotion ? 0.05 : 0.25,
                      delay: prefersReducedMotion || simplifyMotion ? 0 : idx * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between min-h-[56px] px-5 py-3.5 rounded-[6px] border transition-colors ${
                        active
                          ? 'bg-[#F6EFE2]/[0.22] border-flame text-oat'
                          : 'bg-[#F6EFE2]/[0.12] border-white/20 text-oat active:bg-[#F6EFE2]/[0.20]'
                      }`}
                    >
                      <div>
                        <span className="font-display text-2xl sm:text-3xl font-medium block leading-tight">
                          {item.label}
                        </span>
                        <span className="text-xs text-apricot/80 block mt-0.5">
                          {item.subtitle}
                        </span>
                      </div>
                      <span
                        className={`font-ui-label text-[10px] ${
                          active ? 'text-flame' : 'text-peach/75'
                        }`}
                      >
                        0{idx + 1}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Bottom Summary Note */}
            <div className="pt-4 border-t border-white/15 flex items-center justify-between gap-4 px-1 text-xs text-apricot/80">
              <span>{siteConfig.contact.email}</span>
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[44px] px-4 rounded-[4px] bg-flame text-oat font-ui-label text-[11px] inline-flex items-center justify-center shrink-0"
              >
                Shop All
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
