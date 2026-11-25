# TasteSkill and Awesome DESIGN.md Integration Guide

This guide connects **TasteSkill** (`https://www.tasteskill.dev/`, `Leonxlnx/taste-skill`) with **VoltAgent Awesome Design MD** (`https://github.com/VoltAgent/awesome-design-md`) so you can combine strict anti-slop engineering with real-world brand design languages in any React or Next.js project.

---

## 1. How TasteSkill Fits Here

`SKILL.md` at the root of this folder IS TasteSkill's flagship **`design-taste-frontend`** skill.

You do not need to install conflicting variants separately. Tune the three dials inside `SKILL.md` Section 1 to activate every TasteSkill mode cleanly:

- **Minimalist / Editorial (`minimalist-ui` mode)**: `DESIGN_VARIANCE: 5-6`, `MOTION_INTENSITY: 3-4`, `VISUAL_DENSITY: 2-3`
- **Premium Consumer / Brand Launch**: `DESIGN_VARIANCE: 7-8`, `MOTION_INTENSITY: 5-7`, `VISUAL_DENSITY: 3-4`
- **Agency / Experimental (`high-end-visual` mode)**: `DESIGN_VARIANCE: 9-10`, `MOTION_INTENSITY: 8-10`, `VISUAL_DENSITY: 3-4`
- **Existing Codebase Upgrade (`redesign` mode)**: Follow `SKILL.md` Section 11 (`preserve` or `overhaul`), auditing existing routes, SEO, and tokens before editing.

If you ever want to pull upstream updates from TasteSkill into another environment, the official command is:

```bash
npx skills add Leonxlnx/taste-skill
```

---

## 2. How `VoltAgent/awesome-design-md` Works

`awesome-design-md` is a collection of plain-text `DESIGN.md` files capturing real brand design systems (colors, typography, spacing, radii, elevation, component states, and responsive principles) in a format AI coding agents read directly.

Do not clone all 50+ brand files into `frontend-taste-stack` unless you want offline browsing. Pull only the `DESIGN.md` for the brand aesthetic you want into the target project root (or a local `design-md/` subfolder).

### Fetch a Single Brand `DESIGN.md` via `curl`

Run one of these in your target project root (replace `<brand>` with any folder from `https://github.com/VoltAgent/awesome-design-md/tree/main/design-md`):

```bash
# Developer Tools and Infrastructure
curl -fsSL https://raw.githubusercontent.com/VoltAgent/awesome-design-md/main/design-md/vercel/DESIGN.md -o DESIGN.md
curl -fsSL https://raw.githubusercontent.com/VoltAgent/awesome-design-md/main/design-md/linear.app/DESIGN.md -o DESIGN.md
curl -fsSL https://raw.githubusercontent.com/VoltAgent/awesome-design-md/main/design-md/stripe/DESIGN.md -o DESIGN.md

# AI and Consumer Brands (check repo tree for exact folder slug)
curl -fsSL https://raw.githubusercontent.com/VoltAgent/awesome-design-md/main/design-md/claude/DESIGN.md -o DESIGN.md
curl -fsSL https://raw.githubusercontent.com/VoltAgent/awesome-design-md/main/design-md/notion/DESIGN.md -o DESIGN.md
curl -fsSL https://raw.githubusercontent.com/VoltAgent/awesome-design-md/main/design-md/apple/DESIGN.md -o DESIGN.md
```

If you want the full collection locally for offline reference outside your app build tree:

```bash
git clone --depth 1 https://github.com/VoltAgent/awesome-design-md.git
```

---

## 3. Precedence Contract: `DESIGN.md` + `SKILL.md` + `MOTION-AND-WEBGL.md`

When a project has a `DESIGN.md` file alongside this `frontend-taste-stack` folder, follow this strict division of responsibility:

1. **`DESIGN.md` owns Brand Tokens**:
   - Color palette, semantic surface hierarchy, accent colors (overrides generic neutral defaults while keeping `SKILL.md` Section 4.2 Color Consistency Lock).
   - Font stack, type scale, corner-radius scale, border style, and shadow tokens.
   - Brand-specific component states (buttons, inputs, cards).
2. **`SKILL.md` owns Anti-Slop Structure and Guardrails**:
   - Hero viewport fit (`min-h-[100dvh]`, `pt-24` max, <= 4 text elements, <= 20-word subtext).
   - Layout diversification, Section-Layout-Repetition ban, Zigzag alternation cap, Bento cell rules, Eyebrow cap (`<= ceil(sectionCount / 3)`).
   - Real visual assets (no div-based fake screenshots, no hand-rolled icon SVGs, real SVG logo walls).
   - Zero em-dashes (`—`) or en-dashes (`–`), Copy Self-Audit, and Section 14 Pre-Flight Check.
3. **`MOTION-AND-WEBGL.md` + `BOILERPLATES.md` own Motion and Shaders**:
   - Calibrate `VantaBackground`, `SpotlightCard`, and `MagneticButton` colors directly to the hex values declared in `DESIGN.md` (never use Vanta neon/AI-purple defaults unless `DESIGN.md` explicitly specifies purple).
4. **`web-design-guidelines/` owns Code-Level Compliance**:
   - Run the Vercel `web-design-guidelines` audit (`references/command.md`) for accessibility, keyboard navigation, focus rings, forms, hydration safety, i18n formatting, and performance.
