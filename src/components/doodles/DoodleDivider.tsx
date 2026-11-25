'use client';

import React from 'react';
import { Doodle, type DoodleTone } from '@/components/doodles/Doodle';
import type { DoodleName } from '@/lib/doodles';

export type DoodleDividerVariant = 'flame' | 'leaf' | 'diamond' | 'dots' | 'vine' | 'wave';

const VARIANT_MAP: Record<DoodleDividerVariant, DoodleName> = {
  flame: 'divider-flame-center',
  leaf: 'divider-leaf-center',
  diamond: 'divider-diamond-center',
  dots: 'divider-three-dots',
  vine: 'divider-vine',
  wave: 'divider-wavy',
};

export interface DoodleDividerProps {
  variant?: DoodleDividerVariant;
  tone?: DoodleTone;
  size?: number | string;
  opacity?: number;
  className?: string;
}

/**
 * Full-width editorial section divider pairing a centered hand-drawn SVG motif
 * with subtle hairline rules on either side.
 */
export function DoodleDivider({
  variant = 'leaf',
  tone = 'apricot',
  size = 180,
  opacity = 0.78,
  className = '',
}: DoodleDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none w-full flex items-center justify-center gap-4 my-4 ${className}`}
    >
      <span className="h-[1px] flex-1 max-w-[140px] bg-white/15" />
      <Doodle
        name={VARIANT_MAP[variant]}
        tone={tone}
        size={size}
        opacity={opacity}
        inline
        className="shrink-0"
      />
      <span className="h-[1px] flex-1 max-w-[140px] bg-white/15" />
    </div>
  );
}
