export type Project = {
  slug: string;
  title: string;
  short: string;
  description: string;
  stack: string[];
  year?: number;
};

export const PROJECTS: Project[] = [
  {
    slug: "carental",
    title: "Carental",
    short: "A vehicle rental marketplace for local agencies.",
    description:
      "Carental is a modern vehicle rental platform that connects renters with local agencies. It features booking, availability management, payments, and a clean admin dashboard.",
    stack: ["Next.js", "React", "TypeScript", "Postgres", "Stripe"],
    year: 2024,
  },
  {
    slug: "servemart",
    title: "ServeMart",
    short: "A B2B service marketplace for field technicians.",
    description:
      "ServeMart helps companies dispatch and manage field technicians with scheduling, route optimization, and SLA tracking.",
    stack: ["React", "Node.js", "GraphQL", "Kubernetes"],
    year: 2023,
  },
  {
    slug: "insightly",
    title: "Insightly Analytics",
    short: "Lightweight analytics dashboard for small teams.",
    description:
      "Insightly provides privacy-first analytics and dashboards aimed at product teams who want quick insights without heavy instrumentation.",
    stack: ["Next.js", "D3", "Python"],
    year: 2025,
  },
];

export function getProjectBySlug(slug: string) {
  return PROJECTS.find((p) => p.slug === slug) || null;
}
