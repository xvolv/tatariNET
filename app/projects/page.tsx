import Link from "next/link";
import { PROJECTS } from "@/lib/projects";
import OrchestratedGrid from "@/components/orchestrated-grid";

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

        <OrchestratedGrid items={PROJECTS} />
      </div>
    </main>
  );
}
