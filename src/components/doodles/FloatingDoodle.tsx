'use client';

import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useInteractiveCapabilities } from '@/lib/motion/useInteractiveCapabilities';

export interface FloatingDoodleProps {
  children: React.ReactNode;
  floatDistance?: number;
  duration?: number;
  rotateDeg?: number;
  parallaxDepth?: number;
  className?: string;
}

/**
 * Adds gentle idle float and optional pointer parallax to marker-sketch doodles,
 * respecting touch devices and prefers-reduced-motion.
 */
export function FloatingDoodle({
  children,
  floatDistance = 5,
  duration = 6,
  rotateDeg = 1.4,
  parallaxDepth = 0,
  className = '',
}: FloatingDoodleProps) {
  const { prefersReducedMotion, enableInteractiveMotion } = useInteractiveCapabilities();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const parallaxX = useSpring(rawX, { stiffness: 120, damping: 24, mass: 0.6 });
  const parallaxY = useSpring(rawY, { stiffness: 120, damping: 24, mass: 0.6 });

  const enableParallax = enableInteractiveMotion && parallaxDepth !== 0;

  useEffect(() => {
    if (!enableParallax) return;
    const handleMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      rawX.set(nx * parallaxDepth);
      rawY.set(ny * parallaxDepth);
    };
    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleMove);
  }, [enableParallax, parallaxDepth, rawX, rawY]);

  return (
    <motion.div
      animate={
        prefersReducedMotion
          ? undefined
          : {
              y: [-floatDistance / 2, floatDistance / 2, -floatDistance / 2],
              rotate: [-rotateDeg, rotateDeg, -rotateDeg],
            }
      }
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={`select-none pointer-events-none ${className}`}
    >
      <motion.div
        style={enableParallax ? { x: parallaxX, y: parallaxY } : undefined}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
