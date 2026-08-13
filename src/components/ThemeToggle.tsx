import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
export default function ThemeToggle(){const {theme,toggleTheme}=useTheme();return <button type="button" onClick={toggleTheme} aria-label="Toggle theme" title="Toggle theme" className="rounded-lg border border-white/10 bg-white/5 p-2 text-slate-300 hover:bg-white/10">{theme==="dark"?<Sun size={15}/>:<Moon size={15}/>}</button>}
