'use client';

import { FadeInSection, type FadeInSectionProps } from '@/components/motion/FadeInSection';

export type FadeInProps = FadeInSectionProps;

export function FadeIn(props: FadeInProps) {
  return <FadeInSection {...props} />;
}
