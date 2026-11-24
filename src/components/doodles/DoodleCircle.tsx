'use client';

import React from 'react';
import { DoodlePath } from './DoodlePath';

export interface DoodleCircleProps {
  delay?: number;
  className?: string;
}

export function DoodleCircle({ delay = 0.15, className = '' }: DoodleCircleProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 180 72"
      fill="none"
      className={`text-charcoal pointer-events-none select-none ${className}`}
      preserveAspectRatio="none"
    >
      <DoodlePath
        d="M22 39 C 14 19, 48 8, 94 7 C 144 6, 173 19, 169 40 C 165 60, 126 67, 79 65 C 29 63, 7 50, 14 31 C 19 18, 63 10, 121 11"
        strokeWidth={2.4}
        delay={delay}
        duration={0.9}
      />
    </svg>
  );
}
