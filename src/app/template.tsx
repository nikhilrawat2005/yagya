'use client';

import { motion, useReducedMotion } from 'motion/react';
import { MOTION_DURATION, MOTION_EASE } from '@/lib/motion/tokens';

/**
 * App Router per-navigation entrance fade (no exit cloning on Flight tree,
 * avoiding React 19 RSC chunk issues during client transitions).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0.9 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: prefersReducedMotion ? 0.01 : MOTION_DURATION.fast + 0.05,
        ease: MOTION_EASE.smooth,
      }}
    >
      {children}
    </motion.div>
  );
}
