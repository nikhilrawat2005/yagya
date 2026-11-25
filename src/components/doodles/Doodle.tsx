'use client';

import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import { DOODLES, type DoodleName } from '@/lib/doodles';
import { loadDoodleSvg, type ParsedDoodleSvg } from '@/components/doodles/svgLoader';

export type DoodleTone = 'oat' | 'apricot' | 'peach' | 'flame' | 'ink';
export type DoodleShowOn = 'all' | 'sm+' | 'md+' | 'lg+';

export const DOODLE_TONE_HEX: Record<DoodleTone, string> = {
  oat: '#F6EFE2',
  apricot: '#FDE6C8',
  peach: '#FBC98A',
  flame: '#DF7F25',
  ink: '#1A1410',
};

export interface DoodleProps {
  name: DoodleName;
  tone?: DoodleTone;
  size?: number | string;
  draw?: boolean;
  drawKey?: number;
  float?: boolean;
  parallax?: boolean;
  hover?: boolean;
  rotate?: number;
  opacity?: number;
  delay?: number;
  priority?: boolean;
  showOn?: DoodleShowOn;
  hideOnMobile?: boolean;
  inline?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const SHOW_ON_CLASSES: Record<DoodleShowOn, string> = {
  all: '',
  'sm+': 'hidden sm:block',
  'md+': 'hidden md:block',
  'lg+': 'hidden lg:block',
};

function subscribeResize(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('resize', callback, { passive: true });
  return () => window.removeEventListener('resize', callback);
}

const SERVER_ENV = { isLowPower: false, isMobile: false, canHover: false };
let cachedClientEnv: typeof SERVER_ENV | null = null;

function getClientEnvSnapshot() {
  if (typeof window === 'undefined') return SERVER_ENV;
  const isLowPower =
    typeof navigator !== 'undefined' &&
    typeof navigator.hardwareConcurrency === 'number' &&
    navigator.hardwareConcurrency <= 2;
  const isMobile = window.innerWidth < 640;
  const canHover = window.matchMedia('(hover: hover)').matches;
  if (
    cachedClientEnv &&
    cachedClientEnv.isLowPower === isLowPower &&
    cachedClientEnv.isMobile === isMobile &&
    cachedClientEnv.canHover === canHover
  ) {
    return cachedClientEnv;
  }
  cachedClientEnv = { isLowPower, isMobile, canHover };
  return cachedClientEnv;
}

function useMotionEnvironment() {
  const prefersReducedMotion = useReducedMotion();
  const env = useSyncExternalStore(
    subscribeResize,
    getClientEnvSnapshot,
    () => SERVER_ENV
  );

  return {
    prefersReducedMotion: Boolean(prefersReducedMotion),
    ...env,
  };
}

/**
 * Hand-drawn SVG doodle loaded inline from /public/assets/doodles via the typed registry.
 * Uses currentColor + vector-effect="non-scaling-stroke" for uniform 1.5-2px line weight,
 * draws on scroll once when 30% in view, and supports optional hero float & desktop parallax.
 */
export function Doodle({
  name,
  tone = 'oat',
  size,
  draw = true,
  drawKey = 0,
  float = false,
  parallax = false,
  hover = false,
  rotate = 0,
  opacity = 0.9,
  delay = 0,
  priority = false,
  showOn = 'all',
  hideOnMobile = false,
  inline = false,
  className = '',
  style,
}: DoodleProps) {
  const meta = DOODLES[name];
  const containerRef = useRef<HTMLDivElement>(null);
  const { prefersReducedMotion, isLowPower, isMobile, canHover } = useMotionEnvironment();
  const [svgData, setSvgData] = useState<ParsedDoodleSvg | null>(null);

  const nearViewport = useInView(containerRef, {
    once: true,
    margin: '280px 0px',
  });

  const inDrawView = useInView(containerRef, {
    once: true,
    amount: 0.15,
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-18, 18]);

  useEffect(() => {
    if (!priority && !nearViewport) return;
    let active = true;
    loadDoodleSvg(name).then((parsed) => {
      if (active) setSvgData(parsed);
    });
    return () => {
      active = false;
    };
  }, [name, priority, nearViewport]);

  const effectiveShowOn: DoodleShowOn = hideOnMobile && showOn === 'all' ? 'md+' : showOn;
  const resolvedSize = size ?? meta.defaultSize;
  const isWide = meta.viewBox.startsWith('0 0 400');

  const sizeStyle: React.CSSProperties =
    typeof resolvedSize === 'number'
      ? {
          width: `${resolvedSize}px`,
          height: isWide ? `${Math.round(resolvedSize / 4)}px` : `${resolvedSize}px`,
        }
      : {
          width: resolvedSize,
          aspectRatio: isWide ? '4 / 1' : '1 / 1',
        };

  const drawDuration = isMobile || isLowPower ? 0.8 : 1.15;
  const shouldDraw = draw && !prefersReducedMotion;
  const shouldFloat = float && !prefersReducedMotion && !isLowPower;
  const shouldParallax = parallax && !prefersReducedMotion && !isMobile;
  const shouldHover = hover && canHover && !prefersReducedMotion;
  const visible = priority || inDrawView;

  const isPositioned = inline || /\b(absolute|fixed|sticky|relative)\b/.test(className);
  const posClass = isPositioned ? '' : 'relative';

  return (
    <motion.div
      ref={containerRef}
      aria-hidden="true"
      className={`${shouldHover ? 'pointer-events-auto' : 'pointer-events-none'} select-none ${posClass} ${SHOW_ON_CLASSES[effectiveShowOn]} ${className}`}
      style={{
        color: DOODLE_TONE_HEX[tone],
        opacity,
        ...sizeStyle,
        ...style,
        ...(shouldParallax ? { y: parallaxY } : undefined),
      }}
      initial={{ rotate }}
      whileHover={shouldHover ? { rotate: rotate + 8, scale: 1.12 } : undefined}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="w-full h-full"
        animate={shouldFloat ? { y: [-6, 6, -6], rotate: [-2.5, 2.5, -2.5] } : undefined}
        transition={
          shouldFloat
            ? { duration: 4.8, repeat: Infinity, ease: 'easeInOut' }
            : undefined
        }
      >
        {svgData && svgData.primitives.length > 0 && (
          <svg
            key={`${name}-${drawKey}`}
            viewBox={svgData.viewBox}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-full h-full overflow-visible"
          >
            {svgData.primitives.map((prim, idx) => {
              const pathDelay = delay + Math.min(idx * 0.04, 0.28);
              if (prim.tag === 'path') {
                return (
                  <motion.path
                    key={idx}
                    d={prim.attrs.d}
                    vectorEffect="non-scaling-stroke"
                    initial={shouldDraw ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
                    animate={
                      visible
                        ? { pathLength: 1, opacity: 1 }
                        : shouldDraw
                        ? { pathLength: 0, opacity: 0 }
                        : { pathLength: 1, opacity: 1 }
                    }
                    transition={
                      shouldDraw
                        ? {
                            pathLength: { duration: drawDuration, delay: pathDelay, ease: 'easeOut' },
                            opacity: { duration: 0.2, delay: pathDelay },
                          }
                        : { duration: 0 }
                    }
                  />
                );
              }
              if (prim.tag === 'circle') {
                return (
                  <motion.circle
                    key={idx}
                    cx={prim.attrs.cx}
                    cy={prim.attrs.cy}
                    r={prim.attrs.r}
                    vectorEffect="non-scaling-stroke"
                    initial={shouldDraw ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
                    animate={visible ? { pathLength: 1, opacity: 1 } : undefined}
                    transition={
                      shouldDraw
                        ? { pathLength: { duration: drawDuration, delay: pathDelay, ease: 'easeOut' }, opacity: { duration: 0.2, delay: pathDelay } }
                        : { duration: 0 }
                    }
                  />
                );
              }
              if (prim.tag === 'line') {
                return (
                  <motion.line
                    key={idx}
                    x1={prim.attrs.x1}
                    y1={prim.attrs.y1}
                    x2={prim.attrs.x2}
                    y2={prim.attrs.y2}
                    vectorEffect="non-scaling-stroke"
                    initial={shouldDraw ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
                    animate={visible ? { pathLength: 1, opacity: 1 } : undefined}
                    transition={
                      shouldDraw
                        ? { pathLength: { duration: drawDuration, delay: pathDelay, ease: 'easeOut' }, opacity: { duration: 0.2, delay: pathDelay } }
                        : { duration: 0 }
                    }
                  />
                );
              }
              if (prim.tag === 'ellipse') {
                return (
                  <ellipse
                    key={idx}
                    cx={prim.attrs.cx}
                    cy={prim.attrs.cy}
                    rx={prim.attrs.rx}
                    ry={prim.attrs.ry}
                    vectorEffect="non-scaling-stroke"
                  />
                );
              }
              return null;
            })}
          </svg>
        )}
      </motion.div>
    </motion.div>
  );
}
