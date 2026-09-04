export type Site = {
  TITLE: string
  NAME: string
  ROLE: string
  DESCRIPTION: string
  AUTHOR: string
  LOCATION: string
  EMAIL: string
  PHONE: string
  CV: string
  AVAILABLE: boolean
  AVAILABILITY: string
}

export type Page = {
  TITLE: string
  /** Evocative line shown under the page title */
  KICKER: string
  DESCRIPTION: string
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
