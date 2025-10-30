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
  {
    slug: "greencart",
    title: "GreenCart",
    short: "Sustainable grocery delivery with local sourcing.",
    description:
      "GreenCart connects consumers with local sustainable farms for same-day grocery delivery and low-waste packaging.",
    stack: ["Next.js", "React", "Stripe"],
    year: 2024,
  },
  {
    slug: "paypilot",
    title: "PayPilot",
    short: "Embedded payments and payouts for marketplaces.",
    description:
      "PayPilot provides an easy SDK to onboard sellers, handle payouts, and manage split payments for marketplace platforms.",
    stack: ["Node.js", "Stripe", "Postgres"],
    year: 2023,
  },
  {
    slug: "studiobeam",
    title: "StudioBeam",
    short: "Lightweight media collaboration for creators.",
    description:
      "StudioBeam helps creators upload, annotate, and share video edits with collaborators using fast previews and secure links.",
    stack: ["React", "Vercel", "S3"],
    year: 2025,
  },
];

export function getProjectBySlug(slug?: string | null) {
  // Defensive normalization: accept undefined/null and normalize to an empty string.
  const normalize = (s?: string | null) =>
    String(s ?? "")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
  const target = normalize(slug);
  return PROJECTS.find((p) => normalize(p.slug) === target) || null;
}
