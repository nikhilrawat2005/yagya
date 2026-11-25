'use client';

import React from 'react';
import { DoodlePath } from './DoodlePath';

export interface DoodleCategorySketchProps {
  slug: string;
  delay?: number;
  className?: string;
}

/**
 * Hand-drawn Charcoal marker-sketch illustrations for category emblems
 * (replaces generic jar fallback with distinctive farm botanical doodles).
 */
export function DoodleCategorySketch({
  slug,
  delay = 0.15,
  className = '',
}: DoodleCategorySketchProps) {
  if (slug === 'dried-fruits') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 120 120"
        fill="none"
        className={`text-charcoal pointer-events-none select-none w-full h-auto ${className}`}
      >
        {/* Whole Sun-Cured Fig / Apricot */}
        <DoodlePath
          d="M44 28 C 52 22, 64 25, 68 36 C 78 46, 80 68, 66 80 C 52 92, 30 88, 22 74 C 15 61, 24 44, 36 37 C 40 34, 41 30, 44 28 Z"
          strokeWidth={2.8}
          delay={delay}
          duration={0.8}
        />
        <DoodlePath
          d="M46 25 C 44 17, 50 12, 56 14"
          strokeWidth={2.4}
          delay={delay + 0.25}
          duration={0.35}
        />
        {/* Halved Orchard Fruit with Pit/Seeds */}
        <DoodlePath
          d="M72 52 C 88 48, 102 60, 101 77 C 100 94, 84 103, 69 98 C 58 94, 54 80, 62 66 C 65 59, 68 54, 72 52 Z"
          strokeWidth={2.6}
          delay={delay + 0.2}
          duration={0.7}
        />
        <DoodlePath
          d="M78 68 C 85 68, 88 75, 84 82 C 78 86, 72 80, 74 73 C 75 70, 76 68, 78 68 Z M38 56 C 36 62, 37 68, 41 72"
          strokeWidth={2}
          delay={delay + 0.45}
          duration={0.45}
          opacity={0.85}
        />
        <DoodlePath
          d="M92 28 L 94 34 L 100 36 L 94 38 L 92 44 L 90 38 L 84 36 L 90 34 Z"
          strokeWidth={1.8}
          delay={delay + 0.55}
          duration={0.3}
        />
      </svg>
    );
  }

  if (slug === 'nuts') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 120 120"
        fill="none"
        className={`text-charcoal pointer-events-none select-none w-full h-auto ${className}`}
      >
        {/* Almond Kernel */}
        <DoodlePath
          d="M46 20 C 66 28, 74 52, 64 74 C 54 90, 32 88, 24 72 C 16 54, 26 28, 46 20 Z"
          strokeWidth={2.8}
          delay={delay}
          duration={0.75}
        />
        <DoodlePath
          d="M45 31 C 42 46, 44 62, 48 75 M34 45 C 32 54, 34 64, 38 70 M55 44 C 57 54, 56 64, 53 71"
          strokeWidth={1.9}
          delay={delay + 0.25}
          duration={0.5}
          opacity={0.75}
        />
        {/* Companion Cashew / Walnut */}
        <DoodlePath
          d="M72 48 C 92 42, 106 56, 100 76 C 95 94, 74 102, 62 92 C 56 86, 62 74, 72 72 C 78 70, 74 58, 66 56 C 63 54, 66 50, 72 48 Z"
          strokeWidth={2.7}
          delay={delay + 0.2}
          duration={0.75}
        />
        <DoodlePath
          d="M84 62 C 88 70, 86 80, 77 86"
          strokeWidth={1.9}
          delay={delay + 0.45}
          duration={0.35}
          opacity={0.8}
        />
      </svg>
    );
  }

  // Default: Flavoured Makhana (popped Mithila lotus puffs + lotus leaf)
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 120"
      fill="none"
      className={`text-charcoal pointer-events-none select-none w-full h-auto ${className}`}
    >
      {/* Plump Popped Makhana Puff 1 */}
      <DoodlePath
        d="M44 30 C 59 27, 70 39, 68 54 C 66 68, 52 76, 37 73 C 23 70, 17 56, 22 43 C 27 33, 35 31, 44 30 Z"
        strokeWidth={2.8}
        delay={delay}
        duration={0.7}
      />
      <DoodlePath
        d="M36 44 C 42 40, 50 42, 52 49 C 48 53, 40 53, 36 44 Z M44 58 L 46 60"
        strokeWidth={2}
        delay={delay + 0.25}
        duration={0.4}
        opacity={0.8}
      />
      {/* Plump Popped Makhana Puff 2 */}
      <DoodlePath
        d="M76 48 C 90 45, 102 56, 100 71 C 98 86, 84 95, 70 91 C 57 88, 52 74, 58 61 C 62 52, 68 50, 76 48 Z"
        strokeWidth={2.7}
        delay={delay + 0.18}
        duration={0.7}
      />
      <DoodlePath
        d="M72 64 C 77 60, 84 62, 85 69 C 80 73, 73 71, 72 64 Z"
        strokeWidth={1.9}
        delay={delay + 0.4}
        duration={0.35}
        opacity={0.8}
      />
      {/* Spice Sparkles */}
      <DoodlePath
        d="M84 24 L 86 30 L 92 32 L 86 34 L 84 40 L 82 34 L 76 32 L 82 30 Z M32 88 C 34 84, 38 84, 40 88"
        strokeWidth={1.9}
        delay={delay + 0.5}
        duration={0.4}
      />
    </svg>
  );
}
