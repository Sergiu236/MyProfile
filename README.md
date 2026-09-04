# Sergiu Mocan — Portfolio

Brushed silver on charcoal. A CV timeline, project case studies and a blog,
built with Astro and no UI framework.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # type-check + static build into dist/
npm run preview  # serve the built site — always measure performance here, not in dev
```

## Deploying

The site is a static build uploaded to S3 behind Cloudflare. `npm run build`, then upload
the contents of `dist/`. Two things that have bitten before:

- **Purge the Cloudflare cache afterwards.** Files in `public/` keep stable names and are
  edge-cached for hours (`/js/atmosphere.js`, `/open-graph.jpg`), so an upload can look
  like it did nothing. Hashed `/_astro/*` assets and HTML are unaffected.
- **Internal links that carry a `#fragment` need a trailing slash.** The host 302s
  `/about` → `/about/`, and Astro's client router adopts the redirect URL — which drops the
  fragment, because `fetch` responses never carry one. Write `/about/#instruments`.

`site` in [astro.config.mjs](astro.config.mjs) drives canonical URLs, the sitemap, RSS,
Open Graph URLs and every structured-data id, so it must match the live domain.

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
section: "backend-engineering"   # must exist in SECTIONS in src/consts.ts
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
- **Colour:** a soft charcoal ground (`#0A0A0C`) — never pure black, which reads flat.
  Depth comes from tint, not lightness. Brushed silver (`#E4E4E7`) is reserved for
  actions, live state, key numbers and hover; the structural grey `#3F3F46` carries
  borders, chips and dividers. Restraint is what makes the silver read as expensive.
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

- Unique `<title>` and description per page; one `<h1>` per page. Page titles come from
  `SEO_TITLE` in `src/consts.ts`; dynamic pages fall back to `"<title> — Sergiu Mocan"`.
- `Person` + `ProfessionalService` + `WebSite` + per-page `WebPage`/`BlogPosting` +
  `BreadcrumbList` JSON-LD, linked by `@id` so search engines resolve the relationships
  instead of guessing. The service offers in `SERVICES` are what answer commercial
  searches ("hire .NET developer") rather than name searches.
- `rel="me"` links to each profile, which is most of what ties a name query to the
  right person.
- Canonical URLs, Open Graph and Twitter cards, `article:published_time`, RSS, sitemap and
  a generated `robots.txt`.
- Every post is server-rendered into the HTML — the archive filters existing DOM rather
  than fetching, so crawlers see all content without running JavaScript.

## Notes

- No UI framework: filtering and search are a few dozen lines of vanilla JS.
- Every animation is disabled under `prefers-reduced-motion`.
- MDX is not installed. For interactive components inside posts, run `npx astro add mdx`.
