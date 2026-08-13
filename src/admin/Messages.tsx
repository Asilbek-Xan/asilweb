import { useState } from "react";
import { Trash2, MailOpen } from "lucide-react";
import { storage } from "../services/storage";
export default function Messages() {
 const [items,setItems]=useState(storage.getMessages<any>());
 const remove=(id:string)=>{const n=items.filter(x=>x.id!==id);storage.saveMessages(n);setItems(n)};
 const read=(id:string)=>{const n=items.map(x=>x.id===id?{...x,read:true}:x);storage.saveMessages(n);setItems(n)};
 return <div><h1 className="text-2xl font-black">Messages</h1><p className="mt-1 text-xs text-slate-500">Messages sent from your contact form.</p><div className="mt-6 space-y-3">{items.length===0?<div className="rounded-xl border border-white/7 bg-[#16142a] p-8 text-center text-xs text-slate-500">No messages yet.</div>:items.map(x=><div key={x.id} className="rounded-xl border border-white/7 bg-[#16142a] p-5"><div className="flex justify-between gap-4"><div><p className="text-xs font-bold">{x.name} <span className="font-normal text-slate-500">· {x.email}</span></p><p className="mt-1 text-[10px] text-slate-600">{new Date(x.createdAt).toLocaleString()}</p></div><div className="flex gap-2"><button onClick={()=>read(x.id)} className="rounded bg-white/5 p-2 text-slate-400"><MailOpen size={14}/></button><button onClick={()=>remove(x.id)} className="rounded bg-red-500/10 p-2 text-red-400"><Trash2 size={14}/></button></div></div><p className="mt-4 text-xs leading-6 text-slate-400">{x.message}</p></div>)}</div></div>;
}
