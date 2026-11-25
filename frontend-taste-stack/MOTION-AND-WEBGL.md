# Motion and WebGL Implementation Rulebook

This rulebook extends `SKILL.md` (`design-taste-frontend`) with production rules for **Lenis** (`darkroomengineering/lenis`), **GSAP** (`greensock/GSAP`), **Vanta.js** (`tengbao/vanta`), and modular **React Bits** (`DavidHDev/react-bits`) primitives.

Every rule here inherits `SKILL.md` constraints: zero em-dashes (`—`) or en-dashes (`–`), strict `'use client'` leaf isolation, mandatory `prefers-reduced-motion` degradation, WCAG AA contrast, and no AI-purple defaults.

---

## 1. Dial Gating and Activation Thresholds

Do not install or mount heavy motion and WebGL runtimes by default. Gate every capability against the project's declared `MOTION_INTENSITY` dial (`SKILL.md` Section 1):

| `MOTION_INTENSITY` | Smooth Scroll (`lenis`) | Scroll Choreography (`gsap`) | WebGL Backdrop (`vanta`) | Interactive Primitives (`react-bits`) |
|---|---|---|---|---|
| **1 to 3 (Static)** | Banned. Use native scroll. | Banned. Static layout only. | Banned. Static CSS surfaces only. | Banned. Standard CSS `:hover` and `:active` only. |
| **4 to 7 (Fluid)** | Optional. Enable only if scroll pacing serves the brand. | Light use only (hero `SplitText` or subtle scrubbed accent). Prefer `motion/react` `whileInView` for standard reveals. | Optional. Only when brief calls for atmospheric depth and contrast + LCP stay green. | Selective use (`SpotlightCard`, `MagneticButton`, `SplitText`) where motivated. |
| **8 to 10 (Cinematic)** | Recommended. Synced with `gsap.ticker`. | Full choreography (`StickyStack`, `HorizontalPan`, `SplitText`). | Allowed (max 1 canvas per page) with static reduced-motion fallback. | Full selective integration across key conversion and showcase moments. |

Rule from `SKILL.md` Section 5: **Motion must be motivated.** Before adding any ScrollTrigger, Vanta canvas, or React Bits effect, state in one sentence whether it serves hierarchy, storytelling, feedback, or state transition. If the only reason is "it looks cool," remove it.

---

## 2. Exact Dependencies and Compatibility

Always inspect `package.json` before importing any package (`SKILL.md` Section 3.F). Install only the packages required by the declared dials.

### 2.A Core Motion and Smooth Scroll Stack

```bash
npm install lenis gsap @gsap/react motion
```

Package roles and exact imports:
- `lenis`: Unified package from Darkroom Engineering (`import Lenis from "lenis"` and `import "lenis/dist/lenis.css"`). Never install deprecated `@studio-freight/lenis` or `@studio-freight/react-lenis`.
- `gsap`: Core engine and `ScrollTrigger` (`import gsap from "gsap"` and `import { ScrollTrigger } from "gsap/ScrollTrigger"`).
- `@gsap/react`: Official React hook (`import { useGSAP } from "@gsap/react"`).
- `motion`: Modern Framer Motion package (`import { motion, useMotionValue, useSpring, useMotionTemplate, useReducedMotion } from "motion/react"`). Prefer `motion/react` over legacy `framer-motion` imports.

### 2.B WebGL Stack (Only When Vanta Is Used)

```bash
npm install vanta three@0.134.2
npm install -D @types/three@0.134.2
```

Compatibility lock:
- **Pin `three@0.134.2` and `@types/three@0.134.2` when using `vanta`.** Vanta (`vanta@0.5.24+`) is compiled against Three.js `r134`. Newer Three.js versions (`r150+`) removed legacy properties and shader helpers, causing runtime WebGL crashes inside `FOG`, `WAVES`, `NET`, `DOTS`, and `HALO`.
- `vanta` does not ship TypeScript `.d.ts` definitions. Add `types/vanta.d.ts` (provided in `BOILERPLATES.md`) so strict TypeScript (`tsc --noEmit`) passes without suppressing errors with `@ts-ignore`.

### 2.C Modular React Bits Rule (`DavidHDev/react-bits`)

Never install monolithic template packs or copy unvetted third-party UI kits that introduce conflicting animation libraries or hardcoded colors.

Implement only the needed React Bits primitives locally inside `components/react-bits/`:
- Included in `BOILERPLATES.md`: `SplitText.tsx`, `SpotlightCard.tsx`, `MagneticButton.tsx`.
- For any additional component from `DavidHDev/react-bits`, pull the TypeScript + Tailwind flavor (`-TS-TW`) via the official CLI or adapt the component source locally:

```bash
# Option 1: shadcn CLI (recommended when shadcn is configured)
npx shadcn@latest add @react-bits/<ComponentName>-TS-TW

# Option 2: jsrepo registry
npx jsrepo@latest add https://reactbits.dev/r/<ComponentName>-TS-TW
```

After pulling or adapting any React Bits component locally, you MUST sanitize it before shipping:
1. Ensure `'use client'` is at line 1 and TypeScript types are strict.
2. Replace any hardcoded purple/neon/pure-black/pure-white hex values with the project's locked palette tokens (`SKILL.md` Section 4.2 and Section 8).
3. Enforce the project's locked corner-radius scale (`SKILL.md` Section 4.4).
4. Add `prefers-reduced-motion` degradation (`useReducedMotion()` or CSS media query) so the component remains 100% usable and readable when motion is disabled.
5. Check `package.json` for any extra dependency pulled by that component (such as `three` or `gsap`) and ensure it obeys Sections 2.A, 2.B, and 5.C (never mixing GSAP and `motion/react` on the same DOM node).
6. Remove any hand-rolled decorative SVG icons and replace them with the project's single icon family (`@phosphor-icons/react`, `hugeicons-react`, `@radix-ui/react-icons`, or `@tabler/icons-react`).

---

## 3. Architecture and `'use client'` Leaf Isolation

Following `SKILL.md` Section 3.A:
- Keep `app/layout.tsx` and `app/page.tsx` as **Server Components** whenever using Next.js App Router. Never slap `'use client'` on a root layout or full page just to mount Lenis, GSAP, or Vanta.
- Isolate `SmoothScroll` in `components/providers/SmoothScroll.tsx` (`'use client'`), wrapping `{children}` inside `app/layout.tsx`.
- Isolate `VantaBackground` in `components/webgl/VantaBackground.tsx` (`'use client'`) and import it dynamically or render it as a leaf backdrop behind Server Component content.
- Keep `SplitText`, `SpotlightCard`, and `MagneticButton` as small, memoizable `'use client'` leaf components that accept serializable props or React `children`.

---

## 4. Lenis + GSAP Sync Rules

Running Lenis's internal `requestAnimationFrame` loop alongside GSAP's ticker causes frame drift and visible jitter during scrubbed or pinned `ScrollTrigger` animations. Synchronize them through GSAP's single ticker.

### 4.A Mandatory Sync Sequence

1. **Import Lenis CSS**: Always import `lenis/dist/lenis.css` inside `SmoothScroll.tsx` (or global styles) to handle `html`/`body` height rules, `iframe` pointer safety during scroll, and `[data-lenis-prevent]` containers.
2. **Disable internal RAF**: Pass `autoRaf: false` when constructing `new Lenis({ autoRaf: false, ... })`.
3. **Bridge scroll events to ScrollTrigger**:
   ```ts
   lenis.on("scroll", ScrollTrigger.update);
   ```
4. **Drive Lenis from GSAP ticker (ms conversion)**:
   ```ts
   const update = (time: number) => {
     lenis.raf(time * 1000);
   };
   gsap.ticker.add(update);
   ```
   GSAP passes `time` in seconds; `lenis.raf()` requires milliseconds.
5. **Disable GSAP lag smoothing**:
   ```ts
   gsap.ticker.lagSmoothing(0);
   ```
   Lag smoothing attempts to fast-forward after a dropped frame, which creates rubber-band jumps against smooth scroll inertia.

### 4.B Reduced Motion Bypass

Check `window.matchMedia("(prefers-reduced-motion: reduce)")` on mount and subscribe to changes:
- If reduced motion is active, **do not initialize Lenis** (or immediately call `destroy()` and detach the ticker callback).
- Native browser scrolling remains active with zero interception.

### 4.C Strict Cleanup

Every `useEffect` that initializes Lenis must clean up in exact reverse order:

```ts
return () => {
  lenis.off("scroll", ScrollTrigger.update);
  gsap.ticker.remove(update);
  lenis.destroy();
};
```

### 4.D Scroll Hijack Safety

- Add `data-lenis-prevent` to any independently scrollable region inside the page (open modals, drawers, code panels, inner scroll containers) so wheel events do not leak to the document root.
- Never combine Lenis with `window.addEventListener("scroll", ...)` (`SKILL.md` Section 5.D hard ban).

---

## 5. GSAP and ScrollTrigger Discipline

### 5.A Plugin Registration and Scoping

Register plugins once outside components:

```ts
gsap.registerPlugin(ScrollTrigger, useGSAP);
```

Always use `useGSAP()` from `@gsap/react` with a container ref passed as `scope`:

```ts
useGSAP(
  () => {
    // Selectors like ".reveal-item" are scoped strictly inside containerRef
  },
  { scope: containerRef, dependencies: [shouldReduceMotion] }
);
```

Never query the document globally with `document.querySelectorAll` inside React components. `useGSAP` creates a `gsap.context()` bound to `scope` and reverts all tweens, timelines, inline styles, and `ScrollTrigger` instances on unmount or dependency change.

### 5.B GPU-Only Animated Properties

Per `SKILL.md` Section 6.A:
- Animate ONLY `transform` (`x`, `y`, `scale`, `rotation`, `skewY`), `opacity`, and `clipPath`.
- NEVER animate layout properties (`top`, `left`, `right`, `bottom`, `width`, `height`, `margin`, `padding`, `fontSize`).
- Use `will-change: transform` sparingly and only during active scroll or reveal states, never permanently on entire page sections.

### 5.C Strict DOM-Node Separation (GSAP vs. `motion/react`)

Per `SKILL.md` Section 10: **never mix GSAP/Three.js with Motion on the same DOM element or competing render tree.**

- If a section uses GSAP `ScrollTrigger` (`pin: true` or `scrub`), keep the pinned/scrubbed wrapper pure HTML/GSAP and isolate any `motion/react` micro-interaction (like `MagneticButton` or `SpotlightCard`) on a child leaf node whose `transform` is independent of the GSAP-animated node.
- Never attach `motion.div` (`animate`, `whileInView`, `style={{ x, y }}`) to the same element targeted by `gsap.to` / `gsap.from`.

### 5.D Pin and Scrub Invariants

When using `StickyStack` or `HorizontalPan` (`SKILL.md` Sections 5.A and 5.B):
- Always start pins at `"top top"` so animations do not trigger mid-scroll with half-clipped slides.
- Set `invalidateOnRefresh: true` when scroll distances depend on viewport width or `scrollWidth` (such as `HorizontalPan`).
- Call `ScrollTrigger.refresh()` only after dynamic layout height changes (such as font load or image dimension resolution), never inside a scroll loop.

---

## 6. Vanta.js SSR and Memory Safety

### 6.A Client-Only Dynamic Imports

Vanta bundles reference `window`, `document`, and WebGL globals on import. Never use static top-level `import WAVES from "vanta/dist/vanta.waves.min"` in Next.js App Router pages or components that may be pre-rendered on the server.

Inside `useEffect` in a `'use client'` component:
1. Track a `cancelled` boolean so async imports resolving after unmount (especially under React 18/19 Strict Mode double-mount) never initialize an orphaned WebGL context.
2. Dynamically import `three` (`const THREE = await import("three")`) and the specific Vanta module (`await import("vanta/dist/vanta.waves.min")`).
3. Pass `THREE` explicitly in the Vanta options object (`THREE: THREE`). Never rely on `window.THREE`.

### 6.B Layering, Contrast, and Pointer Isolation

- Wrap the Vanta canvas target in a container with `pointer-events-none absolute inset-0 -z-10 overflow-hidden` and `aria-hidden="true"`.
- Never place interactive content inside the Vanta target `div` itself. Render foreground content in a sibling layer (`relative z-10` or explicit project z-index token) so Vanta's `<canvas>` injection and resize observers do not disturb foreground layout.
- Apply a subtle gradient or tinted scrim over busy WebGL regions when needed so all foreground headlines, body copy, and buttons pass WCAG AA contrast (`>= 4.5:1` body, `>= 3:1` large display).

### 6.C Palette Calibration (`SKILL.md` Section 4.2 and Section 8)

- Vanta's built-in defaults lean toward neon magenta, violet, and cyan (for example `HALO` and `NET` defaults). **Always override Vanta color props explicitly** using the project's locked background neutral and single locked accent color.
- Avoid pure `#000000` (`0x000000`) and pure `#ffffff` (`0xffffff`); use off-black (such as `0x09090b` or `0x111113`) or off-white (such as `0xfafaf9` or `0xf4f4f5`) matching the locked page theme.
- If the page supports light and dark mode, listen to the resolved theme and pass matching `backgroundColor` and accent/secondary colors cleanly.

### 6.D WebGL Context Limits and Cleanup

- **Maximum 1 Vanta canvas per page.** Browsers cap active WebGL contexts (typically 8 to 16 total across tabs), and multiple animated 3D canvases destroy mobile battery and INP/FPS.
- Wrap Vanta creation in `try / catch`. If WebGL is blocked or unavailable on the user's device, fail silently to the container's static CSS background.
- Skip Vanta initialization completely when `prefers-reduced-motion: reduce` is true. Render a static background gradient or solid surface instead.
- Always call `effect.destroy()` inside the `useEffect` cleanup function to release the WebGL context, event listeners, and animation loop.

---

## 7. React Bits Integration Rules

### 7.A `SplitText`

- **Screen-reader safety:** Splitting text into dozens of `<span>` elements causes screen readers to spell out fragments or pause between words. Render the full string cleanly for assistive technology (an `aria-label` on the semantic element plus `aria-hidden="true"` on visual word/char spans, or an `sr-only` full-text span) so keyboard and screen-reader users hear natural prose.
- **Italic descender clearance (`SKILL.md` Section 4.1):** Masked text reveals use `overflow-hidden` wrappers around words or lines. If the headline contains italic words with descenders (`y`, `g`, `j`, `p`, `q`), tight line heights clip the bottom of glyphs. Apply `leading-[1.1]` minimum on the heading and `pb-[0.12em] -mb-[0.12em]` on mask wrappers.
- **Reduced motion:** When `useReducedMotion()` is true, render the text immediately at `opacity: 1` with zero offset and no GSAP tween.

### 7.B `SpotlightCard`

- **Zero `useState` pointer tracking (`SKILL.md` Section 3.B):** Track cursor coordinates exclusively with `motion/react` `useMotionValue` + `useMotionTemplate`. Never call `setState` inside `onMouseMove` or `onPointerMove`.
- **Card restraint (`SKILL.md` Section 4.4):** Use `SpotlightCard` only when elevation communicates real hierarchy (do not turn 10-row spec lists or dense cockpit metrics into spotlight cards).
- **Shape and color locks:** Honor the page's single corner-radius scale and single accent color. Default spotlight sheen should use subtle neutral opacity or the locked accent at low alpha (`<= 0.16`), never AI-purple neon glows.
- **Coarse pointer & reduced motion:** Ignore pointer moves for touch inputs (`e.pointerType !== "mouse"`) and hide the spotlight layer when `useReducedMotion()` is true.

### 7.C `MagneticButton`

- **Physics without re-renders (`SKILL.md` Section 3.B & 5):** Drive `x` and `y` offsets with `useMotionValue` + `useSpring` (`stiffness: 240, damping: 18, mass: 0.4`).
- **Tactile & contrast locks (`SKILL.md` Section 4.5):**
  - Maintain `>= 4.5:1` text contrast across light and dark modes.
  - Enforce `whitespace-nowrap` so primary CTA labels never wrap to 2 lines at desktop.
  - Keep `cursor-pointer` and physical `:active` press (`active:scale-[0.98]`).
  - Match the locked corner-radius token (`rounded-none`, `rounded-xl`, or `rounded-full`).
- **Reduced motion & touch safety:** Disable magnetic translation when `useReducedMotion()` is true or when `window.matchMedia("(pointer: coarse)").matches` is true. Keep `maxOffset` restrained (typically `6px` to `10px`) so the hit target never flees from the cursor.

---

## 8. Motion and WebGL Pre-Flight Addendum

Verify every box below in addition to `SKILL.md` Section 14 before declaring work complete:

- [ ] `MOTION_INTENSITY <= 3` projects contain zero Lenis, GSAP, Vanta, or magnetic runtime code.
- [ ] `SmoothScroll` sets `autoRaf: false`, hooks `lenis.on("scroll", ScrollTrigger.update)`, drives `lenis.raf(time * 1000)` via `gsap.ticker`, sets `gsap.ticker.lagSmoothing(0)`, imports `lenis/dist/lenis.css`, and removes/destroys all listeners on unmount.
- [ ] `SmoothScroll` bypasses Lenis cleanly when `prefers-reduced-motion: reduce` is active.
- [ ] All GSAP animations use `useGSAP()` with an explicit `scope` ref, `gsap.registerPlugin(ScrollTrigger, useGSAP)`, and animate GPU-only properties (`transform`, `opacity`, `clipPath`).
- [ ] Zero DOM nodes share both GSAP tweens/ScrollTriggers and `motion/react` animations.
- [ ] Zero `window.addEventListener("scroll", ...)` listeners anywhere in the codebase.
- [ ] `VantaBackground` loads `three` and `vanta/dist/vanta.*.min` dynamically inside `useEffect` with an async cancellation flag, injects `THREE` explicitly, uses `pointer-events-none -z-10` and `aria-hidden="true"`, calls `effect.destroy()` on unmount, and degrades cleanly under WebGL failure or reduced motion.
- [ ] At most 1 active Vanta WebGL canvas exists on any page, and its palette matches the locked `SKILL.md` theme and accent (no AI-purple defaults).
- [ ] `SplitText` preserves full screen-reader text and reserves descender clearance for italic glyphs (`y`, `g`, `j`, `p`, `q`).
- [ ] `SpotlightCard` and `MagneticButton` use `useMotionValue` / `useSpring` (zero `useState` on pointer move), honor the shape/color locks, enforce single-line CTA labels (`whitespace-nowrap`), and pass WCAG AA contrast in both light and dark modes.
- [ ] Zero em-dashes (`—`) or en-dashes (`–`) appear in any component code, comments, or rendered text.
