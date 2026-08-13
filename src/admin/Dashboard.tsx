import { Link } from "react-router-dom";
import {
  BriefcaseBusiness,
  Mail,
  Plus,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { storage } from "../services/storage";
import { fetchProjects } from "../services/api";
import { useEffect, useState } from "react";

type Card = {
  name: string;
  count: number;
  Icon: LucideIcon;
  to: string;
};

export default function Dashboard() {
  const [projects, setProjects] = useState<any[]>([]);

  const skills = storage.getSkills();
  const messages = storage.getMessages<any>();

  useEffect(() => {
    fetchProjects()
      .then(setProjects)
      .catch(() => setProjects([]));
  }, []);

  const cards: Card[] = [
    {
      name: "Projects",
      count: projects.length,
      Icon: BriefcaseBusiness,
      to: "/admin/projects",
    },
    {
      name: "Skills",
      count: skills.length,
      Icon: Wrench,
      to: "/admin/skills",
    },
    {
      name: "Messages",
      count: messages.length,
      Icon: Mail,
      to: "/admin/messages",
    },
  ];

  return (
    <div>
      <div className="mb-7">
        <h1 className="text-2xl font-black">
          Dashboard
        </h1>

        <p className="mt-1 text-xs text-slate-500">
          Overview of your portfolio
        </p>
      </div>

      {/* Dashboard cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map(({ name, count, Icon, to }) => (
          <Link
            to={to}
            key={name}
            className="rounded-xl border border-white/7 bg-[#16142a] p-5 transition hover:border-violet-500/30"
          >
            <Icon
              size={18}
              className="text-violet-400"
            />

            <p className="mt-5 text-xs text-slate-500">
              {name}
            </p>

            <p className="mt-1 text-2xl font-bold">
              {count}
            </p>
          </Link>
        ))}
      </div>

      {/* Recent projects */}
      <div className="mt-7 rounded-xl border border-white/7 bg-[#16142a] p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">
            Recent Projects
          </h2>

          <Link
            to="/admin/projects/new"
            className="rounded-lg bg-violet-600 px-3 py-2 text-[10px] font-bold"
          >
            <Plus
              size={13}
              className="mr-1 inline"
            />

            Add Project
          </Link>
        </div>

        <div className="mt-5 space-y-2">
          {projects.slice(0, 5).map((p) => {
            const technologies = Array.isArray(
              p.technologies
            )
              ? p.technologies
              : String(p.technologies || "")
                  .split(",")
                  .map((item: string) => item.trim())
                  .filter(Boolean);

            return (
              <div
                key={p.id}
                className="flex items-center justify-between rounded-lg bg-[#111025] p-3"
              >
                <div className="flex items-center gap-3">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.title || "Project"}
                      className="h-9 w-12 rounded object-cover"
                    />
                  ) : (
                    <div className="flex h-9 w-12 items-center justify-center rounded bg-violet-500/10 text-violet-300">
                      A
                    </div>
                  )}

                  <div>
                    <p className="text-xs font-semibold">
                      {p.title}
                    </p>

                    <p className="text-[10px] text-slate-500">
                      {technologies.join(" · ")}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] text-emerald-400">
                  {p.status || "Active"}
                </span>
              </div>
            );
          })}

          {projects.length === 0 && (
            <div className="py-8 text-center text-xs text-slate-500">
              No projects found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}