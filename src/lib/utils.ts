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

/** "2025", or the string itself when a role is still open ("Present") */
export function formatYear(input: Date | string) {
  if (typeof input === "string") return input
  return new Intl.DateTimeFormat("en-GB", { year: "numeric" }).format(input)
}

/** ISO date attribute for <time> elements */
export function isoDate(input: Date | string) {
  return typeof input === "string" ? undefined : input.toISOString()
}

export function readingTime(body: string) {
  const words = body.replace(/<[^>]+>/g, "").split(/\s+/).length
  return `${Math.max(1, Math.round(words / 200))} min read`
}

/**
 * Turns "Clean Architecture" into "clean-architecture" for tag URLs.
 *
 * Language names are spelled out before the strip, because dropping the
 * symbols silently collapses "C#" and "C++" both to "c" — an unreadable
 * URL, and a slug collision waiting to happen.
 */
export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/\+\+/g, "plusplus")
    .replace(/#/g, "sharp")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip diacritics: "Babeș" → "babes"
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}
