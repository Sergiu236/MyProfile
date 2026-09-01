import type { Link, Metric, Page, Section, Site, Social, StackGroup } from "@types"

/* ─────────────────────────────────────────────────────────────
   IDENTITY
   ───────────────────────────────────────────────────────────── */
export const SITE: Site = {
  TITLE: "Sergiu Mocan",
  NAME: "Sergiu Ioan Mocan",
  ROLE: "Software Engineer · .NET & AWS",
  DESCRIPTION:
    "Software engineer building cloud-native .NET platforms on AWS. I take systems that were never meant to scale and rebuild them so they can.",
  AUTHOR: "Sergiu Ioan Mocan",
  LOCATION: "Cluj-Napoca, Romania",
  EMAIL: "sergiumocan74@gmail.com",
  PHONE: "+40 741 270 890",
  CV: "/Sergiu-Mocan-CV.pdf",
  AVAILABLE: true,
  AVAILABILITY: "Open to senior engineering roles",
}

/* ─────────────────────────────────────────────────────────────
   PAGES
   ───────────────────────────────────────────────────────────── */
export const WORK: Page = {
  TITLE: "Experience",
  KICKER: "The trajectory",
  DESCRIPTION:
    "Four years of shipping production systems — what I was hired to solve, and what actually changed because of it.",
}

export const PROJECTS: Page = {
  TITLE: "Projects",
  KICKER: "Built out of curiosity",
  DESCRIPTION:
    "Systems I designed end to end, from smart-contract architecture to physics-informed machine learning.",
}

export const BLOG: Page = {
  TITLE: "Blog",
  KICKER: "Transmissions",
  DESCRIPTION:
    "Notes from inside the machine — architecture decisions, cloud infrastructure, and the occasional detour into cryptography and physics.",
}

export const ABOUT: Page = {
  TITLE: "About",
  KICKER: "Who is behind the console",
  DESCRIPTION: "The longer version: how I work, what I have studied, and what I am chasing next.",
}

export const CONTACT: Page = {
  TITLE: "Contact",
  KICKER: "Open a channel",
  DESCRIPTION: "The fastest ways to reach me, and what I am currently looking for.",
}

export const SEARCH: Page = {
  TITLE: "Search",
  KICKER: "Scan the archive",
  DESCRIPTION: "Search every post and project by keyword, tag or technology.",
}

/* ─────────────────────────────────────────────────────────────
   NAVIGATION
   ───────────────────────────────────────────────────────────── */
export const LINKS: Link[] = [
  { TEXT: "Experience", HREF: "/work" },
  { TEXT: "Projects", HREF: "/projects" },
  { TEXT: "Blog", HREF: "/blog" },
  { TEXT: "About", HREF: "/about" },
  { TEXT: "Contact", HREF: "/contact" },
]

/* ─────────────────────────────────────────────────────────────
   SOCIALS
   ───────────────────────────────────────────────────────────── */
export const SOCIALS: Social[] = [
  {
    NAME: "Email",
    ICON: "mail",
    TEXT: "sergiumocan74@gmail.com",
    HREF: "mailto:sergiumocan74@gmail.com",
  },
  {
    NAME: "GitHub",
    ICON: "github",
    TEXT: "github.com/Sergiu236",
    HREF: "https://github.com/Sergiu236",
  },
  {
    NAME: "LinkedIn",
    ICON: "linkedin",
    TEXT: "linkedin.com/in/sergiu-mocan",
    HREF: "https://www.linkedin.com/in/sergiu-mocan",
  },
]

/* ─────────────────────────────────────────────────────────────
   HEADLINE IMPACT — the numbers a recruiter scans first
   ───────────────────────────────────────────────────────────── */
export const METRICS: Metric[] = [
  { VALUE: "750+", LABEL: "Businesses on the platform", ICON: "users" },
  { VALUE: "23K+", LABEL: "Transactions handled daily", ICON: "trending-up" },
  { VALUE: "1,000+", LABEL: "Concurrent users at peak", ICON: "zap" },
  { VALUE: "86%", LABEL: "Faster deployments", ICON: "git-branch" },
]

/* ─────────────────────────────────────────────────────────────
   TECH STACK
   ───────────────────────────────────────────────────────────── */
export const STACK: StackGroup[] = [
  {
    LABEL: "Languages",
    ICON: "terminal",
    ITEMS: ["C#", "C++", "C", "TypeScript", "Python", "SQL", "Solidity", "Bash"],
  },
  {
    LABEL: "Frameworks",
    ICON: "layers",
    ITEMS: [".NET / .NET Core", "ASP.NET Core", "EF Core", "React", "Node.js", "Avalonia UI"],
  },
  {
    LABEL: "Cloud & Infra",
    ICON: "cloud",
    ITEMS: [
      "AWS ECS / Fargate",
      "AWS CDK (IaC)",
      "ECR",
      "S3",
      "RDS",
      "VPC",
      "Docker",
      "Kubernetes",
      "Azure DevOps CI/CD",
    ],
  },
  {
    LABEL: "Data",
    ICON: "database",
    ITEMS: ["SQL Server", "PostgreSQL", "Redis"],
  },
]

/* ─────────────────────────────────────────────────────────────
   EDUCATION & CERTIFICATIONS
   ───────────────────────────────────────────────────────────── */
export const EDUCATION = [
  {
    SCHOOL: "Babeș-Bolyai University",
    DEGREE: "M.Sc., Distributed Systems in the Internet",
    PERIOD: "2026 — 2028",
  },
  {
    SCHOOL: "Babeș-Bolyai University",
    DEGREE: "B.Sc., Computer Science (English Section)",
    PERIOD: "Completed",
  },
]

export const CERTIFICATIONS = [
  {
    NAME: "AWS Certified Solutions Architect – Associate",
    CODE: "SAA-C03",
    STATUS: "In progress",
  },
]

/* ─────────────────────────────────────────────────────────────
   BLOG SECTIONS
   Add an entry here and the section appears automatically in the
   blog filter bar, at /blog/section/<id>, and in the sitemap.
   Posts declare which one they belong to via `section:` frontmatter.
   ───────────────────────────────────────────────────────────── */
export const SECTIONS: Section[] = [
  {
    ID: "engineering",
    LABEL: "Engineering",
    KICKER: "Architecture & craft",
    DESCRIPTION:
      "Clean Architecture, domain modelling, and the trade-offs behind long-lived .NET systems.",
    ICON: "layers",
    ACCENT: "text-glow",
  },
  {
    ID: "cloud",
    LABEL: "Cloud",
    KICKER: "Infrastructure as code",
    DESCRIPTION: "AWS, containers, pipelines, and the unglamorous work that makes deploys boring.",
    ICON: "cloud",
    ACCENT: "text-nebula",
  },
  {
    ID: "blockchain",
    LABEL: "Blockchain",
    KICKER: "Trustless systems",
    DESCRIPTION: "Solidity, upgradeable proxies, Merkle proofs and on-chain storage economics.",
    ICON: "shield",
    ACCENT: "text-ember",
  },
  {
    ID: "machine-learning",
    LABEL: "Machine Learning",
    KICKER: "Physics meets gradients",
    DESCRIPTION: "Neural surrogates, energy conservation, and simulation that respects the physics.",
    ICON: "cpu",
    ACCENT: "text-glow-faint",
  },
  {
    ID: "field-notes",
    LABEL: "Field Notes",
    KICKER: "The human layer",
    DESCRIPTION: "Teaching, learning in public, and what four years of shipping actually taught me.",
    ICON: "book-open",
    ACCENT: "text-amethyst-mist",
  },
]

/** Lookup helper so pages never have to scan SECTIONS by hand. */
export const getSection = (id: string): Section | undefined =>
  SECTIONS.find((section) => section.ID === id)
