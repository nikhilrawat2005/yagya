'use client';

import React from 'react';
import { DoodlePath } from './DoodlePath';

export interface DoodleSeedProps {
  delay?: number;
  className?: string;
}

export function DoodleSeed({ delay = 0.15, className = '' }: DoodleSeedProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 48"
      fill="none"
      className={`text-charcoal pointer-events-none select-none w-14 h-11 ${className}`}
    >
      {/* Teardrop flax / pumpkin seed outline */}
      <DoodlePath
        d="M10 34 C 12 16, 29 7, 50 9 C 48 27, 33 41, 10 34 Z"
        strokeWidth={2.2}
        delay={delay}
        duration={0.75}
      />
      {/* Center botanical rib */}
      <DoodlePath
        d="M15 31 C 25 23, 35 16, 45 12"
        strokeWidth={1.6}
        delay={delay + 0.35}
        duration={0.4}
        opacity={0.75}
      />
      {/* Small companion seed */}
      <DoodlePath
        d="M38 38 C 40 31, 49 28, 57 32 C 53 40, 44 43, 38 38 Z"
        strokeWidth={1.9}
        delay={delay + 0.45}
        duration={0.5}
      />
    </svg>
  );
}
