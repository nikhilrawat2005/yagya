'use client';

import React, { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { MOTION_DURATION, MOTION_EASE, VIEWPORT_ONCE } from '@/lib/motion/tokens';

export interface FadeInSectionProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  blur?: boolean;
}

/**
 * Scroll-triggered reveal wrapper (fade + directional slide + subtle blur)
 * using once: true and centralized Yagya timing/easing.
 */
export function FadeInSection({
  children,
  delay = 0,
  duration = MOTION_DURATION.slow,
  className = '',
  direction = 'up',
  distance = 22,
  blur = true,
}: FadeInSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  const getOffset = () => {
    if (shouldReduceMotion) return { x: 0, y: 0 };
    switch (direction) {
      case 'up':
        return { x: 0, y: distance };
      case 'down':
        return { x: 0, y: -distance };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const offset = getOffset();
  const initialFilter = !shouldReduceMotion && blur ? 'blur(5px)' : 'blur(0px)';

  return (
    <motion.div
      initial={{ opacity: 0, x: offset.x, y: offset.y, filter: initialFilter }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
      viewport={VIEWPORT_ONCE}
      transition={{
        duration: shouldReduceMotion ? 0.15 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: MOTION_EASE.smooth,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
