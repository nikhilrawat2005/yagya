'use client';

import React from 'react';
import { DoodlePath } from './DoodlePath';

export interface DoodleUnderlineProps {
  variant?: 'single' | 'double';
  delay?: number;
  className?: string;
}

export function DoodleUnderline({
  variant = 'double',
  delay = 0.1,
  className = '',
}: DoodleUnderlineProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 220 18"
      fill="none"
      className={`text-charcoal pointer-events-none select-none w-full h-3.5 ${className}`}
      preserveAspectRatio="none"
    >
      <DoodlePath
        d="M4 7.5 C 52 3.8, 134 9.2, 216 5.4"
        strokeWidth={2.6}
        delay={delay}
        duration={0.65}
      />
      {variant === 'double' && (
        <DoodlePath
          d="M18 13.8 C 78 10.6, 148 14.5, 202 11.4"
          strokeWidth={1.9}
          delay={delay + 0.18}
          duration={0.55}
          opacity={0.78}
        />
      )}
    </svg>
  );
}
