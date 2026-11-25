'use client';

import type { PointerEvent, ReactNode } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from 'motion/react';

export interface SpotlightCardProps {
  children: ReactNode;
  /**
   * Subtle radial highlight calibrated to Yagya Diya Flame (#DF7F25) or Oat (#F6EFE2).
   */
  spotlightColor?: string;
  radiusClassName?: string;
  className?: string;
  as?: 'div' | 'article';
}

export function SpotlightCard({
  children,
  spotlightColor = 'rgba(223, 127, 37, 0.14)',
  radiusClassName = 'rounded-[6px]',
  className = '',
  as = 'div',
}: SpotlightCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const mouseX = useMotionValue(-999);
  const mouseY = useMotionValue(-999);
  const spotlightOpacity = useMotionValue(0);

  const background = useMotionTemplate`radial-gradient(340px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 75%)`;

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || event.pointerType !== 'mouse') {
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
    spotlightOpacity.set(1);
  };

  const handlePointerLeave = () => {
    spotlightOpacity.set(0);
  };

  const Wrapper = as === 'article' ? 'article' : 'div';

  return (
    <Wrapper
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`group relative overflow-hidden border border-white/25 bg-[#F6EFE2]/[0.14] backdrop-blur-[18px] shadow-[var(--sheet-shadow)] transition-[background-color,border-color,box-shadow] duration-300 ease-[var(--ease-smooth)] hover:border-[#FDE6C8]/45 hover:bg-[#F6EFE2]/[0.18] ${radiusClassName} ${className}`}
    >
      <motion.div
        aria-hidden="true"
        className={`pointer-events-none absolute -inset-px transition-opacity duration-300 motion-reduce:hidden ${radiusClassName}`}
        style={{
          background,
          opacity: spotlightOpacity,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </Wrapper>
  );
}
