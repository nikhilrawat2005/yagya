'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from 'motion/react';
import { useInteractiveCapabilities } from '@/lib/motion/useInteractiveCapabilities';

export type ChapterTone = 'navy' | 'olive' | 'purple' | 'aubergine';

export interface BackgroundChapterProps {
  id: string;
  chapterNumber: string;
  chapterLabel: string;
  imageSrc: '/background/1.png' | '/background/2.png' | '/background/3.png' | '/background/4.png';
  imageAlt: string;
  objectPositionClass?: string;
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
    'linear-gradient(180deg, rgba(20,28,43,0.32) 0%, rgba(20,28,43,0.12) 48%, rgba(20,28,43,0.54) 100%)',
  olive:
    'linear-gradient(180deg, rgba(37,41,5,0.34) 0%, rgba(75,81,10,0.14) 48%, rgba(37,41,5,0.56) 100%)',
  purple:
    'linear-gradient(180deg, rgba(56,27,49,0.32) 0%, rgba(56,27,49,0.12) 48%, rgba(56,27,49,0.56) 100%)',
  aubergine:
    'linear-gradient(180deg, rgba(36,20,31,0.32) 0%, rgba(36,20,31,0.14) 48%, rgba(22,12,19,0.62) 100%)',
};

/**
 * Full-bleed photographic story chapter using `min-h-dvh`, responsive object positioning,
 * transform-only subtle desktop parallax (capped at ±20px), low-power/touch safeguards,
 * and a 1440px-capped foreground grid inside a full-bleed background canvas.
 */
export function BackgroundChapter({
  id,
  chapterNumber,
  chapterLabel,
  imageSrc,
  imageAlt,
  objectPositionClass = 'object-center',
  tone,
  isHero = false,
  isLast = false,
  children,
  className = '',
}: BackgroundChapterProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { enableParallax, isMobile } = useInteractiveCapabilities();

  const shouldLoadImage = useInView(sectionRef, {
    once: true,
    margin: '550px 0px',
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
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  const imageReady = isHero || shouldLoadImage;

  return (
    <section
      id={id}
      ref={sectionRef}
      data-chapter={chapterNumber}
      aria-label={`Chapter ${chapterNumber}: ${chapterLabel}`}
      className={`relative min-h-dvh w-full overflow-x-clip flex items-center pt-[calc(5.25rem+var(--safe-top))] pb-24 md:py-24 lg:py-28 landscape-phone:pt-20 landscape-phone:pb-12 ${className}`}
    >
      {/* Cross-dissolving fixed photographic backdrop (never uses background-attachment: fixed) */}
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
              enableParallax
                ? { y: parallaxY, scale: 1.06 }
                : undefined
            }
            className="absolute inset-0"
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="100vw"
              quality={isMobile ? 75 : 85}
              preload={isHero}
              loading={isHero ? 'eager' : 'lazy'}
              className={`object-cover ${objectPositionClass}`}
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
              'radial-gradient(ellipse at center, transparent 32%, rgba(12, 10, 18, 0.46) 100%)',
          }}
        />
      </motion.div>

      {/* Chapter Foreground Content (capped at 1440px on ultra-wide, 16px side gutters on mobile) */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-14 pl-[max(1rem,var(--safe-left))] pr-[max(1rem,var(--safe-right))]">
        {children}
      </div>
    </section>
  );
}
