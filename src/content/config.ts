import { defineCollection, z } from "astro:content"
import { SECTIONS } from "../consts"

/**
 * Every post must declare a section that exists in `SECTIONS`.
 * Getting it wrong fails the build instead of silently producing an
 * orphaned post — which is what keeps the blog safe to grow.
 */
const sectionIds = SECTIONS.map((section) => section.ID) as [string, ...string[]]

/** A headline number attached to a role or a project */
const metric = z.object({
  value: z.string(),
  label: z.string(),
})

const work = defineCollection({
  type: "content",
  schema: z.object({
    company: z.string(),
    role: z.string(),
    /** One line of context: what the business actually does */
    context: z.string(),
    dateStart: z.coerce.date(),
    /** A real date, or the string "Present" */
    dateEnd: z.union([z.coerce.date(), z.string()]),
    location: z.string(),
    /** Optional employment type shown next to the dates */
    type: z.string().default("Full-time"),
    /** Technologies shown as chips under the role */
    stack: z.array(z.string()).default([]),
    /** Up to four numbers surfaced in the timeline card */
    metrics: z.array(metric).default([]),
    url: z.string().url().optional(),
  }),
})

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    /** Human-readable period, e.g. "2025" or "2026 – Present" */
    period: z.string(),
    /** Shown as a status chip: Shipped, In progress, Research… */
    status: z.string().default("Shipped"),
    /** What Sergiu did on it */
    role: z.string().optional(),
    tags: z.array(z.string()).default([]),
    metrics: z.array(metric).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    demoUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional(),
    /** Hero image shown on the case study page, relative to /public */
    image: z.string().optional(),
  }),
})

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    /** Which SECTION this post belongs to */
    section: z.enum(sectionIds),
    tags: z.array(z.string()).default([]),
    /** Pins the post to the top of /blog as the lead story */
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
})

export const collections = { work, projects, blog }
