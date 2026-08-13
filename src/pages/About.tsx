import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionTitle from "../components/SectionTitle";
export default function About() {
  return <><Navbar/><main className="min-h-screen bg-[#0d0b1c] px-5 pb-20 pt-28"><div className="mx-auto max-w-5xl">
    <SectionTitle eyebrow="About" title="About Me" description="Frontend developer who enjoys building useful digital products."/>
    <div className="rounded-2xl border border-white/7 bg-[#16142a] p-7 text-sm leading-7 text-slate-400">
      I focus on React, TypeScript, responsive design and API integration. I like taking a design and turning it into a clean, responsive and maintainable application.
    </div>
  </div></main><Footer/></>;
}
