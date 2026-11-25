# Master Execution Prompts

Drop the `frontend-taste-stack` folder into the root of any React or Next.js project, then copy one of the two prompts below.

---

## Option A: Short Quick-Trigger Prompt (Recommended)

Use this when `frontend-taste-stack` is already inside your project root:

```markdown
Read `frontend-taste-stack/MASTER-PROMPT.md` and every specification file it references (`SKILL.md`, `DESIGN-MD-GUIDE.md`, `MOTION-AND-WEBGL.md`, `BOILERPLATES.md`, `web-design-guidelines/SKILL.md`, `web-design-guidelines/references/command.md`, and `PLAYWRIGHT-QA.md`). Execute all 4 phases from `MASTER-PROMPT.md` at full depth, completely transforming the frontend without breaking existing routes or functionality.

Target / Brief: [DESCRIBE YOUR PROJECT, BRAND STYLE (e.g. Linear, Vercel, Stripe, Apple), OR ATTACH SCREENSHOTS/ROUTES HERE]
```

---

## Option B: Full Self-Contained Master Prompt

Use this if you want every step spelled out directly in the prompt:

```markdown
You have the `frontend-taste-stack` specification kit in this workspace. Before modifying or writing any code, read the core files in full:
1. `frontend-taste-stack/SKILL.md` (TasteSkill: `design-taste-frontend`)
2. `frontend-taste-stack/DESIGN-MD-GUIDE.md` (plus `DESIGN.md` in the project root, if one exists)
3. `frontend-taste-stack/MOTION-AND-WEBGL.md`
4. `frontend-taste-stack/BOILERPLATES.md`
5. `frontend-taste-stack/web-design-guidelines/SKILL.md` and `frontend-taste-stack/web-design-guidelines/references/command.md`
6. `frontend-taste-stack/PLAYWRIGHT-QA.md`

Follow this exact execution sequence without skipping steps:

### Phase 1: Inspect and Declare
1. Inspect `package.json`, `tsconfig.json`, global CSS, root layout, and existing routes/components. Check whether a `DESIGN.md` exists in the project root. If the brief names a brand preset from `VoltAgent/awesome-design-md` (for example Vercel, Linear, Stripe, Claude, Notion, Apple), fetch its `DESIGN.md` per `frontend-taste-stack/DESIGN-MD-GUIDE.md`.
2. If this is an existing site/app, detect the Redesign Mode (`preserve` vs `overhaul` per `SKILL.md` Section 11) and audit current brand tokens, IA, routes, and AI-slop tells to retire. Keep existing routes, SEO metadata, form field names, and business logic intact while completely upgrading the visual system and motion architecture.
3. Output your one-line **Design Read** (`SKILL.md` Section 0.B):
   `Reading this as: <page kind> for <audience>, with a <vibe> language, leaning toward <design system or aesthetic family>.`
4. Declare explicit dial values (`DESIGN_VARIANCE`, `MOTION_INTENSITY`, `VISUAL_DENSITY`) reasoned from the brief, plus your single locked accent color, corner-radius scale, typography pairing (avoiding `Inter`, `Fraunces`, and `Instrument_Serif` unless justified or specified by `DESIGN.md`), and light/dark token strategy.
5. Only if the design read genuinely diverges, ask ONE clarifying question and stop. Otherwise proceed immediately.

### Phase 2: Dependencies and Architecture Setup
1. Check `package.json` and install only the missing packages required by your declared dials:
   - Motion/Scroll (`MOTION_INTENSITY > 3`): `lenis`, `gsap`, `@gsap/react`, `motion`
   - WebGL (`MOTION_INTENSITY > 4` and motivated by brief): `vanta`, `three@0.134.2`, `@types/three@0.134.2` (pin `0.134.2` for Vanta compatibility)
   - Icons (`SKILL.md` Section 3.C): one approved family (`@phosphor-icons/react`, `hugeicons-react`, `@radix-ui/react-icons`, or `@tabler/icons-react`). Do not install `lucide-react` unless already used or requested, and never mix icon families.
   - Design system (`SKILL.md` Section 2.A) if the brief maps to an official system.
2. If Vanta is used, add `types/vanta.d.ts` from `BOILERPLATES.md`.
3. Implement only the motivated primitives from `BOILERPLATES.md` (and any extra `-TS-TW` components from `DavidHDev/react-bits` sanitized per `MOTION-AND-WEBGL.md` Section 2.C):
   - `components/providers/SmoothScroll.tsx` (only when `MOTION_INTENSITY > 3`; synced with `autoRaf: false`, `ScrollTrigger.update`, `gsap.ticker`, `lagSmoothing(0)`, `lenis/dist/lenis.css`, and `prefers-reduced-motion` bypass)
   - `components/webgl/VantaBackground.tsx` (max 1 canvas per page, dynamic client imports with `THREE` injection, `pointer-events-none -z-10`, palette calibrated to `DESIGN.md` or locked accent, `destroy()` cleanup, static fallback)
   - `components/react-bits/SplitText.tsx`, `SpotlightCard.tsx`, `MagneticButton.tsx` (strict `'use client'` leaf components with `prefers-reduced-motion` support and zero `useState` for continuous cursor/scroll tracking)
4. Keep Next.js App Router layouts and pages as Server Components; isolate interactivity in `'use client'` leaves. Never attach GSAP and `motion/react` animations to the same DOM node.

### Phase 3: Build or Rebuild the Frontend
1. Build/rebuild the UI strictly adhering to `SKILL.md` (and `DESIGN.md` tokens if present):
   - Hero fits within initial `min-h-[100dvh]` viewport (`pt-24` max desktop top padding, max 4 text elements, subtext <= 20 words, CTA visible above the fold with no wrap).
   - Zero AI tells: no AI-purple defaults, no beige+brass premium-consumer defaults, no 3 equal feature cards, no div-based fake screenshots, no decorative status dots, no scroll cues, no section-number eyebrows, and eyebrow count <= ceil(sectionCount / 3).
   - Use real images (image-gen tool first, or `picsum.photos/seed/...`, or explicit slots) and real SVG brand marks for social proof (no plain text logo walls, no category sub-labels).
   - Support both light and dark modes with WCAG AA contrast (>= 4.5:1 body, >= 3:1 large) and consistent shape/color locks.
   - **Zero em-dashes (`—`) or en-dashes (`–`)** anywhere in visible copy, labels, quotes, captions, or code comments.

### Phase 4: Dual Audit and Playwright CLI Verification
1. Run TypeScript (`npx tsc --noEmit`), lint, and build checks and fix every error.
2. Run `node frontend-taste-stack/scripts/audit-frontend.mjs` to catch em-dashes, `h-screen`, scroll listeners, `transition-all`, and excessive eyebrows.
3. Run the **Web Interface Guidelines** audit from `frontend-taste-stack/web-design-guidelines/references/command.md` across all modified UI files (checking accessibility, focus-visible rings, form semantics, hydration safety, i18n formatting, image dimensions, and performance) and fix every finding.
4. Run the **Playwright CLI** QA runbook (`frontend-taste-stack/PLAYWRIGHT-QA.md`) against the running local server (`@playwright/cli`) to verify desktop (`1440x900`) and mobile (`375x812`) layouts, light and dark modes, `prefers-reduced-motion`, console errors, network requests, and CTA wrapping.
5. Walk through EVERY checkbox in `SKILL.md` Section 14 and `MOTION-AND-WEBGL.md` Section 8, fix any gap, and confirm all checks pass before finishing.

Target / Brief: [DESCRIBE YOUR PROJECT, BRAND DESIGN.MD PRESET, OR ATTACH SCREENSHOTS/ROUTES HERE]
```
