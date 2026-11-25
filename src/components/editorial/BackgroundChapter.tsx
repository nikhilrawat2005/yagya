'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';

export type ChapterTone = 'navy' | 'olive' | 'purple' | 'aubergine';

export interface BackgroundChapterProps {
  id: string;
  chapterNumber: string;
  chapterLabel: string;
  imageSrc: '/background/1.png' | '/background/2.png' | '/background/3.png' | '/background/4.png';
  imageAlt: string;
  tone: ChapterTone;
  isHero?: boolean;
  isLast?: boolean;
  children: React.ReactNode;
  className?: string;
}

const TONE_BASE_BG: Record<ChapterTone, string> = {
  navy: '#141C2B',
  olive: '#252905',
  purple: '#381B31',
  aubergine: '#24141F',
};

const TONE_VIGNETTE: Record<ChapterTone, string> = {
  navy:
    'linear-gradient(180deg, rgba(20,28,43,0.44) 0%, rgba(20,28,43,0.16) 46%, rgba(20,28,43,0.58) 100%)',
  olive:
    'linear-gradient(180deg, rgba(37,41,5,0.46) 0%, rgba(75,81,10,0.18) 46%, rgba(37,41,5,0.62) 100%)',
  purple:
    'linear-gradient(180deg, rgba(56,27,49,0.44) 0%, rgba(56,27,49,0.16) 46%, rgba(56,27,49,0.62) 100%)',
  aubergine:
    'linear-gradient(180deg, rgba(36,20,31,0.42) 0%, rgba(36,20,31,0.18) 46%, rgba(22,12,19,0.68) 100%)',
};

/**
 * Full-bleed photographic story chapter with smooth scroll-linked cross-dissolve,
 * subtle vertical parallax, lazy image mounting below the fold, and a dark vignette
 * tailored to the chapter's base tone for accessible Oat White typography.
 */
export function BackgroundChapter({
  id,
  chapterNumber,
  chapterLabel,
  imageSrc,
  imageAlt,
  tone,
  isHero = false,
  isLast = false,
  children,
  className = '',
}: BackgroundChapterProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const shouldLoadImage = useInView(sectionRef, {
    once: true,
    margin: '750px 0px',
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Layered cross-dissolve: Hero floor stays opaque; subsequent chapters dissolve smoothly over the prior layer
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, 1]);
  const midOpacity = useTransform(scrollYProgress, [0.1, 0.44, 0.94, 1], [0, 1, 1, 0]);
  const lastOpacity = useTransform(scrollYProgress, [0.1, 0.44, 1], [0, 1, 1]);

  const layerOpacity = isHero ? heroOpacity : isLast ? lastOpacity : midOpacity;
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-3.5%', '3.5%']);

  const imageReady = isHero || shouldLoadImage;

  return (
    <section
      id={id}
      ref={sectionRef}
      data-chapter={chapterNumber}
      aria-label={`Chapter ${chapterNumber}: ${chapterLabel}`}
      className={`relative min-h-screen w-full overflow-x-clip flex items-center pt-24 pb-12 sm:pt-28 sm:pb-16 ${className}`}
    >
      {/* Cross-dissolving fixed photographic backdrop */}
      <motion.div
        aria-hidden="true"
        style={{
          opacity: layerOpacity,
          backgroundColor: TONE_BASE_BG[tone],
        }}
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        {imageReady && (
          <motion.div
            style={
              prefersReducedMotion
                ? undefined
                : { y: parallaxY, scale: 1.09 }
            }
            className="absolute inset-0 will-change-transform"
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="100vw"
              quality={85}
              preload={isHero}
              loading={isHero ? 'eager' : 'lazy'}
              className="object-cover object-center"
            />
          </motion.div>
        )}

        {/* Editorial Dark Vignette + Soft Radial Edge Depth */}
        <div
          className="absolute inset-0"
          style={{
            background: TONE_VIGNETTE[tone],
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 32%, rgba(12, 10, 18, 0.44) 100%)',
          }}
        />
      </motion.div>

      {/* Chapter Foreground Content (Oat-Sheet panels & doodles) */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Compact inline chapter marker for mobile/tablet where side index hides */}
        <div className="lg:hidden flex items-center gap-3 mb-6 text-[11px] font-ui-label text-apricot/90">
          <span className="text-flame font-semibold">{chapterNumber}</span>
          <span className="w-6 h-[1px] bg-oat/40" aria-hidden="true" />
          <span>{chapterLabel}</span>
        </div>

        {children}
      </div>
    </section>
  );
}
