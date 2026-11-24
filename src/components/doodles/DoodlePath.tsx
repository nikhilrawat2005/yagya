'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export interface DoodlePathProps {
  d: string;
  strokeWidth?: number;
  delay?: number;
  duration?: number;
  opacity?: number;
}

/**
 * Shared marker-stroke path animated via pathLength 0 -> 1 once when scrolled into view.
 */
export function DoodlePath({
  d,
  strokeWidth = 2.2,
  delay = 0,
  duration = 0.75,
  opacity = 0.88,
}: DoodlePathProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.path
      d={d}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={opacity}
      initial={prefersReducedMotion ? { pathLength: 1, opacity } : { pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        pathLength: { duration, delay, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.15, delay },
      }}
    />
  );
}
