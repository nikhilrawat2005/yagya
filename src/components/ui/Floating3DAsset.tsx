'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';

export interface Floating3DAssetProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  floatDistance?: number;
  duration?: number;
  rotateDeg?: number;
  className?: string;
}

/**
 * Renders a palette-matched transparent 3D clay asset with a subtle,
 * non-jittery vertical float that respects prefers-reduced-motion.
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
  className = '',
}: Floating3DAssetProps) {
  const prefersReducedMotion = useReducedMotion();

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
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className="w-full h-auto object-contain"
      />
    </motion.div>
  );
}
