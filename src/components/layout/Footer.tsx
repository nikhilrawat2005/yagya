'use client';

import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/lib/data/site';

export function Footer() {
  return (
    <footer className="bg-[#2E3175] text-[#F6EFE2] border-t-4 border-[#2B2B2B]">
      {/* Top Banner */}
      <div className="bg-[#23265D] border-b border-[#F6EFE2]/10 py-8 px-4 md:px-8">
        <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-white p-1 border-2 border-[#F28C1B] shrink-0">
              <Image
                src="/yagya-logo.png"
                alt="Yagya"
                width={56}
                height={56}
                className="object-contain w-full h-full"
              />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold tracking-tight text-white">
                Yagya Superfoods
              </h3>
              <p className="text-xs text-[#FBC98A] font-sans">
                Authentic Himalayan harvests. 100% Zero added sugar.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="font-script text-xl text-[#FBC98A]">Stay connected with the farm</span>
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-xs placeholder:text-white/50 text-white focus:outline-none focus:border-[#F28C1B] w-52 md:w-64"
              />
              <button className="px-5 py-2.5 rounded-full bg-[#F28C1B] hover:bg-[#D9700B] text-white text-xs font-semibold uppercase tracking-[0.08em] transition-colors cursor-pointer">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-[1240px] mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <span className="font-mono-meta text-[11px] uppercase tracking-widest text-[#FBC98A] block mb-3">
              ABOUT YAGYA
            </span>
            <p className="text-xs text-[#F6EFE2]/80 leading-relaxed font-sans mb-4">
              We partner directly with high-altitude farmers across the Himalayas to bring you unadulterated whole dried berries, seeds, and heritage superfoods.
            </p>
            <span className="font-script text-lg text-[#F28C1B]">Direct from mountain soil.</span>
          </div>

          <div>
            <span className="font-mono-meta text-[11px] uppercase tracking-widest text-[#FBC98A] block mb-3">
              SUPERFOODS
            </span>
            <ul className="space-y-2 text-xs text-[#F6EFE2]/85">
              <li>
                <Link href="/product/dried-sea-buckthorn-berries" className="hover:text-[#F28C1B] transition-colors">
                  Dried Sea Buckthorn Berries
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[#F28C1B] transition-colors">
                  Sun-Roasted Makhana
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[#F28C1B] transition-colors">
                  Kashmir Walnut Kernels
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[#F28C1B] transition-colors">
                  Omega Seeds & Mixes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <span className="font-mono-meta text-[11px] uppercase tracking-widest text-[#FBC98A] block mb-3">
              COMMUNITY & CARE
            </span>
            <ul className="space-y-2 text-xs text-[#F6EFE2]/85">
              <li>
                <Link href="/about" className="hover:text-[#F28C1B] transition-colors">
                  Our Mountain Story
                </Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-[#F28C1B] transition-colors">
                  Nutrition Journal
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#F28C1B] transition-colors">
                  Customer Care & Queries
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-[#F28C1B] transition-colors">
                  Shipping & Returns
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <span className="font-mono-meta text-[11px] uppercase tracking-widest text-[#FBC98A] block mb-3">
              CONTACT
            </span>
            <p className="text-xs text-[#F6EFE2]/80 leading-relaxed font-sans mb-2">
              Email: <strong className="text-white">care@yagyafoods.in</strong>
            </p>
            <p className="text-xs text-[#F6EFE2]/80 leading-relaxed font-sans mb-3">
              Phone: +91 98765 43210
            </p>
            <div className="bg-[#23265D] p-3 rounded-xl border border-[#F6EFE2]/15 text-[11px] text-[#FBC98A]">
              Tested under NABL lab protocols. ICMR-NIN compliant.
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#F6EFE2]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F6EFE2]/60">
          <p>© {new Date().getFullYear()} Yagya Superfoods. All rights reserved.</p>
          <p className="font-mono-meta text-[11px]">Designed with Fibonacci Golden Ratio Harmony</p>
        </div>
      </div>
    </footer>
  );
}
