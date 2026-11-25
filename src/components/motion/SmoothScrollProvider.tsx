'use client';

import { ReactNode, useEffect } from 'react';
import Lenis from 'lenis';
import { MotionConfig } from 'motion/react';
import { useCartStore } from '@/lib/store/cartStore';
import { useInteractiveCapabilities } from '@/lib/motion/useInteractiveCapabilities';

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const { canHover, simplifyMotion } = useInteractiveCapabilities();
  const isCartOpen = useCartStore((s) => s.isOpen);

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    // Keep native swipe momentum scrolling untouched on mobile/touch or low-power devices
    if (!canHover || simplifyMotion) return;

    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.1,
      smoothWheel: true,
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    if (isCartOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [canHover, simplifyMotion, isCartOpen]);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
