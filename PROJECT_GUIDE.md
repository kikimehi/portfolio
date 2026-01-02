# Portfolio Project — Complete Guide (Beginner Friendly) ✅

Welcome! This guide explains everything in this repository step-by-step so you can run, understand, and extend the portfolio app. It is written for beginners and includes commands, architecture notes, and a clear explanation of how the dynamic background works.

---

## Table of Contents
- Project summary
- Quick start (run locally)
- Folder structure & key files
- Components explained (Hero, Header, Projects, Skills, Contact, Shared)
- DynamicBackground deep dive (how it works + how to tune it)
- Data files (projects, skills, socials)
- Styling strategy (CSS Modules)
- Assets (icons, images)
- Environment variables
- Making Projects dynamic (GitHub fetch example)
- Contact form and Formspree
- Accessibility & performance tips
- Testing & CI suggestions
- Deployment tips (Vercel / Netlify)
- Troubleshooting & common issues
- Developer workflow and commands
- Where to go next

---

## Project summary
This is a personal portfolio built with React and Vite. The app is component-based and uses local data files to render content (projects, skills, social links). It includes:
- A Hero section with an animated canvas background
- A Projects section showing your labs/projects with badges and direct GitHub links
- Skills and Contact sections
- Centralized social links

Goal: make a small app you can customize and deploy quickly.

---

## Quick start (run locally)
1. Requirements: Node.js (16+ recommended) and npm.
2. Install dependencies:

```bash
npm install
```

3. Run the dev server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
npm run preview
```

Notes:
- If you change environment variables (see below), restart the dev server.
- The app uses Vite which provides fast hot reload.

---

## Folder structure & key files
Top-level important files:
```
src/
  components/
    Background/DynamicBackground.jsx
    Hero/Hero.jsx
    Header/Header.jsx
    Projects/Projects.jsx
    Skills/Skills.jsx
    Contact/Contact.jsx
    Shared/SocialLinks.jsx
  data/
    projects.js
    skills.js
    socials.js
  assets/   (images & icons)
  App.jsx
  main.jsx
index.html
package.json
PROJECT_GUIDE.md  <-- this file
```

Briefly:
- `components/` — the UI pieces divided by feature. Each component typically has a `.jsx` and `.module.css` file.
- `data/` — local data used to populate the Projects, Skills, and Social links.
- `assets/` — images & SVGs used for icons, screenshots, avatar, etc.

---

## Components explained
Below are short explanations and where to look in code.

### Header
- Location: `src/components/Header`.
- Shows brand, navigation to sections (`#home`, `#projects`, `#skills`, `#contact`) and social icons using `Shared/SocialLinks`.
- Styling uses `Header.module.css`.

### Hero
- Location: `src/components/Hero`.
- Contains the greeting, role text, CTA (Contact), and avatar.
- Uses `DynamicBackground` for the animated canvas behind content.
- Title is revealed with a staggered animation word-by-word.

### Projects
- Location: `src/components/Projects` and `src/data/projects.js`.
- Renders cards for each project (title, description, tech badges, GitHub link). The data file contains `id`, `title`, `description`, `tech` (array), and `link`.
- Icons for tech badges come from `src/assets` and are mapped in `Projects.jsx`.

### Skills
- Location: `src/components/Skills` and `src/data/skills.js`.
- Displays chips (small badges) for languages, frameworks, testing tools, and tooling.
- Chips optionally show icons (via `SkillIcon` helper component which maps names to assets).

### Contact
- Location: `src/components/Contact`.
- Renders contact info (email, LinkedIn), social links and a contact form.
- The form posts to a configured endpoint (`VITE_FORMSPREE_ENDPOINT` — Formspree recommended). If no endpoint is provided, the form opens the user's mail client as a fallback using a `mailto:` link with subject and body pre-filled.

### Shared/SocialLinks
- Location: `src/components/Shared/SocialLinks.jsx`.
- Central component that pulls links from `src/data/socials.js` and renders icons (GitHub, Facebook, Instagram, LinkedIn, etc.).

---

## DynamicBackground — deep dive (how it was implemented)
File: `src/components/Background/DynamicBackground.jsx`

This component draws animated colored blobs using the Canvas 2D API. Here is how it works and how you can tune it.

1. Canvas setup & high-DPI support
- The canvas element is sized using `canvas.clientWidth` and `canvas.clientHeight` and then scaled by `window.devicePixelRatio` (dpr) to make it sharp on high-DPI displays. This is done by:

```js
const dpr = Math.max(1, window.devicePixelRatio || 1)
canvas.width = Math.floor(width * dpr)
canvas.height = Math.floor(height * dpr)
ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
```

2. Blob objects
- A list of blobs is created with random properties:
  - x, y: position
  - vx, vy: velocity
  - baseR: base radius
  - r: current radius (it pulses around baseR)
  - hue: base hue for color
  - alpha: starts at 0 and ramps to `targetAlpha` so blobs fade-in when the app starts
  - targetAlpha: final alpha for each blob
  - phase & phaseSpeed: for radius pulsing

Example blob initialization:
```js
const blobs = Array.from({ length: count }).map(() => ({
  x: Math.random() * width,
  y: Math.random() * height,
  vx: (Math.random() - 0.5) * 0.6,
  vy: (Math.random() - 0.5) * 0.6,
  baseR: 60 + Math.random() * 140,
  r: baseR,
  hue: Math.floor(Math.random() * 360),
  alpha: 0,
  targetAlpha: 0.6 + Math.random() * 0.6,
  phase: Math.random() * Math.PI * 2,
  phaseSpeed: 0.008 + Math.random() * 0.02,
}))
```

3. Draw loop
- `requestAnimationFrame` runs a `draw()` function that:
  - clears canvas
  - updates each blob's position by adding velocity
  - wraps blobs around screen edges
  - applies a slight mouse-based attraction/repulsion when the pointer is near
  - pulses radius: `b.r = b.baseR + Math.sin(b.phase) * amplitude`
  - increases `alpha` each frame until it hits `targetAlpha`
  - draws a radial gradient for each blob using HSLA colors with alpha multiplied

4. Mouse interaction
- A mouse/touch event listener updates a `mouse` position used to affect blob velocities if the pointer is within a threshold distance.

5. Performance & best practices
- Use `prefers-reduced-motion` to respect users who want no animations.
- Pause the animation when the page is hidden (`visibilitychange`) to save CPU.
- Decrease blob `count` and reduce `phaseSpeed` or radius to improve performance on low-end devices.

6. Tuning
- `count`: number of blobs. Increase for denser backgrounds.
- `baseR` range: controls blob size (larger numbers = larger blobs).
- `targetAlpha` and alpha increment speed: controls fade-in smoothness.
- `phaseSpeed` and amplitude in the pulse math to control how much blobs breathe.

If you'd like, I can add a simple UI (debug panel) that lets you tune these in the browser (counts, speeds, colors).

---

## Data files
- `src/data/projects.js` — array of project objects: `{ id, title, description, tech: [], link, screenshot? }`
  - Update or add projects here. Each `link` should point to the GitHub folder for that lab (direct link). You can add `screenshot` and `demo` fields.

- `src/data/skills.js` — organizes skills by category (languages, frameworks, testing, tooling).
- `src/data/socials.js` — centralized social links and contact email used throughout the site.

Example `projects.js` entry:
```js
{ id: 6, title: 'Lab 7: Kanban Board', description: 'A Kanban-style task board implemented with React.', tech: ['React', 'Vite', 'CSS'], link: 'https://github.com/.../Lab7' }
```

---

## Making Projects dynamic (fetching from GitHub)
You can fetch repository information from the GitHub API instead of hardcoding data. Simple example (client-side):

```js
// utils/github.js
export async function fetchRepos(username, repoPath = 'caw-labs'){
  const res = await fetch(`https://api.github.com/repos/${username}/${repoPath}/contents`)
  if(!res.ok) throw new Error('Failed')
  const data = await res.json()
  return data // list of files/folders with `.name` and `.html_url`
}
```

Notes:
- GitHub API rate limits unauthenticated requests (60/hour). To avoid hitting limits, set `VITE_GITHUB_TOKEN` in your environment and include an Authorization header in requests.
- You can fetch folder contents for a specific branch path to find lab folders and build project objects.

Server-side option (recommended for production): a tiny serverless function that caches GitHub responses and returns curated lists to the frontend.

---

## Contact form & Formspree
- The contact form uses an environment variable `VITE_FORMSPREE_ENDPOINT` to know where to POST.
- If you set up a Formspree form, put the endpoint in `.env` like:

```
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/yourFormId
```

- If no endpoint is set, the app opens the user's mail client with a `mailto:` pre-filled subject and body so messages can still be sent.

Testing the form:
- With Formspree configured, submit the form and check your Formspree inbox.
- Without it, ensure clicking Send opens your mail client.

---

## Styling
- Uses CSS Modules per-component (`.module.css`). This keeps styles scoped to components.
- Global layout and resets can be found in `index.css` and `App.css` (some files might have been removed/renamed during development).

Design tips:
- Tweak spacing and typography in `index.css` for consistent rhythm.
- Use CSS variables for colors if you want to implement a theme toggle.

---

## Assets
- Put images and SVGs in `src/assets`.
- For tech badges, we map tech names (e.g., `react`, `javascript`) to asset filenames in `Projects.jsx`. Add more files to `assets` and extend the map.

---

## Accessibility & performance quick checklist
- Add a "Skip to content" link in `index.html` if missing.
- Ensure all interactive items have `aria-label` and focus styles are visible (`:focus-visible`).
- Use `prefers-reduced-motion` in CSS and pause canvas animations on reduced motion.
- Lazy-load large images and use modern formats (WebP) where possible.
- Pause the canvas animation on `document.visibilityState === 'hidden'`.

---

## Testing & CI
- Recommended: add Vitest + @testing-library/react for component tests.
- Add a GitHub Actions workflow to run `npm run lint`, `npm test`, and `npm run build` on PRs.

Example commands to add tests:
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

---

## Deployment
- Vercel or Netlify are recommended — they automatically detect Vite apps and provide preview deployments.
- Set environment variables (`VITE_FORMSPREE_ENDPOINT`, `VITE_GITHUB_TOKEN`) in the hosting UI.

---

## Troubleshooting & common issues
- `VITE_FORMSPREE_ENDPOINT` not set → contact form shows "no-endpoint" and opens mail client instead.
- Canvas looks blurry → ensure proper dpr handling in `DynamicBackground.jsx` (it's already implemented).
- Rate limiting when fetching GitHub → use `VITE_GITHUB_TOKEN` or do server-side caching.
- CSS modules not applying → ensure import path is correct and component uses the `styles` object.

---

## Developer workflow & commands
- `npm install` — install packages
- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — local production preview
- `npm run lint` — run ESLint

Contributing:
- Branch from `main`, make changes, run tests & lint, open a PR.

---

## Notes on recent changes (implementation summary)
- Components were organized under `src/components` and `src/data` holds all display data.
- `DynamicBackground.jsx` uses canvas drawing with per-blob HSLA radial gradients and pulsing alpha for a soft, layered look.
- `Projects.jsx` shows project cards and tech badges pulled from `projects.js`; badges use local SVG assets where available.
- Contact form supports Formspree and a `mailto:` fallback when no endpoint is configured.
- Social links centralized in `src/data/socials.js` and rendered by `Shared/SocialLinks.jsx`.

---

## Where to go next (suggestions)
- Add project screenshots and live demos for each project (high impact).
- Add a GitHub-fetch feature or serverless caching endpoint for dynamic projects.
- Add a theme toggle (dark/light) and store preference in `localStorage`.
- Add unit + integration tests and a CI workflow.

---

If you want, I can expand any part of this guide, add example screenshots, or create starter tests or CI workflows for you — tell me which section to expand and I’ll update `PROJECT_GUIDE.md`.

Happy coding! 🎯
