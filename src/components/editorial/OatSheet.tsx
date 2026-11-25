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
  subtle: 'bg-[#F6EFE2]/[0.12]',
  medium: 'bg-[#F6EFE2]/[0.16]',
  warm: 'bg-[#F6EFE2]/[0.20]',
};

/**
 * Translucent Oat White (#F6EFE2) frosted paper sheet laid asymmetrically
 * over full-bleed photography. Uses sharp editorial corners (6px), 1px white/25 border,
 * soft elevation shadow, and calm 700ms ease-out stagger entrance.
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
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-48px' }}
      transition={{
        duration: prefersReducedMotion ? 0.15 : 0.7,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`relative rounded-[6px] border border-white/25 backdrop-blur-[18px] shadow-[var(--sheet-shadow)] text-oat ${
        TONE_CLASS[tone]
      } ${interactive ? 'oat-sheet-interactive' : ''} ${className}`}
    >
      {children}
    </MotionTag>
  );
}
