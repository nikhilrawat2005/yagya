'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function FibonacciHero() {
  return (
    <section className="relative w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 overflow-hidden select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-2 items-center">
        
        {/* LEFT COLUMN: Typography with Charcoal & Cranberry Doodles */}
        <div className="lg:col-span-6 flex flex-col justify-center z-10 pr-0 lg:pr-4">
          
          {/* Main Headline with Charcoal and Cranberry Marker Doodles */}
          <div className="relative mb-3">
            <h1 className="font-serif text-[42px] sm:text-[54px] lg:text-[62px] leading-[1.08] text-[#2E3175] tracking-tight font-medium">
              
              {/* "Seeds & Berries," with Charcoal Hand-drawn Marker Ring */}
              <span className="relative inline-block mr-2">
                Seeds & Berries,
                <svg
                  className="absolute -top-3 -left-4 w-[114%] h-[135%] pointer-events-none text-[#2B2B2B]"
                  viewBox="0 0 380 90"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M30 48C20 28 65 10 185 8C315 6 370 24 365 52C360 76 295 86 160 84C45 82 8 68 18 42C24 24 95 12 210 11"
                    stroke="currentColor"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.88"
                  />
                </svg>
              </span>

              {/* "Straight" with Cranberry Red Ring */}
              <span className="relative inline-block text-[#B3122D]">
                Straight
                <svg
                  className="absolute -top-2.5 -left-3 w-[118%] h-[130%] pointer-events-none text-[#B3122D]"
                  viewBox="0 0 210 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 40C12 20 45 8 105 7C175 6 200 20 196 44C190 66 145 76 90 74C30 72 6 56 16 34C22 18 70 9 140 8"
                    stroke="currentColor"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.9"
                  />
                </svg>
              </span>

              <br />

              {/* "Straight From The Farm" with Hand-drawn Underlines */}
              <span className="relative inline-block">
                Straight From The Farm
                <svg
                  className="absolute -bottom-3 left-0 w-full h-[14px] pointer-events-none text-[#B3122D]"
                  viewBox="0 0 340 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6C80 4 190 7 335 5"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M18 11C110 9 220 11 315 10"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Little Charcoal Star Doodle near title */}
            <svg
              className="absolute -right-2 top-2 w-6 h-6 text-[#2B2B2B]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
          </div>

          {/* Subheading in Plus Jakarta Sans + Gram weights */}
          <div className="flex items-center gap-3 text-sm md:text-base font-semibold text-[#2E3175] mt-4 mb-2">
            <span>Plus Jakarta Sans SemiBold</span>
            <span className="font-mono-meta text-xs font-normal text-[#2B2B2B]/70 tracking-wider">
              100g / 200g / 500g
            </span>
          </div>

          {/* Description Paragraph */}
          <p className="text-xs sm:text-sm text-[#2B2B2B]/80 max-w-md leading-relaxed font-sans mb-7">
            DM Sans Regular, 100% natural authentic Indian superfoods brand, sourced directly from high-altitude farmers. Zero added sugar, packed fresh in small batches.
          </p>

          {/* Buttons: SHOP NOW (Blueberry Indigo) & VIEW NUTRITION (White with charcoal outline) */}
          <div className="flex items-center gap-4">
            <Link
              href="/shop"
              className="px-8 py-3 rounded-full bg-[#2E3175] hover:bg-[#D9700B] text-[#F6EFE2] text-xs font-bold uppercase tracking-[0.08em] transition-all shadow-[2px_3px_0px_#2B2B2B] hover:shadow-[1px_1px_0px_#2B2B2B] hover:translate-x-[1px] hover:translate-y-[1px]"
            >
              SHOP NOW
            </Link>

            <Link
              href="/product/dried-sea-buckthorn-berries"
              className="px-6 py-3 rounded-full bg-[#F6EFE2] hover:bg-[#FDE6C8] text-[#2E3175] text-xs font-bold uppercase tracking-[0.08em] border-2 border-[#2B2B2B] transition-all shadow-[2px_3px_0px_#2B2B2B] hover:shadow-[1px_1px_0px_#2B2B2B] hover:translate-x-[1px] hover:translate-y-[1px]"
            >
              VIEW NUTRITION
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN: Fibonacci Golden Ratio Spiral Canvas with Real Sketches & Marker */}
        <div className="lg:col-span-6 relative flex items-center justify-center">
          
          {/* Main Whiteboard Canvas container with Wavy Hill and Fibonacci diagram */}
          <div className="relative w-full max-w-[560px] aspect-[1.12/1] rounded-2xl bg-[#F6EFE2] overflow-visible">
            
            {/* Wavy Orange Terraced Landscape Flowing into the Fibonacci Block */}
            <svg
              className="absolute left-[-15%] bottom-0 w-[55%] h-[68%] pointer-events-none z-0"
              viewBox="0 0 240 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 200 C40 180 80 150 140 130 C190 115 220 120 240 110 L240 200 Z"
                fill="#FDE6C8"
              />
              <path
                d="M0 200 C30 190 70 170 130 155 C180 145 220 150 240 140 L240 200 Z"
                fill="#FBC98A"
              />
              <path
                d="M0 200 C35 195 80 185 140 175 C190 168 220 172 240 165 L240 200 Z"
                fill="#F28C1B"
              />
            </svg>

            {/* Fibonacci Golden Ratio Box (Right side square & subdivisions) */}
            <div className="absolute right-0 top-2 w-[78%] h-[94%] border-2 border-[#2B2B2B]/40 rounded-2xl overflow-hidden shadow-[4px_6px_0px_#2B2B2B] z-10 flex flex-col">
              
              {/* Top Half of Fibonacci: Quadrant arc with background gradients */}
              <div className="relative h-[62%] w-full flex">
                {/* Arc Left Section (#FDE6C8) */}
                <div className="relative w-[60%] h-full bg-[#FDE6C8] border-r-2 border-[#2B2B2B]/30 overflow-hidden">
                  <svg className="absolute inset-0 w-full h-full text-[#2B2B2B]/40" viewBox="0 0 100 100" fill="none">
                    <path d="M0 100 A100 100 0 0 1 100 0" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>

                {/* Top Right Box (Canvas white with sketch seeds) */}
                <div className="relative w-[40%] h-full bg-[#F6EFE2] p-3 flex flex-col justify-between">
                  {/* Charcoal Arrow pointing to seeds */}
                  <svg
                    className="w-7 h-7 text-[#2B2B2B] self-start"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  >
                    <path d="M5 5L18 18M18 18V10M18 18H10" />
                  </svg>

                  {/* Doodle Seeds with Charcoal sketches */}
                  <div className="relative w-full h-20">
                    <svg className="w-full h-full text-[#2B2B2B]" viewBox="0 0 90 70" fill="none">
                      {/* Seed 1 */}
                      <ellipse cx="25" cy="22" rx="10" ry="6" transform="rotate(-30 25 22)" stroke="currentColor" strokeWidth="2" />
                      <line x1="20" y1="20" x2="30" y2="24" stroke="currentColor" strokeWidth="1.5" />
                      {/* Seed 2 */}
                      <ellipse cx="52" cy="18" rx="11" ry="7" transform="rotate(20 52 18)" stroke="currentColor" strokeWidth="2" />
                      {/* Seed 3 */}
                      <ellipse cx="38" cy="45" rx="12" ry="7" transform="rotate(-5 38 45)" stroke="currentColor" strokeWidth="2" />
                      {/* Seed 4 */}
                      <ellipse cx="68" cy="38" rx="9" ry="5" transform="rotate(40 68 38)" stroke="currentColor" strokeWidth="2" />
                      {/* underline marks */}
                      <path d="M25 60 C35 59 55 60 70 58" stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                  </div>

                  {/* Stars doodle in top right */}
                  <div className="absolute top-2 right-2 text-[#2B2B2B]">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L14 8L20 9L15 14L17 20L12 17L7 20L9 14L4 9L10 8L12 2Z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Bottom Half of Fibonacci: Subdivided Golden rectangles */}
              <div className="relative h-[38%] w-full flex border-t-2 border-[#2B2B2B]/30">
                {/* 8 block - Sea Buckthorn Orange */}
                <div className="relative w-[60%] h-full bg-[#F28C1B] border-r-2 border-[#2B2B2B]/30 p-2 flex flex-col justify-end">
                  <span className="font-mono-meta text-[11px] font-bold text-white/70">8</span>

                  {/* Fibonacci inner spiral circle */}
                  <div className="absolute top-2 right-2 w-16 h-16 border-2 border-[#2B2B2B]/40 rounded-full flex items-center justify-center">
                    <span className="font-mono-meta text-[9px] text-white">1, 1, 2, 3</span>
                  </div>
                </div>

                {/* Right Dark Brown / Roasted Orange Block with Berries Doodles */}
                <div className="relative w-[40%] h-full bg-[#9E4A06] p-2 flex flex-col justify-between overflow-hidden">
                  <span className="font-mono-meta text-[11px] font-bold text-white/70">13</span>

                  {/* Doodle Berries & Star in dark block */}
                  <svg className="w-full h-16 text-[#F6EFE2]" viewBox="0 0 80 50" fill="none">
                    <circle cx="22" cy="30" r="9" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="22" cy="30" r="2" fill="currentColor" />
                    <circle cx="48" cy="25" r="11" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="48" cy="25" r="2.5" fill="currentColor" />
                    <circle cx="68" cy="35" r="8" stroke="currentColor" strokeWidth="1.8" />
                    {/* Almond sketch */}
                    <path d="M38 8 C30 18 36 28 44 26 C52 24 50 14 38 8 Z" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Doodle Seeds on the left wave */}
            <div className="absolute left-[8%] bottom-[8%] z-10 text-[#2B2B2B]">
              <svg className="w-16 h-12" viewBox="0 0 70 50" fill="none">
                <ellipse cx="20" cy="25" rx="8" ry="5" transform="rotate(-35 20 25)" stroke="currentColor" strokeWidth="2" />
                <ellipse cx="38" cy="32" rx="9" ry="5" transform="rotate(15 38 32)" stroke="currentColor" strokeWidth="2" />
                <ellipse cx="52" cy="18" rx="8" ry="4" transform="rotate(-15 52 18)" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>

            {/* Hand-drawn Arrow from Top to Fibonacci */}
            <svg
              className="absolute top-[-10px] left-[42%] w-12 h-10 text-[#2B2B2B] z-20"
              viewBox="0 0 45 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <path d="M5 5 C18 10 30 12 38 28 M38 28 L28 26 M38 28 L35 18" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            {/* Real 3D Marker Pen Graphic Laying Across the Whiteboard */}
            <div className="absolute -right-6 top-[28%] z-30 transform rotate-[130deg] pointer-events-none drop-shadow-xl">
              <div className="w-36 h-5 rounded-full bg-gradient-to-r from-[#1A1A1A] via-[#333333] to-[#2B2B2B] border border-white/20 flex items-center px-1 shadow-2xl relative">
                <div className="w-10 h-full bg-white/90 rounded-l-full border-r-2 border-[#2B2B2B] flex items-center justify-center">
                  <span className="text-[7px] font-bold text-[#2B2B2B] tracking-tight">MARKER</span>
                </div>
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-4 h-2.5 bg-[#1A1A1A] clip-nib rounded-r-sm" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
