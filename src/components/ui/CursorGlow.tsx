'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useInteractiveCapabilities } from '@/lib/motion/useInteractiveCapabilities';

/**
 * Subtle ambient warm pointer glow for desktop devices.
 * Automatically disabled on touch devices and when prefers-reduced-motion is enabled.
 */
export function CursorGlow() {
  const { enableInteractiveMotion } = useInteractiveCapabilities();
  const [visible, setVisible] = useState(false);

  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);

  const x = useSpring(mouseX, { stiffness: 180, damping: 28, mass: 0.45 });
  const y = useSpring(mouseY, { stiffness: 180, damping: 28, mass: 0.45 });

  useEffect(() => {
    if (!enableInteractiveMotion) return;

    const handleMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      mouseX.set(e.clientX - 180);
      mouseY.set(e.clientY - 180);
      setVisible(true);
    };

    const handleLeave = () => setVisible(false);

    window.addEventListener('pointermove', handleMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      document.documentElement.removeEventListener('mouseleave', handleLeave);
    };
  }, [enableInteractiveMotion, mouseX, mouseY]);

  if (!enableInteractiveMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ x, y }}
      animate={{ opacity: visible ? 0.38 : 0 }}
      transition={{ duration: 0.25 }}
      className="pointer-events-none fixed top-0 left-0 z-30 h-[360px] w-[360px] rounded-full mix-blend-multiply"
    >
      <div
        className="h-full w-full rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(242,140,27,0.22) 0%, rgba(251,201,138,0.14) 42%, transparent 72%)',
        }}
      />
    </motion.div>
  );
}
