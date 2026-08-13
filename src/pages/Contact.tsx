import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export default function Contact() {
  return <><Navbar/><main className="min-h-screen bg-[#0d0b1c] px-5 pb-20 pt-28"><div className="mx-auto max-w-2xl">
    <h1 className="text-3xl font-black">Get In Touch</h1><p className="mt-3 text-sm text-slate-400">hello@example.com · Uzbekistan</p>
    <form className="mt-8 space-y-3 rounded-2xl border border-white/7 bg-[#16142a] p-6"><input className="w-full rounded-lg bg-[#111025] p-3 text-xs" placeholder="Name"/><input className="w-full rounded-lg bg-[#111025] p-3 text-xs" placeholder="Email"/><textarea className="w-full rounded-lg bg-[#111025] p-3 text-xs" rows={6} placeholder="Message"/><button className="w-full rounded-lg bg-violet-600 py-3 text-xs font-bold">Send Message</button></form>
  </div></main><Footer/></>;
}
