'use client';

import { useSyncExternalStore } from 'react';
import { useReducedMotion } from 'motion/react';

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
 * Hydration-safe capability detector for pointer hover/tilt/magnetic/cursor effects.
 * Returns `false` on SSR and touch devices, and automatically respects `prefers-reduced-motion`.
 */
export function useInteractiveCapabilities() {
  const canHover = useSyncExternalStore(
    subscribeHoverMedia,
    getHoverMediaSnapshot,
    () => false
  );
  const prefersReducedMotion = Boolean(useReducedMotion());

  return {
    canHover,
    prefersReducedMotion,
    enableInteractiveMotion: canHover && !prefersReducedMotion,
  };
}
