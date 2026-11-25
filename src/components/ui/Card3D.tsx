'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react';
import { MOTION_SPRING } from '@/lib/motion/tokens';
import { useInteractiveCapabilities } from '@/lib/motion/useInteractiveCapabilities';

export interface Card3DProps {
  children: React.ReactNode;
  maxTilt?: number;
  className?: string;
  surfaceClassName?: string;
  enableGlare?: boolean;
  lift?: boolean;
  as?: 'div' | 'article';
}

export function Card3D({
  children,
  maxTilt = 6,
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

  const glareBackground = useMotionTemplate`radial-gradient(360px circle at ${glareX}% ${glareY}%, rgba(253, 230, 200, 0.22) 0%, rgba(223, 127, 37, 0.10) 42%, transparent 75%)`;

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
        whileHover={enableInteractiveMotion && lift ? { y: -4 } : undefined}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
        transition={MOTION_SPRING.tactile}
        className={`relative h-full w-full rounded-[6px] transition-[box-shadow,border-color,background-color] duration-300 ease-[var(--ease-smooth)] ${
          hovered ? 'shadow-[var(--sheet-shadow-hover)]' : 'shadow-[var(--sheet-shadow)]'
        } ${surfaceClassName}`}
      >
        {enableInteractiveMotion && enableGlare && (
          <motion.div
            aria-hidden="true"
            style={{ background: glareBackground }}
            animate={{ opacity: hovered ? 0.65 : 0 }}
            transition={{ duration: 0.22 }}
            className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
          />
        )}

        {children}
      </MotionRoot>
    </div>
  );
}

export interface Card3DLayerProps {
  children: React.ReactNode;
  depth?: number;
  className?: string;
}

export function Card3DLayer({ children, depth = 12, className = '' }: Card3DLayerProps) {
  const { enableInteractiveMotion } = useInteractiveCapabilities();
  const hasPositionUtility = /\b(absolute|fixed|sticky|relative)\b/.test(className);

  return (
    <div
      style={enableInteractiveMotion ? { transform: `translateZ(${depth}px)` } : undefined}
      className={`${hasPositionUtility ? '' : 'relative '}${className}`.trim()}
    >
      {children}
    </div>
  );
}
