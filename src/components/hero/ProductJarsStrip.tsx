'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/lib/store/cartStore';

interface JarItem {
  id: string;
  name: string;
  subname: string;
  slug: string;
  price: string;
  image: string;
  badge: string;
}

const jarProducts: JarItem[] = [
  {
    id: 'jar-sb',
    name: 'Dried Sea Buckthorn',
    subname: 'Berries dried',
    slug: 'dried-sea-buckthorn-berries',
    price: '$9.99',
    image: '/jars/WhatsApp Image 2026-11-24 at 1.54.11 AM.jpeg',
    badge: 'No Added Sugar',
  },
  {
    id: 'jar-flax',
    name: 'Flax Seeds',
    subname: 'Flax Seeds',
    slug: 'roasted-himalayan-makhana',
    price: '$8.99',
    image: '/jars/WhatsApp Image 2026-11-24 at 1.52.28 AM.jpeg',
    badge: 'No Added Sugar',
  },
  {
    id: 'jar-pumpkin',
    name: 'Pumpkin Seeds',
    subname: 'Pumpkin Seed',
    slug: 'raw-organic-chia-seeds',
    price: '$8.99',
    image: '/jars/WhatsApp Image 2026-11-24 at 10.10.50 AM.jpeg',
    badge: 'No Added Sugar',
  },
  {
    id: 'jar-chia',
    name: 'Chia Seeds',
    subname: 'Chia Seeds',
    slug: 'raw-organic-chia-seeds',
    price: '$6.99',
    image: '/jars/WhatsApp Image 2026-11-24 at 10.10.51 AM (1).jpeg',
    badge: 'No Added Sugar',
  },
  {
    id: 'jar-sunflower',
    name: 'Sunflower Seeds',
    subname: 'Dried Blueberries',
    slug: 'dried-sea-buckthorn-berries',
    price: '$9.99',
    image: '/jars/WhatsApp Image 2026-11-24 at 10.10.51 AM (2).jpeg',
    badge: 'No Added Sugar',
  },
  {
    id: 'jar-cranberries',
    name: 'Dried Cranberries',
    subname: 'Cranberries',
    slug: 'dried-sea-buckthorn-berries',
    price: '$8.99',
    image: '/jars/WhatsApp Image 2026-11-24 at 10.11.13 AM.jpeg',
    badge: 'No Added Sugar',
  },
];

export function ProductJarsStrip() {
  return (
    <section className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
      {/* 6 Jar Product Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {jarProducts.map((jar) => (
          <div
            key={jar.id}
            className="group bg-[#FBF8F2] border border-[#2B2B2B]/20 rounded-2xl p-3 flex flex-col justify-between shadow-[2px_3px_0px_#2B2B2B]/20 hover:shadow-[3px_4px_0px_#2B2B2B] transition-all duration-200"
          >
            {/* Top Badge: "No Added Sugar" pill */}
            <div className="flex justify-start mb-2">
              <span className="text-[10px] font-semibold text-[#885200] bg-[#FDE6C8] px-2.5 py-0.5 rounded-full border border-[#885200]/20">
                {jar.badge}
              </span>
            </div>

            {/* Jar Image Container */}
            <Link
              href={`/product/${jar.slug}`}
              className="relative w-full aspect-square my-1 rounded-xl overflow-hidden bg-white/70 flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-300"
            >
              <Image
                src={jar.image}
                alt={jar.name}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                className="object-contain p-1"
              />
            </Link>

            {/* Title & Subtitle */}
            <div className="mt-2 mb-3">
              <h4 className="font-sans text-xs font-bold text-[#2E3175] line-clamp-1 leading-tight">
                {jar.name}
              </h4>
              <p className="text-[11px] text-[#2B2B2B]/70 line-clamp-1 font-sans">
                {jar.subname}
              </p>
            </div>

            {/* Bottom: Price + ADD TO CART Pill */}
            <div className="flex items-center justify-between gap-1 pt-1.5 border-t border-[#2B2B2B]/10">
              <span className="font-mono-meta font-bold text-xs text-[#2E3175]">
                {jar.price}
              </span>
              <Link
                href={`/product/${jar.slug}`}
                className="px-2.5 py-1 rounded-full bg-[#2E3175] hover:bg-[#D9700B] text-white text-[10px] font-bold uppercase tracking-[0.06em] transition-colors"
              >
                ADD TO CART
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Trust Indicators: Pill badges matching the reference screenshot */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-[#2E3175] font-sans">
        <div className="flex items-center gap-2 bg-[#FDE6C8]/60 border border-[#2B2B2B]/20 rounded-full px-5 py-2 shadow-xs">
          <span className="w-4 h-4 rounded-full border border-[#2B2B2B] flex items-center justify-center text-[10px] font-bold text-[#2B2B2B]">
            ✓
          </span>
          <span>Direct From Farmers</span>
        </div>

        <div className="flex items-center gap-2 bg-[#FDE6C8]/60 border border-[#2B2B2B]/20 rounded-full px-5 py-2 shadow-xs">
          <span className="w-4 h-4 rounded-full border border-[#2B2B2B] flex items-center justify-center text-[10px] font-bold text-[#2B2B2B]">
            ✓
          </span>
          <span>Hygienic Packing</span>
        </div>

        <div className="flex items-center gap-2 bg-[#FDE6C8]/60 border border-[#2B2B2B]/20 rounded-full px-5 py-2 shadow-xs">
          <span className="w-4 h-4 rounded-full border border-[#2B2B2B] flex items-center justify-center text-[10px] font-bold text-[#2B2B2B]">
            ✓
          </span>
          <span>Zero Added Sugar</span>
        </div>
      </div>
    </section>
  );
}
