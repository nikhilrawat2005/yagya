'use client';

import React from 'react';
import { DoodlePath } from './DoodlePath';

export interface DoodleBerryProps {
  delay?: number;
  className?: string;
}

export function DoodleBerry({ delay = 0.15, className = '' }: DoodleBerryProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 60 60"
      fill="none"
      className={`text-charcoal pointer-events-none select-none w-12 h-12 ${className}`}
    >
      {/* Plump slightly uneven berry contour */}
      <DoodlePath
        d="M30 16 C 43 15.5, 51 24.5, 49.5 36.5 C 48 47.5, 38.5 53.5, 29.5 53 C 19 52.5, 11 45, 12 34 C 13 23, 20 16.5, 30 16 Z"
        strokeWidth={2.2}
        delay={delay}
        duration={0.8}
      />
      {/* Hand-drawn leafy calyx / stem crown */}
      <DoodlePath
        d="M23 15 C 25 10, 29 7, 30 6 C 32 9, 34 12, 37 15 M20 17 L 30 14 L 40 17"
        strokeWidth={1.9}
        delay={delay + 0.35}
        duration={0.45}
      />
      {/* Marker shine highlight & seed dots */}
      <DoodlePath
        d="M20 27 C 19 31, 19.5 34, 21 37 M37 33 L 38 33.5 M33 41 L 34 41.5"
        strokeWidth={1.8}
        delay={delay + 0.55}
        duration={0.35}
        opacity={0.75}
      />
    </svg>
  );
}
