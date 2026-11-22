'use client';

import { ReactNode } from 'react';
import { useReducedMotion } from 'motion/react';

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
      <div
        className="flex min-w-full shrink-0 items-center justify-around gap-8 animate-marquee group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${speedSeconds}s` }}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className="flex min-w-full shrink-0 items-center justify-around gap-8 animate-marquee group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${speedSeconds}s` }}
      >
        {children}
      </div>
    </div>
  );
}
