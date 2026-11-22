'use client';

import { ReactNode, useEffect } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from 'motion/react';
import { useCartStore } from '@/lib/store/cartStore';

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const shouldReduceMotion = useReducedMotion();
  const isCartOpen = useCartStore((s) => s.isOpen);

  useEffect(() => {
    // Rehydrate cart store on client mount
    useCartStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: true,
    });

    let rafId: number;
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
  }, [shouldReduceMotion, isCartOpen]);

  return <>{children}</>;
}
