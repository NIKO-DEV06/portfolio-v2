# Emmanuel Ayeniko — Portfolio v2

Personal site built with Next.js 16 (App Router), React 19, Tailwind CSS v4,
Motion and Lenis.

## Develop

```bash
npm run dev    # http://localhost:3000
npm run build  # production build
npm run lint
```

## Where things live

- `src/content/` — all copy and data: site info, projects, experience,
  capabilities. Edit these to change what the page says.
- `src/components/sections/` — home page sections (hero, intro, work, gallery,
  capabilities, experience).
- `src/components/layout/` — header, floating menu, footer.
- `src/components/motion/` — reusable interactions: magnetic buttons, text
  reveals, the scroll-velocity marquee.
- `src/app/globals.css` — design tokens: colours, type scale, easings,
  keyframes.
- `src/lib/motion.ts` — shared easings and `INTRO_DELAY`, the hook for timing
  the hero after a preloader.

In copy passed to the reveal components, `*word*` renders that word in the
italic serif.

Project screenshots and the portrait are served from Cloudinary (carried over
from v1); Tallyn and Certifi screenshots live in `src/assets/work/`.
