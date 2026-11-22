'use client';

import { useState } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/lib/data/site';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-surface-container-high border-t border-outline-variant/40 pt-16 pb-12 mt-20">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-outline-variant/30">
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col items-start pr-0 md:pr-8">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="w-7 h-7 rounded-full bg-primary-container text-surface flex items-center justify-center font-serif font-bold text-sm">
                B
              </span>
              <span className="font-serif text-2xl text-primary font-normal tracking-tight">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-sm text-on-surface-variant leading-relaxed max-w-sm mb-6">
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-4 text-primary">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center hover:bg-secondary hover:text-surface transition-colors"
                aria-label="Instagram"
              >
                <span className="material-symbols-outlined text-[18px]">photo_camera</span>
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center hover:bg-secondary hover:text-surface transition-colors"
                aria-label="Twitter"
              >
                <span className="material-symbols-outlined text-[18px]">flutter</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 flex flex-col">
            <h4 className="font-serif text-base font-medium text-primary mb-4">Pantry Directory</h4>
            <div className="flex flex-col gap-2.5 text-xs font-semibold tracking-wider uppercase text-on-surface-variant">
              <Link href="/shop" className="hover:text-primary transition-colors">
                All Superfoods
              </Link>
              <Link href="/shop?category=makhana" className="hover:text-primary transition-colors">
                Mithila Lotus Pops
              </Link>
              <Link href="/shop?category=chia" className="hover:text-primary transition-colors">
                Highland Chia Seeds
              </Link>
              <Link href="/about" className="hover:text-primary transition-colors">
                Our Philosophy
              </Link>
              <Link href="/journal" className="hover:text-primary transition-colors">
                Harvest Journal
              </Link>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="md:col-span-4 flex flex-col">
            <h4 className="font-serif text-base font-medium text-primary mb-2">
              Join the Harvest Circle
            </h4>
            <p className="text-xs text-on-surface-variant mb-4">
              Receive quarterly notices when seasonal batches are harvested, tested, and packed.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-lg bg-primary-fixed text-primary text-xs font-medium flex items-center gap-2">
                <span className="material-symbols-outlined text-base">check_circle</span>
                Thank you for subscribing. We respect quiet inboxes.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  required
                  className="bg-surface border border-outline-variant rounded-full px-4 py-2 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary flex-1"
                />
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-primary-container text-surface hover:bg-secondary transition-colors text-xs font-semibold uppercase tracking-wider cursor-pointer"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-on-surface-variant/70 gap-4">
          <p>© 2026 {siteConfig.name}. Handcrafted with clean ingredients.</p>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:underline">
              Terms & Purity
            </Link>
            <Link href="/contact" className="hover:underline">
              Privacy Sanctuary
            </Link>
            <Link href="/contact" className="hover:underline">
              Shipping & Returns
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
