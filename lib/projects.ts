export type Project = {
  slug: string;
  title: string;
  short: string;
  description: string;
  stack: string[];
  year?: number;
  // optional notes to show on the project detail page
  notes?: string[];
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
  {
    slug: "marketflow",
    title: "MarketFlow",
    short: "A demand forecasting and inventory optimization platform.",
    description:
      "MarketFlow uses time-series forecasting and optimization to help merchants keep the right inventory levels and reduce stockouts.",
    stack: ["Next.js", "TensorFlow", "Postgres", "Redis"],
    year: 2024,
  },
  {
    slug: "healthsync",
    title: "HealthSync",
    short: "Interoperable patient data sync for clinics.",
    description:
      "HealthSync securely synchronizes patient records across clinics and devices, prioritizing privacy and auditability.",
    stack: ["React", "Node.js", "GraphQL", "MongoDB"],
    year: 2022,
    notes: [
      "Built secure sync adapters for FHIR-compatible clinics.",
      "End-to-end encryption for data in transit and at rest.",
      "Audit logs and role-based access controls for compliance.",
    ],
  },
  {
    slug: "eduspark",
    title: "EduSpark",
    short: "Microlearning platform for distributed teams.",
    description:
      "EduSpark delivers short, interactive learning experiences with progress tracking and team analytics.",
    stack: ["Next.js", "React", "Supabase"],
    year: 2025,
  },
  // removed: GreenCart, PayPilot, StudioBeam (per request)
];

export function getProjectBySlug(slug?: string | null) {
  // Defensive normalization: accept undefined/null and normalize to an empty string.
  const normalize = (s?: string | null) =>
    String(s ?? "")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
  const target = normalize(slug);
  // 1) exact/normalized match
  const exact = PROJECTS.find((p) => normalize(p.slug) === target);
  if (exact) return exact;

  // 2) substring match (covers 'carental' <-> 'carrental' style differences)
  const substring = PROJECTS.find(
    (p) =>
      normalize(p.slug).includes(target) || target.includes(normalize(p.slug))
  );
  if (substring) return substring;

  // 3) fuzzy match via Levenshtein distance (allow small typos)
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

  let best: { project: Project | null; dist: number } = {
    project: null,
    dist: Infinity,
  };
  for (const p of PROJECTS) {
    const d = levenshtein(normalize(p.slug), target);
    if (d < best.dist) best = { project: p, dist: d };
  }
  // only accept small distances to avoid accidental matches
  if (best.project && best.dist <= 2) return best.project;

  return null;
}
