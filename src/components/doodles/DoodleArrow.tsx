'use client';

import React from 'react';
import { DoodlePath } from './DoodlePath';

export interface DoodleArrowProps {
  direction?: 'down-right' | 'down-left' | 'right';
  delay?: number;
  className?: string;
}

const ARROW_PATHS: Record<NonNullable<DoodleArrowProps['direction']>, { shaft: string; head: string }> = {
  'down-right': {
    shaft: 'M7 6 C 24 8, 36 18, 43 38',
    head: 'M33 33 L 43.5 39.5 L 47 28',
  },
  'down-left': {
    shaft: 'M48 6 C 30 9, 19 19, 12 38',
    head: 'M8 28 L 11.5 39.5 L 22 33',
  },
  right: {
    shaft: 'M5 24 C 21 18, 34 25, 48 21',
    head: 'M40 14 L 49 21 L 40 29',
  },
};

export function DoodleArrow({
  direction = 'down-right',
  delay = 0.2,
  className = '',
}: DoodleArrowProps) {
  const { shaft, head } = ARROW_PATHS[direction];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 56 46"
      fill="none"
      className={`text-charcoal pointer-events-none select-none w-12 h-10 ${className}`}
    >
      <DoodlePath d={shaft} strokeWidth={2.3} delay={delay} duration={0.6} />
      <DoodlePath d={head} strokeWidth={2.3} delay={delay + 0.45} duration={0.35} />
    </svg>
  );
}
