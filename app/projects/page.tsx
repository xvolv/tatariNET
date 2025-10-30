import Link from "next/link";
import { PROJECTS } from "@/lib/projects";
import OrchestratedGrid from "@/components/orchestrated-grid";
import { promises as fs } from "fs";
import path from "path";

export const metadata = {
  title: "Projects — TatariNET",
  description: "Projects and case studies from TatariNET",
};

export default async function ProjectsPage() {
  // Build a preview map server-side by scanning public/project_showcase and picking a sensible image per project.
  const previewMap: Record<string, string> = {};
  const showcaseDir = path.join(process.cwd(), "public", "project_showcase");
  let entries: string[] = [];
  try {
    entries = await fs.readdir(showcaseDir);
  } catch (e) {
    entries = [];
  }

  // Helper: normalize strings for fuzzy matching
  const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

  // Levenshtein distance (small helper) to pick closest folder name when misspelled
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

  for (const p of PROJECTS) {
    try {
      // If project specifies an explicit previewFolder, prefer it (useful when folder names differ from slugs)
      if ((p as any).previewFolder) {
        const pf = String((p as any).previewFolder);
        if (entries.includes(pf)) {
          const dir = path.join(showcaseDir, pf);
          const files = await fs.readdir(dir);
          const img = files.find((f) => /\.(jpe?g|png|gif|svg)$/i.test(f));
          if (img) {
            previewMap[p.slug] = `/project_showcase/${pf}/${img}`;
            continue;
          }
        }
      }
      const pNorm = normalize(p.slug);

      // find best matching folder name inside public/project_showcase
      let chosenDir: string | null = null;

      // exact match (case-insensitive)
      const exact = entries.find(
        (e) => e.toLowerCase() === p.slug.toLowerCase()
      );
      if (exact) chosenDir = exact;

      // normalize equality
      if (!chosenDir) {
        const normEqual = entries.find((e) => normalize(e) === pNorm);
        if (normEqual) chosenDir = normEqual;
      }

      // substring match
      if (!chosenDir) {
        const sub = entries.find(
          (e) => normalize(e).includes(pNorm) || pNorm.includes(normalize(e))
        );
        if (sub) chosenDir = sub;
      }

      // fuzzy match via levenshtein (allow small typos)
      if (!chosenDir && entries.length > 0) {
        let best = { name: "", dist: Infinity };
        for (const e of entries) {
          const d = levenshtein(normalize(e), pNorm);
          if (d < best.dist) best = { name: e, dist: d };
        }
        if (best.dist <= 2) chosenDir = best.name;
      }

      if (!chosenDir) continue;

      const dir = path.join(showcaseDir, chosenDir);
      const files = await fs.readdir(dir);
      const img = files.find((f) => /\.(jpe?g|png|gif|svg)$/i.test(f));
      if (img) previewMap[p.slug] = `/project_showcase/${chosenDir}/${img}`;
    } catch (e) {
      // ignore missing folders or read errors
    }
  }
  return (
    <main className="py-2 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Projects</h1>
          <p className="text-slate-600 mt-2">
            Selected projects and case studies.
          </p>
        </header>

        <OrchestratedGrid items={PROJECTS} previewMap={previewMap} />
      </div>
    </main>
  );
}
