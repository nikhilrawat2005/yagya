'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useInteractiveCapabilities } from '@/lib/motion/useInteractiveCapabilities';

export type DoodleName =
  | 'flame'
  | 'diya'
  | 'leaf'
  | 'seeds'
  | 'berries'
  | 'star'
  | 'swirl'
  | 'arrow'
  | 'underline';

export type DoodleTone = 'oat' | 'apricot' | 'peach' | 'flame';

export interface DoodleSVGProps {
  name: DoodleName;
  tone?: DoodleTone;
  delay?: number;
  direction?: 'right' | 'down-left' | 'down-right';
  visibility?: 'all' | 'tablet-up' | 'desktop-only';
  className?: string;
}

const TONE_COLOR: Record<DoodleTone, string> = {
  oat: 'text-oat',
  apricot: 'text-apricot',
  peach: 'text-peach',
  flame: 'text-flame',
};

const VISIBILITY_CLASS = {
  all: '',
  'tablet-up': 'hidden md:block',
  'desktop-only': 'hidden lg:block',
} as const;

function AnimatedStroke({
  d,
  strokeWidth = 1.65,
  delay = 0,
  duration = 0.85,
  opacity = 0.85,
}: {
  d: string;
  strokeWidth?: number;
  delay?: number;
  duration?: number;
  opacity?: number;
}) {
  const { prefersReducedMotion, simplifyMotion } = useInteractiveCapabilities();

  const resolvedDuration = prefersReducedMotion ? 0.01 : simplifyMotion ? duration * 0.45 : duration;
  const resolvedDelay = prefersReducedMotion ? 0 : simplifyMotion ? delay * 0.4 : delay;

  return (
    <motion.path
      d={d}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={opacity}
      initial={
        prefersReducedMotion
          ? { pathLength: 1, opacity }
          : { pathLength: 0, opacity: 0 }
      }
      whileInView={{ pathLength: 1, opacity }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        pathLength: {
          duration: resolvedDuration,
          delay: resolvedDelay,
          ease: [0.22, 1, 0.36, 1],
        },
        opacity: { duration: 0.16, delay: resolvedDelay },
      }}
    />
  );
}

/**
 * Hand-drawn Oat/Apricot/Flame editorial line-art doodles animated with
 * scroll-triggered SVG stroke drawing and responsive visibility controls.
 */
export function DoodleSVG({
  name,
  tone = 'apricot',
  delay = 0.15,
  direction = 'right',
  visibility = 'all',
  className = '',
}: DoodleSVGProps) {
  const colorClass = `${TONE_COLOR[tone]} ${VISIBILITY_CLASS[visibility]}`;

  switch (name) {
    case 'flame':
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 64 76"
          fill="none"
          className={`${colorClass} pointer-events-none select-none ${className}`}
        >
          <AnimatedStroke
            d="M32 6 C 42 20, 52 33, 50 48 C 49 60, 41 68, 31 68 C 20 68, 13 59, 14 47 C 15 35, 22 25, 26 19 C 28 24, 31 26, 32 6 Z"
            strokeWidth={1.75}
            delay={delay}
            duration={0.9}
          />
          <AnimatedStroke
            d="M32 31 C 37 39, 40 46, 38 54 C 36 59, 32 61, 29 59 C 24 56, 24 47, 29 38"
            strokeWidth={1.55}
            delay={delay + 0.25}
            duration={0.65}
            opacity={0.78}
          />
        </svg>
      );

    case 'diya':
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 88 76"
          fill="none"
          className={`${colorClass} pointer-events-none select-none ${className}`}
        >
          {/* Flame above Diya */}
          <AnimatedStroke
            d="M44 10 C 49 18, 53 25, 51 32 C 49 38, 40 38, 38 32 C 36 25, 40 18, 44 10 Z"
            strokeWidth={1.75}
            delay={delay}
            duration={0.65}
          />
          {/* Earthen Bowl */}
          <AnimatedStroke
            d="M16 42 C 26 45, 62 45, 72 42 C 69 57, 57 64, 44 64 C 31 64, 19 57, 16 42 Z"
            strokeWidth={1.75}
            delay={delay + 0.18}
            duration={0.75}
          />
          {/* Subtle Radiant Rays */}
          <AnimatedStroke
            d="M27 22 L 22 18 M61 22 L 66 18 M44 4 L 44 7"
            strokeWidth={1.5}
            delay={delay + 0.42}
            duration={0.45}
            opacity={0.75}
          />
        </svg>
      );

    case 'leaf':
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 76 72"
          fill="none"
          className={`${colorClass} pointer-events-none select-none ${className}`}
        >
          <AnimatedStroke
            d="M12 60 C 26 44, 42 28, 63 14"
            strokeWidth={1.7}
            delay={delay}
            duration={0.65}
          />
          <AnimatedStroke
            d="M29 42 C 17 37, 14 23, 25 17 C 34 22, 35 33, 29 42 Z"
            strokeWidth={1.6}
            delay={delay + 0.18}
            duration={0.55}
          />
          <AnimatedStroke
            d="M43 29 C 47 16, 60 12, 64 22 C 60 31, 50 33, 43 29 Z"
            strokeWidth={1.6}
            delay={delay + 0.32}
            duration={0.55}
          />
          <AnimatedStroke
            d="M39 38 C 52 39, 60 49, 52 56 C 43 55, 37 47, 39 38 Z"
            strokeWidth={1.55}
            delay={delay + 0.45}
            duration={0.5}
          />
        </svg>
      );

    case 'seeds':
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 80 56"
          fill="none"
          className={`${colorClass} pointer-events-none select-none ${className}`}
        >
          <AnimatedStroke
            d="M10 38 C 12 20, 29 10, 48 12 C 45 30, 31 44, 10 38 Z"
            strokeWidth={1.7}
            delay={delay}
            duration={0.7}
          />
          <AnimatedStroke
            d="M16 34 C 25 26, 35 19, 43 15"
            strokeWidth={1.4}
            delay={delay + 0.25}
            duration={0.45}
            opacity={0.72}
          />
          <AnimatedStroke
            d="M44 43 C 47 34, 57 30, 68 34 C 63 44, 52 48, 44 43 Z"
            strokeWidth={1.6}
            delay={delay + 0.35}
            duration={0.55}
          />
        </svg>
      );

    case 'berries':
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 72 68"
          fill="none"
          className={`${colorClass} pointer-events-none select-none ${className}`}
        >
          <AnimatedStroke
            d="M34 20 C 46 19, 54 28, 52 40 C 50 51, 41 57, 32 56 C 21 55, 14 47, 15 36 C 16 25, 24 20, 34 20 Z"
            strokeWidth={1.7}
            delay={delay}
            duration={0.75}
          />
          <AnimatedStroke
            d="M27 19 C 29 13, 33 10, 35 8 C 37 11, 39 15, 42 19 M23 21 L 34 17 L 45 21"
            strokeWidth={1.55}
            delay={delay + 0.28}
            duration={0.5}
          />
          <AnimatedStroke
            d="M52 38 C 58 37, 63 42, 62 49 C 60 55, 53 58, 48 55"
            strokeWidth={1.5}
            delay={delay + 0.42}
            duration={0.45}
            opacity={0.8}
          />
        </svg>
      );

    case 'star':
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 48 48"
          fill="none"
          className={`${colorClass} pointer-events-none select-none ${className}`}
        >
          <AnimatedStroke
            d="M24 5 C 25 16, 28 21, 41 23 C 28 25, 25 30, 23 42 C 21 30, 17 25, 6 23 C 17 21, 21 16, 24 5 Z"
            strokeWidth={1.65}
            delay={delay}
            duration={0.65}
          />
          <AnimatedStroke
            d="M37 8 L 39 12 M35 10 L 41 9"
            strokeWidth={1.5}
            delay={delay + 0.35}
            duration={0.35}
          />
        </svg>
      );

    case 'swirl':
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 112 52"
          fill="none"
          className={`${colorClass} pointer-events-none select-none ${className}`}
        >
          <AnimatedStroke
            d="M6 38 C 28 38, 38 11, 56 11 C 70 11, 71 31, 56 33 C 42 35, 42 17, 60 15 C 76 13, 88 28, 106 23"
            strokeWidth={1.65}
            delay={delay}
            duration={0.85}
          />
        </svg>
      );

    case 'arrow': {
      const paths =
        direction === 'down-left'
          ? {
              shaft: 'M52 7 C 33 10, 21 20, 14 40',
              head: 'M9 30 L 13 42 L 24 35',
            }
          : direction === 'down-right'
          ? {
              shaft: 'M8 7 C 26 9, 38 19, 45 40',
              head: 'M35 34 L 46 42 L 50 30',
            }
          : {
              shaft: 'M5 24 C 22 18, 36 25, 51 21',
              head: 'M42 14 L 52 21 L 42 29',
            };

      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 60 48"
          fill="none"
          className={`${colorClass} pointer-events-none select-none ${className}`}
        >
          <AnimatedStroke d={paths.shaft} strokeWidth={1.75} delay={delay} duration={0.65} />
          <AnimatedStroke d={paths.head} strokeWidth={1.75} delay={delay + 0.4} duration={0.35} />
        </svg>
      );
    }

    case 'underline':
    default:
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 220 18"
          fill="none"
          preserveAspectRatio="none"
          className={`${colorClass} pointer-events-none select-none ${className}`}
        >
          <AnimatedStroke
            d="M4 8 C 58 4, 142 10, 216 5.5"
            strokeWidth={2}
            delay={delay}
            duration={0.65}
          />
          <AnimatedStroke
            d="M22 14 C 84 11, 148 14.5, 198 11.5"
            strokeWidth={1.45}
            delay={delay + 0.16}
            duration={0.55}
            opacity={0.72}
          />
        </svg>
      );
  }
}
