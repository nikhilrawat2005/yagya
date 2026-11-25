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
 * Uses `initial={false}` so initial SSR HTML renders immediately with zero LCP delay,
 * then animates opacity, vertical slide, and subtle blur clear on client route changes.
 */
export function PageTransition({ children, className = '' }: PageTransitionProps) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence initial={false} mode="sync">
      <motion.div
        key={pathname}
        initial={
          prefersReducedMotion
            ? { opacity: 0 }
            : { opacity: 0, y: 10, filter: 'blur(4px)' }
        }
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
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
