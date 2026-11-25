'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Check, Mail, MapPin, Phone } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { siteConfig } from '@/lib/data/site';
import { categories } from '@/lib/data/categories';
import { MOTION_EASE } from '@/lib/motion/tokens';
import { GlowButton } from '@/components/ui/GlowButton';
import { DoodleLeaf, DoodleSparkle } from '@/components/doodles';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setEmailError('Enter a valid email address');
      return;
    }
    setEmailError('');
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-indigo text-oat border-t-2 border-charcoal">
      {/* Top Harvest Newsletter Strip */}
      <div className="bg-apricot text-indigo border-b-2 border-charcoal/20 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <Link href="/" className="group flex items-center gap-4 w-fit">
            <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-oat border-2 border-charcoal/25 shrink-0 glow-border">
              <Image
                src="/yagya-logo.png"
                alt="Yagya Logo"
                fill
                sizes="56px"
                className="object-cover transition-transform duration-300 ease-out group-hover:scale-108"
              />
            </div>
            <div>
              <h3 className="font-display text-2xl font-semibold text-indigo group-hover:text-burnt transition-colors">
                Yagya Farm Superfoods
              </h3>
              <p className="font-script-body text-sm text-indigo">
                Seeds &amp; berries straight from Indian farmers.
              </p>
            </div>
          </Link>

          <form onSubmit={handleSubscribe} noValidate className="flex flex-col sm:flex-row sm:items-center gap-3">
            <label htmlFor="footer-email" className="font-script-body text-base text-cranberry font-bold inline-flex items-center gap-2">
              <DoodleLeaf variant="twin" delay={0.15} className="w-6 h-6 opacity-85" />
              <span>Stay connected with the harvest:</span>
              <DoodleSparkle delay={0.25} className="hidden sm:inline-block w-5 h-5 opacity-80" />
            </label>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <input
                  id="footer-email"
                  type="email"
                  required
                  value={email}
                  aria-invalid={Boolean(emailError)}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setSubscribed(false);
                    if (emailError) setEmailError('');
                  }}
                  placeholder="you@example.com"
                  className="glow-input px-4 py-2.5 rounded-full bg-oat border-2 border-charcoal/30 text-xs text-indigo placeholder:text-indigo/50 w-52 sm:w-64"
                />
                <GlowButton
                  type="submit"
                  variant="submit"
                  size="sm"
                  className="px-5 py-2.5 text-xs"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {subscribed ? (
                      <motion.span
                        key="subscribed"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.18, ease: MOTION_EASE.smooth }}
                        className="inline-flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Subscribed</span>
                      </motion.span>
                    ) : (
                      <motion.span
                        key="subscribe"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.18, ease: MOTION_EASE.smooth }}
                      >
                        Subscribe
                      </motion.span>
                    )}
                  </AnimatePresence>
                </GlowButton>
              </div>
              <AnimatePresence>
                {emailError && (
                  <motion.p
                    role="alert"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="text-cranberry text-[11px] font-sans font-medium mt-1 pl-2"
                  >
                    {emailError}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </div>
      </div>

      {/* Main Links Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <span className="font-mono-meta text-[11px] uppercase tracking-widest text-peach block mb-3">
              About Yagya
            </span>
            <p className="font-script-body text-sm text-oat/90 mb-3">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <span className="font-mono-meta text-[11px] uppercase tracking-widest text-peach block mb-3">
              Categories
            </span>
            <ul className="space-y-2 text-xs font-sans">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/shop?category=${cat.slug}`}
                    className="nav-link-underline nav-link-underline-left text-oat/90 hover:text-peach transition-colors py-0.5"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="font-mono-meta text-[11px] uppercase tracking-widest text-peach block mb-3">
              Explore
            </span>
            <ul className="space-y-2 text-xs font-sans">
              <li>
                <Link
                  href="/shop"
                  className="nav-link-underline nav-link-underline-left text-oat/90 hover:text-peach transition-colors py-0.5"
                >
                  Shop All Superfoods
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="nav-link-underline nav-link-underline-left text-oat/90 hover:text-peach transition-colors py-0.5"
                >
                  Our Farm Story
                </Link>
              </li>
              <li>
                <Link
                  href="/journal"
                  className="nav-link-underline nav-link-underline-left text-oat/90 hover:text-peach transition-colors py-0.5"
                >
                  Harvest Journal
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="nav-link-underline nav-link-underline-left text-oat/90 hover:text-peach transition-colors py-0.5"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <span className="font-mono-meta text-[11px] uppercase tracking-widest text-peach block mb-3">
              Direct Contact
            </span>
            <ul className="space-y-2.5 text-xs text-oat/90 font-sans">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="group inline-flex items-center gap-2 text-oat/90 hover:text-peach transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-peach icon-hover-pop shrink-0" />
                  <span className="nav-link-underline nav-link-underline-left">
                    {siteConfig.contact.email}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
                  className="group inline-flex items-center gap-2 text-oat/90 hover:text-peach transition-colors font-mono-meta"
                >
                  <Phone className="w-3.5 h-3.5 text-peach icon-hover-pop shrink-0" />
                  <span className="nav-link-underline nav-link-underline-left">
                    {siteConfig.contact.phone}
                  </span>
                </a>
              </li>
              <li className="group inline-flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-peach icon-hover-pop shrink-0" />
                <span>{siteConfig.contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-oat/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono-meta text-oat/80">
          <p>© {new Date().getFullYear()} {siteConfig.name} Superfoods.</p>
          <p>Oat White · Fibonacci · Farm-Direct</p>
        </div>
      </div>
    </footer>
  );
}
