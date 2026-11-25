'use client';

import React from 'react';
import { DoodlePath } from './DoodlePath';

export interface DoodleLeafProps {
  variant?: 'sprig' | 'twin';
  delay?: number;
  className?: string;
}

export function DoodleLeaf({
  variant = 'sprig',
  delay = 0.2,
  className = '',
}: DoodleLeafProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 72 72"
      fill="none"
      className={`text-charcoal pointer-events-none select-none w-12 h-12 ${className}`}
    >
      {variant === 'sprig' ? (
        <>
          <DoodlePath
            d="M12 60 C 24 44, 40 28, 60 14"
            strokeWidth={2.2}
            delay={delay}
            duration={0.6}
          />
          <DoodlePath
            d="M28 43 C 16 38, 13 24, 24 18 C 33 22, 34 34, 28 43 Z"
            strokeWidth={2}
            delay={delay + 0.18}
            duration={0.45}
          />
          <DoodlePath
            d="M42 29 C 46 16, 59 12, 63 22 C 59 32, 49 34, 42 29 Z"
            strokeWidth={2}
            delay={delay + 0.3}
            duration={0.45}
          />
          <DoodlePath
            d="M38 38 C 51 39, 59 49, 51 57 C 42 56, 36 47, 38 38 Z"
            strokeWidth={2}
            delay={delay + 0.42}
            duration={0.45}
          />
        </>
      ) : (
        <>
          <DoodlePath
            d="M36 62 C 35 45, 36 28, 36 16"
            strokeWidth={2.2}
            delay={delay}
            duration={0.5}
          />
          <DoodlePath
            d="M36 40 C 20 36, 14 21, 24 13 C 34 18, 37 30, 36 40 Z"
            strokeWidth={2.1}
            delay={delay + 0.2}
            duration={0.45}
          />
          <DoodlePath
            d="M36 36 C 52 32, 59 18, 49 11 C 40 16, 36 27, 36 36 Z"
            strokeWidth={2.1}
            delay={delay + 0.32}
            duration={0.45}
          />
        </>
      )}
    </svg>
  );
}
