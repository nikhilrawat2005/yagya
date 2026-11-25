# Browser QA Runbook with Playwright CLI (`@playwright/cli`)

`playwright-cli` (`@playwright/cli`) is a **machine-level CLI tool** maintained by Microsoft for AI coding agents. Unlike the `.md` specification files inside this folder, it runs in your terminal against a live browser daemon so agents can inspect rendered UI, console logs, network requests, responsive viewports, dark mode, and reduced-motion behavior without bloating the LLM context window.

---

## 1. Setup (Different from `.md` Files)

Because `playwright-cli` is a terminal binary rather than a React library:
- Do **not** add `@playwright/cli` to every app's `package.json` dependencies.
- Install it once globally on your machine, OR invoke it on demand with `npx @playwright/cli`.

### Option A: One-Time Global Install (Recommended)

```bash
npm install -g @playwright/cli@latest
playwright-cli install-browser chromium
```

Optional (if you use Claude Code, Cursor, or GitHub Copilot and want its built-in agent skill installed globally):

```bash
playwright-cli install --skills
```

### Option B: Zero-Install via `npx`

```bash
npx --yes @playwright/cli --version
```

---

## 2. Automated Verification Workflow for Every Frontend Build

After starting the target app's dev or preview server (for example `npm run dev` on `http://localhost:3000`), run this verification sequence before declaring any frontend finished:

### Step 1: Open Page and Check Runtime Health

```bash
playwright-cli open http://localhost:3000
playwright-cli console error
playwright-cli requests
```

Confirm zero uncaught console errors, zero hydration mismatches, and zero failed asset/image requests (`404` / `500`).

### Step 2: Desktop (`1440x900`) Layout and `SKILL.md` Audit

```bash
playwright-cli resize 1440 900
playwright-cli snapshot
playwright-cli eval "() => ({ overflowX: document.documentElement.scrollWidth > window.innerWidth, navHeight: document.querySelector('header, nav')?.getBoundingClientRect().height || 0, wrappedCtas: [...document.querySelectorAll('a, button')].filter(el => { const r = el.getClientRects(); return r.length > 1 && /px-|rounded/.test(el.className); }).map(el => el.textContent?.trim()) })"
playwright-cli screenshot
```

Verify:
- `overflowX` is `false`
- `navHeight` is `<= 80` px and nav links stay on one line
- `wrappedCtas` is empty (zero wrapped CTA buttons at desktop)
- Hero headline, subtext, and primary CTA fit inside the initial viewport without scrolling

### Step 3: Mobile (`375x812`) Collapse Check

```bash
playwright-cli resize 375 812
playwright-cli eval "() => ({ overflowX: document.documentElement.scrollWidth > window.innerWidth })"
playwright-cli screenshot
```

Confirm `overflowX` is `false` and multi-column grids collapse cleanly to single column.

### Step 4: Dark and Light Mode Parity Check

```bash
playwright-cli resize 1440 900
playwright-cli set-color-scheme dark
playwright-cli screenshot
playwright-cli set-color-scheme light
playwright-cli screenshot
playwright-cli clear-color-scheme
```

Confirm text contrast, button readability, and Vanta/background tones hold across both modes without mid-page theme flips.

### Step 5: Reduced Motion Check (`MOTION_INTENSITY > 3`)

```bash
playwright-cli set-reduced-motion reduce
playwright-cli reload
playwright-cli eval "() => ({ hiddenElements: [...document.querySelectorAll('h1, h2, section')].filter(el => getComputedStyle(el).opacity === '0').length })"
playwright-cli clear-reduced-motion
```

Confirm `hiddenElements` is `0` (all `SplitText`, `RevealStagger`, and GSAP elements are immediately visible at `opacity: 1` when reduced motion is enabled, and Lenis/Vanta stay inactive).

### Step 6: Clean Up Browser Session

```bash
playwright-cli close
```

If background sessions remain open, run `playwright-cli close-all`.
