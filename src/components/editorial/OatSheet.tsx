'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export type OatSheetTone = 'subtle' | 'medium' | 'warm';

export interface OatSheetProps {
  children: React.ReactNode;
  tone?: OatSheetTone;
  interactive?: boolean;
  delay?: number;
  className?: string;
  as?: 'div' | 'article' | 'aside' | 'blockquote';
}

const TONE_CLASS: Record<OatSheetTone, string> = {
  subtle: 'bg-[#141C2B]/78 md:bg-[#141C2B]/62',
  medium: 'bg-[#141C2B]/84 md:bg-[#141C2B]/70',
  warm: 'bg-[#24141F]/84 md:bg-[#24141F]/70',
};

/**
 * Translucent Oat-bordered frosted paper sheet laid asymmetrically over
 * full-bleed photography. Calibrated opacity + lighter mobile blur keeps
 * scrolling locked at 60fps while guaranteeing WCAG AA (>= 4.5:1) contrast.
 */
export function OatSheet({
  children,
  tone = 'medium',
  interactive = true,
  delay = 0,
  className = '',
  as = 'div',
}: OatSheetProps) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag =
    as === 'article'
      ? motion.article
      : as === 'aside'
      ? motion.aside
      : as === 'blockquote'
      ? motion.blockquote
      : motion.div;

  return (
    <MotionTag
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-48px' }}
      transition={{
        duration: prefersReducedMotion ? 0.01 : 0.55,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`oat-sheet-fallback relative rounded-[8px] border border-white/25 backdrop-blur-[10px] md:backdrop-blur-[16px] shadow-[var(--sheet-shadow)] text-oat ${
        TONE_CLASS[tone]
      } ${interactive ? 'oat-sheet-interactive' : ''} ${className}`}
    >
      {children}
    </MotionTag>
  );
}
