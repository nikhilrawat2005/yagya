'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { siteConfig } from '@/lib/data/site';
import { categories } from '@/lib/data/categories';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-indigo text-oat border-t-2 border-charcoal">
      {/* Top Harvest Newsletter Strip */}
      <div className="bg-apricot text-indigo border-b-2 border-charcoal/20 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-oat border-2 border-charcoal/25 shrink-0">
              <Image
                src="/yagya-logo.png"
                alt="Yagya Logo"
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-display text-2xl font-semibold text-indigo">
                Yagya Farm Superfoods
              </h3>
              <p className="font-script-body text-sm text-indigo">
                Seeds &amp; berries straight from Indian farmers.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubscribe} className="flex flex-wrap items-center gap-3">
            <label htmlFor="footer-email" className="font-script-body text-base text-cranberry font-bold">
              Stay connected with the harvest:
            </label>
            <div className="flex items-center gap-2">
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setSubscribed(false);
                }}
                placeholder="you@example.com"
                className="px-4 py-2.5 rounded-full bg-oat border-2 border-charcoal/30 text-xs text-indigo placeholder:text-indigo/50 focus:outline-none focus:border-indigo w-52 sm:w-64"
              />
              <button
                type="submit"
                className="group relative overflow-hidden px-5 py-2.5 rounded-full bg-indigo text-oat font-ui-label text-xs inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-burnt -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"
                />
                <span className="relative z-10 inline-flex items-center gap-1.5">
                  {subscribed ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Subscribed</span>
                    </>
                  ) : (
                    <span>Subscribe</span>
                  )}
                </span>
              </button>
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
                    className="text-oat/90 hover:text-peach transition-colors"
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
                <Link href="/shop" className="text-oat/90 hover:text-peach transition-colors">
                  Shop All Superfoods
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-oat/90 hover:text-peach transition-colors">
                  Our Farm Story
                </Link>
              </li>
              <li>
                <Link href="/journal" className="text-oat/90 hover:text-peach transition-colors">
                  Harvest Journal
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-oat/90 hover:text-peach transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <span className="font-mono-meta text-[11px] uppercase tracking-widest text-peach block mb-3">
              Direct Contact
            </span>
            <ul className="space-y-2 text-xs text-oat/90 font-sans">
              <li>{siteConfig.contact.email}</li>
              <li className="font-mono-meta">{siteConfig.contact.phone}</li>
              <li>{siteConfig.contact.address}</li>
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
