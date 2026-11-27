'use client';

import React from 'react';
import { Doodle, type DoodleTone } from '@/components/doodles/Doodle';

export type DoodleUnderlineVariant = 'circle';

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
 * Wraps a highlighted headline word and draws a hand-sketched oval loop around it.
 */
export function DoodleUnderline({
  children,
  tone = 'flame',
  delay = 0.35,
  drawDuration = 1.5,
  priority = false,
  active = true,
  className = '',
}: DoodleUnderlineProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      {active && (
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
    </span>
  );
}
