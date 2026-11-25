import type { Transition } from 'motion/react';

/**
 * Centralized motion language for Yagya Superfoods.
 * Keeps timing, easing, spring physics, and reveal behavior identical across every page.
 */
export const MOTION_DURATION = {
  fast: 0.15,
  base: 0.3,
  slow: 0.6,
} as const;

export const MOTION_EASE = {
  smooth: [0.22, 1, 0.36, 1] as const,
  snappy: [0.2, 0.8, 0.2, 1] as const,
};

export const MOTION_SPRING = {
  /** Tactile hover/tilt spring */
  tactile: {
    type: 'spring' as const,
    stiffness: 320,
    damping: 26,
    mass: 0.7,
  },
  /** Magnetic button pull spring */
  magnetic: {
    type: 'spring' as const,
    stiffness: 240,
    damping: 20,
    mass: 0.5,
  },
  /** Modals, drawers, tabs, accordions */
  overlay: {
    type: 'spring' as const,
    stiffness: 280,
    damping: 28,
  },
  /** Gentle micro-bounce for icons & badges */
  pop: {
    type: 'spring' as const,
    stiffness: 420,
    damping: 22,
  },
} satisfies Record<string, Transition>;

export const VIEWPORT_ONCE = {
  once: true,
  margin: '-48px',
} as const;
