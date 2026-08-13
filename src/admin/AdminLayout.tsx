import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { BarChart3, BriefcaseBusiness, GraduationCap, LayoutDashboard, LogOut, Mail, Settings, User, Wrench } from "lucide-react";
import { storage } from "../services/storage";

const links = [
  ["/admin","Dashboard",LayoutDashboard],
  ["/admin/projects","Projects",BriefcaseBusiness],
  ["/admin/skills","Skills",Wrench],
  ["/admin/experience","Experience",BarChart3],
  ["/admin/education","Education",GraduationCap],
  ["/admin/messages","Messages",Mail],
  ["/admin/profile","Profile",User],
  ["/admin/settings","Settings",Settings]
] as const;

export default function AdminLayout() {
  const nav = useNavigate();
  return <div className="min-h-screen bg-[#0d0b1c] text-white md:flex">
    <aside className="hidden w-60 shrink-0 border-r border-white/6 bg-[#111025] p-4 md:block">
      <div className="mb-8 px-3 pt-2 text-sm font-black tracking-[.2em]">ADMIN<span className="text-violet-400">.</span></div>
      <nav className="space-y-1">{links.map(([to,label,Icon])=>
        <NavLink end={to==="/admin"} key={to} to={to} className={({isActive})=>`flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs ${isActive?"bg-violet-600 text-white":"text-slate-400 hover:bg-white/5 hover:text-white"}`}><Icon size={15}/>{label}</NavLink>
      )}</nav>
      <button onClick={()=>{storage.logout();nav("/admin/login")}} className="mt-8 flex w-full items-center gap-3 px-3 py-2 text-xs text-slate-500 hover:text-white"><LogOut size={15}/> Logout</button>
    </aside>
    <div className="min-w-0 flex-1"><header className="sticky top-0 z-20 border-b border-white/6 bg-[#0d0b1c]/90 px-5 py-4 backdrop-blur-xl"><div className="flex items-center justify-between"><div><p className="text-xs font-semibold">Portfolio Admin</p><p className="text-[10px] text-slate-500">Manage your website content</p></div><button onClick={()=>{storage.logout();nav("/admin/login")}} className="rounded-lg border border-white/8 p-2 text-slate-400 md:hidden"><LogOut size={15}/></button></div></header><main className="p-5 md:p-8"><Outlet/></main></div>
  </div>;
}
