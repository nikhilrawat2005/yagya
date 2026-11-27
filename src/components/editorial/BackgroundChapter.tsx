'use client';

import React, { useEffect, useRef, useState } from 'react';
import { getImageProps } from 'next/image';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import type { ChapterTone } from '@/lib/assets';

export type { ChapterTone };

export interface BackgroundChapterProps {
  id: string;
  chapterNumber: string;
  chapterLabel: string;
  desktopSrc: string;
  mobileSrc?: string;
  imageAlt: string;
  tone: ChapterTone;
  isHero?: boolean;
  isLast?: boolean;
  enableVanta?: boolean;
  compact?: boolean;
  children: React.ReactNode;
  className?: string;
}

const TONE_BASE_BG: Record<ChapterTone, string> = {
  navy: '#141C2B',
  olive: '#252905',
  purple: '#381B31',
  aubergine: '#24141F',
};

const TONE_BLUR_DATA_URL: Record<ChapterTone, string> = {
  navy: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSI4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiMxNDFDMkIiLz48L3N2Zz4=',
  olive: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSI4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiMyNTI5MDUiLz48L3N2Zz4=',
  purple: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSI4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiMzODFCMzEiLz48L3N2Zz4=',
  aubergine: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSI4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiMyNDE0MUYiLz48L3N2Zz4=',
};

const TONE_VIGNETTE: Record<ChapterTone, string> = {
  navy:
    'linear-gradient(180deg, rgba(20,28,43,0.48) 0%, rgba(20,28,43,0.22) 46%, rgba(20,28,43,0.62) 100%)',
  olive:
    'linear-gradient(180deg, rgba(37,41,5,0.48) 0%, rgba(75,81,10,0.22) 46%, rgba(37,41,5,0.64) 100%)',
  purple:
    'linear-gradient(180deg, rgba(56,27,49,0.48) 0%, rgba(56,27,49,0.22) 46%, rgba(56,27,49,0.64) 100%)',
  aubergine:
    'linear-gradient(180deg, rgba(36,20,31,0.46) 0%, rgba(36,20,31,0.22) 46%, rgba(22,12,19,0.70) 100%)',
};

/**
 * Full-bleed photographic story chapter (min-h-[100dvh]) with smooth scroll-linked
 * cross-dissolve, desktop-only subtle vertical parallax, responsive 9:16 mobile / 16:9
 * desktop art direction, optional single hero Vanta FOG atmosphere, and a dark vignette.
 */
export function BackgroundChapter({
  id,
  chapterNumber,
  chapterLabel,
  desktopSrc,
  mobileSrc,
  imageAlt,
  tone,
  isHero = false,
  isLast = false,
  enableVanta = false,
  compact = false,
  children,
  className = '',
}: BackgroundChapterProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const shouldLoadImage = useInView(sectionRef, {
    once: true,
    margin: '750px 0px',
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.72, 1], [1, 1, 0.12]);
  const midOpacity = useTransform(scrollYProgress, [0, 0.24, 0.76, 1], [0, 1, 1, 0]);
  const lastOpacity = useTransform(scrollYProgress, [0, 0.24, 1], [0, 1, 1]);

  const layerOpacity = isHero ? heroOpacity : isLast ? lastOpacity : midOpacity;
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-3%', '3%']);
  const breathScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1.04, 1.08]);

  const imageReady = isHero || shouldLoadImage;
  const enableParallax = isDesktop && !prefersReducedMotion;

  const commonImgProps = {
    alt: imageAlt,
    fill: true,
    sizes: '100vw',
    quality: 80,
    priority: isHero,
    loading: isHero ? ('eager' as const) : ('lazy' as const),
    placeholder: 'blur' as const,
    blurDataURL: TONE_BLUR_DATA_URL[tone],
    className: 'object-cover object-center',
  };

  const {
    props: { srcSet: desktopSrcSet, ...desktopImgProps },
  } = getImageProps({ ...commonImgProps, src: desktopSrc });

  const {
    props: { srcSet: mobileSrcSet },
  } = getImageProps({ ...commonImgProps, src: mobileSrc ?? desktopSrc });

  return (
    <section
      id={id}
      ref={sectionRef}
      data-chapter={chapterNumber}
      aria-label={`Chapter ${chapterNumber}: ${chapterLabel}`}
      className={`relative w-full overflow-x-clip flex ${
        compact
          ? isHero
            ? 'items-start pt-24 sm:pt-28 pb-10 sm:pb-12'
            : 'items-start py-10 sm:py-14'
          : isHero
          ? 'min-h-[84dvh] items-start pt-24 sm:pt-30 pb-10 sm:pb-14'
          : 'min-h-[78dvh] items-center py-12 sm:py-16'
      } ${className}`}
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
            style={enableParallax ? { y: parallaxY, scale: breathScale } : undefined}
            className="absolute inset-0 will-change-transform"
          >
            <picture className="block w-full h-full">
              {mobileSrc && (
                <source media="(max-width: 639px)" srcSet={mobileSrcSet} />
              )}
              <source media="(min-width: 640px)" srcSet={desktopSrcSet} />
              <img
                {...desktopImgProps}
                alt={imageAlt}
                fetchPriority={isHero ? 'high' : 'auto'}
              />
            </picture>
          </motion.div>
        )}

        {isHero && enableVanta && (
          <div
            aria-hidden="true"
            className="absolute inset-0 z-[1] pointer-events-none opacity-45"
            style={{
              background:
                'radial-gradient(60% 55% at 18% 28%, rgba(223, 127, 37, 0.22) 0%, transparent 70%), radial-gradient(45% 45% at 84% 72%, rgba(251, 201, 138, 0.14) 0%, transparent 72%)',
            }}
          />
        )}

        {/* Editorial Dark Vignette + Soft Radial Edge Depth */}
        <div
          className="absolute inset-0 z-[2]"
          style={{
            background: TONE_VIGNETTE[tone],
          }}
        />
        <div
          className="absolute inset-0 z-[2]"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 32%, rgba(12, 10, 18, 0.48) 100%)',
          }}
        />
      </motion.div>

      {/* Chapter Foreground Content (Oat-Sheet panels & doodles) */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="lg:hidden flex items-center gap-3 mb-5 text-[11px] font-ui-label text-apricot/95">
          <span className="text-peach font-semibold">{chapterNumber}</span>
          <span className="w-6 h-[1px] bg-oat/40" aria-hidden="true" />
          <span>{chapterLabel}</span>
        </div>

        {children}
      </div>
    </section>
  );
}
