import type { Link, Page, Section, Service, Site, Social, StackGroup } from "@types"

/* ─────────────────────────────────────────────────────────────
   IDENTITY
   ───────────────────────────────────────────────────────────── */
/*
   Everything named DESCRIPTION or ROLE below is rendered on the page.
   The SEO_* and META_* fields are never shown to a visitor — they exist
   only for <title>, <meta> and structured data. Keep it that way: on-page
   copy is Sergiu's voice, metadata is for crawlers.
*/
export const SITE: Site = {
  TITLE: "Sergiu Mocan",
  NAME: "Sergiu Ioan Mocan",
  ROLE: "Software Engineer · Cloud & DevOps",
  DESCRIPTION:
    "Software engineer building cloud-native .NET platforms on AWS. I take systems that were never meant to scale and rebuild them so they can.",
  SEO_TITLE: "Sergiu Mocan — .NET & AWS Software Engineer",
  META_DESCRIPTION:
    "Sergiu Mocan — software engineer building cloud-native .NET and AWS systems. Available for freelance software projects and open to engineering roles.",
  /** Job title for structured data only — never rendered */
  JOB_TITLE: ".NET & AWS Software Engineer",
  AUTHOR: "Sergiu Ioan Mocan",
  LOCATION: "Cluj-Napoca, Romania",
  CITY: "Cluj-Napoca",
  REGION: "Cluj",
  COUNTRY: "RO",
  EMAIL: "sergiumocan74@gmail.com",
  PHONE: "+40 741 270 890",
  CV: "/Sergiu-Mocan-CV.pdf",
  AVAILABLE: true,
  AVAILABILITY: "Open to senior engineering roles",
}

/* ─────────────────────────────────────────────────────────────
   SERVICES
   These are what a client actually types into a search box, so they
   drive the schema.org offer catalogue as well as the page copy.
   ───────────────────────────────────────────────────────────── */
export const SERVICES: Service[] = [
  {
    NAME: ".NET backend development",
    DESCRIPTION:
      "ASP.NET Core APIs, Entity Framework Core data layers and background services, built to Clean Architecture boundaries and covered by tests.",
  },
  {
    NAME: "AWS cloud architecture & migration",
    DESCRIPTION:
      "Event-driven systems on ECS/Fargate, SQS and EventBridge, provisioned as code with AWS CDK — including moving existing workloads to them without downtime.",
  },
  {
    NAME: "Full-stack web application development",
    DESCRIPTION:
      "React and TypeScript front ends on .NET back ends, from data model through to deployment pipeline.",
  },
  {
    NAME: "Blockchain & smart contract development",
    DESCRIPTION:
      "Solidity contracts, upgradeable proxies and Merkle-proof verification on Ethereum, written so that invalid states are impossible rather than merely unlikely.",
  },
  {
    NAME: "Machine learning & computer vision",
    DESCRIPTION:
      "Physics-informed neural networks and real-time computer-vision pipelines, where the constraints of the domain are built into the model itself.",
  },
]

/* ─────────────────────────────────────────────────────────────
   PAGES
   ───────────────────────────────────────────────────────────── */
export const WORK: Page = {
  TITLE: "Experience",
  KICKER: "The trajectory",
  DESCRIPTION:
    "Four years of shipping production systems — what I was hired to solve, and what actually changed because of it.",
  SEO_TITLE: "Experience — Sergiu Mocan, .NET & AWS Engineer",
  META_DESCRIPTION:
    "Four years shipping production .NET and AWS systems: what I was hired to fix, and what measurably changed. Experience, education and certifications.",
}

export const PROJECTS: Page = {
  TITLE: "Projects",
  KICKER: "Built out of curiosity",
  DESCRIPTION:
    "Systems I designed end to end.",
  SEO_TITLE: "Projects — Sergiu Mocan | .NET, AWS, Blockchain, ML",
  META_DESCRIPTION:
    "Software engineering projects built end to end: an Ethereum voting system, a physics-informed neural network and a real-time computer-vision cursor.",
}

export const BLOG: Page = {
  TITLE: "Blog",
  KICKER: "Transmissions",
  DESCRIPTION:
    "The software development lifecycle: planning, system architecture, and agile delivery from start to deployment.",
  SEO_TITLE: "Blog — .NET, AWS & Architecture | Sergiu Mocan",
  META_DESCRIPTION:
    "Practical notes on .NET, AWS and system architecture — async internals, resilience patterns and event-driven design, written from production experience.",
}

export const ABOUT: Page = {
  TITLE: "About",
  KICKER: "Who is behind the console",
  DESCRIPTION: "The longer version: how I work, what I have studied, and what I am chasing next.",
  SEO_TITLE: "About Sergiu Mocan — Software Engineer, Cluj-Napoca",
  META_DESCRIPTION:
    "How I work, what I have built and the tools I use. Software engineer specialising in .NET, AWS and distributed systems, based in Cluj-Napoca, Romania.",
}

export const CONTACT: Page = {
  TITLE: "Contact",
  KICKER: "Open a channel",
  DESCRIPTION: "The fastest ways to reach me.",
  SEO_TITLE: "Contact — Hire Sergiu Mocan, .NET & AWS Engineer",
  META_DESCRIPTION:
    "Hire Sergiu Mocan for .NET, AWS or full-stack development, or get in touch about an engineering role. Email, LinkedIn, GitHub and phone.",
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
    ITEMS: ["C#", "C++", "C", "Java", "TypeScript", "Python", "Solidity", "x86 Assembly"],
  },
  {
    LABEL: "Frameworks",
    ICON: "layers",
    ITEMS: [".NET", "Spring Boot", "React", "Node.js", "Avalonia UI", "Astro"],
  },
  {
    LABEL: "Cloud & DevOps",
    ICON: "cloud",
    ITEMS: [
      "AWS ECS/ ECR/ S3/ RDS/ VPC/ CloudWatch",
      "AWS CDK (IaC)",
      "Docker",
      "Kubernetes",
      "Azure DevOps CI/CD",
      "Bash",
    ],
  },
  {
    LABEL: "Data",
    ICON: "database",
    ITEMS: ["SQL", "SQL Server", "PostgreSQL", "Redis"],
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
