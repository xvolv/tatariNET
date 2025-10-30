import { notFound } from "next/navigation";
import { getProjectBySlug, PROJECTS } from "@/lib/projects";
import { promises as fs } from "fs";
import path from "path";

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

  // Server-side: discover gallery images under public/project_showcase/{slug}
  let galleryImages: string[] = [];
  // chosenDir will hold the real folder name when it differs from the canonical slug
  let chosenDir: string | null = null;
  try {
    const showcaseDir = path.join(process.cwd(), "public", "project_showcase");
    const entries = await fs.readdir(showcaseDir);

    const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
    const target = normalize(project.slug);

    // exact match
    const exact = entries.find(
      (e) => e.toLowerCase() === project.slug.toLowerCase()
    );
    if (exact) chosenDir = exact;

    // normalized equality
    if (!chosenDir) {
      const normEqual = entries.find((e) => normalize(e) === target);
      if (normEqual) chosenDir = normEqual;
    }

    // substring match
    if (!chosenDir) {
      const sub = entries.find(
        (e) => normalize(e).includes(target) || target.includes(normalize(e))
      );
      if (sub) chosenDir = sub;
    }

    // fuzzy match via levenshtein
    if (!chosenDir && entries.length > 0) {
      const levenshtein = (a: string, b: string) => {
        const an = a.length;
        const bn = b.length;
        const dp: number[][] = Array.from({ length: an + 1 }, () =>
          Array(bn + 1).fill(0)
        );
        for (let i = 0; i <= an; i++) dp[i][0] = i;
        for (let j = 0; j <= bn; j++) dp[0][j] = j;
        for (let i = 1; i <= an; i++) {
          for (let j = 1; j <= bn; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            dp[i][j] = Math.min(
              dp[i - 1][j] + 1,
              dp[i][j - 1] + 1,
              dp[i - 1][j - 1] + cost
            );
          }
        }
        return dp[an][bn];
      };

      let best = { name: "", dist: Infinity };
      for (const e of entries) {
        const d = levenshtein(normalize(e), target);
        if (d < best.dist) best = { name: e, dist: d };
      }
      if (best.dist <= 2) chosenDir = best.name;
    }

    if (chosenDir) {
      const dir = path.join(showcaseDir, chosenDir);
      const files = await fs.readdir(dir);
      galleryImages = files
        .filter((f) => /\.(jpe?g|png|gif|svg)$/i.test(f))
        .sort()
        .map((f) => `/project_showcase/${chosenDir}/${f}`);
    }
  } catch (e) {
    // ignore and leave galleryImages empty
  }

  return (
    <main className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">{project.title}</h1>
          <p className="text-sm text-slate-600 mt-2">{project.year}</p>
        </header>

        {/* Top preview image (dashboard/preview) if present in project_showcase */}
        <div className="mb-6">
          <img
            src={
              galleryImages && galleryImages.length > 0
                ? galleryImages[0]
                : chosenDir
                ? `/project_showcase/${chosenDir}/dashboard.jpg`
                : `/project_showcase/${project.slug}/dashboard.jpg`
            }
            alt={`${project.title} preview`}
            className="w-full rounded-xl object-cover h-56"
            style={{ objectFit: "cover" }}
            loading="lazy"
          />
        </div>

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

        {/* Notes (if any) */}
        {project.notes && project.notes.length > 0 && (
          <section className="mt-6 bg-white border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3">Notes</h3>
            <ul className="list-disc pl-6 text-slate-700">
              {project.notes.map((n, idx) => (
                <li key={idx} className="mb-1">
                  {n}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* View detail / project images (project-specific gallery) */}
        {/* Dynamically list images from public/project_showcase/{slug} if present */}
        {/* View detail / project images (project-specific gallery) */}
        {typeof galleryImages !== "undefined" && galleryImages.length > 0 && (
          <section className="mt-6 bg-white border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">
              Project details & screenshots
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Visual walkthrough — screenshots and details.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {galleryImages.map((src) => (
                <figure
                  key={src}
                  className="overflow-hidden rounded-md bg-slate-50"
                >
                  <img
                    src={src}
                    alt={`${project.title} screenshot`}
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
