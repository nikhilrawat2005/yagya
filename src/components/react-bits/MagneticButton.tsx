'use client';

import { useRef, useSyncExternalStore, type PointerEvent, type ReactNode } from 'react';
import Link from 'next/link';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react';

export interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'ghost';
  radiusClassName?: string;
  maxOffset?: number;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
}

const COARSE_QUERY = '(pointer: coarse)';

function subscribeCoarse(callback: () => void): () => void {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return () => {};
  }
  const mq = window.matchMedia(COARSE_QUERY);
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}

function getCoarseSnapshot(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia(COARSE_QUERY).matches;
}

const VARIANT_CLASSES: Record<NonNullable<MagneticButtonProps['variant']>, string> = {
  primary:
    'bg-flame text-navy font-semibold border border-flame hover:bg-flame-soft focus-visible:outline-oat',
  secondary:
    'border border-white/30 bg-[#F6EFE2]/[0.14] text-oat backdrop-blur-md hover:bg-[#F6EFE2]/[0.22] hover:border-apricot/50 focus-visible:outline-oat',
  ghost:
    'border border-white/25 bg-transparent text-oat hover:bg-[#F6EFE2]/[0.12] hover:border-apricot/45 focus-visible:outline-oat',
};

export function MagneticButton({
  children,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  radiusClassName = 'rounded-[4px]',
  maxOffset = 8,
  disabled = false,
  ariaLabel,
  className = '',
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isCoarsePointer = useSyncExternalStore(
    subscribeCoarse,
    getCoarseSnapshot,
    () => false
  );

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springX = useSpring(rawX, { stiffness: 240, damping: 18, mass: 0.4 });
  const springY = useSpring(rawY, { stiffness: 240, damping: 18, mass: 0.4 });

  const magnetDisabled = Boolean(shouldReduceMotion) || isCoarsePointer || disabled;

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (magnetDisabled || event.pointerType !== 'mouse' || !buttonRef.current) {
      return;
    }
    const rect = buttonRef.current.getBoundingClientRect();
    const relX = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const relY = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

    rawX.set(Math.max(-1, Math.min(1, relX)) * maxOffset);
    rawY.set(Math.max(-1, Math.min(1, relY)) * maxOffset);
  };

  const handlePointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const sharedClasses =
    `group inline-flex items-center justify-center gap-2 whitespace-nowrap px-6 py-3 text-xs font-ui-label cursor-pointer select-none transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 ${VARIANT_CLASSES[variant]} ${radiusClassName} ${className}`;

  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  return (
    <motion.div
      ref={buttonRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={magnetDisabled ? undefined : { x: springX, y: springY }}
      className="inline-block"
    >
      {href ? (
        isInternalLink ? (
          <Link href={href} aria-label={ariaLabel} className={sharedClasses}>
            {children}
          </Link>
        ) : (
          <a href={href} aria-label={ariaLabel} className={sharedClasses}>
            {children}
          </a>
        )
      ) : (
        <button
          type={type}
          onClick={onClick}
          disabled={disabled}
          aria-label={ariaLabel}
          className={sharedClasses}
        >
          {children}
        </button>
      )}
    </motion.div>
  );
}
