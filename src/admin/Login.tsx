import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockKeyhole, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import BackToSite from "../components/BackToSite";
import ThemeToggle from "../components/ThemeToggle";
import { storage } from "../services/storage";

const ADMIN_USERNAME = "admin6";
const ADMIN_PASSWORD = "admin6";

export default function Login() {
  const [username, setUsername] = useState(ADMIN_USERNAME);
  const [password, setPassword] = useState(ADMIN_PASSWORD);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const nav = useNavigate();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username.trim() === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      storage.login();
      setError("");
      toast.success("Welcome back, Asilbek!");
      nav("/admin", { replace: true });
    } else {
      setError("Login yoki parol noto‘g‘ri.");
      toast.error("Invalid login or password");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0d0b1c] px-5 text-white">
      <div className="w-full max-w-sm">
        <div className="mb-4 flex items-center justify-between"><BackToSite /><ThemeToggle /></div>
        <form onSubmit={submit} className="rounded-2xl border border-white/8 bg-[#16142a] p-7 shadow-2xl shadow-violet-950/20">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600/15 text-violet-300"><LockKeyhole /></div>
          <h1 className="text-center text-xl font-bold">Admin Login</h1>
          <p className="mt-2 text-center text-xs text-slate-500">Sign in to manage your portfolio</p>
          <label className="mt-7 block text-[11px] font-medium text-slate-400">Username
            <input name="username" value={username} onChange={e => setUsername(e.target.value)} autoComplete="username" className="mt-2 w-full rounded-lg border border-white/7 bg-[#111025] p-3 text-xs outline-none focus:border-violet-500" />
          </label>
          <label className="mt-3 block text-[11px] font-medium text-slate-400">Password
            <div className="relative mt-2">
              <input name="password" type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" className="w-full rounded-lg border border-white/7 bg-[#111025] p-3 pr-10 text-xs outline-none focus:border-violet-500" />
              <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">{showPassword ? <EyeOff size={15}/> : <Eye size={15}/>}</button>
            </div>
          </label>
          {error && <p className="mt-3 text-xs text-red-400">{error}</p>}
          <button className="mt-4 w-full rounded-lg bg-violet-600 py-3 text-xs font-bold hover:bg-violet-500">Sign In</button>
        </form>
      </div>
    </div>
  );
}
