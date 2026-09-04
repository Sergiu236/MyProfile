export type Site = {
  TITLE: string
  NAME: string
  ROLE: string
  DESCRIPTION: string
  /** Hand-tuned <title> for the home page — metadata only */
  SEO_TITLE: string
  /** <meta name="description"> — metadata only, never rendered */
  META_DESCRIPTION: string
  /** schema.org jobTitle — metadata only, never rendered */
  JOB_TITLE: string
  AUTHOR: string
  LOCATION: string
  /** City and country split out for schema.org PostalAddress */
  CITY: string
  REGION: string
  COUNTRY: string
  EMAIL: string
  PHONE: string
  CV: string
  AVAILABLE: boolean
  AVAILABILITY: string
}

/** One service offered to clients — drives schema.org makesOffer */
export type Service = {
  NAME: string
  DESCRIPTION: string
}

export type Page = {
  TITLE: string
  /** Evocative line shown under the page title */
  KICKER: string
  /** Shown on the page, under the heading. This is the copy visitors read. */
  DESCRIPTION: string
  /**
   * Unique, hand-tuned <title>. Every page needs its own: a site where
   * all pages share one title throws away the strongest on-page signal
   * search engines have. Metadata only.
   */
  SEO_TITLE: string
  /**
   * <meta name="description"> and the Open Graph description. Metadata
   * only — kept separate so search copy can be tuned for length and
   * keywords without touching what the page actually says.
   */
  META_DESCRIPTION: string
}

export type Link = {
  TEXT: string
  HREF: string
}

export type Social = {
  NAME: string
  ICON: string
  TEXT: string
  HREF: string
}

/** One row of the tech stack, grouped by discipline */
export type StackGroup = {
  LABEL: string
  ICON: string
  ITEMS: string[]
}

/**
 * A blog section. Add one here and it appears everywhere automatically:
 * the blog filter bar, the section landing page, and the sitemap.
 */
export type Section = {
  /** Must match the `section` field used in a post's frontmatter */
  ID: string
  LABEL: string
  KICKER: string
  DESCRIPTION: string
  ICON: string
  /** Tailwind text colour class used for this section's accent */
  ACCENT: string
}
