'use client';

import React from 'react';
import { Doodle, type DoodleTone } from '@/components/doodles/Doodle';
import type { DoodleName } from '@/lib/doodles';

export type DoodleUnderlineVariant = 'wobbly' | 'curved' | 'tapered' | 'wave' | 'double' | 'circle' | 'swoosh';

const UNDERLINE_MAP: Record<DoodleUnderlineVariant, DoodleName> = {
  wobbly: 'underline-hand-wobbly',
  curved: 'underline-curved-smile',
  tapered: 'underline-tapered',
  wave: 'underline-slightly-wavy',
  double: 'underline-double-sketch',
  circle: 'highlight-oval-loop',
  swoosh: 'underline-organic-swoosh',
};

export interface DoodleUnderlineProps {
  children: React.ReactNode;
  variant?: DoodleUnderlineVariant;
  tone?: DoodleTone;
  delay?: number;
  drawDuration?: number;
  priority?: boolean;
  active?: boolean;
  className?: string;
}

/**
 * Wraps a highlighted headline word or active nav label and slowly draws either a
 * hand-drawn doodle underline, double-line stroke, or oval circle around it.
 */
export function DoodleUnderline({
  children,
  variant = 'double',
  tone = 'peach',
  delay = 0.35,
  drawDuration = 1.9,
  priority = false,
  active = true,
  className = '',
}: DoodleUnderlineProps) {
  const isCircle = variant === 'circle';
  const isDouble = variant === 'double';

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      {active && isCircle && (
        <Doodle
          name="highlight-oval-loop"
          preset={priority ? 'hero' : 'accent'}
          tone={tone}
          size="144%"
          delay={delay}
          drawDuration={drawDuration}
          priority={priority}
          float={false}
          opacity={0.94}
          preserveAspectRatio="none"
          className="pointer-events-none absolute -left-[22%] -right-[22%] -top-[38%] -bottom-[38%] h-[176%] z-20"
        />
      )}
      {active && !isCircle && (
        <Doodle
          name={UNDERLINE_MAP[variant]}
          preset={priority ? 'hero' : 'accent'}
          tone={tone}
          size="108%"
          delay={delay}
          drawDuration={drawDuration}
          priority={priority}
          float={false}
          opacity={0.94}
          preserveAspectRatio={isDouble ? 'none' : undefined}
          className={`pointer-events-none absolute -left-[4%] -right-[4%] z-20 ${
            isDouble ? '-bottom-3.5 h-5' : '-bottom-2.5 h-3.5'
          }`}
        />
      )}
    </span>
  );
}
