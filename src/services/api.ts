import type { Project } from "../types";

export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "https://backendenoughdd.pythonanywhere.com").replace(/\/$/, "");
export const PROJECTS_URL = `${API_BASE_URL}/api/projects/`;

function normalizeProject(item: any): Project {
  const technologies = Array.isArray(item.technologies)
    ? item.technologies.map(String)
    : String(item.technologies ?? "")
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean);

  const image = item.image ? (String(item.image).startsWith("http") ? String(item.image) : `${API_BASE_URL}${String(item.image).startsWith("/") ? "" : "/"}${String(item.image)}`) : "";

  return {
    id: String(item.id),
    title: item.title ?? "Untitled project",
    description: item.description ?? "",
    image,
    technologies,
    github: item.github_url ?? "",
    live: item.project_url ?? "",
    featured: Boolean(item.featured),
    status: item.status ?? "active",
  };
}

export async function fetchProjects(): Promise<Project[]> {
  const response = await fetch(PROJECTS_URL, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`Projects API returned ${response.status}`);
  const data = await response.json();
  const items = Array.isArray(data) ? data : data.results ?? [];
  return items.map(normalizeProject);
}

export type ProjectPayload = {
  title: string;
  description: string;
  technologies: string;
  project_url: string;
  github_url: string;
  featured: boolean;
  status: string;
  imageFile?: File | null;
};

function authHeaders(): Record<string, string> {
  const token = localStorage.getItem("portfolio_admin_api_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function parseError(response: Response) {
  try {
    const body = await response.json();
    return Object.values(body).flat().join(" ") || `Request failed (${response.status})`;
  } catch {
    return `Request failed (${response.status})`;
  }
}

export async function createProject(payload: ProjectPayload): Promise<Project> {
  const form = new FormData();
  form.append("title", payload.title);
  form.append("description", payload.description);
  form.append("technologies", payload.technologies);
  form.append("project_url", payload.project_url);
  form.append("github_url", payload.github_url);
  form.append("featured", String(payload.featured));
  form.append("status", payload.status);
  if (payload.imageFile) form.append("image", payload.imageFile);

  const response = await fetch(PROJECTS_URL, {
    method: "POST",
    headers: { ...authHeaders(), Accept: "application/json" },
    body: form,
  });
  if (!response.ok) throw new Error(await parseError(response));
  return normalizeProject(await response.json());
}

export async function updateProject(id: string, payload: ProjectPayload, keepImage = true): Promise<Project> {
  const form = new FormData();
  form.append("title", payload.title);
  form.append("description", payload.description);
  form.append("technologies", payload.technologies);
  form.append("project_url", payload.project_url);
  form.append("github_url", payload.github_url);
  form.append("featured", String(payload.featured));
  form.append("status", payload.status);
  if (payload.imageFile) form.append("image", payload.imageFile);
  else if (!keepImage) form.append("image", "");

  const response = await fetch(`${PROJECTS_URL}${id}/`, {
    method: "PATCH",
    headers: { ...authHeaders(), Accept: "application/json" },
    body: form,
  });
  if (!response.ok) throw new Error(await parseError(response));
  return normalizeProject(await response.json());
}

export async function deleteProject(id: string): Promise<void> {
  const response = await fetch(`${PROJECTS_URL}${id}/`, {
    method: "DELETE",
    headers: { ...authHeaders(), Accept: "application/json" },
  });
  if (!response.ok) throw new Error(await parseError(response));
}
