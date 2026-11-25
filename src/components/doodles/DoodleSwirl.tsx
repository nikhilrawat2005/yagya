'use client';

import React from 'react';
import { DoodlePath } from './DoodlePath';

export interface DoodleSwirlProps {
  variant?: 'loop' | 'wave';
  delay?: number;
  className?: string;
}

export function DoodleSwirl({
  variant = 'loop',
  delay = 0.2,
  className = '',
}: DoodleSwirlProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 96 48"
      fill="none"
      className={`text-charcoal pointer-events-none select-none w-16 h-9 ${className}`}
    >
      {variant === 'loop' ? (
        <DoodlePath
          d="M6 34 C 24 34, 34 10, 48 10 C 60 10, 62 28, 49 30 C 37 32, 36 16, 52 14 C 66 12, 76 26, 90 22"
          strokeWidth={2.2}
          delay={delay}
          duration={0.75}
        />
      ) : (
        <DoodlePath
          d="M6 26 C 18 10, 28 38, 42 22 C 54 8, 66 36, 78 20 C 83 14, 88 18, 91 22"
          strokeWidth={2.2}
          delay={delay}
          duration={0.7}
        />
      )}
    </svg>
  );
}
