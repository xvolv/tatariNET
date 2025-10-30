import { notFound } from "next/navigation";
import { getProjectBySlug, PROJECTS } from "@/lib/projects";

type Props = {
  params: { slug?: string } | Promise<{ slug?: string }>;
};

export default async function ProjectDetail({ params }: Props) {
  // params can be a Promise in some Next.js runtimes — await defensively.
  const resolvedParams = (await params) ?? {};
  const received = String(resolvedParams.slug ?? "");
  const project = getProjectBySlug(resolvedParams.slug);

  if (!project) {
    return (
      <main className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900">
              Project not found
            </h1>
            <p className="text-sm text-slate-600 mt-2">
              The project slug received was:
            </p>
            <pre className="bg-slate-50 rounded p-3 mt-2 text-sm">
              {received}
            </pre>
            <div className="mt-2 text-xs text-slate-500">
              Raw params object:
            </div>
            <pre className="bg-slate-50 rounded p-3 mt-2 text-sm">
              {JSON.stringify(resolvedParams)}
            </pre>
          </header>

          <section className="bg-white border rounded-xl p-6">
            <p className="text-slate-700 mb-4">Available project slugs:</p>
            <ul className="list-disc pl-6 text-slate-700">
              {PROJECTS.map((p) => (
                <li key={p.slug}>
                  <a href={`/projects/${p.slug}`} className="text-primary">
                    /projects/{p.slug}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-sm text-slate-500">
              Try clicking one of the links above or check the URL for
              encoding/case differences.
            </div>
          </section>
        </div>
      </main>
    );
  }

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

        {/* View detail / project images (project-specific gallery) */}
        {project.slug === "servemart" && (
          <section className="mt-6 bg-white border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">
              Project details & screenshots
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Visual walkthrough of ServeMart — screenshots from the prototype
              and staging environment.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                "calander.jpg",
                "dashboard.jpg",
                "earnings.jpg",
                "myjobs.jpg",
                "settings.jpg",
              ].map((name) => (
                <figure
                  key={name}
                  className="overflow-hidden rounded-md bg-slate-50"
                >
                  <img
                    src={`/project_showcase/servemart/${name}`}
                    alt={`ServeMart - ${name}`}
                    className="w-full h-40 object-cover"
                    loading="lazy"
                  />
                </figure>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
