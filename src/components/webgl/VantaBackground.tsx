'use client';

import { useEffect, useRef, useState } from 'react';
import type { VantaEffectInstance } from 'vanta/dist/vanta.waves.min';

export type VantaEffectName = 'WAVES' | 'NET' | 'FOG' | 'DOTS' | 'HALO';

export interface VantaPalette {
  backgroundColor: number;
  color: number;
  secondaryColor?: number;
  highlightColor?: number;
  midtoneColor?: number;
  lowlightColor?: number;
  baseColor?: number;
}

export interface VantaBackgroundProps {
  effect?: VantaEffectName;
  palette?: VantaPalette;
  interactive?: boolean;
  className?: string;
  speed?: number;
  zoom?: number;
}

/**
 * Calibrated to Yagya's Neon Navy (#141C2B) base and Diya Flame (#DF7F25) accent.
 * Kept restrained in midtone/lowlight contrast so hero text passes WCAG AA.
 */
const YAGYA_DEFAULT_PALETTE: VantaPalette = {
  backgroundColor: 0x141c2b,
  color: 0xdf7f25,
  secondaryColor: 0x24141f,
  highlightColor: 0xdf7f25,
  midtoneColor: 0x222c3f,
  lowlightColor: 0x141c2b,
  baseColor: 0x141c2b,
};

export function VantaBackground({
  effect = 'FOG',
  palette = YAGYA_DEFAULT_PALETTE,
  interactive = false,
  className = '',
  speed = 0.65,
  zoom = 1.0,
}: VantaBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreference = () => setReducedMotion(mediaQuery.matches);
    syncPreference();

    mediaQuery.addEventListener('change', syncPreference);
    return () => mediaQuery.removeEventListener('change', syncPreference);
  }, []);

  useEffect(() => {
    if (reducedMotion || !containerRef.current || typeof window === 'undefined') {
      return;
    }

    let cancelled = false;
    let instance: VantaEffectInstance | null = null;

    const initVanta = async () => {
      try {
        const THREE = await import('three');
        if (cancelled || !containerRef.current) return;

        const baseOptions = {
          el: containerRef.current,
          THREE,
          mouseControls: interactive,
          touchControls: interactive,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1,
          scaleMobile: 1,
          backgroundColor: palette.backgroundColor,
          color: palette.color,
        };

        if (effect === 'WAVES') {
          const mod = await import('vanta/dist/vanta.waves.min');
          if (cancelled || !containerRef.current) return;
          instance = mod.default({
            ...baseOptions,
            shininess: 24,
            waveHeight: 12,
            waveSpeed: speed,
            zoom,
          });
        } else if (effect === 'NET') {
          const mod = await import('vanta/dist/vanta.net.min');
          if (cancelled || !containerRef.current) return;
          instance = mod.default({
            ...baseOptions,
            points: 8,
            maxDistance: 20,
            spacing: 18,
            showDots: true,
          });
        } else if (effect === 'DOTS') {
          const mod = await import('vanta/dist/vanta.dots.min');
          if (cancelled || !containerRef.current) return;
          instance = mod.default({
            ...baseOptions,
            color2: palette.secondaryColor ?? palette.color,
            size: 2.5,
            spacing: 32,
            showLines: false,
          });
        } else if (effect === 'HALO') {
          const mod = await import('vanta/dist/vanta.halo.min');
          if (cancelled || !containerRef.current) return;
          instance = mod.default({
            ...baseOptions,
            baseColor: palette.baseColor ?? palette.backgroundColor,
            size: 1.05,
            amplitudeFactor: 0.9,
            xOffset: 0.08,
            yOffset: 0.0,
          });
        } else {
          const mod = await import('vanta/dist/vanta.fog.min');
          if (cancelled || !containerRef.current) return;
          instance = mod.default({
            ...baseOptions,
            highlightColor: palette.highlightColor ?? palette.color,
            midtoneColor: palette.midtoneColor ?? 0x222c3f,
            lowlightColor: palette.lowlightColor ?? palette.backgroundColor,
            baseColor: palette.baseColor ?? palette.backgroundColor,
            blurFactor: 0.65,
            speed,
            zoom,
          });
        }
      } catch {
        // Graceful fallback to static CSS background if WebGL fails.
      }
    };

    void initVanta();

    return () => {
      cancelled = true;
      if (instance) {
        instance.destroy();
        instance = null;
      }
    };
  }, [
    effect,
    interactive,
    palette.backgroundColor,
    palette.baseColor,
    palette.color,
    palette.highlightColor,
    palette.lowlightColor,
    palette.midtoneColor,
    palette.secondaryColor,
    reducedMotion,
    speed,
    zoom,
  ]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    />
  );
}
