'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { MOTION_SPRING } from '@/lib/motion/tokens';
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
  sm: 'px-4 py-2 text-[11px]',
  md: 'px-6 py-3 text-xs',
  lg: 'px-8 py-4 text-xs',
  icon: 'p-2.5 w-10 h-10',
};

const VARIANT_CLASSES: Record<GlowButtonVariant, string> = {
  primary:
    'bg-flame text-navy font-semibold border border-flame hover:bg-flame-soft shadow-[var(--sheet-shadow)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oat',
  cta:
    'bg-flame text-navy font-semibold border border-flame hover:bg-flame-soft shadow-[var(--sheet-shadow)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oat',
  submit:
    'bg-flame text-navy font-semibold border border-flame hover:bg-flame-soft shadow-[var(--sheet-shadow)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oat',
  secondary:
    'bg-[#141C2B]/55 text-oat border border-white/30 backdrop-blur-md hover:bg-[#141C2B]/75 hover:border-apricot/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oat',
  outline:
    'bg-transparent text-oat border border-white/30 hover:bg-[#F6EFE2]/[0.14] hover:border-apricot/55 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oat',
  icon:
    'bg-[#141C2B]/55 text-oat border border-white/30 hover:bg-flame hover:text-navy hover:border-flame focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oat',
};

/**
 * Editorial Yagya button/CTA using sharp 4px corners, high-contrast Flame Orange
 * accent for primary actions (5.81:1 contrast), and translucent backdrop-scrimmed secondary actions.
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

  const resolvedSize: GlowButtonSize = size ?? (variant === 'icon' ? 'icon' : 'md');
  const isMagnetic = magnetic ?? variant === 'cta';
  const isDisabled = 'disabled' in rest && Boolean(rest.disabled);

  const baseStyles =
    'group relative overflow-hidden inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[4px] font-ui-label select-none transition-[background-color,border-color,color,box-shadow] duration-200 ease-[var(--ease-smooth)] cursor-pointer disabled:opacity-55 disabled:cursor-not-allowed';

  const combinedClasses = `${baseStyles} ${SIZE_CLASSES[resolvedSize]} ${VARIANT_CLASSES[variant]} ${className}`;

  const innerContent = (
    <span className="relative z-10 inline-flex items-center justify-center gap-2 whitespace-nowrap">
      {children}
    </span>
  );

  const hoverState = enableInteractiveMotion && !isDisabled ? { y: -1 } : undefined;
  const tapState = prefersReducedMotion || isDisabled ? undefined : { scale: 0.98 };
  const isFullWidth = className.includes('w-full');

  let element: React.ReactNode;

  if ('href' in rest && rest.href) {
    const { href, onClick, 'aria-label': ariaLabel } = rest;
    element = (
      <motion.div
        whileHover={hoverState}
        whileTap={tapState}
        transition={MOTION_SPRING.tactile}
        className={isFullWidth ? 'flex w-full' : 'inline-flex'}
      >
        <Link
          href={href}
          aria-label={ariaLabel}
          onClick={onClick}
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
        whileHover={hoverState}
        whileTap={tapState}
        transition={MOTION_SPRING.tactile}
        onClick={onClick}
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
