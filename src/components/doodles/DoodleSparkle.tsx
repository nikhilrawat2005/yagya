'use client';

import React from 'react';
import { DoodlePath } from './DoodlePath';

export interface DoodleSparkleProps {
  delay?: number;
  className?: string;
}

export function DoodleSparkle({ delay = 0.15, className = '' }: DoodleSparkleProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 40 40"
      fill="none"
      className={`text-charcoal pointer-events-none select-none w-8 h-8 ${className}`}
    >
      {/* Uneven 4-point marker star */}
      <DoodlePath
        d="M20 4 C 21.2 13.4, 24.1 17.6, 35 19.5 C 24.4 21.8, 21.6 25.1, 19.4 35.5 C 17.5 25.2, 14.3 21.6, 4.5 19.8 C 14.6 17.5, 18.2 13.8, 20 4 Z"
        strokeWidth={2.1}
        delay={delay}
        duration={0.75}
      />
      {/* Tiny corner accent mark */}
      <DoodlePath
        d="M32 7 L 33.5 9.5 M30 9.2 L 34.8 7.6"
        strokeWidth={1.7}
        delay={delay + 0.45}
        duration={0.3}
      />
    </svg>
  );
}
