"use client";

import React from "react";
import * as Icons from "lucide-react";

const normalizeKey = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

function TechIcon({ tech, size = 32 }: { tech: string; size?: number }) {
  // normalized key
  const key = tech.toLowerCase().replace(/\s|\.|\-/g, "");
  const ICON_MAP: Record<string, string> = {
    // frontend icons
    html: "html",
    css: "css",
    js: "js",
    javascript: "js",
    tailwind: "tailwind",
    tailwindcss: "tailwind",
    // general
    nextjs: "nextjs",
    next: "nextjs",
    react: "react",
    reactnative: "react",
    typescript: "typescript",
    node: "node",
    nodejs: "node",
    express: "expressjs",
    expressjs: "expressjs",
    nest: "nestjs",
    nestjs: "nestjs",
    java: "java",
    cpp: "cpp",
    cplusplus: "cpp",
    "c++": "cpp",
    php: "php",
    aws: "aws",
    kubernetes: "kubernetes",
    k8s: "kubernetes",
    docker: "docker",
    ml: "ml",
    python: "python",
    graphql: "graphql",
    postman: "postman",
    rest: "api",
    oauth: "betterauth",
    oauth2: "betterauth",
    openid: "betterauth",
    monitoring: "monitoring",
    ci: "cicd",
    cicd: "cicd",
    analytics: "analytics",
    automation: "automation",
    api: "api",
    apis: "api",
    strategy: "strategy",
    users: "users",
    training: "training",
    sla: "sla",
  };

  const iconFile = ICON_MAP[key];
  if (iconFile) {
    // use the official (or representative) SVG in /public/tech-icons
    return (
      // plain img tag is intentional (larger decorative icon)
      <img
        src={`/tech-icons/${iconFile}.svg`}
        alt={tech}
        style={{ width: size, height: size }}
        className="object-contain"
      />
    );
  }

  const initials = tech
    .split(/\s|\-|\./)
    .map((p) => p.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");

  return (
    <span
      className="inline-flex items-center justify-center rounded-sm bg-slate-100 text-xs text-slate-700"
      style={{ width: size, height: size }}
    >
      {initials}
    </span>
  );
}

function CircularTechOrbit({ tech }: { tech: string[] }) {
  // sizes tuned for card chips
  const size = 72; // container size (px)
  const iconSize = 28; // each icon size (px)
  const center = size / 2;
  const radius = center - iconSize / 2 - 4;

  return (
    <div
      className="tech-orbit"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <div className="tech-orbit__ring">
        {tech.map((t, i) => {
          const angle = (i / tech.length) * Math.PI * 2;
          const x = Math.round(center + radius * Math.cos(angle));
          const y = Math.round(center + radius * Math.sin(angle));
          return (
            <div
              key={t}
              className="tech-orbit__icon"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                width: iconSize,
                height: iconSize,
              }}
              title={t}
            >
              <TechIcon tech={t} size={iconSize} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function GroupedTechRotator({
  tech,
  groupSize = 4,
  interval = 3500,
}: {
  tech: string[];
  groupSize?: number;
  interval?: number;
}) {
  const [groupIndex, setGroupIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  // split into groups of groupSize
  const groups: string[][] = [];
  for (let i = 0; i < tech.length; i += groupSize) {
    groups.push(tech.slice(i, i + groupSize));
  }

  const iconSize = 36; // px
  const gapPx = 20; // approximate gap (0.5rem)
  const viewportWidth = groupSize * iconSize + (groupSize - 1) * gapPx;
  const innerWidth = groups.length * viewportWidth;

  const [dir, setDir] = React.useState(1);

  React.useEffect(() => {
    if (groups.length <= 1) return;
    if (paused) return;
    const id = setInterval(() => {
      setGroupIndex((g) => {
        const next = g + dir;
        if (next >= groups.length) {
          setDir(-1);
          return Math.max(0, g - 1);
        }
        if (next < 0) {
          setDir(1);
          return Math.min(groups.length - 1, g + 1);
        }
        return next;
      });
    }, interval);
    return () => clearInterval(id);
  }, [groups.length, interval, paused, dir]);

  const innerStyle: React.CSSProperties = {
    width: innerWidth,
    display: "flex",
    transform: `translateX(-${groupIndex * viewportWidth}px)`,
    transition: "transform 480ms cubic-bezier(0.2,0.8,0.2,1)",
  };

  return (
    <div
      className="tech-rotator"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="tech-rotator__viewport"
        style={{ width: viewportWidth, overflow: "hidden" }}
      >
        <div className="tech-rotator__inner" style={innerStyle} aria-hidden>
          {groups.map((grp, gi) => (
            <div
              key={gi}
              className="tech-rotator__group"
              style={{
                display: "flex",
                gap: `${gapPx}px`,
                alignItems: "center",
            

                borderBottom: "4px solid cyan",
                padding: "5px",
              }}
            >
              {grp.map((t) => {
                const nk = normalizeKey(t);
                // Render some items (CI/CD, Monitoring, AI, Security, Digital Transformation) as text tiles (no icon)
                if (
                  nk === "cicd" ||
                  nk === "ci" ||
                  nk === "monitoring" ||
                  nk === "monitor" ||
                  nk === "ai" ||
                  nk === "audits" ||
                  nk === "pentests" ||
                  nk === "pentest" ||
                  nk === "policies" ||
                  nk === "strategy" ||
                  nk === "roadmaps" ||
                  nk === "roadmap" ||
                  nk === "change" ||
                  nk === "restful" ||
                  nk === "restfulapi"
                ) {
                  return (
                    <div
                      key={t}
                      className="tech-rotator__icon"
                      title={t}
                      style={{
                        minWidth: iconSize,
                        height: iconSize,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0 8px",
                        // allow text to grow naturally (no truncation)
                      }}
                    >
                      <span className="text-sm font-medium text-slate-700">
                        {t}
                      </span>
                    </div>
                  );
                }

                return (
                  <div
                    key={t}
                    className="tech-rotator__icon"
                    title={t}
                    style={{ width: iconSize, height: iconSize }}
                  >
                    <TechIcon tech={t} size={iconSize} />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const services = [
    {
      icon: "Monitor",
      title: "Product Engineering",
      desc: "End-to-end web & mobile product development",
      tech: [
        "HTML",
        "CSS",
        "JavaScript",
        "TailwindCSS",
        "Next.js",
        "React",
        "TypeScript",
        "Node.js",
        "ExpressJS",
        "NestJS",
        "C++",
        "Python",
        "Java",
        "PHP",
      ],
      abstract:
        "Design and build beautiful, high-performance products — web and mobile — backed by strong UX and engineering practices.",
    },
    {
      icon: "Cloud",
      title: "Cloud & Operations",
      desc: "Infrastructure, DevOps and 24/7 operations",
      tech: ["AWS", "Kubernetes", "CI/CD", "Monitoring"],
      abstract:
        "Managed cloud architectures, CI/CD pipelines, and proactive ops to keep services reliable and scalable.",
    },
    {
      icon: "Settings",
      title: "Custom Software & Integrations",
      desc: "APIs, integrations and backend systems",
      tech: ["APIs", "GraphQL", "Postman", "OAuth"],
      abstract:
        "Custom backend systems and integrations that connect your ecosystem with robustness and observability.",
    },
    {
      icon: "Cpu",
      title: "AI, Data & R&D",
      desc: "Machine Learning, automation and experimental R&D",
      tech: ["Machine Learning", "Python", "AI"],
      abstract:
        "Applied machine learning, data pipelines, and rapid experimentation to deliver measurable business outcomes.",
    },
    {
      icon: "Shield",
      title: "Security & Compliance",
      desc: "Security programs, audits and hardening",
      tech: ["Audits", "Pen Tests", "Policies"],
      abstract:
        "Security-first practices to protect data, satisfy compliance, and reduce operational risk.",
    },
    {
      icon: "Rocket",
      title: "Digital Transformation",
      desc: "Strategy, roadmaps and execution",
      tech: ["Strategy", "Roadmaps", "Change"],
      abstract:
        "Transformation programs and consulting to modernize teams and accelerate delivery.",
    },
    // Marketing & Growth and Training & Support removed per request
  ];

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2
            id="services-heading"
            className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4"
          >
            Our <span className="text-primary">Comprehensive Services</span>
          </h2>
          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto">
            From idea to production — engineering, design, and cloud practices
            that deliver value.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const delay = `${Math.min(index * 0.08, 1.2)}s`;
            const IconComp =
              (Icons as any)[service.icon] || (Icons as any)["Code"];

            return (
              <article
                key={service.title}
                aria-labelledby={`service-${index}-title`}
                className="relative services-card overflow-hidden rounded-2xl p-6 sm:p-8"
              >
                {/* subtle watermark graphic */}
                <div className="flex items-start gap-4 z-10 relative">
                  <div className="shrink-0 w-20 h-20 rounded-xl flex items-center justify-center services-icon">
                    <IconComp
                      className="w-10 h-10 text-slate-800"
                      aria-hidden
                    />
                  </div>

                  <div className="min-w-0">
                    <h3
                      id={`service-${index}-title`}
                      className="text-lg font-semibold text-slate-900"
                    >
                      {service.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      {service.abstract}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm text-slate-700 z-10 relative">
                  {service.desc}
                </p>

                {/* sparkline / micro chart */}
                <div className="mt-4 flex items-center justify-between z-10 relative">
                  <div className="w-2/3">
                    <svg
                      className="services-sparkline w-full h-6"
                      viewBox="0 0 100 20"
                      preserveAspectRatio="none"
                      aria-hidden
                    >
                      <polyline
                        fill="none"
                        strokeWidth="1.6"
                        points="0,14 15,9 30,12 45,6 60,9 75,7 90,4 100,6"
                      />
                    </svg>
                  </div>

                  <div className="text-xs text-zinc-400">
                    <span className="inline-block px-2 py-1 rounded-md bg-white text-slate-700 shadow-sm">
                      {service.tech.slice(0, 2).join(" • ")}
                    </span>
                  </div>
                </div>

                <div className="mt-4 z-10 relative" aria-hidden>
                  {service.tech.length > 4 ? (
                    <div className="flex items-center justify-start">
                      <GroupedTechRotator tech={service.tech} />
                      <span className="sr-only">{service.tech.join(", ")}</span>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {service.tech.map((t) => {
                        const nk = normalizeKey(t);
                        // render plain text for CI/CD, Monitoring, AI, Security notes, and Digital Transformation items (no icon)
                        if (
                          nk === "cicd" ||
                          nk === "ci" ||
                          nk === "monitoring" ||
                          nk === "monitor" ||
                          nk === "ai" ||
                          nk === "audits" ||
                          nk === "pentests" ||
                          nk === "pentest" ||
                          nk === "policies" ||
                          nk === "strategy" ||
                          nk === "roadmaps" ||
                          nk === "roadmap" ||
                          nk === "change" ||
                          nk === "restful" ||
                          nk === "restfulapi"
                        ) {
                          return (
                            <span
                              key={t}
                              className="inline-flex items-center gap-3 px-3 py-1 rounded-full text-sm font-medium bg-white text-slate-700 shadow-sm"
                            >
                              <span className="text-sm font-medium text-slate-700">
                                {t}
                              </span>
                            </span>
                          );
                        }

                        return (
                          <span
                            key={t}
                            className="inline-flex items-center gap-3 px-3 py-1 rounded-full text-sm font-medium bg-white text-slate-700 shadow-sm"
                          >
                            <TechIcon tech={t} />
                            <span className="sr-only">{t}</span>
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
