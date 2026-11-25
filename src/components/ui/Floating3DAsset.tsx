'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useInteractiveCapabilities } from '@/lib/motion/useInteractiveCapabilities';

export interface Floating3DAssetProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  floatDistance?: number;
  duration?: number;
  rotateDeg?: number;
  /** Optional subtle mouse-tracking 3D parallax depth in pixels (0 disables). */
  parallaxDepth?: number;
  className?: string;
}

/**
 * Renders a palette-matched transparent 3D clay asset with a subtle float,
 * soft warm drop-shadow glow, and optional pointer parallax that respects
 * touch devices and prefers-reduced-motion.
 */
export function Floating3DAsset({
  src,
  alt,
  width = 320,
  height = 320,
  priority = false,
  floatDistance = 6,
  duration = 5.5,
  rotateDeg = 1.5,
  parallaxDepth = 0,
  className = '',
}: Floating3DAssetProps) {
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
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className="w-full h-auto object-contain drop-shadow-[0_14px_24px_rgba(43,43,43,0.14)]"
        />
      </motion.div>
    </motion.div>
  );
}
