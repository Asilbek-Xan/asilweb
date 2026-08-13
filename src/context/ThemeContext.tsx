import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
type Theme = "dark" | "light";
const ThemeContext=createContext<{theme:Theme;toggleTheme:()=>void}|null>(null);
export function ThemeProvider({children}:{children:ReactNode}){const [theme,setTheme]=useState<Theme>(()=>localStorage.getItem("portfolio_theme")==="light"?"light":"dark");useEffect(()=>{document.documentElement.dataset.theme=theme;document.documentElement.classList.toggle("light",theme==="light");localStorage.setItem("portfolio_theme",theme)},[theme]);return <ThemeContext.Provider value={{theme,toggleTheme:()=>setTheme(v=>v==="dark"?"light":"dark")}}>{children}</ThemeContext.Provider>}
export function useTheme(){const v=useContext(ThemeContext);if(!v)throw new Error("useTheme must be used inside ThemeProvider");return v}
