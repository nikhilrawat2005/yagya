'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { MOTION_EASE, MOTION_SPRING } from '@/lib/motion/tokens';
import { useInteractiveCapabilities } from '@/lib/motion/useInteractiveCapabilities';
import { MagneticButton } from '@/components/ui/MagneticButton';

export type GlowButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'icon'
  | 'cta'
  | 'submit';

export type GlowButtonSize = 'sm' | 'md' | 'lg' | 'icon';

interface RippleItem {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface GlowButtonBaseProps {
  variant?: GlowButtonVariant;
  size?: GlowButtonSize;
  magnetic?: boolean;
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
  'aria-expanded'?: boolean;
  'aria-pressed'?: boolean;
}

interface GlowButtonLinkProps extends GlowButtonBaseProps {
  href: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  type?: never;
  disabled?: never;
}

interface GlowButtonActionProps extends GlowButtonBaseProps {
  href?: never;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export type GlowButtonProps = GlowButtonLinkProps | GlowButtonActionProps;

const SIZE_CLASSES: Record<GlowButtonSize, string> = {
  sm: 'px-4 py-2.5 min-h-[44px] text-xs',
  md: 'px-6 py-3 min-h-[46px] text-xs',
  lg: 'px-8 py-4 min-h-[50px] text-xs',
  icon: 'p-2.5 min-w-[44px] min-h-[44px]',
};

const VARIANT_CLASSES: Record<GlowButtonVariant, string> = {
  primary:
    'bg-flame text-oat border border-flame hover:bg-flame-soft hover:shadow-[var(--glow-level-2)] focus-visible:shadow-[var(--shadow-glow-focus)]',
  cta:
    'bg-flame text-oat border border-flame hover:bg-flame-soft shadow-[var(--glow-level-1)] hover:shadow-[var(--glow-level-2)] focus-visible:shadow-[var(--shadow-glow-focus)]',
  submit:
    'bg-flame text-oat border border-flame hover:bg-flame-soft shadow-[var(--glow-level-1)] hover:shadow-[var(--glow-level-2)] focus-visible:shadow-[var(--shadow-glow-focus)]',
  secondary:
    'bg-[#F6EFE2]/[0.14] text-oat border border-white/25 backdrop-blur-md hover:bg-[#F6EFE2]/[0.24] hover:border-apricot/45 hover:shadow-[var(--glow-level-1)] focus-visible:shadow-[var(--shadow-glow-focus)]',
  outline:
    'bg-transparent text-oat border border-white/25 hover:bg-[#F6EFE2]/[0.14] hover:border-apricot/45 focus-visible:shadow-[var(--shadow-glow-focus)]',
  icon:
    'bg-[#F6EFE2]/[0.14] text-oat border border-white/25 hover:bg-flame hover:border-flame focus-visible:shadow-[var(--shadow-glow-focus)]',
};

/**
 * Editorial Yagya button/CTA using sharp 4px corners, Flame Orange accent for primary actions,
 * and translucent Oat Glass for secondary actions.
 */
export function GlowButton({
  variant = 'primary',
  size,
  magnetic,
  children,
  className = '',
  ...rest
}: GlowButtonProps) {
  const { enableInteractiveMotion, prefersReducedMotion } = useInteractiveCapabilities();
  const [ripples, setRipples] = useState<RippleItem[]>([]);
  const nextId = useRef(0);

  const resolvedSize: GlowButtonSize = size ?? (variant === 'icon' ? 'icon' : 'md');
  const isMagnetic = magnetic ?? variant === 'cta';
  const isDisabled = 'disabled' in rest && Boolean(rest.disabled);

  const spawnRipple = (clientX: number, clientY: number, currentTarget: HTMLElement) => {
    if (prefersReducedMotion || isDisabled) return;
    const rect = currentTarget.getBoundingClientRect();
    const maxDim = Math.max(rect.width, rect.height);
    const x = clientX ? clientX - rect.left : rect.width / 2;
    const y = clientY ? clientY - rect.top : rect.height / 2;
    const id = ++nextId.current;

    setRipples((prev) => [...prev.slice(-3), { id, x, y, size: maxDim * 2.1 }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((item) => item.id !== id));
    }, 550);
  };

  const baseStyles =
    'group relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-[4px] font-sans font-medium uppercase tracking-[0.12em] select-none transition-[background-color,border-color,color,box-shadow] duration-300 ease-[var(--ease-smooth)] cursor-pointer disabled:opacity-55 disabled:cursor-not-allowed';

  const combinedClasses = `${baseStyles} ${SIZE_CLASSES[resolvedSize]} ${VARIANT_CLASSES[variant]} ${className}`;

  const innerContent = (
    <>
      {enableInteractiveMotion && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-apricot/25 to-transparent translate-x-0 group-hover:translate-x-[360%] transition-transform duration-700 ease-[var(--ease-smooth)]"
        />
      )}

      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            aria-hidden="true"
            initial={{ scale: 0, opacity: 0.45 }}
            animate={{ scale: 1, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: MOTION_EASE.smooth }}
            style={{
              left: r.x - r.size / 2,
              top: r.y - r.size / 2,
              width: r.size,
              height: r.size,
            }}
            className="pointer-events-none absolute rounded-full bg-oat/35 z-10"
          />
        ))}
      </AnimatePresence>

      <span className="relative z-20 inline-flex items-center justify-center gap-2">
        {children}
      </span>
    </>
  );

  const hoverScale = enableInteractiveMotion && !isDisabled ? { y: -2 } : undefined;
  const tapScale = prefersReducedMotion || isDisabled ? undefined : { scale: 0.98 };
  const isFullWidth = className.includes('w-full');

  let element: React.ReactNode;

  if ('href' in rest && rest.href) {
    const { href, onClick, 'aria-label': ariaLabel } = rest;
    element = (
      <motion.div
        whileHover={hoverScale}
        whileTap={tapScale}
        transition={MOTION_SPRING.tactile}
        className={isFullWidth ? 'flex w-full' : 'inline-flex'}
      >
        <Link
          href={href}
          aria-label={ariaLabel}
          onClick={(e) => {
            spawnRipple(e.clientX, e.clientY, e.currentTarget);
            onClick?.(e);
          }}
          className={combinedClasses}
        >
          {innerContent}
        </Link>
      </motion.div>
    );
  } else {
    const {
      onClick,
      type = variant === 'submit' ? 'submit' : 'button',
      disabled,
      'aria-label': ariaLabel,
      'aria-expanded': ariaExpanded,
      'aria-pressed': ariaPressed,
    } = rest as GlowButtonActionProps;

    element = (
      <motion.button
        type={type}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-expanded={ariaExpanded}
        aria-pressed={ariaPressed}
        whileHover={hoverScale}
        whileTap={tapScale}
        transition={MOTION_SPRING.tactile}
        onClick={(e) => {
          spawnRipple(e.clientX, e.clientY, e.currentTarget);
          onClick?.(e);
        }}
        className={combinedClasses}
      >
        {innerContent}
      </motion.button>
    );
  }

  if (isMagnetic && !isDisabled) {
    return (
      <MagneticButton className={isFullWidth ? 'w-full' : ''}>
        {element}
      </MagneticButton>
    );
  }

  return element;
}
