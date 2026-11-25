'use client';

import { type ReactNode, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionConfig } from 'motion/react';
import { useCartStore } from '@/lib/store/cartStore';

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const isCartOpen = useCartStore((s) => s.isOpen);

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let updateTicker: ((time: number) => void) | null = null;

    const teardown = () => {
      if (updateTicker) {
        gsap.ticker.remove(updateTicker);
        updateTicker = null;
      }
      if (lenisRef.current) {
        lenisRef.current.off('scroll', ScrollTrigger.update);
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };

    const setup = () => {
      teardown();
      if (mediaQuery.matches) {
        return;
      }

      const lenis = new Lenis({
        duration: 1.15,
        smoothWheel: true,
        autoRaf: false,
      });

      lenisRef.current = lenis;
      lenis.on('scroll', ScrollTrigger.update);

      updateTicker = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(updateTicker);
      gsap.ticker.lagSmoothing(0);
    };

    setup();

    const handlePreferenceChange = () => {
      setup();
      ScrollTrigger.refresh();
    };

    mediaQuery.addEventListener('change', handlePreferenceChange);

    return () => {
      mediaQuery.removeEventListener('change', handlePreferenceChange);
      teardown();
    };
  }, []);

  useEffect(() => {
    if (!lenisRef.current) return;
    if (isCartOpen) {
      lenisRef.current.stop();
    } else {
      lenisRef.current.start();
    }
  }, [isCartOpen]);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
