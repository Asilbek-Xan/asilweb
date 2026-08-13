import type { Experience, Project, Skill } from "../types";

export const defaultProjects: Project[] = [
  {
    id: "blogify",
    title: "Blogify",
    description: "A modern blog platform with article browsing, search, categories and an admin workflow.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1000&q=80",
    technologies: ["React", "TypeScript", "Tailwind"],
    github: "https://github.com/",
    live: "https://vercel.com/",
    featured: true
  },
  {
    id: "ai-project",
    title: "AI Project",
    description: "A clean AI-focused web experience with responsive UI and API-ready architecture.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1000&q=80",
    technologies: ["React", "TypeScript", "API"],
    github: "https://github.com/",
    live: "https://vercel.com/",
    featured: true
  },
  {
    id: "cars-api",
    title: "Cars Explorer",
    description: "A searchable cars application with filters, cards, pagination and responsive layout.",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1000&q=80",
    technologies: ["JavaScript", "REST API", "CSS"],
    github: "https://github.com/",
    live: "https://vercel.com/",
    featured: true
  },
  {
    id: "todo",
    title: "Todo Manager",
    description: "A practical task manager with CRUD operations, filters, sorting and pagination.",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1000&q=80",
    technologies: ["React", "API", "Tailwind"],
    github: "https://github.com/",
    live: "https://vercel.com/",
    featured: true
  }
];

export const defaultSkills: Skill[] = [
  { id: "s1", name: "HTML / CSS", category: "Frontend", level: 95 },
  { id: "s2", name: "JavaScript", category: "Frontend", level: 90 },
  { id: "s3", name: "TypeScript", category: "Frontend", level: 82 },
  { id: "s4", name: "React", category: "Frontend", level: 88 },
  { id: "s5", name: "Tailwind CSS", category: "Frontend", level: 92 },
  { id: "s6", name: "Node.js", category: "Backend", level: 70 },
  { id: "s7", name: "REST API", category: "Backend", level: 82 },
  { id: "s8", name: "Git / GitHub", category: "Tools", level: 88 },
  { id: "s9", name: "VS Code", category: "Tools", level: 95 }
];

export const defaultExperience: Experience[] = [
  {
    id: "e1",
    role: "Frontend Developer",
    company: "Freelance / Personal Projects",
    period: "2025 — Present",
    description: "Building responsive web applications with React, TypeScript, APIs and modern UI systems.",
    type: "work"
  },
  {
    id: "e2",
    role: "Frontend Development Student",
    company: "Najot Ta'lim",
    period: "2025 — 2026",
    description: "Studying JavaScript, TypeScript, React, Git, APIs and frontend architecture through practical projects.",
    type: "education"
  },
  {
    id: "e3",
    role: "JavaScript Developer",
    company: "Personal Learning",
    period: "2024 — 2025",
    description: "Learned core JavaScript, DOM, asynchronous programming, REST APIs and CRUD patterns.",
    type: "education"
  }
];
