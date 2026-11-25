# Production Motion, WebGL, and React Bits Boilerplates

Copy-pasteable TypeScript/React starter templates aligned with `SKILL.md` and `MOTION-AND-WEBGL.md`.

All templates include:
- Strict TypeScript types (no implicit `any`)
- `'use client'` leaf isolation
- `prefers-reduced-motion` support
- Proper `useEffect` / `useGSAP` cleanup
- Zero `useState` for continuous pointer or scroll tracking
- Zero em-dashes (`—`) or en-dashes (`–`)

---

## 0. Required Packages and Type Declarations

### Install Commands

```bash
# Core motion and smooth scroll stack
npm install lenis gsap @gsap/react motion

# Add WebGL stack only when VantaBackground is used
npm install vanta three@0.134.2
npm install -D @types/three@0.134.2
```

### `types/vanta.d.ts`

Create this file once when using `VantaBackground.tsx` so strict TypeScript resolves all five Vanta effect modules cleanly.

```ts
declare module "vanta/dist/vanta.waves.min" {
  import type * as THREE from "three";

  export interface VantaBaseOptions {
    el: HTMLElement | string;
    THREE?: typeof THREE;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    backgroundColor?: number;
    color?: number;
  }

  export interface VantaEffectInstance {
    destroy: () => void;
    resize: () => void;
    setOptions?: (options: Record<string, unknown>) => void;
  }

  export interface VantaWavesOptions extends VantaBaseOptions {
    shininess?: number;
    waveHeight?: number;
    waveSpeed?: number;
    zoom?: number;
  }

  const WAVES: (options: VantaWavesOptions) => VantaEffectInstance;
  export default WAVES;
}

declare module "vanta/dist/vanta.net.min" {
  import type {
    VantaBaseOptions,
    VantaEffectInstance,
  } from "vanta/dist/vanta.waves.min";

  export interface VantaNetOptions extends VantaBaseOptions {
    points?: number;
    maxDistance?: number;
    spacing?: number;
    showDots?: boolean;
  }

  const NET: (options: VantaNetOptions) => VantaEffectInstance;
  export default NET;
}

declare module "vanta/dist/vanta.fog.min" {
  import type {
    VantaBaseOptions,
    VantaEffectInstance,
  } from "vanta/dist/vanta.waves.min";

  export interface VantaFogOptions extends VantaBaseOptions {
    highlightColor?: number;
    midtoneColor?: number;
    lowlightColor?: number;
    baseColor?: number;
    blurFactor?: number;
    speed?: number;
    zoom?: number;
  }

  const FOG: (options: VantaFogOptions) => VantaEffectInstance;
  export default FOG;
}

declare module "vanta/dist/vanta.dots.min" {
  import type {
    VantaBaseOptions,
    VantaEffectInstance,
  } from "vanta/dist/vanta.waves.min";

  export interface VantaDotsOptions extends VantaBaseOptions {
    color2?: number;
    size?: number;
    spacing?: number;
    showLines?: boolean;
  }

  const DOTS: (options: VantaDotsOptions) => VantaEffectInstance;
  export default DOTS;
}

declare module "vanta/dist/vanta.halo.min" {
  import type {
    VantaBaseOptions,
    VantaEffectInstance,
  } from "vanta/dist/vanta.waves.min";

  export interface VantaHaloOptions extends VantaBaseOptions {
    baseColor?: number;
    size?: number;
    amplitudeFactor?: number;
    xOffset?: number;
    yOffset?: number;
  }

  const HALO: (options: VantaHaloOptions) => VantaEffectInstance;
  export default HALO;
}
```

---

## 1. `components/providers/SmoothScroll.tsx`

Root client provider syncing Lenis (`autoRaf: false`) with GSAP `ScrollTrigger` and `gsap.ticker`, with automatic `prefers-reduced-motion` bypass and full cleanup.

```tsx
"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis, { type LenisOptions } from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface SmoothScrollProps {
  children: ReactNode;
  options?: Omit<LenisOptions, "autoRaf">;
  disabled?: boolean;
}

export function SmoothScroll({
  children,
  options,
  disabled = false,
}: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (disabled || typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let updateTicker: ((time: number) => void) | null = null;

    const teardown = () => {
      if (updateTicker) {
        gsap.ticker.remove(updateTicker);
        updateTicker = null;
      }
      if (lenisRef.current) {
        lenisRef.current.off("scroll", ScrollTrigger.update);
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
        ...options,
        autoRaf: false,
      });

      lenisRef.current = lenis;
      lenis.on("scroll", ScrollTrigger.update);

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

    mediaQuery.addEventListener("change", handlePreferenceChange);

    return () => {
      mediaQuery.removeEventListener("change", handlePreferenceChange);
      teardown();
    };
  }, [disabled, options]);

  return <>{children}</>;
}
```

---

## 2. `components/webgl/VantaBackground.tsx`

Dynamic, SSR-safe multi-effect Vanta wrapper (`WAVES`, `NET`, `FOG`, `DOTS`, `HALO`) with explicit `THREE` injection, `pointer-events-none -z-10` isolation, reduced-motion static fallback, and guaranteed `destroy()` cleanup.

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import type { VantaEffectInstance } from "vanta/dist/vanta.waves.min";

export type VantaEffectName = "WAVES" | "NET" | "FOG" | "DOTS" | "HALO";

export interface VantaPalette {
  backgroundColor: number;
  color: number;
  secondaryColor?: number;
  highlightColor?: number;
  midtoneColor?: number;
  lowlightColor?: number;
  baseColor?: number;
}

export interface VantaBackgroundProps {
  effect?: VantaEffectName;
  /**
   * Override default off-black + restrained cobalt palette to match your
   * locked SKILL.md theme and single accent color.
   */
  palette?: VantaPalette;
  interactive?: boolean;
  className?: string;
  speed?: number;
  zoom?: number;
}

const DEFAULT_PALETTE: VantaPalette = {
  backgroundColor: 0x09090b,
  color: 0x2563eb,
  secondaryColor: 0x18181b,
  highlightColor: 0x3b82f6,
  midtoneColor: 0x1e293b,
  lowlightColor: 0x09090b,
  baseColor: 0x09090b,
};

export function VantaBackground({
  effect = "FOG",
  palette = DEFAULT_PALETTE,
  interactive = true,
  className = "",
  speed = 1.0,
  zoom = 1.0,
}: VantaBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReducedMotion(mediaQuery.matches);
    syncPreference();

    mediaQuery.addEventListener("change", syncPreference);
    return () => mediaQuery.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    if (reducedMotion || !containerRef.current || typeof window === "undefined") {
      return;
    }

    let cancelled = false;
    let instance: VantaEffectInstance | null = null;

    const initVanta = async () => {
      try {
        const THREE = await import("three");
        if (cancelled || !containerRef.current) return;

        const baseOptions = {
          el: containerRef.current,
          THREE,
          mouseControls: interactive,
          touchControls: interactive,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1,
          scaleMobile: 1,
          backgroundColor: palette.backgroundColor,
          color: palette.color,
        };

        if (effect === "WAVES") {
          const mod = await import("vanta/dist/vanta.waves.min");
          if (cancelled || !containerRef.current) return;
          instance = mod.default({
            ...baseOptions,
            shininess: 32,
            waveHeight: 16,
            waveSpeed: speed,
            zoom,
          });
        } else if (effect === "NET") {
          const mod = await import("vanta/dist/vanta.net.min");
          if (cancelled || !containerRef.current) return;
          instance = mod.default({
            ...baseOptions,
            points: 9,
            maxDistance: 21,
            spacing: 16,
            showDots: true,
          });
        } else if (effect === "DOTS") {
          const mod = await import("vanta/dist/vanta.dots.min");
          if (cancelled || !containerRef.current) return;
          instance = mod.default({
            ...baseOptions,
            color2: palette.secondaryColor ?? palette.color,
            size: 2.8,
            spacing: 32,
            showLines: false,
          });
        } else if (effect === "HALO") {
          const mod = await import("vanta/dist/vanta.halo.min");
          if (cancelled || !containerRef.current) return;
          instance = mod.default({
            ...baseOptions,
            baseColor: palette.baseColor ?? palette.backgroundColor,
            size: 1.15,
            amplitudeFactor: 1.1,
            xOffset: 0.08,
            yOffset: 0.0,
          });
        } else {
          const mod = await import("vanta/dist/vanta.fog.min");
          if (cancelled || !containerRef.current) return;
          instance = mod.default({
            ...baseOptions,
            highlightColor: palette.highlightColor ?? palette.color,
            midtoneColor: palette.midtoneColor ?? 0x18181b,
            lowlightColor: palette.lowlightColor ?? palette.backgroundColor,
            baseColor: palette.baseColor ?? palette.backgroundColor,
            blurFactor: 0.6,
            speed,
            zoom,
          });
        }
      } catch {
        // Graceful fallback to the container's CSS background if WebGL fails.
      }
    };

    void initVanta();

    return () => {
      cancelled = true;
      if (instance) {
        instance.destroy();
        instance = null;
      }
    };
  }, [
    effect,
    interactive,
    palette.backgroundColor,
    palette.baseColor,
    palette.color,
    palette.highlightColor,
    palette.lowlightColor,
    palette.midtoneColor,
    palette.secondaryColor,
    reducedMotion,
    speed,
    zoom,
  ]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    />
  );
}
```

---

## 3. `components/react-bits/SplitText.tsx`

GSAP masked word or character reveal with `useGSAP()` scoping, `ScrollTrigger` or mount mode, screen-reader preservation, italic descender clearance, and `useReducedMotion()` degradation.

```tsx
"use client";

import { useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "motion/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "p" | "span";

export interface SplitTextProps {
  text: string;
  as?: HeadingTag;
  splitBy?: "words" | "chars";
  trigger?: "mount" | "scroll";
  delay?: number;
  stagger?: number;
  duration?: number;
  className?: string;
}

export function SplitText({
  text,
  as: Component = "h2",
  splitBy = "words",
  trigger = "scroll",
  delay = 0,
  stagger = 0.045,
  duration = 0.7,
  className = "",
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const words = useMemo(() => text.trim().split(/\s+/), [text]);

  useGSAP(
    () => {
      if (shouldReduceMotion) {
        return;
      }

      const targets = gsap.utils.toArray<HTMLElement>(".split-unit");
      if (targets.length === 0) {
        return;
      }

      const tweenVars: gsap.TweenVars = {
        yPercent: 0,
        opacity: 1,
        duration,
        delay,
        stagger,
        ease: "power3.out",
      };

      if (trigger === "scroll") {
        tweenVars.scrollTrigger = {
          trigger: containerRef.current,
          start: "top 86%",
          once: true,
        };
      }

      gsap.fromTo(
        targets,
        { yPercent: 110, opacity: 0 },
        tweenVars
      );
    },
    {
      scope: containerRef,
      dependencies: [text, splitBy, trigger, delay, stagger, duration, shouldReduceMotion],
    }
  );

  if (shouldReduceMotion) {
    return (
      <Component className={`leading-[1.1] ${className}`}>
        {text}
      </Component>
    );
  }

  return (
    <div ref={containerRef} className="inline-block max-w-full">
      <Component className={`leading-[1.1] ${className}`}>
        <span className="sr-only">{text}</span>
        <span aria-hidden="true" className="inline-flex flex-wrap gap-x-[0.26em]">
          {words.map((word, wordIndex) => {
            if (splitBy === "words") {
              return (
                <span
                  key={`${word}-${wordIndex}`}
                  className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em]"
                >
                  <span className="split-unit inline-block will-change-transform">
                    {word}
                  </span>
                </span>
              );
            }

            return (
              <span
                key={`${word}-${wordIndex}`}
                className="inline-flex overflow-hidden pb-[0.12em] -mb-[0.12em]"
              >
                {Array.from(word).map((char, charIndex) => (
                  <span
                    key={`${char}-${charIndex}`}
                    className="split-unit inline-block will-change-transform"
                  >
                    {char}
                  </span>
                ))}
              </span>
            );
          })}
        </span>
      </Component>
    </div>
  );
}
```

---

## 4. `components/react-bits/SpotlightCard.tsx`

Cursor-tracking radial spotlight surface and border card built with `motion/react` `useMotionValue` and `useMotionTemplate`. Zero `useState` on pointer move, touch-safe, reduced-motion safe, and dual-mode neutral by default.

```tsx
"use client";

import type { PointerEvent, ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "motion/react";

export interface SpotlightCardProps {
  children: ReactNode;
  /**
   * Subtle radial highlight color matching your single locked accent or neutral surface.
   */
  spotlightColor?: string;
  radiusClassName?: string;
  className?: string;
}

export function SpotlightCard({
  children,
  spotlightColor = "rgba(37, 99, 235, 0.14)",
  radiusClassName = "rounded-2xl",
  className = "",
}: SpotlightCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const mouseX = useMotionValue(-999);
  const mouseY = useMotionValue(-999);
  const spotlightOpacity = useMotionValue(0);

  const background = useMotionTemplate`radial-gradient(360px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 75%)`;

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || event.pointerType !== "mouse") {
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
    spotlightOpacity.set(1);
  };

  const handlePointerLeave = () => {
    spotlightOpacity.set(0);
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`group relative overflow-hidden border border-zinc-200 bg-zinc-50/90 p-6 transition-colors duration-200 dark:border-zinc-800 dark:bg-zinc-900/80 ${radiusClassName} ${className}`}
    >
      {!shouldReduceMotion && (
        <motion.div
          aria-hidden="true"
          className={`pointer-events-none absolute -inset-px transition-opacity duration-300 ${radiusClassName}`}
          style={{
            background,
            opacity: spotlightOpacity,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
```

---

## 5. `components/react-bits/MagneticButton.tsx`

Tactile magnetic CTA button or anchor using `motion/react` `useMotionValue` + `useSpring`. Zero `useState` for cursor physics, enforces single-line labels (`whitespace-nowrap`), WCAG AA contrast, tactile `:active` push, and reduced-motion/touch collapse.

```tsx
"use client";

import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

export interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "ghost";
  radiusClassName?: string;
  maxOffset?: number;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
}

const VARIANT_CLASSES: Record<NonNullable<MagneticButtonProps["variant"]>, string> = {
  primary:
    "bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200",
  secondary:
    "border border-zinc-300 bg-zinc-100 text-zinc-900 hover:bg-zinc-200/80 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800",
  ghost:
    "border border-zinc-300/80 bg-transparent text-zinc-900 hover:bg-zinc-900/5 dark:border-zinc-700/80 dark:text-zinc-100 dark:hover:bg-zinc-100/10",
};

export function MagneticButton({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  radiusClassName = "rounded-full",
  maxOffset = 8,
  disabled = false,
  ariaLabel,
  className = "",
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springX = useSpring(rawX, { stiffness: 240, damping: 18, mass: 0.4 });
  const springY = useSpring(rawY, { stiffness: 240, damping: 18, mass: 0.4 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(pointer: coarse)");
    const syncPointer = () => setIsCoarsePointer(mediaQuery.matches);
    syncPointer();

    mediaQuery.addEventListener("change", syncPointer);
    return () => mediaQuery.removeEventListener("change", syncPointer);
  }, []);

  const magnetDisabled = Boolean(shouldReduceMotion) || isCoarsePointer || disabled;

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (magnetDisabled || event.pointerType !== "mouse" || !buttonRef.current) {
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
    `inline-flex items-center justify-center gap-2 whitespace-nowrap px-6 py-3 text-sm font-medium tracking-tight cursor-pointer select-none transition-colors duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:focus-visible:outline-zinc-100 disabled:pointer-events-none disabled:opacity-50 ${VARIANT_CLASSES[variant]} ${radiusClassName} ${className}`;

  return (
    <motion.div
      ref={buttonRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={magnetDisabled ? undefined : { x: springX, y: springY }}
      className="inline-block"
    >
      {href ? (
        <a href={href} aria-label={ariaLabel} className={sharedClasses}>
          {children}
        </a>
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
```
