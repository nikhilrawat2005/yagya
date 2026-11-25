# Frontend Taste Stack

A portable, drop-in frontend engineering kit combining anti-slop art direction, brand design system tokens, synchronized smooth scroll + GSAP choreography, Three.js/Vanta WebGL, modular React Bits primitives, Vercel Web Interface Guidelines auditing, and Playwright CLI browser QA.

---

## Directory Map

| File / Folder | Purpose |
|---|---|
| `SKILL.md` | Core TasteSkill (`design-taste-frontend`) rules: Brief Inference, Dials, Design System Map, anti-slop guardrails, zero em-dash ban, and Section 14 Pre-Flight Check. |
| `DESIGN-MD-GUIDE.md` | How to combine TasteSkill modes with `VoltAgent/awesome-design-md` brand `DESIGN.md` token files. |
| `MOTION-AND-WEBGL.md` | Implementation rulebook for `lenis`, `gsap` + `@gsap/react`, `vanta` (`three@0.134.2`), and modular `DavidHDev/react-bits` components. |
| `BOILERPLATES.md` | Production TypeScript/React starter templates (`types/vanta.d.ts`, `SmoothScroll.tsx`, `VantaBackground.tsx`, `SplitText.tsx`, `SpotlightCard.tsx`, `MagneticButton.tsx`). |
| `web-design-guidelines/` | Vercel Labs `web-design-guidelines` skill (`SKILL.md` + `references/command.md`) for `file:line` accessibility, focus, forms, hydration, i18n, and performance audits. |
| `scripts/audit-frontend.mjs` | Zero-dependency Node script to scan target project code for em-dashes, `h-screen`, scroll listeners, `transition-all`, and eyebrow count violations. |
| `PLAYWRIGHT-QA.md` | Machine-level setup and automated browser QA runbook using `@playwright/cli`. |
| `MASTER-PROMPT.md` | Quick-trigger and full execution prompts to run this entire stack in any new or existing React/Next.js project. |

---

## One-Time Machine Setup (Playwright CLI)

Everything inside this folder is portable markdown specs and code templates, except Playwright CLI which runs as a global terminal tool:

```bash
npm install -g @playwright/cli@latest
playwright-cli install-browser chromium
```

(Or invoke without global install via `npx @playwright/cli`.)

---

## Usage in Any React / Next.js Project

1. Drop this `frontend-taste-stack` folder into the target project's workspace.
2. Optional: If targeting a specific brand aesthetic from `VoltAgent/awesome-design-md`, fetch its `DESIGN.md` into the project root (see `DESIGN-MD-GUIDE.md`).
3. Copy the prompt inside `MASTER-PROMPT.md`, paste it to your AI coding agent, and fill in your target brief or redesign goal.
