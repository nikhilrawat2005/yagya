'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';

type ButtonVariant = 'primary' | 'secondary';

interface BaseProps {
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
}

interface LinkButtonProps extends BaseProps {
  href: string;
  onClick?: never;
  type?: never;
  disabled?: never;
}

interface ActionButtonProps extends BaseProps {
  href?: never;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export type ButtonProps = LinkButtonProps | ActionButtonProps;

export function Button({
  variant = 'primary',
  children,
  className = '',
  ...rest
}: ButtonProps) {
  const prefersReducedMotion = useReducedMotion();

  const baseStyles =
    'group relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-xs font-sans font-medium uppercase tracking-[0.08em] transition-colors duration-300 cursor-pointer';

  const variantStyles =
    variant === 'primary'
      ? 'bg-indigo text-oat border border-indigo hover:border-burnt'
      : 'bg-oat text-indigo border-2 border-charcoal hover:border-burnt hover:text-oat';

  const hoverSweepColor = variant === 'primary' ? 'bg-burnt' : 'bg-burnt';

  const innerContent = (
    <>
      {/* Smooth left-to-right Burnt Orange fill sweep on hover */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 ${hoverSweepColor} -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out`}
      />
      <span className="relative z-10 inline-flex items-center gap-2 transition-transform duration-200 group-hover:translate-x-0.5">
        {children}
      </span>
    </>
  );

  const combined = `${baseStyles} ${variantStyles} ${className}`;

  if ('href' in rest && rest.href) {
    return (
      <motion.div
        whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
        transition={{ duration: 0.12 }}
        className="inline-block"
      >
        <Link href={rest.href} className={combined}>
          {innerContent}
        </Link>
      </motion.div>
    );
  }

  const { onClick, type = 'button', disabled } = rest as ActionButtonProps;
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.12 }}
      className={combined}
    >
      {innerContent}
    </motion.button>
  );
}
