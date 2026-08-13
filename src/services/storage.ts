import { defaultExperience, defaultProjects, defaultSkills } from "../data/defaults";
import type { Experience, Project, Skill } from "../types";

const KEYS = {
  projects: "portfolio_projects",
  skills: "portfolio_skills",
  experience: "portfolio_experience",
  messages: "portfolio_messages",
  auth: "portfolio_admin_auth"
};

function read<T>(key: string, fallback: T): T {
  const raw = localStorage.getItem(key);
  if (!raw) {
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

function write<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export const storage = {
  getProjects: () => read<Project[]>(KEYS.projects, defaultProjects),
  saveProjects: (v: Project[]) => write(KEYS.projects, v),
  getSkills: () => read<Skill[]>(KEYS.skills, defaultSkills),
  saveSkills: (v: Skill[]) => write(KEYS.skills, v),
  getExperience: () => read<Experience[]>(KEYS.experience, defaultExperience),
  saveExperience: (v: Experience[]) => write(KEYS.experience, v),
  getMessages: <T>() => read<T[]>(KEYS.messages, []),
  saveMessages: <T>(v: T[]) => write(KEYS.messages, v),
  isAdmin: () => localStorage.getItem(KEYS.auth) === "true",
  login: () => localStorage.setItem(KEYS.auth, "true"),
  logout: () => localStorage.removeItem(KEYS.auth)
};
