export const profile = {
  name: 'Gautham Gokulakonda',
  role: 'Software Development Engineer',
  location: 'Hyderabad, India',
  email: 'gokulakondagautham2002@gmail.com',
  phone: '+91-8688939536',
  github: 'https://github.com/Gautham-2002',
  linkedin: 'https://www.linkedin.com/in/gautham-gokulakonda-a92196231',
  tagline:
    'I build scalable web apps, microservices, and AI-powered systems — from whiteboard to production.',
  summary:
    'Software Development Engineer with 3+ years building scalable web applications, microservices, and AI-powered systems. I specialize in Python (async, typed), Go (concurrency patterns), TypeScript, and React, with deep experience in LLM integration, RAG pipelines, agentic workflows, and MCP. Obsessed with clean, maintainable code and solving complex engineering challenges end-to-end.',
}

export const stats = [
  { label: 'Years of experience', value: 3, suffix: '+' },
  { label: 'Lighthouse score lift', value: 97, prefix: '→ ' },
  { label: 'Test coverage achieved', value: 90, suffix: '%' },
  { label: 'Core languages', value: 8, suffix: '' },
]

export type Experience = {
  role: string
  company: string
  location: string
  period: string
  points: string[]
  tags: string[]
}

export const experiences: Experience[] = [
  {
    role: 'Senior Software Engineer',
    company: 'Deepta AI Private Limited',
    location: 'Hyderabad, India',
    period: '08/2025 — Present',
    points: [
      'Architected a high-scale student application onboarding platform for universities using Golang microservices, leveraging goroutines and channels for concurrent request processing.',
      'Designed pub/sub event pipelines with Kafka for async inter-service communication; implemented Redis for distributed caching and session management.',
      'Built JWT auth with refresh/access token rotation, PostgreSQL as the primary database, deployed on GCP GKE via Docker and Kubernetes.',
      'Developed embeddable JS packages to render dynamic application forms on third-party university sites, plus a BFF reverse proxy converting third-party cookies into first-party cookies.',
    ],
    tags: ['Go', 'Kafka', 'Redis', 'PostgreSQL', 'GKE', 'BFF'],
  },
  {
    role: 'Software Development Engineer',
    company: 'Apxor Technologies',
    location: 'Hyderabad, India',
    period: '08/2024 — 07/2025',
    points: [
      'Migrated a legacy CRA project to Vite.js — Lighthouse 54 → 97 (80% improvement); cut INP and blocking time from ~500ms to negligible via lazy loading, caching, and image optimization.',
      'Built a Chrome extension capturing user interactions; a backend service processes them via LLM API calls to generate automated test scripts.',
      'Architected and developed the backend for a test automation tool using microservices on GCP with Kubernetes.',
    ],
    tags: ['React', 'Vite', 'Performance', 'LLM', 'Chrome Extensions'],
  },
  {
    role: 'Associate Software Development Engineer',
    company: 'Apxor Technologies',
    location: 'Hyderabad, India',
    period: '03/2023 — 07/2024',
    points: [
      'Maintained NPM packages for user-interaction tracking and custom UI nudges with cross-browser compatibility; streamlined releases via CI/CD.',
      'Built a Chrome extension enabling end-to-end sales demos without client-side implementation, directly supporting client acquisition.',
      'Achieved ~90% code coverage through comprehensive unit testing.',
    ],
    tags: ['TypeScript', 'NPM', 'CI/CD', 'Testing'],
  },
]

export type TechLogo = {
  name: string
  src: string
}

// Brand SVGs sourced from theSVG.org (review individual brand trademarks).
export const techLogos: TechLogo[] = [
  { name: 'Go', src: '/logos/go.svg' },
  { name: 'Python', src: '/logos/python.svg' },
  { name: 'TypeScript', src: '/logos/typescript.svg' },
  { name: 'JavaScript', src: '/logos/javascript.svg' },
  { name: 'React', src: '/logos/react.svg' },
  { name: 'Next.js', src: '/logos/nextjs.svg' },
  { name: 'Tailwind CSS', src: '/logos/tailwind.svg' },
  { name: 'Node.js', src: '/logos/nodejs.svg' },
  { name: 'FastAPI', src: '/logos/fastapi.svg' },
  { name: 'LangChain', src: '/logos/langchain.svg' },
  { name: 'OpenAI', src: '/logos/openai.svg' },
  { name: 'GraphQL', src: '/logos/graphql.svg' },
  { name: 'gRPC', src: '/logos/grpc.svg' },
  { name: 'PostgreSQL', src: '/logos/postgresql.svg' },
  { name: 'MongoDB', src: '/logos/mongodb.svg' },
  { name: 'Redis', src: '/logos/redis.svg' },
  { name: 'Apache Kafka', src: '/logos/kafka.svg' },
  { name: 'Docker', src: '/logos/docker.svg' },
  { name: 'Kubernetes', src: '/logos/kubernetes.svg' },
  { name: 'Google Cloud', src: '/logos/googlecloud.svg' },
  { name: 'Vite', src: '/logos/vite.svg' },
  { name: 'Git', src: '/logos/git.svg' },
]

export type SkillGroup = {
  title: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    skills: ['Python', 'Go', 'TypeScript', 'JavaScript', 'Java', 'C++', 'HTML', 'CSS'],
  },
  {
    title: 'Frontend',
    skills: [
      'React.js',
      'Next.js',
      'TanStack Query',
      'TanStack Router',
      'Zustand',
      'Tailwind CSS',
      'Playwright',
      'Vitest',
    ],
  },
  {
    title: 'AI / LLM',
    skills: [
      'FastAPI',
      'asyncio',
      'OpenAI SDK',
      'LangGraph',
      'LangChain',
      'RAG',
      'MCP',
      'FAISS',
      'Chroma',
    ],
  },
  {
    title: 'Backend',
    skills: [
      'Microservices',
      'REST APIs',
      'Node.js',
      'Express.js',
      'WebSockets',
      'SSE',
      'gRPC',
      'BFF Pattern',
    ],
  },
  {
    title: 'Data & Messaging',
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Kafka', 'SQL'],
  },
  {
    title: 'DevOps & Cloud',
    skills: ['Docker', 'Kubernetes (GKE)', 'GCP', 'CI/CD', 'Git'],
  },
]

export type Project = {
  title: string
  description: string
  tags: string[]
  span: 'wide' | 'tall' | 'normal'
  accent?: boolean
  github?: string
  demo?: string
}

export const projects: Project[] = [
  {
    title: 'University Onboarding Platform',
    description:
      'High-scale student application platform built on Go microservices with goroutine-based concurrent processing, Kafka pub/sub pipelines, and Redis-backed sessions — deployed on GKE.',
    tags: ['Go', 'Kafka', 'Redis', 'Kubernetes'],
    span: 'wide',
    accent: true,
  },
  {
    title: 'CRA → Vite Performance Overhaul',
    description:
      'Migrated a legacy frontend and lifted Lighthouse from 54 to 97, slashing INP and blocking time from ~500ms to negligible.',
    tags: ['React', 'Vite', 'Web Vitals'],
    span: 'tall',
  },
  {
    title: 'QA Test Automation Platform',
    description:
      'Architected the backend for a test automation tool at Apxor — microservices on GCP/Kubernetes, paired with a Chrome extension that captures user interactions and feeds them to an LLM that auto-generates end-to-end test scripts.',
    tags: ['Go', 'LLM', 'GKE', 'Chrome Ext'],
    span: 'wide',
  },
  {
    title: 'Analytics & Nudge SDK',
    description:
      'Maintained the NPM packages powering Apxor’s user-interaction tracking and in-app nudges across web clients — cross-browser, tree-shakable, with ~90% unit test coverage and CI/CD-driven releases.',
    tags: ['TypeScript', 'NPM', 'SDK', 'Testing'],
    span: 'normal',
  },
  {
    title: 'Sales-Demo Chrome Extension',
    description:
      'Built a Chrome extension that lets the Apxor sales team run full end-to-end product demos on any client site — zero client-side integration required. Directly unlocked new customer acquisition.',
    tags: ['Chrome Ext', 'TypeScript', 'DX'],
    span: 'normal',
  },
  {
    title: 'Vigilant',
    description:
      'Python-based observability / monitoring toolkit — keeps an eye on services and surfaces anomalies before they page you.',
    tags: ['Python', 'Monitoring', 'CLI'],
    span: 'normal',
    github: 'https://github.com/Gautham-2002/vigilant',
  },
  {
    title: 'PayGuard',
    description:
      'Payments-fraud experiment in Python — rule + ML hybrid for flagging suspicious transactions on the fly.',
    tags: ['Python', 'Fraud', 'ML'],
    span: 'normal',
    github: 'https://github.com/Gautham-2002/pay-guard',
  },
]
