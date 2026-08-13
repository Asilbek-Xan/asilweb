import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { storage } from "../services/storage";
import { toast } from "react-toastify";
export default function Skills() {
 const [items,setItems]=useState(storage.getSkills()), [name,setName]=useState(""), [level,setLevel]=useState(80), [cat,setCat]=useState<"Frontend"|"Backend"|"Tools">("Frontend");
 const add=()=>{if(!name.trim())return;const next=[...items,{id:crypto.randomUUID(),name:name.trim(),level:Number(level),category:cat}];storage.saveSkills(next);setItems(next);setName("");toast.success("Skill added");toast.success("Skill added")};
 const del=(id:string)=>{const n=items.filter(x=>x.id!==id);storage.saveSkills(n);setItems(n);toast.success("Skill deleted");toast.success("Skill deleted")};
 return <div><h1 className="text-2xl font-black">Skills</h1><p className="mt-1 text-xs text-slate-500">Manage your skill cards and progress.</p>
 <div className="mt-6 grid gap-4 rounded-xl border border-white/7 bg-[#16142a] p-5 sm:grid-cols-4"><input value={name} onChange={e=>setName(e.target.value)} placeholder="Skill name" className="rounded-lg bg-[#111025] p-3 text-xs"/><select value={cat} onChange={e=>setCat(e.target.value as any)} className="rounded-lg bg-[#111025] p-3 text-xs"><option>Frontend</option><option>Backend</option><option>Tools</option></select><input type="number" min="1" max="100" value={level} onChange={e=>setLevel(+e.target.value)} className="rounded-lg bg-[#111025] p-3 text-xs"/><button onClick={add} className="rounded-lg bg-violet-600 text-xs font-bold"><Plus size={14} className="mr-1 inline"/>Add</button></div>
 <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{items.map(s=><div key={s.id} className="rounded-xl border border-white/7 bg-[#16142a] p-4"><div className="flex justify-between"><span className="text-xs font-semibold">{s.name}</span><button onClick={()=>del(s.id)} className="text-red-400"><Trash2 size={14}/></button></div><p className="mt-2 text-[10px] text-violet-300">{s.category} · {s.level}%</p><div className="mt-3 h-1.5 rounded-full bg-slate-800"><div className="h-full rounded-full bg-violet-500" style={{width:`${s.level}%`}}/></div></div>)}</div></div>;
}
