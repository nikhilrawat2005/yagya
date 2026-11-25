'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react';
import { MOTION_SPRING } from '@/lib/motion/tokens';
import { useInteractiveCapabilities } from '@/lib/motion/useInteractiveCapabilities';

export interface Card3DProps {
  children: React.ReactNode;
  /** Maximum tilt angle in degrees on each axis (default 8deg). */
  maxTilt?: number;
  /** Extra classes applied to the outer perspective container (grid spans, etc.). */
  className?: string;
  /** Classes applied to the clipped card surface inside the 3D plane. */
  surfaceClassName?: string;
  /** Show radial warm Apricot/Sea Buckthorn specular glare following the pointer. */
  enableGlare?: boolean;
  /** Subtle lift (-4px) on pointer hover. */
  lift?: boolean;
  /** Semantic wrapper element type. */
  as?: 'div' | 'article';
}

/**
 * Interactive 3D tilt card with pointer-tracking glare highlight, layered depth support
 * via `<Card3DLayer>`, warm Sea Buckthorn glow edge, and clean touch/reduced-motion fallbacks.
 */
export function Card3D({
  children,
  maxTilt = 8,
  className = '',
  surfaceClassName = '',
  enableGlare = true,
  lift = true,
  as = 'div',
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { enableInteractiveMotion, prefersReducedMotion } = useInteractiveCapabilities();
  const [hovered, setHovered] = useState(false);

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rawGlareX = useMotionValue(50);
  const rawGlareY = useMotionValue(50);

  const rotateX = useSpring(rawRotateX, MOTION_SPRING.tactile);
  const rotateY = useSpring(rawRotateY, MOTION_SPRING.tactile);
  const glareX = useSpring(rawGlareX, { stiffness: 260, damping: 28 });
  const glareY = useSpring(rawGlareY, { stiffness: 260, damping: 28 });

  const glareBackground = useMotionTemplate`radial-gradient(360px circle at ${glareX}% ${glareY}%, var(--glow-glare) 0%, rgba(242, 140, 27, 0.16) 42%, transparent 75%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableInteractiveMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    const clampedX = Math.max(0, Math.min(1, px));
    const clampedY = Math.max(0, Math.min(1, py));

    rawRotateY.set((clampedX - 0.5) * maxTilt * 2);
    rawRotateX.set((0.5 - clampedY) * maxTilt * 2);
    rawGlareX.set(clampedX * 100);
    rawGlareY.set(clampedY * 100);
  };

  const handleMouseEnter = () => {
    if (enableInteractiveMotion) setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    rawRotateX.set(0);
    rawRotateY.set(0);
    rawGlareX.set(50);
    rawGlareY.set(50);
  };

  const MotionRoot = as === 'article' ? motion.article : motion.div;

  return (
    <div style={{ perspective: '1050px' }} className={`relative ${className}`}>
      <MotionRoot
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={
          enableInteractiveMotion
            ? {
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }
            : undefined
        }
        whileHover={
          enableInteractiveMotion && lift
            ? { y: -5, scale: 1.012 }
            : undefined
        }
        whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
        transition={MOTION_SPRING.tactile}
        className={`relative h-full w-full rounded-2xl transition-[box-shadow,border-color] duration-300 ease-[var(--ease-smooth)] ${
          hovered ? 'shadow-[var(--glow-level-2)]' : 'shadow-[0_2px_10px_-2px_rgba(43,43,43,0.08)]'
        } ${surfaceClassName}`}
      >
        {/* Dynamic radial glare highlight clipped cleanly to card radius */}
        {enableInteractiveMotion && enableGlare && (
          <motion.div
            aria-hidden="true"
            style={{ background: glareBackground }}
            animate={{ opacity: hovered ? 0.55 : 0 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
          />
        )}

        {/* Warm ambient edge ring on hover */}
        {enableInteractiveMotion && (
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 z-10 rounded-[inherit] ring-1 transition-opacity duration-300 ${
              hovered
                ? 'ring-seabuckthorn/60 opacity-100'
                : 'ring-transparent opacity-0'
            }`}
          />
        )}

        {children}
      </MotionRoot>
    </div>
  );
}

export interface Card3DLayerProps {
  children: React.ReactNode;
  /** Depth in px along Z axis when parent Card3D tilts (default 14px). */
  depth?: number;
  className?: string;
}

/**
 * Inner parallax layer for Card3D. Translates along Z only on desktop pointer devices.
 */
export function Card3DLayer({ children, depth = 14, className = '' }: Card3DLayerProps) {
  const { enableInteractiveMotion } = useInteractiveCapabilities();
  const hasPositionUtility = /\b(absolute|fixed|sticky|relative)\b/.test(className);

  return (
    <div
      style={
        enableInteractiveMotion
          ? { transform: `translateZ(${depth}px)` }
          : undefined
      }
      className={`${hasPositionUtility ? '' : 'relative '}${className}`.trim()}
    >
      {children}
    </div>
  );
}
