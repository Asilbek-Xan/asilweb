export default function SimplePage({title, text}: {title:string; text:string}) {
 return <div><h1 className="text-2xl font-black">{title}</h1><p className="mt-1 text-xs text-slate-500">{text}</p><div className="mt-6 rounded-xl border border-white/7 bg-[#16142a] p-6 text-xs leading-6 text-slate-400">This section is ready for your portfolio data. You can connect it to an API later or keep using localStorage for this starter.</div></div>
}
