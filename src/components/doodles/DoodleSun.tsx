'use client';

import React from 'react';
import { DoodlePath } from './DoodlePath';

export interface DoodleSunProps {
  delay?: number;
  className?: string;
}

export function DoodleSun({ delay = 0.15, className = '' }: DoodleSunProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 64"
      fill="none"
      className={`text-charcoal pointer-events-none select-none w-12 h-12 ${className}`}
    >
      <DoodlePath
        d="M32 20 C 40 20, 45 26, 44 33 C 43 40, 38 45, 31 44 C 24 43, 19 38, 20 31 C 21 24, 25 20, 32 20 Z"
        strokeWidth={2.2}
        delay={delay}
        duration={0.65}
      />
      <DoodlePath
        d="M32 8 L 32 14 M32 50 L 32 56 M8 32 L 14 32 M50 32 L 56 32 M15 15 L 20 20 M44 44 L 49 49 M49 15 L 44 20 M20 44 L 15 49"
        strokeWidth={2.1}
        delay={delay + 0.25}
        duration={0.55}
      />
    </svg>
  );
}
