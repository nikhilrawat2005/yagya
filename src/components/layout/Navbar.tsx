'use client';

import { Suspense, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { siteConfig } from '@/lib/data/site';
import { categories } from '@/lib/data/categories';
import { useCartStore } from '@/lib/store/cartStore';
import { MOTION_EASE, MOTION_SPRING } from '@/lib/motion/tokens';
import { useInteractiveCapabilities } from '@/lib/motion/useInteractiveCapabilities';
import { GlowButton } from '@/components/ui/GlowButton';

const DESKTOP_NAV_ITEMS = [
  { href: '/shop', label: 'Shop All', matchPath: '/shop', matchCategory: null },
  {
    href: `/shop?category=${categories[0].slug}`,
    label: 'Seeds & Grains',
    matchPath: '/shop',
    matchCategory: categories[0].slug,
  },
  {
    href: `/shop?category=${categories[1].slug}`,
    label: 'Berries',
    matchPath: '/shop',
    matchCategory: categories[1].slug,
  },
  { href: '/about', label: 'Our Story', matchPath: '/about', matchCategory: null },
  { href: '/contact', label: 'Contact', matchPath: '/contact', matchCategory: null },
] as const;

function DesktopNavLinksWithParams() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category');

  return (
    <DesktopNavLinksList
      pathname={pathname}
      activeCategory={activeCategory}
    />
  );
}

function DesktopNavLinksList({
  pathname,
  activeCategory,
}: {
  pathname: string;
  activeCategory: string | null;
}) {
  return (
    <nav
      aria-label="Main navigation"
      className="hidden lg:flex items-center gap-6 text-xs font-ui-label text-indigo"
    >
      {DESKTOP_NAV_ITEMS.map((item) => {
        const isActive =
          item.matchPath === '/shop'
            ? pathname === '/shop' &&
              (item.matchCategory
                ? activeCategory === item.matchCategory
                : !activeCategory)
            : pathname === item.matchPath;

        return (
          <Link
            key={item.href}
            href={item.href}
            data-active={isActive ? 'true' : 'false'}
            className={`nav-link-underline py-1.5 transition-colors duration-200 ${
              isActive
                ? 'text-burnt font-semibold'
                : 'text-indigo hover:text-burnt'
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  const totalItems = useCartStore((s) => s.getTotalItems());
  const openCart = useCartStore((s) => s.openCart);
  const { enableInteractiveMotion, prefersReducedMotion } = useInteractiveCapabilities();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      setScrolled(currentY > 20);

      if (mobileMenuOpen || prefersReducedMotion) {
        setHidden(false);
      } else if (currentY < 96) {
        setHidden(false);
      } else if (delta > 8 && currentY > 140) {
        setHidden(true);
      } else if (delta < -6) {
        setHidden(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen, prefersReducedMotion]);

  return (
    <motion.div
      initial={false}
      animate={{ y: hidden ? '-100%' : '0%' }}
      transition={{
        duration: prefersReducedMotion ? 0.01 : 0.28,
        ease: MOTION_EASE.smooth,
      }}
      onFocusCapture={() => setHidden(false)}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Announcement Bar */}
      <div className="bg-indigo text-oat py-2 text-center border-b border-charcoal/15 px-4">
        <p className="font-ui-label text-[11px]">{siteConfig.announcement}</p>
      </div>

      {/* Main Navbar: clean Oat White at top, Oat-tinted glass blur + soft glow on scroll */}
      <header
        className={`border-b transition-[background-color,backdrop-filter,border-color,padding,box-shadow] duration-300 ease-[var(--ease-smooth)] ${
          scrolled
            ? 'bg-oat/88 backdrop-blur-md border-charcoal/25 py-2.5 shadow-[var(--glow-level-1)]'
            : 'bg-oat border-charcoal/15 py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Mobile toggle & Logo */}
          <div className="flex items-center gap-3">
            <motion.button
              type="button"
              whileTap={prefersReducedMotion ? undefined : { scale: 0.92 }}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-2 rounded-full text-indigo hover:text-burnt hover:bg-apricot/70 glow-hover transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileMenuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="block"
                  >
                    <X className="w-5 h-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="block"
                  >
                    <Menu className="w-5 h-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-charcoal/20 bg-oat shrink-0 glow-border">
                <Image
                  src="/yagya-logo.png"
                  alt="Yagya Superfoods"
                  fill
                  sizes="44px"
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-108"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl font-semibold text-indigo tracking-tight leading-none group-hover:text-burnt transition-colors duration-200">
                  {siteConfig.name}
                </span>
                <span className="font-ui-label text-[10px] text-cranberry mt-1">
                  Farm Superfoods
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links (Wrapped in Suspense for static compatibility with useSearchParams) */}
          <Suspense
            fallback={
              <DesktopNavLinksList pathname={pathname} activeCategory={null} />
            }
          >
            <DesktopNavLinksWithParams />
          </Suspense>

          {/* Right: Cart & Shop CTA */}
          <div className="flex items-center gap-3 shrink-0">
            <GlowButton
              href="/shop"
              variant="cta"
              size="sm"
              magnetic
              className="hidden sm:inline-flex px-5 py-2.5"
            >
              Explore Harvest
            </GlowButton>

            <motion.button
              type="button"
              onClick={openCart}
              whileHover={enableInteractiveMotion ? { scale: 1.04 } : undefined}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
              transition={MOTION_SPRING.tactile}
              aria-label={`Open shopping bag, ${totalItems} items`}
              className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-full border-2 border-charcoal bg-apricot hover:bg-burnt hover:text-oat hover:border-burnt text-indigo glow-hover transition-colors duration-250 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 icon-hover-pop" />
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={totalItems}
                  initial={prefersReducedMotion ? false : { scale: 0.7, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={MOTION_SPRING.pop}
                  className="font-mono-meta text-xs font-bold inline-block min-w-[1ch] text-center"
                >
                  {totalItems}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence initial={false}>
          {mobileMenuOpen && (
            <motion.nav
              aria-label="Mobile navigation"
              initial={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: MOTION_EASE.smooth }}
              className="lg:hidden overflow-hidden bg-oat/95 backdrop-blur-md border-t border-charcoal/15"
            >
              <div className="px-6 py-5 space-y-2.5">
                <Link
                  href="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  data-active={pathname === '/shop' ? 'true' : 'false'}
                  className="nav-link-underline nav-link-underline-left py-1.5 font-ui-label text-xs text-indigo hover:text-burnt block w-fit"
                >
                  Shop All Superfoods
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/shop?category=${cat.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="nav-link-underline nav-link-underline-left py-1.5 font-ui-label text-xs text-indigo hover:text-burnt block w-fit"
                  >
                    {cat.name}
                  </Link>
                ))}
                <div className="pt-3 border-t border-charcoal/15 flex gap-6">
                  <Link
                    href="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    data-active={pathname === '/about' ? 'true' : 'false'}
                    className="nav-link-underline nav-link-underline-left py-1 font-ui-label text-xs text-indigo hover:text-burnt"
                  >
                    Our Story
                  </Link>
                  <Link
                    href="/journal"
                    onClick={() => setMobileMenuOpen(false)}
                    data-active={pathname === '/journal' ? 'true' : 'false'}
                    className="nav-link-underline nav-link-underline-left py-1 font-ui-label text-xs text-indigo hover:text-burnt"
                  >
                    Journal
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    data-active={pathname === '/contact' ? 'true' : 'false'}
                    className="nav-link-underline nav-link-underline-left py-1 font-ui-label text-xs text-indigo hover:text-burnt"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </motion.div>
  );
}
