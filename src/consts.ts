import type { Link, Page, Section, Site, Social, StackGroup } from "@types"

/* ─────────────────────────────────────────────────────────────
   IDENTITY
   ───────────────────────────────────────────────────────────── */
export const SITE: Site = {
  TITLE: "Sergiu Mocan",
  NAME: "Sergiu Ioan Mocan",
  ROLE: "Software Engineer · Cloud & DevOps",
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
    "Systems I designed end to end.",
}

export const BLOG: Page = {
  TITLE: "Blog",
  KICKER: "Transmissions",
  DESCRIPTION:
    "The software development lifecycle: planning, system architecture, and agile delivery from start to deployment.",
}

export const ABOUT: Page = {
  TITLE: "About",
  KICKER: "Who is behind the console",
  DESCRIPTION: "The longer version: how I work, what I have studied, and what I am chasing next.",
}

export const CONTACT: Page = {
  TITLE: "Contact",
  KICKER: "Open a channel",
  DESCRIPTION: "The fastest ways to reach me.",
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
   TECH STACK
   ───────────────────────────────────────────────────────────── */
export const STACK: StackGroup[] = [
  {
    LABEL: "Languages",
    ICON: "terminal",
    ITEMS: ["C#", "C++", "C", "Java", "TypeScript", "Python", "SQL", "Solidity", "x86 Assembly", "Bash"],
  },
  {
    LABEL: "Frameworks",
    ICON: "layers",
    ITEMS: [
      ".NET / .NET Core",
      "ASP.NET Core",
      "EF Core",
      "Spring Boot",
      "React",
      "Node.js",
      "Avalonia UI",
    ],
  },
  {
    LABEL: "Cloud & Infra",
    ICON: "cloud",
    ITEMS: [
      "AWS ECS / Fargate",
      "AWS CDK (IaC)",
      "AWS EventBridge",
      "AWS SQS",
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
  },
  {
    SCHOOL: "Babeș-Bolyai University",
    DEGREE: "B.Sc., Computer Science (English Section)",
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
    ID: "frontend-engineering",
    LABEL: "Frontend Engineering",
    KICKER: "The interface layer",
    DESCRIPTION: "Component design, state management, and the trade-offs behind a UI that holds up.",
    ICON: "globe",
    ACCENT: "text-glow",
  },
  {
    ID: "backend-engineering",
    LABEL: "Backend Engineering",
    KICKER: "The parts nobody sees",
    DESCRIPTION: "APIs, data models, and the systems that keep running long after the demo.",
    ICON: "terminal",
    ACCENT: "text-nebula",
  },
  {
    ID: "system-architecture",
    LABEL: "System Architecture",
    KICKER: "Structure & craft",
    DESCRIPTION: "Clean Architecture, domain modelling, and the trade-offs behind long-lived systems.",
    ICON: "layers",
    ACCENT: "text-glow-faint",
  },
  {
    ID: "cloud-devops",
    LABEL: "Cloud & DevOps",
    KICKER: "Infrastructure as code",
    DESCRIPTION: "AWS, containers, pipelines, and the unglamorous work that makes deploys boring.",
    ICON: "cloud",
    ACCENT: "text-amethyst-mist",
  },
  {
    ID: "ai-machine-learning",
    LABEL: "AI & Machine Learning",
    KICKER: "Physics meets gradients",
    DESCRIPTION: "Neural surrogates, energy conservation, and simulation that respects the physics.",
    ICON: "cpu",
    ACCENT: "text-glow-soft",
  },
  {
    ID: "web3-blockchain",
    LABEL: "Web3 & Blockchain",
    KICKER: "Trustless systems",
    DESCRIPTION: "Solidity, upgradeable proxies, Merkle proofs and on-chain storage economics.",
    ICON: "shield",
    ACCENT: "text-amethyst-lift",
  },
  {
    ID: "troubleshooting",
    LABEL: "Troubleshooting",
    KICKER: "Root cause, not symptoms",
    DESCRIPTION: "Production incidents, hard bugs, and the process of tracing an effect back to its cause.",
    ICON: "zap",
    ACCENT: "text-dim",
  },
  {
    ID: "methodology",
    LABEL: "Methodology",
    KICKER: "How the work gets done",
    DESCRIPTION: "Agile practice, teaching, and what four years of shipping actually taught me.",
    ICON: "book-open",
    ACCENT: "text-mist",
  },
]

/** Lookup helper so pages never have to scan SECTIONS by hand. */
export const getSection = (id: string): Section | undefined =>
  SECTIONS.find((section) => section.ID === id)
