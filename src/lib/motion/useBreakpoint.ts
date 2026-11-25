'use client';

import { useSyncExternalStore } from 'react';
import { useReducedMotion } from 'motion/react';

/**
 * Shared mobile-first breakpoint thresholds (in px).
 * Kept in sync with `@theme` breakpoints in `src/app/globals.css`.
 */
export const BREAKPOINTS = {
  base: 320,
  sm: 480,
  md: 640,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type BreakpointTier = keyof typeof BREAKPOINTS;

interface ResponsiveSnapshot {
  tier: BreakpointTier;
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLandscape: boolean;
  isLandscapePhone: boolean;
  isLowPowerDevice: boolean;
}

const SERVER_SNAPSHOT: ResponsiveSnapshot = {
  tier: 'lg',
  width: 1024,
  height: 768,
  isMobile: false,
  isTablet: false,
  isDesktop: true,
  isLandscape: true,
  isLandscapePhone: false,
  isLowPowerDevice: false,
};

let cachedSnapshot: ResponsiveSnapshot = SERVER_SNAPSHOT;

function resolveTier(width: number): BreakpointTier {
  if (width >= BREAKPOINTS['2xl']) return '2xl';
  if (width >= BREAKPOINTS.xl) return 'xl';
  if (width >= BREAKPOINTS.lg) return 'lg';
  if (width >= BREAKPOINTS.md) return 'md';
  if (width >= BREAKPOINTS.sm) return 'sm';
  return 'base';
}

function getClientSnapshot(): ResponsiveSnapshot {
  if (typeof window === 'undefined') return SERVER_SNAPSHOT;

  const width = window.innerWidth;
  const height = window.innerHeight;
  const cores = typeof navigator !== 'undefined' && typeof navigator.hardwareConcurrency === 'number'
    ? navigator.hardwareConcurrency
    : 8;
  const isLowPowerDevice = cores <= 4;

  if (
    cachedSnapshot !== SERVER_SNAPSHOT &&
    cachedSnapshot.width === width &&
    cachedSnapshot.height === height &&
    cachedSnapshot.isLowPowerDevice === isLowPowerDevice
  ) {
    return cachedSnapshot;
  }

  const tier = resolveTier(width);
  const isLandscape = width > height;

  cachedSnapshot = {
    tier,
    width,
    height,
    isMobile: width < BREAKPOINTS.md,
    isTablet: width >= BREAKPOINTS.md && width < BREAKPOINTS.lg,
    isDesktop: width >= BREAKPOINTS.lg,
    isLandscape,
    isLandscapePhone: isLandscape && height <= 500,
    isLowPowerDevice,
  };

  return cachedSnapshot;
}

function subscribeViewport(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('resize', callback, { passive: true });
  window.addEventListener('orientationchange', callback, { passive: true });
  return () => {
    window.removeEventListener('resize', callback);
    window.removeEventListener('orientationchange', callback);
  };
}

/**
 * Hydration-safe viewport breakpoint & hardware-capability hook.
 * Combines Tailwind-aligned breakpoint detection with `prefers-reduced-motion` and low-power guards.
 */
export function useBreakpoint() {
  const viewport = useSyncExternalStore(
    subscribeViewport,
    getClientSnapshot,
    () => SERVER_SNAPSHOT
  );
  const prefersReducedMotion = Boolean(useReducedMotion());

  return {
    ...viewport,
    prefersReducedMotion,
    simplifyMotion: prefersReducedMotion || viewport.isLowPowerDevice,
  };
}
