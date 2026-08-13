import { motion } from "framer-motion";
import type { Skill } from "../types";

export default function SkillBar({ skill }: { skill: Skill }) {
  return (
    <div className="rounded-xl border border-white/7 bg-[#16142a] p-4">
      <div className="mb-2 flex justify-between text-xs">
        <span className="text-slate-200">{skill.name}</span>
        <span className="text-violet-300">{skill.level}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
        <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }}
          transition={{ duration: 0.9 }} className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
      </div>
    </div>
  );
}
