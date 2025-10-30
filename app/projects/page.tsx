import Link from "next/link";
import { PROJECTS } from "@/lib/projects";

export const metadata = {
  title: "Projects — TatariNET",
  description: "Projects and case studies from TatariNET",
};

export default function ProjectsPage() {
  return (
    <main className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Projects</h1>
          <p className="text-slate-600 mt-2">
            Selected projects and case studies.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <article
              key={p.slug}
              className="rounded-xl border bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold mb-2">{p.title}</h2>
              <p className="text-sm text-slate-600 mb-4">{p.short}</p>

              <div className="flex items-center justify-between">
                <div className="text-xs text-slate-500">{p.year}</div>
                <Link
                  href={`/projects/${p.slug}`}
                  className="text-primary font-medium"
                >
                  View details →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
