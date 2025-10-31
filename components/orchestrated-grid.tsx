"use client";

import React, { useEffect, useRef, useState } from "react";
// Use plain anchors for detail links to avoid navigation issues during the animation overlay
import type { Project } from "@/lib/projects";

type Props = {
  items: Project[];
  pattern?: "diamond" | "wave";
  previewMap?: Record<string, string>;
};

export default function OrchestratedGrid({
  items,
  pattern = "diamond",
  previewMap = {},
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const [showFinal, setShowFinal] = useState(false);
  const [clones, setClones] = useState<Array<any>>([]);
  const [clonesVisible, setClonesVisible] = useState(false);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  // track chosen preview image URL per project slug (e.g. '/project_showcase/servemart/dashboard.jpg')
  const [previewBySlug, setPreviewBySlug] = useState<Record<string, string>>(
    {}
  );

  // Initialize any previews provided by the server-side previewMap
  useEffect(() => {
    if (previewMap) {
      setPreviewBySlug((s) => ({ ...previewMap, ...s }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Preload candidate preview images for each project so clones can use them during animation.
  // Try several common filenames in order and pick the first that loads.
  useEffect(() => {
    const candidates = [
      "dashboard.jpg",
      "preview.jpg",
      "cover.jpg",
      "one.jpg",
      "two.jpg",
      "preview.png",
    ];

    items.forEach((p) => {
      // don't reload if we already found one
      if (previewBySlug[p.slug]) return;

      (async () => {
        for (const name of candidates) {
          const url = `/project_showcase/${p.slug}/${name}`;
          try {
            await new Promise<void>((resolve, reject) => {
              const img = new Image();
              img.src = url;
              img.onload = () => resolve();
              img.onerror = () => reject();
            });
            // success — store and stop
            setPreviewBySlug((s) => ({ ...s, [p.slug]: url }));
            break;
          } catch (e) {
            // try next candidate
          }
        }
      })();
    });
  }, [items, previewBySlug]);

  useEffect(() => {
    // helper to start the animation so we can replay
    const startAnimation = () => {
      const container = containerRef.current;
      if (!container) return;

      const finalRects: Array<DOMRect> = items.map((_, i) => {
        const el = itemRefs.current[i];
        return el ? el.getBoundingClientRect() : new DOMRect();
      });

      const containerRect = container.getBoundingClientRect();
      const centerX = containerRect.left + containerRect.width / 2;
      const centerY = containerRect.top + containerRect.height / 2;

      const made = finalRects.map((r, i) => {
        const finalCenterX = r.left + r.width / 2;
        const finalCenterY = r.top + r.height / 2;
        const dx = finalCenterX - centerX;
        const dy = finalCenterY - centerY;
        return { index: i, dx, dy, finalRect: r };
      });

      let order = made.map((m) => m.index);
      if (pattern === "diamond") {
        order = made
          .map((m) => ({ i: m.index, dist: Math.hypot(m.dx, m.dy) }))
          .sort((a, b) => a.dist - b.dist)
          .map((s) => s.i);
      } else if (pattern === "wave") {
        order = made
          .map((m) => ({ i: m.index, left: m.finalRect.left }))
          .sort((a, b) => a.left - b.left)
          .map((s) => s.i);
      }

      // faster timing for snappier feel
      const baseDelay = 80;
      const duration = 640;
      const clonesData = made.map((m) => {
        const pos = order.indexOf(m.index);
        const delay = pos * baseDelay;
        const z = 100 + pos;
        return { ...m, delay, duration, z };
      });

      setClones(clonesData);
      // hide the real cards until the animation completes; clones animate over an empty/hidden grid
      setShowFinal(false);
      setClonesVisible(true);

      // animate quickly
      requestAnimationFrame(() => {
        setTimeout(() => {
          const animated = container.querySelectorAll("[data-clone]");
          animated.forEach((el) => {
            const idx = Number(el.getAttribute("data-idx"));
            const data = clonesData.find((c) => c.index === idx)!;
            (
              el as HTMLElement
            ).style.transition = `transform ${data.duration}ms cubic-bezier(0.34,1.56,0.64,1) ${data.delay}ms, box-shadow ${data.duration}ms ease ${data.delay}ms, filter ${data.duration}ms ease ${data.delay}ms`;
            (el as HTMLElement).style.transform = `translate(${data.dx}px, ${
              data.dy
            }px) rotate(${(data.dx / 80).toFixed(2)}deg) scale(1)`;
            (el as HTMLElement).style.zIndex = String(data.z);
            (
              el as HTMLElement
            ).style.boxShadow = `0 18px 40px rgba(15,23,42,0.12)`;
            (
              el as HTMLElement
            ).style.filter = `brightness(1.03) saturate(1.03)`;
          });

          const totalTime = duration + baseDelay * clonesData.length + 80;
          setTimeout(() => {
            const animated2 = container.querySelectorAll("[data-clone]");
            animated2.forEach((el) => {
              (el as HTMLElement).style.transition = `transform 220ms ease`;
              (el as HTMLElement).style.transform += ` translateY(-6px)`;
            });

            setTimeout(() => {
              animated2.forEach((el) => {
                const idx = Number(el.getAttribute("data-idx"));
                const data = clonesData.find((c) => c.index === idx)!;
                (
                  el as HTMLElement
                ).style.transition = `transform 220ms cubic-bezier(.2,.8,.2,1)`;
                (el as HTMLElement).style.transform = `translate(${
                  data.dx
                }px, ${data.dy}px) rotate(${(data.dx / 80).toFixed(
                  2
                )}deg) scale(1)`;
                (
                  el as HTMLElement
                ).style.boxShadow = `0 8px 20px rgba(15,23,42,0.08)`;
                (el as HTMLElement).style.filter = ``;
              });

              setTimeout(() => {
                // reveal final cards, then fade clones
                setShowFinal(true);
                setClonesVisible(false);
                setTimeout(() => setClones([]), 240);
              }, 100);
            }, 220);
          }, totalTime);
        }, 10);
      });
    };

    // disable orchestration on small screens (mobile) to avoid layout shifts / flicker
    const isMobile =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 639px)").matches;
    if (isMobile) {
      // immediately show final grid on mobile and skip the animation entirely
      setShowFinal(true);
      setClones([]);
      setClonesVisible(false);
      return;
    }

    // start on mount
    startAnimation();

    // listen for replay events
    const replayHandler = () => startAnimation();
    window.addEventListener("projects:replay", replayHandler);
    return () => window.removeEventListener("projects:replay", replayHandler);
  }, [items, pattern]);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ perspective: 1200 }}
    >
      {/* Final grid (hidden until animation finishes) */}
      <div
        className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${
          showFinal ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {items.map((p, i) => (
          <article
            key={p.slug}
            ref={(el: HTMLDivElement | null) => {
              itemRefs.current[i] = el;
            }}
            className={`rounded-xl border bg-white p-6 shadow-sm transform-gpu transition-all duration-300 ${
              hoverIdx === i ? "-translate-y-2 scale-102 shadow-2xl" : ""
            }`}
            onMouseEnter={() => setHoverIdx(i)}
            onMouseLeave={() => setHoverIdx(null)}
          >
            {/* Placeholder image block to increase vertical size */}
            <div className="w-full h-40 bg-slate-100 rounded-md mb-4 relative overflow-hidden">
              {previewBySlug[p.slug] ? (
                <img
                  src={previewBySlug[p.slug]}
                  alt={`${p.title} preview`}
                  className="w-full h-40 object-cover"
                  loading="lazy"
                  style={{
                    transition: "filter 220ms ease, transform 220ms ease",
                    filter:
                      p.status === "coming-soon"
                        ? `${
                            hoverIdx === i ? "blur(3px)" : "blur(6px)"
                          } brightness(0.72)`
                        : "",
                    transform:
                      p.status === "coming-soon" && hoverIdx === i
                        ? "scale(1.01)"
                        : "",
                  }}
                />
              ) : (
                <svg
                  width="90"
                  height="56"
                  viewBox="0 0 90 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="90" height="56" rx="6" fill="#e6eef8" />
                  <text
                    x="50%"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fill="#94a3b8"
                    fontSize="10"
                  >
                    Image
                  </text>
                </svg>
              )}

              {/* Dim overlay for coming-soon */}
              {p.status === "coming-soon" && (
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0,0,0,0.18)",
                    transition: "background 220ms ease",
                  }}
                />
              )}

              {/* Diagonal ribbon */}
              {p.status === "coming-soon" && (
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    left: "-30%",
                    top: 8,
                    transform: "rotate(-30deg)",
                    width: "160%",
                    display: "flex",
                    justifyContent: "center",
                    pointerEvents: "none",
                    zIndex: 20,
                  }}
                >
                  <div
                    style={{
                      background: "rgba(250, 204, 21, 0.92)",
                      color: "#000",
                      padding: "6px 28px",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      boxShadow: "0 6px 18px rgba(2,6,23,0.08)",
                      borderRadius: 4,
                      fontSize: 12,
                    }}
                  >
                    COMING SOON
                  </div>
                </div>
              )}

              {/* Lock icon bottom-right */}
              {p.status === "coming-soon" && (
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    right: 8,
                    bottom: 8,
                    zIndex: 30,
                    background: "rgba(255,255,255,0.9)",
                    borderRadius: 6,
                    padding: 6,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 6px 18px rgba(2,6,23,0.06)",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 8h-1V6a4 4 0 10-8 0v2H7a1 1 0 00-1 1v9a1 1 0 001 1h10a1 1 0 001-1V9a1 1 0 00-1-1zm-7-2a2 2 0 114 0v2h-4V6z"
                      fill="#0f172a"
                    />
                  </svg>
                </div>
              )}
            </div>

            <h2 className="text-xl font-semibold mb-2">
              {p.displayTitle || p.title}
              {p.status && (
                <span className="ml-2 inline-block text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  {p.status === "coming-soon" ? "Coming soon" : "Ongoing"}
                </span>
              )}
            </h2>
            <p className="text-sm text-slate-600 mb-4">{p.short}</p>
            <div className="flex items-center justify-between">
              <div className="text-xs text-slate-500">{p.year}</div>
              {p.status === "coming-soon" ? (
                <span className="text-sm text-slate-400 font-medium">
                  Coming soon
                </span>
              ) : (
                <a
                  href={`/projects/${p.slug}`}
                  className="text-primary font-medium"
                >
                  View details →
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* No placeholders: animation plays over the hidden final grid */}

      {/* Clone layer for animation (absolutely positioned) */}
      <div className="absolute inset-0 pointer-events-none">
        {clones.map((c) => {
          const p = items[c.index];
          // clones initially centered via transform translate(0,0) then we animate to dx/dy
          return (
            <div
              key={`clone-${c.index}`}
              data-clone
              data-idx={c.index}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) scale(0.95)`,
                width: c.finalRect?.width ? `${c.finalRect.width}px` : "280px",
                height: c.finalRect?.height
                  ? `${c.finalRect.height}px`
                  : "auto",
                display: "flex",
                alignItems: "stretch",
                justifyContent: "stretch",
                zIndex: 10,
                willChange: "transform, box-shadow, filter",
                transition: "",
                opacity: clonesVisible ? 1 : 0,
                transitionProperty: "opacity, transform, box-shadow, filter",
                transitionDuration: "260ms",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 6px 18px rgba(2,6,23,0.06)",
                background: "white",
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  padding: 16,
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: 160,
                    background: "#f1f5f9",
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 12,
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  {previewBySlug[p.slug] ? (
                    <img
                      src={previewBySlug[p.slug]}
                      alt={`${p.title} preview`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "filter 220ms ease, transform 220ms ease",
                        filter:
                          p.status === "coming-soon"
                            ? "blur(6px) brightness(0.72)"
                            : "",
                      }}
                    />
                  ) : (
                    <svg
                      width="120"
                      height="80"
                      viewBox="0 0 120 80"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="120" height="80" rx="8" fill="#e6eef8" />
                      <text
                        x="50%"
                        y="50%"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        fill="#94a3b8"
                        fontSize="12"
                      >
                        Image
                      </text>
                    </svg>
                  )}

                  {p.status === "coming-soon" && (
                    <div
                      aria-hidden
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(0,0,0,0.18)",
                        zIndex: 10,
                      }}
                    />
                  )}

                  {p.status === "coming-soon" && (
                    <div
                      aria-hidden
                      style={{
                        position: "absolute",
                        left: "-30%",
                        top: 12,
                        transform: "rotate(-30deg)",
                        width: "160%",
                        display: "flex",
                        justifyContent: "center",
                        pointerEvents: "none",
                        zIndex: 20,
                      }}
                    >
                      <div
                        style={{
                          background: "rgba(250, 204, 21, 0.92)",
                          color: "#000",
                          padding: "6px 28px",
                          fontWeight: 700,
                          letterSpacing: "0.12em",
                          boxShadow: "0 6px 18px rgba(2,6,23,0.08)",
                          borderRadius: 4,
                          fontSize: 12,
                        }}
                      >
                        COMING SOON
                      </div>
                    </div>
                  )}

                  {p.status === "coming-soon" && (
                    <div
                      aria-hidden
                      style={{
                        position: "absolute",
                        right: 8,
                        bottom: 8,
                        zIndex: 30,
                        background: "rgba(255,255,255,0.9)",
                        borderRadius: 6,
                        padding: 6,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 6px 18px rgba(2,6,23,0.06)",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17 8h-1V6a4 4 0 10-8 0v2H7a1 1 0 00-1 1v9a1 1 0 001 1h10a1 1 0 001-1V9a1 1 0 00-1-1zm-7-2a2 2 0 114 0v2h-4V6z"
                          fill="#0f172a"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>
                  {p.displayTitle || p.title}
                </h3>
                <p style={{ marginTop: 8, color: "#64748b", flex: 1 }}>
                  {p.short}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 12,
                  }}
                >
                  <div style={{ fontSize: 12, color: "#94a3b8" }}>{p.year}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
