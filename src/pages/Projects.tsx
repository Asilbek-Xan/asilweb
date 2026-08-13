import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import SectionTitle from "../components/SectionTitle";
import { fetchProjects } from "../services/api";
import type { Project } from "../types";

export default function Projects() {
  const [query, setQuery] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { fetchProjects().then(setProjects).catch(() => setProjects([])).finally(() => setLoading(false)); }, []);
  const filtered = useMemo(() => projects.filter(p => `${p.title} ${p.description} ${p.technologies.join(" ")}`.toLowerCase().includes(query.toLowerCase())), [projects, query]);
  return <><Navbar/><main className="min-h-screen bg-[#0d0b1c] px-5 pb-20 pt-28"><div className="mx-auto max-w-6xl"><SectionTitle eyebrow="Portfolio" title="All Projects" description="Explore my work and experiments."/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search projects..." className="mb-7 w-full rounded-xl border border-white/8 bg-[#16142a] px-4 py-3 text-xs text-white outline-none focus:border-violet-500"/>{loading ? <div className="py-16 text-center text-xs text-slate-500">Projects yuklanmoqda...</div> : <div className="grid gap-5 sm:grid-cols-2">{filtered.map(p=><ProjectCard key={p.id} project={p}/>)}</div>}</div></main><Footer/></>;
}
