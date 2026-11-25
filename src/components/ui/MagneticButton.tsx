'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { MOTION_SPRING } from '@/lib/motion/tokens';
import { useInteractiveCapabilities } from '@/lib/motion/useInteractiveCapabilities';

export interface MagneticButtonProps {
  children: React.ReactNode;
  /** Pull multiplier relative to pointer offset from center (0..1). */
  strength?: number;
  /** Maximum translation distance in pixels. */
  maxDistance?: number;
  disabled?: boolean;
  className?: string;
}

/**
 * Subtle cursor-following magnetic pull wrapper for primary CTAs.
 * Automatically disables itself on touch screens and when reduced motion is enabled.
 */
export function MagneticButton({
  children,
  strength = 0.24,
  maxDistance = 9,
  disabled = false,
  className = '',
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { enableInteractiveMotion } = useInteractiveCapabilities();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, MOTION_SPRING.magnetic);
  const y = useSpring(rawY, MOTION_SPRING.magnetic);

  const active = enableInteractiveMotion && !disabled;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!active || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);

    const clamp = (val: number) => Math.max(-maxDistance, Math.min(maxDistance, val));
    rawX.set(clamp(offsetX * strength));
    rawY.set(clamp(offsetY * strength));
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  if (!active) {
    return <div className={`inline-flex ${className}`}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={`inline-flex ${className}`}
    >
      {children}
    </motion.div>
  );
}
