import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ImagePlus, Save } from "lucide-react";
import { storage } from "../services/storage";
import { createProject, fetchProjects, updateProject } from "../services/api";
import type { Project } from "../types";
import { toast } from "react-toastify";

const empty = { title: "", description: "", technologies: "React, TypeScript", project_url: "", github_url: "", featured: false, status: "active" };

export default function ProjectForm() {
  const nav = useNavigate(), { id } = useParams();
  const [form, setForm] = useState(empty);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState("");
  const [loading, setLoading] = useState(Boolean(id));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const project = (await fetchProjects()).find(p => p.id === id);
        if (!project) { toast.error("Project topilmadi"); nav("/admin/projects"); return; }
        setForm({ title: project.title, description: project.description, technologies: project.technologies.join(", "), project_url: project.live, github_url: project.github, featured: project.featured, status: project.status || "active" });
        setCurrentImage(project.image);
      } catch (e) { toast.error(e instanceof Error ? e.message : "Project yuklanmadi"); }
      finally { setLoading(false); }
    })();
  }, [id, nav]);

  const set = (key: keyof typeof form, value: string | boolean) => setForm(prev => ({ ...prev, [key]: value }));

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) { toast.error("Title va description to‘ldirilishi kerak"); return; }
    setSaving(true);
    try {
      const payload = { ...form, title: form.title.trim(), description: form.description.trim(), technologies: form.technologies.split(",").map(x => x.trim()).filter(Boolean).join(", "), imageFile };
      if (id) await updateProject(id, payload, true);
      else await createProject(payload);
      toast.success(id ? "Project updated successfully" : "Project added successfully");
      nav("/admin/projects");
    } catch (e) { toast.error(e instanceof Error ? e.message : "Saqlashda xato"); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="py-20 text-center text-xs text-slate-500">Project yuklanmoqda...</div>;

  return <form onSubmit={save} className="mx-auto max-w-4xl">
    <div className="mb-7 flex items-center justify-between gap-3"><div><button type="button" onClick={() => nav("/admin/projects")} className="mb-3 flex items-center gap-1 text-[11px] text-slate-500 hover:text-white"><ArrowLeft size={13}/> Back to projects</button><h1 className="text-2xl font-black">{id ? "Edit Project" : "Create Project"}</h1><p className="mt-1 text-xs text-slate-500">Ma’lumotlar backend API'ga saqlanadi.</p></div></div>
    <div className="grid gap-4 rounded-xl border border-white/7 bg-[#16142a] p-5 sm:grid-cols-2">
      <label className="text-xs text-slate-400">Title<input required value={form.title} onChange={e => set("title", e.target.value)} className="mt-2 w-full rounded-lg border border-white/7 bg-[#111025] p-3 text-xs text-white outline-none focus:border-violet-500"/></label>
      <label className="text-xs text-slate-400">Status<select value={form.status} onChange={e => set("status", e.target.value)} className="mt-2 w-full rounded-lg border border-white/7 bg-[#111025] p-3 text-xs text-white outline-none"><option value="active">Active</option><option value="inactive">Inactive</option></select></label>
      <label className="text-xs text-slate-400">Project URL<input type="url" value={form.project_url} onChange={e => set("project_url", e.target.value)} placeholder="https://..." className="mt-2 w-full rounded-lg border border-white/7 bg-[#111025] p-3 text-xs text-white outline-none focus:border-violet-500"/></label>
      <label className="text-xs text-slate-400">GitHub URL<input type="url" value={form.github_url} onChange={e => set("github_url", e.target.value)} placeholder="https://github.com/..." className="mt-2 w-full rounded-lg border border-white/7 bg-[#111025] p-3 text-xs text-white outline-none focus:border-violet-500"/></label>
      <label className="text-xs text-slate-400 sm:col-span-2">Description<textarea required value={form.description} onChange={e => set("description", e.target.value)} rows={5} className="mt-2 w-full rounded-lg border border-white/7 bg-[#111025] p-3 text-xs text-white outline-none focus:border-violet-500"/></label>
      <label className="text-xs text-slate-400 sm:col-span-2">Technologies<span className="ml-2 text-[10px] text-slate-600">comma bilan ajrating</span><input value={form.technologies} onChange={e => set("technologies", e.target.value)} placeholder="React, TypeScript, Tailwind" className="mt-2 w-full rounded-lg border border-white/7 bg-[#111025] p-3 text-xs text-white outline-none focus:border-violet-500"/></label>
      <label className="text-xs text-slate-400 sm:col-span-2">Project image<div className="mt-2 flex flex-wrap items-center gap-4">{currentImage && !imageFile && <img src={currentImage} alt="Current" className="h-20 w-32 rounded-lg object-cover"/>}<div className="relative flex-1 rounded-lg border border-dashed border-white/10 bg-[#111025] p-4"><ImagePlus size={18} className="mb-2 text-violet-300"/><input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className="w-full text-[11px] text-slate-400"/>{imageFile && <p className="mt-2 text-[10px] text-violet-300">{imageFile.name}</p>}</div></div></label>
      <label className="flex items-center gap-2 text-xs text-slate-300 sm:col-span-2"><input type="checkbox" checked={form.featured} onChange={e => set("featured", e.target.checked)}/> Featured project</label>
    </div>
    <div className="mt-4 flex justify-end gap-2"><button type="button" onClick={() => nav("/admin/projects")} className="rounded-lg border border-white/8 px-4 py-2.5 text-xs">Cancel</button><button disabled={saving} className="rounded-lg bg-violet-600 px-5 py-2.5 text-xs font-bold disabled:opacity-50"><Save size={14} className="mr-1 inline"/>{saving ? "Saving..." : "Save Project"}</button></div>
  </form>;
}
