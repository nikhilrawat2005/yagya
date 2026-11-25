'use client';

import React from 'react';
import { Doodle, type DoodleTone } from '@/components/doodles/Doodle';
import type { DoodleName } from '@/lib/doodles';

export type DoodleUnderlineVariant = 'wobbly' | 'curved' | 'tapered' | 'wave' | 'double';

const UNDERLINE_MAP: Record<DoodleUnderlineVariant, DoodleName> = {
  wobbly: 'underline-hand-wobbly',
  curved: 'underline-curved-smile',
  tapered: 'underline-tapered',
  wave: 'underline-slightly-wavy',
  double: 'underline-short-double-stroke',
};

export interface DoodleUnderlineProps {
  children: React.ReactNode;
  variant?: DoodleUnderlineVariant;
  tone?: DoodleTone;
  delay?: number;
  active?: boolean;
  className?: string;
}

/**
 * Wraps a headline word or active nav label and draws a hand-drawn underline
 * beneath it when it enters view.
 */
export function DoodleUnderline({
  children,
  variant = 'wobbly',
  tone = 'peach',
  delay = 0.15,
  active = true,
  className = '',
}: DoodleUnderlineProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span>{children}</span>
      {active && (
        <Doodle
          name={UNDERLINE_MAP[variant]}
          tone={tone}
          size="100%"
          delay={delay}
          opacity={0.92}
          className="absolute left-0 right-0 -bottom-2.5 h-3.5"
        />
      )}
    </span>
  );
}
