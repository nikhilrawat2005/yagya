'use client';

import { useSyncExternalStore } from 'react';
import { useBreakpoint } from './useBreakpoint';

const HOVER_MEDIA_QUERY = '(hover: hover) and (pointer: fine)';

function subscribeHoverMedia(callback: () => void): () => void {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return () => {};
  }
  const mql = window.matchMedia(HOVER_MEDIA_QUERY);
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
}

function getHoverMediaSnapshot(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia(HOVER_MEDIA_QUERY).matches;
}

/**
 * Hydration-safe capability detector for pointer hover/tilt/magnetic/parallax/low-power effects.
 * Returns `false` on SSR and touch devices, and respects both `prefers-reduced-motion`
 * and low-power CPUs (`hardwareConcurrency <= 4`).
 */
export function useInteractiveCapabilities() {
  const canHover = useSyncExternalStore(
    subscribeHoverMedia,
    getHoverMediaSnapshot,
    () => false
  );
  const {
    prefersReducedMotion,
    isLowPowerDevice,
    isDesktop,
    isMobile,
    isTablet,
    isLandscapePhone,
    simplifyMotion,
  } = useBreakpoint();

  return {
    canHover,
    prefersReducedMotion,
    isLowPowerDevice,
    isDesktop,
    isMobile,
    isTablet,
    isLandscapePhone,
    simplifyMotion,
    enableInteractiveMotion: canHover && !prefersReducedMotion,
    enableParallax: isDesktop && canHover && !simplifyMotion,
  };
}
