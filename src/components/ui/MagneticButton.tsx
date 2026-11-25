'use client';

import React, { useRef, type PointerEvent } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
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
 * Uses MotionValues + spring physics (zero React state on pointer move) and
 * disables automatically on touch devices or reduced motion.
 */
export function MagneticButton({
  children,
  strength = 0.22,
  maxDistance = 8,
  disabled = false,
  className = '',
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { enableInteractiveMotion } = useInteractiveCapabilities();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 240, damping: 18, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 240, damping: 18, mass: 0.4 });

  const active = enableInteractiveMotion && !disabled;

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!active || e.pointerType !== 'mouse' || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);

    const clamp = (val: number) => Math.max(-maxDistance, Math.min(maxDistance, val));
    rawX.set(clamp(offsetX * strength));
    rawY.set(clamp(offsetY * strength));
  };

  const handlePointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={active ? { x, y } : undefined}
      className={`inline-flex ${className}`}
    >
      {children}
    </motion.div>
  );
}
