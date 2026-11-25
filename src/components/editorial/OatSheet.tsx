'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useInteractiveCapabilities } from '@/lib/motion/useInteractiveCapabilities';

export type OatSheetTone = 'subtle' | 'medium' | 'warm';
export type OatSheetPadding = 'none' | 'compact' | 'default' | 'spacious';

export interface OatSheetProps {
  children: React.ReactNode;
  tone?: OatSheetTone;
  padding?: OatSheetPadding;
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

const PADDING_CLASS: Record<OatSheetPadding, string> = {
  none: '',
  compact: 'p-4 sm:p-5 md:p-6',
  default: 'p-5 sm:p-6 md:p-7 lg:p-9',
  spacious: 'p-5 sm:p-6 md:p-8 lg:p-10',
};

/**
 * Translucent Oat White (#F6EFE2) frosted paper sheet laid asymmetrically
 * over full-bleed photography. Uses sharp editorial corners (6px), 1px white/25 border,
 * responsive GPU-friendly backdrop blur (12px mobile -> 18px desktop), and low-power motion guards.
 */
export function OatSheet({
  children,
  tone = 'medium',
  padding = 'none',
  interactive = true,
  delay = 0,
  className = '',
  as = 'div',
}: OatSheetProps) {
  const { prefersReducedMotion, simplifyMotion } = useInteractiveCapabilities();
  const MotionTag =
    as === 'article'
      ? motion.article
      : as === 'aside'
      ? motion.aside
      : as === 'blockquote'
      ? motion.blockquote
      : motion.div;

  const duration = prefersReducedMotion ? 0.15 : simplifyMotion ? 0.35 : 0.65;
  const resolvedDelay = prefersReducedMotion ? 0 : simplifyMotion ? delay * 0.4 : delay;

  return (
    <MotionTag
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: simplifyMotion ? 10 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-32px' }}
      transition={{
        duration,
        delay: resolvedDelay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`relative rounded-[6px] border border-white/25 oat-sheet-blur shadow-[var(--sheet-shadow)] text-oat ${
        TONE_CLASS[tone]
      } ${PADDING_CLASS[padding]} ${interactive ? 'oat-sheet-interactive' : ''} ${className}`}
    >
      {children}
    </MotionTag>
  );
}
