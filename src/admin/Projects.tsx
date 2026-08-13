import { Link, useNavigate } from "react-router-dom";
import { Pencil, Plus, RefreshCw, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { Project } from "../types";
import { deleteProject, fetchProjects } from "../services/api";

export default function Projects() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const nav = useNavigate();

  const load = async () => {
    setLoading(true);
    try { setItems(await fetchProjects()); }
    catch (e) { toast.error(e instanceof Error ? e.message : "Projects API bilan ulanishda xato"); }
    finally { setLoading(false); }
  };

  useEffect(() => { void load(); }, []);

  const del = async (id: string) => {
    if (!confirm("Bu projectni o‘chirishni xohlaysizmi?")) return;
    setDeleting(id);
    try { await deleteProject(id); setItems(prev => prev.filter(x => x.id !== id)); toast.success("Project deleted"); }
    catch (e) { toast.error(e instanceof Error ? e.message : "Project o‘chirilmadi"); }
    finally { setDeleting(null); }
  };

  return <div>
    <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
      <div><h1 className="text-2xl font-black">Projects</h1><p className="text-xs text-slate-500">API orqali projectlarni qo‘shing, tahrirlang va o‘chiring.</p></div>
      <div className="flex gap-2"><button onClick={() => void load()} className="rounded-lg border border-white/8 px-3 py-2.5 text-xs text-slate-300 hover:bg-white/5"><RefreshCw size={14}/></button><Link to="/admin/projects/new" className="rounded-lg bg-violet-600 px-4 py-2.5 text-xs font-bold hover:bg-violet-500"><Plus size={14} className="mr-1 inline"/> New Project</Link></div>
    </div>
    <div className="overflow-x-auto rounded-xl border border-white/7 bg-[#16142a]">
      {loading ? <div className="p-10 text-center text-xs text-slate-500">Projects yuklanmoqda...</div> : items.length === 0 ? <div className="p-10 text-center text-xs text-slate-500">Hozircha project yo‘q.</div> :
      <table className="w-full min-w-[780px] text-left text-xs"><thead className="border-b border-white/7 text-slate-500"><tr><th className="p-4">Project</th><th>Technologies</th><th>Status</th><th>Featured</th><th className="text-right">Actions</th></tr></thead><tbody>
        {items.map(p => <tr key={p.id} className="border-b border-white/5 last:border-0 hover:bg-white/[.02]">
          <td className="p-4"><div className="flex items-center gap-3">{p.image ? <img src={p.image} className="h-10 w-14 rounded object-cover"/> : <div className="flex h-10 w-14 items-center justify-center rounded bg-violet-500/10 text-violet-300">A</div>}<div><p className="font-semibold">{p.title}</p><p className="max-w-xs truncate text-[10px] text-slate-500">{p.description}</p></div></div></td>
          <td className="max-w-[240px] text-slate-400">{p.technologies.join(", ")}</td>
          <td><span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] text-emerald-400">{p.status || "active"}</span></td>
          <td>{p.featured ? <span className="text-violet-300">Yes</span> : <span className="text-slate-600">No</span>}</td>
          <td><div className="flex justify-end gap-2"><button onClick={() => nav(`/admin/projects/${p.id}/edit`)} className="rounded bg-white/5 p-2 text-slate-300 hover:text-white"><Pencil size={14}/></button><button disabled={deleting === p.id} onClick={() => void del(p.id)} className="rounded bg-red-500/10 p-2 text-red-400 disabled:opacity-40"><Trash2 size={14}/></button></div></td>
        </tr>)}
      </tbody></table>}
    </div>
  </div>;
}
