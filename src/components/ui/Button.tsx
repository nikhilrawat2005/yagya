'use client';

import React from 'react';
import { GlowButton, type GlowButtonProps } from '@/components/ui/GlowButton';

export type ButtonProps = GlowButtonProps;

/**
 * Standard Yagya button wrapper backed by GlowButton so all existing CTA and form
 * buttons share the unified glow, shimmer, ripple, and magnetic motion system.
 */
export function Button({ variant = 'primary', ...props }: ButtonProps) {
  return <GlowButton variant={variant} {...props} />;
}
