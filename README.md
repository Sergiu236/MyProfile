# Sergiu Mocan — Portfolio

Neon violet on deep space. A CV timeline, project case studies and a scalable blog,
built with Astro and no UI framework.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # type-check + static build into dist/
npm run preview  # serve the built site — always measure performance here, not in dev
```

## Before you deploy

**Set your domain** in [astro.config.mjs](astro.config.mjs) (currently `sergiumocan.dev`).
It drives canonical URLs, the sitemap, RSS, Open Graph URLs and every structured-data id.

Everything else is already wired: the CV lives at `public/Sergiu-Mocan-CV.pdf`.

## Where things live

| What | Where |
| --- | --- |
| Name, role, email, socials, nav, stack, metrics, blog sections | `src/consts.ts` |
| Colour palette, type scale, shadows | `tailwind.config.mjs` |
| Base styles, prose, buttons, reveal animations | `src/styles/global.css` |
| Work history (one file per role) | `src/content/work/` |
| Project case studies | `src/content/projects/` |
| Blog posts | `src/content/blog/` |
| Frontmatter contracts | `src/content/config.ts` |
| Starfield, parallax, scroll reveals | `public/js/atmosphere.js` |
| Meta tags + JSON-LD | `src/components/BaseHead.astro` |

## Page structure

Each fact lives in exactly one place, so nothing is repeated between pages:

| Page | Owns |
| --- | --- |
| `/` | The pitch: hero, headline metrics, positioning, three projects, three posts, contact CTA |
| `/work` | Career: fast-answer bar, timeline, education, certifications |
| `/projects` | Project case studies |
| `/blog` | Featured post + the filterable archive |
| `/about` | The long-form story, how I work, the tech stack |
| `/contact` | Contact channels and what I am looking for |

## Adding a blog post

Create `src/content/blog/my-post.md`:

```yaml
---
title: "The title"
summary: "One or two sentences — shown in listings and as the meta description."
date: "2026-09-02"
section: "engineering"   # must exist in SECTIONS in src/consts.ts
tags: ["Architecture", ".NET"]
featured: false          # true pins it as the lead story on /blog
draft: false             # true keeps it out of the build entirely
---
```

That is all. The post appears on `/blog`, on its section page, on a page for each of its
tags, in search, in RSS, in the sitemap, and gets its own `BlogPosting` structured data.
Section and tag filters, counts and related-post suggestions all derive from the content.

**Adding a section** means adding one entry to `SECTIONS` in `src/consts.ts`. An unknown
`section:` value fails the build rather than silently orphaning the post.

## Adding a project or a role

Drop a Markdown file into `src/content/projects/` or `src/content/work/`; the fields are
defined in `src/content/config.ts`. In a work entry, **each paragraph of the body renders
as one impact statement** in the timeline, so write one achievement per paragraph and bold
the opening clause.

## Design notes

- **Typeface:** Poppins throughout, four weights. Code blocks use the system mono stack,
  so there is no second webfont to download.
- **Colour:** a violet-tinted near-black ground (`#08060E`) — never pure black, which
  reads flat. Neon violet (`#B14EFF`) is reserved for actions, live state, key numbers and
  hover; the amethyst `#4C3D52` carries borders, chips and dividers. Restraint is what
  makes the neon read as expensive rather than loud.
- **Dark only.** There is no theme toggle by design.

## Performance

The atmosphere is built from radial gradients rather than blurred elements, because
`filter: blur()` on a large element forces the compositor to allocate an oversized texture
and re-blur it every frame. Concretely:

- No `filter: blur()` anywhere; glow comes from `box-shadow` and gradients.
- No `backdrop-filter` except on the sticky header.
- The whole background — grain, horizon, nebula, vignette — is one element with a stacked
  `background`, because anything painted over the `<canvas>` gets promoted to its own
  composited layer.
- The starfield canvas is pinned to 1 device pixel per CSS pixel; a 2× backing store costs
  four times the memory to draw a field of sub-pixel dots.
- The cursor spotlight writes its CSS variables once per frame, not once per pointer event.

Measured on the production build with an isolated Chrome (1440×900, DPR 1), renderer
process, against a plain-text page as the control:

| Page | Renderer | Over control |
| --- | --- | --- |
| plain text (control) | 91 MB | — |
| `/` | 98 MB | +7 MB |
| `/blog` | 94 MB | +3 MB |
| `/about` | 93 MB | +2 MB |
| `/work` | 92 MB | +1 MB |

The control figure is Chrome's own per-renderer floor, which scales with installed RAM and
differs per machine. **Measure with `npm run preview`, not `npm run dev`** — the dev server
adds HMR, the dev toolbar and unminified CSS, and reads far heavier in Chrome's task
manager (Shift+Esc).

## SEO

- Unique `<title>` and description per page; one `<h1>` per page.
- `Person` + `WebSite` + per-page `WebPage`/`BlogPosting` + `BreadcrumbList` JSON-LD,
  linked by `@id` so search engines resolve the relationships instead of guessing.
- Canonical URLs, Open Graph and Twitter cards, `article:published_time`, RSS, sitemap and
  a generated `robots.txt`.
- Every post is server-rendered into the HTML — the archive filters existing DOM rather
  than fetching, so crawlers see all content without running JavaScript.

## Notes

- No UI framework: filtering and search are a few dozen lines of vanilla JS.
- Every animation is disabled under `prefers-reduced-motion`.
- MDX is not installed. For interactive components inside posts, run `npx astro add mdx`.
