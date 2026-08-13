import type { Experience } from "../types";

export default function Timeline({ items }: { items: Experience[] }) {
  return (
    <div className="relative mx-auto max-w-3xl">
      <div className="absolute left-3 top-0 h-full w-px bg-violet-500/25 md:left-1/2" />
      <div className="space-y-8">
        {items.map((item, i) => (
          <div key={item.id} className={`relative flex ${i % 2 ? "md:justify-end" : "md:justify-start"}`}>
            <div className="absolute left-0 top-4 z-10 h-6 w-6 rounded-full border-4 border-[#0d0b1c] bg-violet-500 shadow-[0_0_18px_rgba(139,92,246,.7)] md:left-1/2 md:-translate-x-1/2" />
            <article className="ml-10 w-full rounded-xl border border-white/7 bg-[#16142a] p-5 md:ml-0 md:w-[45%]">
              <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">{item.period}</p>
              <h3 className="mt-2 font-semibold text-white">{item.role}</h3>
              <p className="mt-1 text-xs text-violet-300">{item.company}</p>
              <p className="mt-3 text-xs leading-5 text-slate-400">{item.description}</p>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}
