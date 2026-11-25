'use client';

import React from 'react';
import { Doodle, type DoodleTone } from '@/components/doodles/Doodle';

export type DoodleFrameVariant = 'flourish' | 'vine' | 'leaf' | 'arch';

export interface DoodleFrameProps {
  variant?: DoodleFrameVariant;
  tone?: DoodleTone;
  size?: number;
  opacity?: number;
  className?: string;
}

/**
 * Decorative corner flourish or botanical arch placed behind sheet text and above glass surfaces.
 */
export function DoodleFrame({
  variant = 'flourish',
  tone = 'apricot',
  size = 42,
  opacity = 0.55,
  className = '',
}: DoodleFrameProps) {
  if (variant === 'arch') {
    return (
      <div aria-hidden="true" className={`pointer-events-none select-none absolute inset-0 overflow-hidden z-0 flex items-center justify-center ${className}`}>
        <Doodle name="frame-arch-botanical" preset="botanical" tone={tone} size={size} opacity={opacity} inline />
      </div>
    );
  }

  if (variant === 'vine') {
    return (
      <div aria-hidden="true" className={`pointer-events-none select-none absolute inset-0 overflow-hidden z-0 ${className}`}>
        <Doodle name="corner-vine-01" tone={tone} size={size} opacity={opacity} className="absolute top-2 left-2" />
        <Doodle name="corner-vine-02" tone={tone} size={size} opacity={opacity} rotate={180} className="hidden sm:block absolute bottom-2 right-2" />
      </div>
    );
  }

  if (variant === 'leaf') {
    return (
      <div aria-hidden="true" className={`pointer-events-none select-none absolute inset-0 overflow-hidden z-0 ${className}`}>
        <Doodle name="corner-leaf-01" tone={tone} size={size} opacity={opacity} className="absolute top-2 right-2" />
        <Doodle name="corner-leaf-02" tone={tone} size={size} opacity={opacity} className="hidden sm:block absolute bottom-2 left-2" />
      </div>
    );
  }

  return (
    <div aria-hidden="true" className={`pointer-events-none select-none absolute inset-0 overflow-hidden z-0 ${className}`}>
      <Doodle name="corner-flourish-tl" tone={tone} size={size} opacity={opacity} className="absolute top-2 left-2" />
      <Doodle name="corner-flourish-tr" tone={tone} size={size} opacity={opacity} className="hidden sm:block absolute top-2 right-2" />
      <Doodle name="corner-flourish-bl" tone={tone} size={size} opacity={opacity} className="hidden md:block absolute bottom-2 left-2" />
      <Doodle name="corner-flourish-br" tone={tone} size={size} opacity={opacity} className="absolute bottom-2 right-2" />
    </div>
  );
}
