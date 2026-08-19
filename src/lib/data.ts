// ── Personal Info ──────────────────────────────────────────────
export const personalInfo = {
  name: "Ahmad Syahani",
  role: "Full Stack Developer",
  tagline: "Building products people love to use.",
  bio: "I design and build fast, reliable, and beautiful digital products — from architecture to UI. Based in Indonesia, I focus on crafting experiences that are both technically sound and visually refined.",
  email: "ahmad@example.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  location: "Indonesia",
  availability: "Open to work",
};

// ── Projects ───────────────────────────────────────────────────
export interface Project {
  id: string;
  num: string;
  title: string;
  category: string;
  year: string;
  role: string;
  desc: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  overview: string;
  sections: { label: string; body: string }[];
}

export const projects: Project[] = [
  {
    id: "ecommerce-dashboard",
    num: "01",
    title: "E-Commerce Dashboard",
    category: "Web Application",
    year: "2024",
    role: "Full Stack Developer",
    desc: "Unified retail management platform serving 2,300+ daily users.",
    image: "/project-ecommerce.jpg",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "AWS", "Stripe"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    overview:
      "A unified retail management platform for a growing brand — handling orders, inventory, revenue analytics, and customer data across multiple stores in real time.",
    sections: [
      {
        label: "Problem",
        body: "Four separate tools that didn't communicate. The team was losing hours weekly manually reconciling data, and leadership had no unified view of business health.",
      },
      {
        label: "Approach",
        body: "Architected a full-stack dashboard with Next.js App Router and TypeScript on the frontend. Built a Node.js + PostgreSQL backend with Stripe webhooks for real-time order processing.",
      },
      {
        label: "Outcome",
        body: "Manual data work reduced by 80%. Order processing speed improved 3×. Launched to 2,300+ daily active users within the first quarter.",
      },
    ],
  },
  {
    id: "sync-mobile",
    num: "02",
    title: "Sync",
    category: "Mobile Application",
    year: "2024",
    role: "Full Stack Developer",
    desc: "Collaborative workspace for distributed teams across time zones.",
    image: "/project-mobile.jpg",
    tags: ["React Native", "Node.js", "MongoDB", "Socket.io"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    overview:
      "A collaborative task management app for remote teams — merging project tracking with an activity feed to keep distributed members aligned across time zones.",
    sections: [
      {
        label: "Problem",
        body: "Existing tools like Slack and Asana each solved half the problem. Teams needed a single mobile-first experience that merged project tracking with team communication.",
      },
      {
        label: "Approach",
        body: "Built a React Native app (Expo) with real-time Socket.io backend on Node.js and MongoDB Atlas. Features include kanban boards, task assignment, and a social activity feed.",
      },
      {
        label: "Outcome",
        body: "Launched on iOS and Android with a 4.7★ average rating. 1,200+ downloads in the first month. Productivity scores improved 35% in user surveys.",
      },
    ],
  },
  {
    id: "nexaflow-analytics",
    num: "03",
    title: "NexaFlow",
    category: "SaaS Platform",
    year: "2023",
    role: "Full Stack Developer",
    desc: "High-performance analytics engine processing 8M events/day.",
    image: "/project-analytics.jpg",
    tags: ["React", "Python", "FastAPI", "Redis", "ClickHouse"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    overview:
      "Affordable, developer-friendly product analytics for B2B SaaS — without the vendor lock-in or complexity of tools like Mixpanel.",
    sections: [
      {
        label: "Problem",
        body: "B2B SaaS teams needed deep behavioral analytics but existing tools were prohibitively expensive or required a data engineering team to set up properly.",
      },
      {
        label: "Approach",
        body: "Designed a dual-store architecture: ClickHouse for columnar analytics queries and Redis for pre-aggregated real-time counters. Python/FastAPI backend handles ingestion at scale.",
      },
      {
        label: "Outcome",
        body: "1.2s average dashboard load time on 100M+ event datasets. 40+ B2B customers onboarded. Processing 8M events/day at peak throughput.",
      },
    ],
  },
  {
    id: "nexus-api",
    num: "04",
    title: "Nexus Dev",
    category: "Developer Tooling",
    year: "2023",
    role: "Full Stack Developer",
    desc: "Self-hosted API management with a developer-first interface.",
    image: "/project-api.jpg",
    tags: ["Go", "Docker", "PostgreSQL", "REST", "JWT"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    overview:
      "A lightweight, self-hosted API management tool with endpoint documentation, authentication management, and a built-in request viewer — built for developers, by a developer.",
    sections: [
      {
        label: "Problem",
        body: "Existing open-source API tools were either too complex to self-host or had UIs that developers actively avoided using. Teams defaulted to scattered Markdown files.",
      },
      {
        label: "Approach",
        body: "Built a Go backend with JWT-based auth, RBAC, and a webhook system. The React frontend provides a VS Code-inspired interface for viewing and testing endpoints live.",
      },
      {
        label: "Outcome",
        body: "Adopted internally at 3 companies. Replaced Postman + Swagger setup for a 12-person engineering team. API documentation accuracy improved by over 90%.",
      },
    ],
  },
];

// ── Experience ─────────────────────────────────────────────────
export interface Experience {
  role: string;
  company: string;
  period: string;
  desc: string;
}

export const experience: Experience[] = [
  {
    role: "Senior Full Stack Developer",
    company: "PT. Teknologi Maju",
    period: "2023 — Present",
    desc: "Leading development of a multi-tenant SaaS platform serving 50,000+ users. Architected microservices infrastructure on AWS and reduced deployment time by 70%.",
  },
  {
    role: "Full Stack Developer",
    company: "Startup ABC",
    period: "2021 — 2023",
    desc: "Built and shipped a real-time collaboration tool with React and Node.js. Reduced API response time by 60% through query optimization and Redis caching.",
  },
  {
    role: "Frontend Developer",
    company: "Agency XYZ",
    period: "2019 — 2021",
    desc: "Delivered pixel-perfect UI for 20+ client projects. Introduced TypeScript and component-driven development across the team codebase.",
  },
];

// ── Skills / Technologies ──────────────────────────────────────
export const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Go",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "AWS",
  "GraphQL",
  "React Native",
  "Redis",
];

// ── Navigation ─────────────────────────────────────────────────
export const navItems = [
  { label: "Projects", href: "/#projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
];
