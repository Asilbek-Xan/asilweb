import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "../types";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article whileHover={{ y: -5 }} className="overflow-hidden rounded-xl border border-white/8 bg-[#16142a]">
      <div className="aspect-[16/9] overflow-hidden bg-[#111025]">
        {project.image ? <img src={project.image} alt={project.title} className="h-full w-full object-cover transition duration-500 hover:scale-105" /> : <div className="flex h-full items-center justify-center text-4xl font-black text-violet-400/20">A</div>}
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between gap-3">
          <h3 className="font-semibold text-white">{project.title}</h3>
          <div className="flex gap-2">
            {project.github && <a href={project.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-slate-400 hover:text-white"><Github size={16}/></a>}
            {project.live && <a href={project.live} target="_blank" rel="noreferrer" aria-label="Live project" className="text-slate-400 hover:text-violet-400"><ExternalLink size={16}/></a>}
          </div>
        </div>
        <p className="line-clamp-2 text-xs leading-5 text-slate-400">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {(Array.isArray(project.technologies) ? project.technologies : String(project.technologies || "").split(",")).filter(Boolean).map(t => <span key={t} className="rounded-md border border-violet-400/15 bg-violet-500/8 px-2 py-1 text-[10px] text-violet-300">{String(t).trim()}</span>)}
        </div>
      </div>
    </motion.article>
  );
}
