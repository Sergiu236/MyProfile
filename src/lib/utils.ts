import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** "12 Mar 2025" — unambiguous for a European and American reader alike */
export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date)
}

/** "Mar 2025", or the string itself when a role is still open ("Present") */
export function formatMonthYear(input: Date | string) {
  if (typeof input === "string") return input
  return new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric" }).format(input)
}

/** ISO date attribute for <time> elements */
export function isoDate(input: Date | string) {
  return typeof input === "string" ? undefined : input.toISOString()
}

/**
 * "2 yrs 4 mos" — the span a recruiter would otherwise have to compute
 * in their head while scanning the timeline.
 */
export function formatDuration(start: Date, end: Date | string) {
  const to = typeof end === "string" ? new Date() : end
  const months = Math.max(
    1,
    (to.getFullYear() - start.getFullYear()) * 12 + (to.getMonth() - start.getMonth()) + 1,
  )
  const years = Math.floor(months / 12)
  const rest = months % 12

  const parts: string[] = []
  if (years) parts.push(`${years} yr${years > 1 ? "s" : ""}`)
  if (rest) parts.push(`${rest} mo${rest > 1 ? "s" : ""}`)
  return parts.join(" ")
}

export function readingTime(body: string) {
  const words = body.replace(/<[^>]+>/g, "").split(/\s+/).length
  return `${Math.max(1, Math.round(words / 200))} min read`
}

/** Turns "Clean Architecture" into "clean-architecture" for tag URLs */
export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip diacritics: "Babeș" → "babes"
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}
