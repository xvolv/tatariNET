import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/projects";

type Props = {
  params: { slug: string };
};

export default function ProjectDetail({ params }: Props) {
  const project = getProjectBySlug(params.slug);
  if (!project) return notFound();

  return (
    <main className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">{project.title}</h1>
          <p className="text-sm text-slate-600 mt-2">{project.year}</p>
        </header>

        <section className="bg-white border rounded-xl p-6">
          <p className="text-slate-700 mb-4">{project.description}</p>

          <div className="mt-4">
            <h3 className="text-sm font-semibold mb-2">Tech stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-800"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
