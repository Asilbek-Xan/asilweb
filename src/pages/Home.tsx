import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionTitle from "../components/SectionTitle";
import ProjectCard from "../components/ProjectCard";
import SkillBar from "../components/SkillBar";
import Timeline from "../components/Timeline";
import { storage } from "../services/storage";
import { fetchProjects } from "../services/api";
import { useEffect, useState } from "react";

export default function Home() {
  const [projects, setProjects] = useState<any[]>([]);
  useEffect(() => { fetchProjects().then(setProjects).catch(() => setProjects([])); }, []);
  const featuredProjects = projects.filter((p: any) => p.featured);
  const skills = storage.getSkills();
  const experience = storage.getExperience();

  return (
    <div className="min-h-screen bg-[#0d0b1c] text-white">
      <Navbar />
      <main>
        <section className="relative overflow-hidden px-5 pb-20 pt-32 sm:pt-40">
          <div className="absolute left-1/2 top-10 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-600/15 blur-3xl" />
          <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1.1fr_.9fr]">
            <motion.div initial={{ opacity: 0, x: -25 }} animate={{ opacity: 1, x: 0 }}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[.3em] text-violet-400">Hello, I'm Asilbek</p>
              <h1 className="max-w-xl text-4xl font-black leading-tight sm:text-6xl">
                Frontend<br /><span className="bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">Developer</span>
              </h1>
              <p className="mt-5 max-w-lg text-sm leading-7 text-slate-400">
                I build modern, responsive and user-friendly web applications using React, TypeScript and modern frontend technologies.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#contact" className="rounded-lg bg-violet-600 px-5 py-3 text-xs font-bold shadow-lg shadow-violet-900/30 hover:bg-violet-500">Hire Me <ArrowRight size={14} className="ml-1 inline"/></a>
                <a href="/resume.pdf" download className="rounded-lg border border-white/10 bg-white/5 px-5 py-3 text-xs font-bold text-slate-200 hover:bg-white/10"><Download size={14} className="mr-1 inline"/> Download CV</a>
              </div>
              <div className="mt-6 flex gap-4 text-slate-500">
                <a href="https://github.com/Asilbek-Xan" target="_blank" rel="noreferrer" className="hover:text-white"><Github size={18}/></a>
                <a href="https://linkedin.com/in/asilbek-xan" target="_blank" rel="noreferrer" className="hover:text-white"><Linkedin size={18}/></a>
                <a href="mailto:asilbekshak@gmail.com" className="hover:text-white"><Mail size={18}/></a>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: .8 }} animate={{ opacity: 1, scale: 1 }} className="flex justify-center">
              <div className="relative h-64 w-64 rounded-full border border-violet-400/30 bg-gradient-to-br from-violet-500/30 to-cyan-500/10 p-2 shadow-[0_0_80px_rgba(139,92,246,.25)] sm:h-80 sm:w-80">
                <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[#17142d]">
                  <span className="text-7xl font-black text-violet-400/30"><img src="/images/profile/profile_image.png" alt="Asilbek Xan" /></span>
                </div>
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-violet-400/20 bg-[#16142a] px-4 py-2 text-[10px] text-violet-200">Available for work</span>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="about" className="border-t border-white/5 bg-[#111025] px-5 py-20">
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
            <div>
              <SectionTitle eyebrow="About" title="About Me" description="A frontend developer focused on building clean and practical digital experiences." />
              <p className="text-sm leading-7 text-slate-400">
                I enjoy turning ideas and designs into responsive web applications. My main focus is writing maintainable code, learning new technologies and creating interfaces that feel fast and intuitive.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  ["Name","Asilbek"],["Role","Frontend Developer"],["Location","Uzbekistan"],["Experience","Projects & Learning"]
                ].map(([a,b]) => <div key={a} className="rounded-lg border border-white/7 bg-[#16142a] p-4"><p className="text-[10px] uppercase text-slate-500">{a}</p><p className="mt-1 text-xs font-semibold text-slate-200">{b}</p></div>)}
              </div>
            </div>
            <div className="rounded-xl border border-white/7 bg-[#16142a] p-5">
              <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-violet-300">Tech Stack</p>
              <div className="grid grid-cols-3 gap-3">
                {["React","TypeScript","JavaScript","Tailwind","Git","REST API","Vite","Next.js","Node.js"].map(t =>
                  <div key={t} className="flex aspect-square items-center justify-center rounded-lg border border-white/6 bg-[#111025] text-center text-[10px] text-slate-300">{t}</div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="px-5 py-20">
          <div className="mx-auto max-w-6xl">
            <SectionTitle eyebrow="Skills" title="Skills & Expertise" description="Technologies I use to build and ship frontend projects." />
            <div className="grid gap-8 md:grid-cols-3">
              {(["Frontend","Backend","Tools"] as const).map(cat =>
                <div key={cat}>
                  <h3 className="mb-4 text-xs font-semibold text-violet-300">{cat}</h3>
                  <div className="space-y-3">{skills.filter(s => s.category === cat).map(s => <SkillBar key={s.id} skill={s}/>)}</div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="projects" className="bg-[#111025] px-5 py-20">
          <div className="mx-auto max-w-6xl">
            <SectionTitle eyebrow="Portfolio" title="Featured Projects" description="A selection of projects I have built while learning and practicing." />
            <div className="grid gap-5 sm:grid-cols-2">{featuredProjects.map(p => <ProjectCard key={p.id} project={p}/>)}</div>
            <div className="mt-8 text-center"><Link to="/projects" className="text-xs font-semibold text-violet-300 hover:text-white">View all projects <ArrowRight size={13} className="ml-1 inline"/></Link></div>
          </div>
        </section>

        <section id="experience" className="px-5 py-20">
          <div className="mx-auto max-w-6xl">
            <SectionTitle eyebrow="Journey" title="Experience & Education" />
            <Timeline items={experience}/>
          </div>
        </section>

        <section className="bg-[#111025] px-5 py-16">
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
            {["Frontend Projects","Responsive UI","API Integration","Continuous Learning"].map((x,i) =>
              <div key={x} className="rounded-xl border border-white/7 bg-[#16142a] p-5 text-center"><p className="text-lg font-bold text-violet-300">{["10+","100%","8+","Always"][i]}</p><p className="mt-1 text-[10px] text-slate-500">{x}</p></div>
            )}
          </div>
        </section>

        <section id="contact" className="px-5 py-20">
          <div className="mx-auto max-w-6xl">
            <SectionTitle eyebrow="Contact" title="Get In Touch" description="Have a project or idea? Send me a message." />
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-xl border border-white/7 bg-[#16142a] p-6">
                <p className="text-sm font-semibold">Let's work together</p>
                <p className="mt-3 text-xs leading-6 text-slate-400">I'm interested in frontend projects, learning opportunities and collaborations.</p>
                <div className="mt-7 space-y-4 text-xs text-slate-400">
                  <p><Mail size={15} className="mr-3 inline text-violet-400"/> hello@example.com</p>
                  <p><MapPin size={15} className="mr-3 inline text-violet-400"/> Uzbekistan</p>
                </div>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function ContactForm() {
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const messages = storage.getMessages<any>();
    messages.unshift({ id: crypto.randomUUID(), name: form.get("name"), email: form.get("email"), message: form.get("message"), createdAt: new Date().toISOString(), read: false });
    storage.saveMessages(messages);
    e.currentTarget.reset();
    toast.success("Message sent successfully!");
  };
  return <form onSubmit={submit} className="rounded-xl border border-white/7 bg-[#16142a] p-6">
    <div className="grid gap-3 sm:grid-cols-2">
      <input required name="name" placeholder="Your name" className="rounded-lg border border-white/7 bg-[#111025] px-4 py-3 text-xs text-white outline-none focus:border-violet-500"/>
      <input required type="email" name="email" placeholder="Email address" className="rounded-lg border border-white/7 bg-[#111025] px-4 py-3 text-xs text-white outline-none focus:border-violet-500"/>
    </div>
    <textarea required name="message" rows={5} placeholder="Your message" className="mt-3 w-full resize-none rounded-lg border border-white/7 bg-[#111025] px-4 py-3 text-xs text-white outline-none focus:border-violet-500"/>
    <button className="mt-3 w-full rounded-lg bg-gradient-to-r from-violet-600 to-violet-500 py-3 text-xs font-bold">Send Message</button>
  </form>;
}
