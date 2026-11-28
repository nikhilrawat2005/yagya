'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ShoppingBag, Sparkles, User, Shield } from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'motion/react';
import { siteConfig } from '@/config/site';
import { ASSETS } from '@/lib/assets';
import { useCartStore } from '@/lib/store/cartStore';
import { useAuth } from '@/components/auth/AuthProvider';
import { ProductImageWithFallback } from '@/components/ui/ProductImageWithFallback';

const NAV_LINKS = [
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'Story' },
  ...(siteConfig.featureFlags.showJournal ? [{ href: '/journal', label: 'Journal' }] : []),
  { href: '/contact', label: 'Contact' },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const { user, profile, loading: authLoading, isAdmin } = useAuth();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const next = latest > 56;
    if (next !== scrolled) {
      setScrolled(next);
    }
  });

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen]);

  const totalItems = useCartStore((s) => s.getTotalItems());
  const openCart = useCartStore((s) => s.openCart);

  const accountLabel =
    profile?.firstName || user?.displayName?.split(' ')[0] || 'Account';

  return (
    <div className="fixed top-2.5 sm:top-3 left-3 right-3 sm:left-4 sm:right-4 z-50 pointer-events-none">
      <div className="max-w-6xl mx-auto space-y-1.5">
        {/* Announcement Micro-Strip */}
        {!scrolled && (
          <div className="pointer-events-auto hidden sm:flex items-center justify-center gap-2 rounded-[6px] bg-[#141C2B]/85 backdrop-blur-md border border-white/15 px-4 py-1 text-[11px] font-medium text-sand tracking-wide">
            <Sparkles className="w-3 h-3 text-peach shrink-0" aria-hidden="true" />
            <span>{siteConfig.announcement}</span>
          </div>
        )}

        <header
          className={`pointer-events-auto rounded-[8px] border transition-[background-color,border-color,color,box-shadow,backdrop-filter] duration-300 ease-[var(--ease-smooth)] ${
            scrolled
              ? 'bg-[#F6EFE2]/[0.95] backdrop-blur-[18px] border-[#DDD4C2] text-navy shadow-[0_14px_40px_-10px_rgba(10,12,18,0.45)]'
              : 'bg-[#141C2B]/[0.78] backdrop-blur-[14px] border-white/25 text-oat shadow-[0_12px_36px_-14px_rgba(10,12,18,0.4)]'
          }`}
        >
          <div className="px-3.5 sm:px-6 py-2 flex items-center justify-between gap-3">
            {/* Left: Logo + Wordmark */}
            <Link
              href="/"
              className="flex items-center gap-2.5 sm:gap-3 group shrink-0 whitespace-nowrap min-h-[40px] rounded-[4px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oat"
            >
              <div className="relative w-9 h-9 rounded-[4px] overflow-hidden border border-white/25 bg-oat shrink-0">
                <ProductImageWithFallback
                  src={ASSETS.brand.logoPrimary}
                  alt={`${siteConfig.brandName} logo`}
                  fill
                  sizes="36px"
                  preload
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span
                translate="no"
                className={`font-display text-xl sm:text-2xl tracking-[0.08em] font-semibold leading-none transition-colors duration-200 ${
                  scrolled ? 'text-navy' : 'text-oat'
                }`}
              >
                {siteConfig.brandName.toUpperCase()}
              </span>
            </Link>

            {/* Right: Navigation + Account + Bag Trigger + Mobile Toggle */}
            <div className="flex items-center gap-2 sm:gap-4">
              <nav aria-label="Main navigation" className="hidden md:flex items-center gap-6">
                {NAV_LINKS.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      data-active={active ? 'true' : 'false'}
                      className={`nav-link-underline font-ui-label text-[11px] py-1.5 whitespace-nowrap rounded-[4px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oat transition-colors duration-200 ${
                        scrolled
                          ? active
                            ? 'text-[#9A4906] font-semibold'
                            : 'text-navy/90 hover:text-navy'
                          : active
                          ? 'text-peach font-semibold'
                          : 'text-oat/95 hover:text-oat'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              {!authLoading && user ? (
                <div className="hidden sm:flex items-center gap-2">
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className={`inline-flex items-center gap-1.5 min-h-[40px] px-3 py-2 rounded-[4px] border text-[10px] font-ui-label whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oat ${
                        scrolled
                          ? 'border-flame bg-flame text-navy font-semibold hover:bg-flame-soft'
                          : 'border-flame/70 bg-flame/20 text-peach hover:bg-flame hover:text-navy'
                      }`}
                    >
                      <Shield className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Admin</span>
                    </Link>
                  )}
                  <Link
                    href="/dashboard"
                    className={`inline-flex items-center gap-1.5 min-h-[40px] px-3 py-2 rounded-[4px] border text-[11px] font-ui-label whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oat ${
                      scrolled
                        ? 'border-navy/25 bg-navy/5 text-navy hover:border-navy/50'
                        : 'border-white/25 bg-oat/10 text-oat hover:border-peach/60'
                    }`}
                  >
                    <User className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{accountLabel}</span>
                  </Link>
                </div>
              ) : (
                <Link
                  href="/login"
                  className={`hidden sm:inline-flex items-center gap-1.5 min-h-[40px] px-3 py-2 rounded-[4px] border text-[11px] font-ui-label whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oat ${
                    scrolled
                      ? 'border-navy/25 bg-navy/5 text-navy hover:border-navy/50'
                      : 'border-white/25 bg-oat/10 text-oat hover:border-peach/60'
                  }`}
                >
                  <User className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Sign In</span>
                </Link>
              )}

              <button
                type="button"
                onClick={openCart}
                aria-label={`Open harvest bag, ${totalItems} items`}
                className={`inline-flex items-center justify-center gap-2 min-h-[40px] px-3.5 py-2 rounded-[4px] border text-[11px] font-ui-label whitespace-nowrap transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oat ${
                  scrolled
                    ? 'border-navy/30 bg-navy/10 text-navy hover:bg-flame hover:text-navy hover:border-flame'
                    : 'border-white/30 bg-oat/15 text-oat hover:bg-flame hover:text-navy hover:border-flame'
                }`}
              >
                <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:inline">Bag</span>
                <span className="tabular-nums font-semibold">({totalItems})</span>
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
                className={`md:hidden inline-flex items-center justify-center w-10 h-10 rounded-[4px] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oat ${
                  scrolled ? 'text-navy hover:bg-navy/10' : 'text-oat hover:bg-oat/15'
                }`}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <Menu className="w-5 h-5" aria-hidden="true" />
                )}
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
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className={`md:hidden overflow-hidden border-t ${
                  scrolled ? 'border-navy/15' : 'border-white/20'
                }`}
              >
                <div className="px-4 py-3 flex flex-col gap-1">
                  {NAV_LINKS.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`font-ui-label text-xs py-2.5 px-2 rounded-[4px] whitespace-nowrap transition-colors ${
                          scrolled
                            ? active
                              ? 'bg-navy/10 text-[#9A4906] font-semibold'
                              : 'text-navy hover:bg-navy/5'
                            : active
                            ? 'bg-oat/15 text-peach font-semibold'
                            : 'text-oat hover:bg-oat/10'
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}

                  <div className={`pt-2 mt-1 border-t flex flex-col gap-1 ${scrolled ? 'border-navy/15' : 'border-white/15'}`}>
                    {!authLoading && user ? (
                      <>
                        <Link
                          href="/dashboard"
                          onClick={() => setMobileMenuOpen(false)}
                          className={`font-ui-label text-xs py-2.5 px-2 rounded-[4px] flex items-center gap-2 ${
                            scrolled ? 'text-navy hover:bg-navy/5' : 'text-peach hover:bg-oat/10'
                          }`}
                        >
                          <User className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>My Dashboard ({accountLabel})</span>
                        </Link>
                        {isAdmin && (
                          <Link
                            href="/admin"
                            onClick={() => setMobileMenuOpen(false)}
                            className={`font-ui-label text-xs py-2.5 px-2 rounded-[4px] flex items-center gap-2 ${
                              scrolled ? 'text-[#9A4906] font-semibold' : 'text-flame font-semibold'
                            }`}
                          >
                            <Shield className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Admin Dashboard</span>
                          </Link>
                        )}
                      </>
                    ) : (
                      <Link
                        href="/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`font-ui-label text-xs py-2.5 px-2 rounded-[4px] flex items-center gap-2 ${
                          scrolled ? 'text-navy hover:bg-navy/5' : 'text-peach hover:bg-oat/10'
                        }`}
                      >
                        <User className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Sign In / Create Account</span>
                      </Link>
                    )}
                  </div>

                  <p className={`text-[11px] px-2 pt-2 mt-1 border-t ${scrolled ? 'border-navy/15 text-navy/80' : 'border-white/15 text-sand'}`}>
                    {siteConfig.announcement}
                  </p>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </header>
      </div>
    </div>
  );
}
