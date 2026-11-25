'use client';

import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { MOTION_DURATION, MOTION_EASE, VIEWPORT_ONCE } from '@/lib/motion/tokens';

interface StaggerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function StaggerContainer({
  children,
  staggerDelay = 0.08,
  className = '',
}: StaggerProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: prefersReducedMotion ? 0 : 20,
          filter: prefersReducedMotion ? 'blur(0px)' : 'blur(4px)',
        },
        visible: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: {
            duration: prefersReducedMotion ? 0.15 : MOTION_DURATION.slow,
            ease: MOTION_EASE.smooth,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
