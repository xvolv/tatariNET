import { notFound } from "next/navigation";
import { getProjectBySlug, PROJECTS } from "@/lib/projects";
import { promises as fs } from "fs";
import path from "path";

type Props = {
  params: { slug?: string } | Promise<{ slug?: string }>;
};

export default async function ProjectDetail({ params }: Props) {
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
  let chosenDir: string | null = null;
  try {
    const showcaseDir = path.join(process.cwd(), "public", "project_showcase");
    const entries = await fs.readdir(showcaseDir);

    const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
    const target = normalize(project.slug);

    const exact = entries.find(
      (e) => e.toLowerCase() === project.slug.toLowerCase()
    );
    if (exact) chosenDir = exact;

    if (!chosenDir) {
      const normEqual = entries.find((e) => normalize(e) === target);
      if (normEqual) chosenDir = normEqual;
    }

    if (!chosenDir) {
      const sub = entries.find(
        (e) => normalize(e).includes(target) || target.includes(normalize(e))
      );
      if (sub) chosenDir = sub;
    }

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

      const normalizeSlug = (s: string) =>
        s.toLowerCase().replace(/[^a-z0-9]/g, "");
      const isCarental =
        normalizeSlug(project.slug).includes("carent") ||
        normalizeSlug(project.slug).includes("carrent");
      if (isCarental) {
        const ordering = [
          { key: /signin|login|auth/i },
          { key: /filter|search|discover|filters/i },
          {
            key: /request|confirm|booking.*request|booking.*confirm|checkout/i,
          },
          { key: /route|map|direction|directions/i },
          {
            key: /manage|management|admin.*user|user.*manage|users|admin.*vehicle|vehicle.*manage|fleet/i,
          },
          {
            key: /booking.*track|booking.*tracking|tracking|bookings|oversee|overview/i,
          },
          { key: /calendar|date|schedule|availability/i },
        ];

        const used = new Set<string>();
        const ordered: string[] = [];

        for (const ord of ordering) {
          const idx = galleryImages.findIndex((p) => ord.key.test(p));
          if (idx !== -1) {
            ordered.push(galleryImages[idx]);
            used.add(galleryImages[idx]);
          }
        }

        for (const img of galleryImages) {
          if (!used.has(img)) ordered.push(img);
        }

        galleryImages = ordered;
      }
    }
  } catch (e) {
    // ignore and leave galleryImages empty
  }
  // Determine whether to use Carental-specific captions
  const normalizeSlug = (s: string) =>
    String(s ?? "")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
  const isCarental =
    normalizeSlug(project.slug).includes("carent") ||
    normalizeSlug(project.slug).includes("carrent");

  // === IMPORTANT: return the JSX for the success path ===
  return (
    <main className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
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

        {/* Project details & screenshots */}
        {galleryImages.length > 0 && (
          <section className="mt-6 bg-white border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">
              Project details & screenshots
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Visual walkthrough — screenshots and details.
            </p>

            <div className="flex flex-col">
              {galleryImages.map((src, idx) => {
                // Map index to professional caption data (fallback to generic)
                const captionFor = (i: number) => {
                  // Carental-specific captions (only used for Carental projects)
                  const metaMap = [
                    {
                      title: "Sign-In Page",
                      tag: "Authentication / User Access",
                      desc: "A clean and secure sign-in interface that allows users to access the platform using either their email credentials or their Google account. Designed for convenience and trust, the page ensures quick, secure authentication for both renters and administrators.",
                    },
                    {
                      title: "Renter – Filtering & Search Page",
                      tag: "Renter Experience / Vehicle Discovery",
                      desc: "A filtering and search page that allows renters to explore available cars based on filters such as vehicle type, price, or location. Built for speed and usability, it simplifies the discovery process for the ideal rental match.",
                    },
                    {
                      title: "Renter – Booking Request Page",
                      tag: "Renter Experience / Booking Confirmation",
                      desc: "A booking confirmation interface where renters review details like car information, duration, and pricing before final submission. It ensures transparency and reduces booking errors through a clear, step-by-step confirmation flow.",
                    },
                    {
                      title: "Route Display Page",
                      tag: "Navigation / Route Visualization",
                      desc: "A map-based display showing the route between the selected pickup and drop-off points. It enhances clarity for both renters and admins by visualizing distance, estimated duration, and route details in real time.",
                    },
                    {
                      title: "Admin – User Management Dashboard",
                      tag: "Admin Panel / User Management",
                      desc: "A structured dashboard enabling administrators to manage all user accounts. Admins can add, edit, or remove users, view their status, and ensure all accounts are accurate and up to date for a smooth operational flow.",
                    },
                    {
                      title: "Admin – Booking Tracking Dashboard",
                      tag: "Admin Panel / Booking Oversight",
                      desc: "A real-time tracking interface that provides visibility into all booking activities — including pending, active, and completed reservations. It helps administrators maintain order, prevent conflicts, and manage overall platform efficiency.",
                    },
                    {
                      title: "Renter – Calendar Booking Interface",
                      tag: "Renter Experience / Date Selection",
                      desc: "An interactive calendar allowing renters to select available dates and times for their desired vehicles. The interface emphasizes ease of use and scheduling clarity, making the booking process fast and intuitive.",
                    },
                  ];

                  if (!isCarental) {
                    return {
                      title: `Screenshot ${i + 1}`,
                      tag: "Visual / Screenshot",
                      desc: "Project screenshot showcasing the application interface.",
                    };
                  }

                  return (
                    metaMap[i] ?? {
                      title: `Screenshot ${i + 1}`,
                      tag: "Visual / Screenshot",
                      desc: "Project screenshot showcasing the application interface.",
                    }
                  );
                };

                const meta = captionFor(idx);

                return (
                  <figure
                    key={src}
                    className="mb-6 bg-white border rounded-xl overflow-hidden"
                  >
                    <img
                      src={src}
                      alt={`${project.title} screenshot ${idx + 1}`}
                      className="w-full h-[420px] object-cover"
                      loading="lazy"
                      style={{ filter: "none" }}
                    />

                    <figcaption className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-sm font-semibold text-slate-900">
                            {meta.title}
                          </div>
                          <div className="text-xs text-slate-500 mt-1">
                            <span className="font-medium">Tag:</span> {meta.tag}
                          </div>
                        </div>
                      </div>

                      <p className="mt-3 text-sm text-slate-700">{meta.desc}</p>
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
