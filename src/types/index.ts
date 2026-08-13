export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  live: string;
  featured: boolean;
  status?: string;
};

export type Skill = {
  id: string;
  name: string;
  category: "Frontend" | "Backend" | "Tools";
  level: number;
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  type: "work" | "education";
};

export type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
};
