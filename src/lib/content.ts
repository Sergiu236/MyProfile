import { getCollection, type CollectionEntry } from "astro:content"
import { SECTIONS } from "@consts"
import { slugify } from "@lib/utils"

export type Post = CollectionEntry<"blog">
export type Project = CollectionEntry<"projects">
export type Role = CollectionEntry<"work">

const byNewest = (a: { data: { date: Date } }, b: { data: { date: Date } }) =>
  b.data.date.getTime() - a.data.date.getTime()

/* ─── Blog ───────────────────────────────────────────────────── */

/** Published posts, newest first. Drafts never leave the editor. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection("blog", ({ data }) => !data.draft)
  return posts.sort(byNewest)
}

/** The lead story for /blog — an explicitly featured post, else the newest. */
export function getFeatured(posts: Post[]): Post | undefined {
  return posts.find((post) => post.data.featured) ?? posts[0]
}

/** Only the sections that actually have posts, each with its count. */
export function getSectionsInUse(posts: Post[]) {
  return SECTIONS.map((section) => ({
    ...section,
    COUNT: posts.filter((post) => post.data.section === section.ID).length,
  })).filter((section) => section.COUNT > 0)
}

/** Every tag in use, most-used first, with counts and URL slugs. */
export function getTags(posts: Post[]) {
  const counts = new Map<string, number>()
  for (const post of posts) {
    for (const tag of post.data.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1)
  }

  return [...counts.entries()]
    .map(([label, count]) => ({ label, count, slug: slugify(label) }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
}

/**
 * Posts closest to the given one: same section first, then by shared tags.
 * Used at the bottom of an article to keep the reader moving.
 */
export function getRelated(post: Post, posts: Post[], limit = 3): Post[] {
  return posts
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => {
      const sharedTags = candidate.data.tags.filter((tag) => post.data.tags.includes(tag)).length
      const sameSection = candidate.data.section === post.data.section ? 3 : 0
      return { candidate, score: sameSection + sharedTags }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || byNewest(a.candidate, b.candidate))
    .slice(0, limit)
    .map(({ candidate }) => candidate)
}

/* ─── Projects ───────────────────────────────────────────────── */

export async function getProjects(): Promise<Project[]> {
  const projects = await getCollection("projects", ({ data }) => !data.draft)

  // Featured work leads, so the strongest case study is never buried
  return projects.sort(
    (a, b) => Number(b.data.featured) - Number(a.data.featured) || byNewest(a, b),
  )
}

/* ─── Work ───────────────────────────────────────────────────── */

/** Roles ordered most recent first, ready to render as a timeline. */
export async function getRoles(): Promise<Role[]> {
  const roles = await getCollection("work")
  return roles.sort((a, b) => b.data.dateStart.getTime() - a.data.dateStart.getTime())
}
