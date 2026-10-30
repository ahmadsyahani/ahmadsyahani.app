// ── Personal Info ──────────────────────────────────────────────
export const personalInfo = {
  name: "Ahmad Syahani",
  role: "Full Stack Developer",
  tagline: "Building products people love to use.",
  bio: "I design and build fast, reliable, and beautiful digital products — from architecture to UI. Based in Indonesia, I focus on crafting experiences that are both technically sound and visually refined.",
  email: "ahmadsyahani06@gmail.com",
  github: "https://github.com/ahmadsyahani",
  linkedin: "https://www.linkedin.com/in/ahmad-syahani",
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
    id: "mis-bytes",
    num: "01",
    title: "MIS Bytes",
    category: "Web Application",
    year: "2026",
    role: "Full Stack Developer",
    desc: "A web application for classroom administration and financial record keeping, bringing everyday class information into one place.",
    image: "/project-ecommerce.jpg",
    tags: ["Next.js", "TypeScript", "Laravel", "TailwindCSS", "PostgreSQL"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    overview:
      "MIS Bytes is a web-based information management project for classroom administration and financial records. It brings these two areas into a shared application, with the aim of making everyday class information easier to organise and review.\n\nMy role covers full-stack development. The listed stack combines Next.js and TypeScript with Laravel and PostgreSQL, while Tailwind CSS supports the interface. The project connects the work of presenting information on the web with the systems needed to store and manage it.",
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
    id: "nexa-app",
    num: "02",
    title: "Nexa App",
    category: "Mobile Application",
    year: "2026",
    role: "Mobile Developer",
    desc: "A mobile application for study scheduling and classroom financial records, designed around everyday student activities.",
    image: "/project-mobile.jpg",
    tags: ["Flutter", "SQLite", "Dart"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    overview:
      "Nexa App brings study scheduling and classroom financial records into a mobile application. Its focus is on two everyday needs: organising learning activities and keeping class-related financial information accessible from a phone.\n\nMy role is mobile development, using Flutter and Dart with SQLite. The project brings together interface development and local data storage within a mobile codebase, with the aim of keeping these everyday tasks straightforward to navigate.",
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
    id: "pensmate-portfolio",
    num: "03",
    title: "Pensmate Portfolio",
    category: "Portfolio and Company Profile",
    year: "2026",
    role: "Full Stack Developer",
    desc: "A portfolio and company profile website for Pensmate, bringing its identity and work together in a clear online presentation.",
    image: "/project-analytics.jpg",
    tags: ["React", "NextJS", "PHP", "Redis", "ClickHouse"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    overview:
      "Pensmate Portfolio is a company profile and portfolio website for Pensmate. The project focuses on presenting the organisation and its work in one place, giving visitors a clear starting point for understanding its identity and online presence.\n\nMy contribution covers full-stack development. The listed technologies include React, Next.js, PHP, Redis, and ClickHouse. The website brings presentation and technical implementation together, with a focus on how company information is organised and communicated to visitors.",
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
    id: "core-pensmate",
    num: "04",
    title: "Pensmate Core",
    category: "Web Application",
    year: "2026",
    role: "Full Stack Developer",
    desc: "A web project for Pensmate?s company profile, combining a public-facing presentation with full-stack development.",
    image: "/project-analytics.jpg",
    tags: ["React", "NextJS", "TailwindCSS", "Laravel"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    overview:
      "Pensmate Core is a web project for Pensmate?s company profile. Its current scope centres on presenting company information through a web application, connecting the public-facing experience with the underlying implementation.\n\nMy role covers full-stack development with React, Next.js, Tailwind CSS, and Laravel. The project provides a place to bring interface structure, styling, and backend work together within the same development effort.",
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
    role: "Webmaster",
    company: "Pensmate",
    period: "2025 — Present",
    desc: "Leading development of a multi-tenant SaaS platform serving 50,000+ users. Architected microservices infrastructure on AWS and reduced deployment time by 70%.",
  },
  {
    role: "GDG on Campus PENS - RnD Web Development",
    company: "GDG On Campus",
    period: "2025 — Present",
    desc: "Built and shipped a real-time collaboration tool with React and Node.js. Reduced API response time by 60% through query optimization and Redis caching.",
  },
  {
    role: "Internship Software Developer",
    company: "CV Egalite Solution",
    period: "2022 — 2023 (6 Month)",
    desc: "Delivered pixel-perfect UI for 20+ client projects. Introduced TypeScript and component-driven development across the team codebase.",
  },
];

// ── Skills / Technologies ──────────────────────────────────────
export const skills = [
  "React",
  "Next.js",
  "JavaScript",
  "TypeScript",
  "Tailwind CSS",
  "GSAP",
  "Kotlin",
  "React Native",
  "Rust",
  "Go",
  "Laravel",
  "Express.js",
  "Node.js",
  "PostgreSQL",
  "MongoDB",
  "Flutter",
  "Vue",
];

// Add technologies you are currently learning here. Matching entries in
// `skills` appear only under Still learning, rather than in both sections.
export const learningSkills: string[] = [
  "Python",
  "TensorFlow",
  "MATLAB",
  "QGIS",
];

// ── Navigation ─────────────────────────────────────────────────
export const navItems = [
  { label: "Projects", href: "/#projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
];
