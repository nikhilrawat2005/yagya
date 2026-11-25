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

export type DoodleTone = 'oat' | 'flame' | 'apricot' | 'peach' | 'navy' | 'ink';
export type DoodlePreset = 'hero' | 'accent' | 'connector' | 'botanical';
export type DoodleShowOn = 'all' | 'sm+' | 'md+' | 'lg+';

export const DOODLE_TONE_HEX: Record<DoodleTone, string> = {
  oat: '#F6EFE2',
  flame: '#DF7F25',
  apricot: '#FDE6C8',
  peach: '#FBC98A',
  navy: '#141C2B',
  ink: '#1A1410',
};

interface PresetConfig {
  mountPriority: boolean;
  inViewAmount: number;
  duration: number;
  stagger: number;
  ease: [number, number, number, number] | 'easeInOut';
  float: boolean;
  floatY: [number, number, number];
  floatRotate: [number, number, number];
  floatDuration: number;
  hoverScale: number;
  hoverRotateOffset: number;
}

const DOODLE_PRESETS: Record<DoodlePreset, PresetConfig> = {
  hero: {
    mountPriority: true,
    inViewAmount: 0.15,
    duration: 1.6,
    stagger: 0.14,
    ease: [0.22, 1, 0.36, 1],
    float: true,
    floatY: [-3, 3, -3],
    floatRotate: [-1.5, 1.5, -1.5],
    floatDuration: 5,
    hoverScale: 1.05,
    hoverRotateOffset: 3,
  },
  accent: {
    mountPriority: false,
    inViewAmount: 0.4,
    duration: 1.0,
    stagger: 0.12,
    ease: [0.22, 1, 0.36, 1],
    float: false,
    floatY: [0, 0, 0],
    floatRotate: [0, 0, 0],
    floatDuration: 0,
    hoverScale: 1,
    hoverRotateOffset: 0,
  },
  connector: {
    mountPriority: false,
    inViewAmount: 0.3,
    duration: 1.2,
    stagger: 0.18,
    ease: 'easeInOut',
    float: false,
    floatY: [0, 0, 0],
    floatRotate: [0, 0, 0],
    floatDuration: 0,
    hoverScale: 1,
    hoverRotateOffset: 0,
  },
  botanical: {
    mountPriority: false,
    inViewAmount: 0.25,
    duration: 2.2,
    stagger: 0.16,
    ease: [0.22, 1, 0.36, 1],
    float: true,
    floatY: [-4, 4, -4],
    floatRotate: [-1.5, 1.5, -1.5],
    floatDuration: 5.4,
    hoverScale: 1.06,
    hoverRotateOffset: 4,
  },
};

export interface DoodleProps {
  name: DoodleName;
  preset?: DoodlePreset;
  tone?: DoodleTone;
  size?: number | string;
  draw?: boolean;
  drawDuration?: number;
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
  preserveAspectRatio?: string;
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
 * Uses currentColor + stroke-linecap="round" + preset choreography (hero, accent,
 * connector, botanical) and honors prefers-reduced-motion.
 */
export function Doodle({
  name,
  preset = 'botanical',
  tone = 'oat',
  size,
  draw = true,
  drawDuration,
  drawKey = 0,
  float,
  parallax = false,
  hover = false,
  rotate = 0,
  opacity = 0.92,
  delay = 0,
  priority,
  showOn = 'all',
  hideOnMobile = false,
  inline = false,
  preserveAspectRatio,
  className = '',
  style,
}: DoodleProps) {
  const meta = DOODLES[name];
  const cfg = DOODLE_PRESETS[preset];
  const resolvedPriority = priority ?? cfg.mountPriority;
  const containerRef = useRef<HTMLDivElement>(null);
  const { prefersReducedMotion, isLowPower, isMobile, canHover } = useMotionEnvironment();
  const [svgData, setSvgData] = useState<ParsedDoodleSvg | null>(null);
  const [priorityReady, setPriorityReady] = useState(false);

  const nearViewport = useInView(containerRef, {
    once: true,
    margin: '320px 0px',
  });

  const inDrawView = useInView(containerRef, {
    once: true,
    amount: cfg.inViewAmount,
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-14, 14]);

  useEffect(() => {
    if (!resolvedPriority && !nearViewport) return;
    let active = true;
    loadDoodleSvg(name).then((parsed) => {
      if (active) setSvgData(parsed);
    });
    return () => {
      active = false;
    };
  }, [name, resolvedPriority, nearViewport]);

  useEffect(() => {
    if (!resolvedPriority || !svgData) return;
    const timer = window.setTimeout(() => {
      setPriorityReady(true);
    }, 140);
    return () => window.clearTimeout(timer);
  }, [resolvedPriority, svgData, drawKey]);

  const effectiveShowOn: DoodleShowOn = hideOnMobile && showOn === 'all' ? 'md+' : showOn;
  const resolvedSize = size ?? meta.defaultSize;
  const [, , vbW = 200, vbH = 200] = meta.viewBox.split(/\s+/).map(Number);
  const aspectHeightRatio = vbW > 0 ? vbH / vbW : 1;

  const sizeStyle: React.CSSProperties =
    typeof resolvedSize === 'number'
      ? {
          width: `${resolvedSize}px`,
          height: `${Math.round(resolvedSize * aspectHeightRatio)}px`,
        }
      : {
          width: resolvedSize,
          ...(preserveAspectRatio === 'none'
            ? {}
            : { aspectRatio: `${vbW} / ${vbH}` }),
        };

  const resolvedDuration = drawDuration ?? (isMobile || isLowPower ? Math.max(0.8, cfg.duration * 0.85) : cfg.duration);
  const shouldDraw = draw && !prefersReducedMotion;
  const shouldFloat = (float ?? cfg.float) && !prefersReducedMotion && !isLowPower;
  const shouldParallax = parallax && !prefersReducedMotion && !isMobile;
  const shouldHover = hover && canHover && !prefersReducedMotion;
  const visible =
    prefersReducedMotion ||
    !shouldDraw ||
    (resolvedPriority ? priorityReady || inDrawView : inDrawView);

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
        willChange: 'stroke-dashoffset, transform',
        ...sizeStyle,
        ...style,
        ...(shouldParallax ? { y: parallaxY } : undefined),
      }}
      initial={{ rotate }}
      whileHover={
        shouldHover
          ? { scale: cfg.hoverScale, rotate: rotate + cfg.hoverRotateOffset }
          : undefined
      }
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="w-full h-full"
        animate={shouldFloat ? { y: cfg.floatY, rotate: cfg.floatRotate } : undefined}
        transition={
          shouldFloat
            ? { duration: cfg.floatDuration, repeat: Infinity, ease: 'easeInOut' }
            : undefined
        }
      >
        {svgData && svgData.primitives.length > 0 && (
          <svg
            key={`${name}-${drawKey}`}
            viewBox={svgData.viewBox}
            preserveAspectRatio={preserveAspectRatio ?? 'xMidYMid meet'}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ willChange: 'stroke-dashoffset, transform' }}
            className="w-full h-full overflow-visible"
          >
            {svgData.primitives.map((prim, idx) => {
              const pathDelay = delay + Math.min(idx * cfg.stagger, 1.4);
              const primTransition = shouldDraw
                ? {
                    pathLength: { duration: resolvedDuration, delay: pathDelay, ease: cfg.ease },
                    opacity: { duration: 0.2, delay: pathDelay },
                  }
                : { duration: 0 };

              if (prim.tag === 'path') {
                return (
                  <motion.path
                    key={idx}
                    d={prim.attrs.d}
                    vectorEffect="non-scaling-stroke"
                    initial={shouldDraw ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
                    animate={visible ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                    transition={primTransition}
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
                    animate={visible ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                    transition={primTransition}
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
                    animate={visible ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                    transition={primTransition}
                  />
                );
              }
              if (prim.tag === 'ellipse') {
                return (
                  <motion.ellipse
                    key={idx}
                    cx={prim.attrs.cx}
                    cy={prim.attrs.cy}
                    rx={prim.attrs.rx}
                    ry={prim.attrs.ry}
                    vectorEffect="non-scaling-stroke"
                    initial={
                      shouldDraw
                        ? { pathLength: 0, opacity: 0, scale: 0.9 }
                        : { pathLength: 1, opacity: 1, scale: 1 }
                    }
                    animate={
                      visible
                        ? { pathLength: 1, opacity: 1, scale: 1 }
                        : { pathLength: 0, opacity: 0, scale: 0.9 }
                    }
                    transition={
                      shouldDraw
                        ? {
                            pathLength: { duration: resolvedDuration * 0.85, delay: pathDelay, ease: cfg.ease },
                            opacity: { duration: 0.2, delay: pathDelay },
                            scale: { duration: resolvedDuration * 0.85, delay: pathDelay, ease: cfg.ease },
                          }
                        : { duration: 0 }
                    }
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
