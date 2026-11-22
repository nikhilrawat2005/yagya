'use client';

import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface MarqueeProps {
  children: ReactNode;
  speedSeconds?: number;
  className?: string;
}

export function Marquee({ children, speedSeconds = 25, className = '' }: MarqueeProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className={`overflow-x-auto flex items-center gap-8 ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div className={`overflow-hidden whitespace-nowrap flex select-none group ${className}`}>
      <motion.div
        className="flex shrink-0 items-center gap-8 pr-8"
        animate={{ x: ['0%', '-100%'] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: speedSeconds,
        }}
      >
        {children}
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="flex shrink-0 items-center gap-8 pr-8"
        animate={{ x: ['0%', '-100%'] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: speedSeconds,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
