'use client';

import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { MOTION_DURATION, MOTION_EASE } from '@/lib/motion/tokens';

export interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

/**
 * Smooth App Router page transition using AnimatePresence.
 * Animates opacity only (no transform or filter) so fixed backdrops and side
 * chapter indices inside pages remain anchored to the true viewport.
 */
export function PageTransition({ children, className = '' }: PageTransitionProps) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence initial={false} mode="sync">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: prefersReducedMotion ? 0.12 : MOTION_DURATION.base,
          ease: MOTION_EASE.smooth,
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
