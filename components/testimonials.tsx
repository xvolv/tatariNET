"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";

const testimonials = [
  {
    quote:
      "TatariNET helped us migrate our infrastructure with zero downtime — our users noticed the speed immediately.",
    name: "Eleni Bekele",
    role: "CTO, EthioCloud",
    rating: 5,
  },
  {
    quote:
      "The team is responsive and professional. We reduced costs and improved reliability within weeks.",
    name: "Samuel Tadesse",
    role: "Head of Infra, AddisApp",
    rating: 5,
  },
  {
    quote:
      "Great tooling and outstanding support — the rollout was seamless and the training was top-notch.",
    name: "Amina Yusuf",
    role: "Product Lead, NetSavvy",
    rating: 4,
  },
  {
    quote:
      "Excellent SLAs and monitoring — incidents are much easier to resolve now.",
    name: "Daniel Mekonnen",
    role: "SRE Lead, CloudWave",
    rating: 5,
  },
  {
    quote:
      "Their team guided us from PoC to production in record time. Highly recommended.",
    name: "Fatima Ali",
    role: "Head of Product, ServeZone",
    rating: 4,
  },
  {
    quote:
      "Robust APIs and clear documentation — integration was straightforward.",
    name: "Bekele H.",
    role: "Developer, MobileFirst",
    rating: 5,
  },
];

export default function Testimonials() {
  const perPage = 3;
  const totalPages = Math.ceil(testimonials.length / perPage);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const visible = useMemo(() => {
    const start = page * perPage;
    return testimonials.slice(start, start + perPage);
  }, [page]);

  // drag / swipe support: pointer tracking
  const containerRef = useRef<HTMLDivElement | null>(null);
  const startX = useRef<number | null>(null);
  const moved = useRef(false);
  const SWIPE_THRESHOLD = 60; // px
  const ATTEMPT_THRESHOLD = 20; // small nudge to start auto-attempts

  // auto-advance attempt state
  const autoAttempts = useRef(0);
  const autoTimer = useRef<number | null>(null);
  const lastAutoDir = useRef<"next" | "prev">("next");
  const [autoTrying, setAutoTrying] = useState(false);
  const MAX_AUTO_ATTEMPTS = 3;

  function handlePointerDown(e: React.PointerEvent) {
    startX.current = e.clientX;
    moved.current = false;
    try {
      (e.target as Element).setPointerCapture?.(e.pointerId);
    } catch {}
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (startX.current == null) return;
    const dx = e.clientX - startX.current;
    if (!moved.current && Math.abs(dx) > SWIPE_THRESHOLD) {
      moved.current = true;
      if (dx < 0) {
        setDirection("next");
        setPage((p) => Math.min(totalPages - 1, p + 1));
      } else {
        setDirection("prev");
        setPage((p) => Math.max(0, p - 1));
      }
    }
  }

  function scheduleAutoAttempt(dir: "next" | "prev") {
    // clear any existing timer
    stopAutoAttempts();
    autoAttempts.current = 0;
    lastAutoDir.current = dir;
    setAutoTrying(true);

    const attempt = () => {
      autoAttempts.current += 1;
      const desired =
        dir === "next"
          ? Math.min(totalPages - 1, page + 1)
          : Math.max(0, page - 1);

      if (desired === page) {
        // can't move; retry until max
        if (autoAttempts.current < MAX_AUTO_ATTEMPTS) {
          autoTimer.current = window.setTimeout(attempt, 700);
        } else {
          stopAutoAttempts();
        }
      } else {
        setDirection(dir);
        setPage(desired);
        stopAutoAttempts();
      }
    };

    // first attempt after a short delay so the user sees the indicator
    autoTimer.current = window.setTimeout(attempt, 700);
  }

  function stopAutoAttempts() {
    if (autoTimer.current) {
      clearTimeout(autoTimer.current);
    }
    autoTimer.current = null;
    autoAttempts.current = 0;
    setAutoTrying(false);
  }

  function endPointer(e: React.PointerEvent) {
    // compute dx before clearing
    const endX = e.clientX;
    const sx = startX.current;
    if (sx != null && !moved.current) {
      const dx = endX - sx;
      const adx = Math.abs(dx);
      if (adx >= ATTEMPT_THRESHOLD && adx < SWIPE_THRESHOLD) {
        // user nudged but didn't complete a swipe — start auto attempts
        const dir = dx < 0 ? "next" : "prev";
        scheduleAutoAttempt(dir);
      }
    }

    startX.current = null;
    moved.current = false;
    try {
      (e.target as Element).releasePointerCapture?.(e.pointerId);
    } catch {}
  }

  // cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (autoTimer.current) clearTimeout(autoTimer.current);
    };
  }, []);

  // preview hint: run a subtle preview slide a couple times to indicate more content
  const previewAttempts = useRef(0);
  const previewTimer = useRef<number | null>(null);
  const [previewing, setPreviewing] = useState(false);
  const PREVIEW_DELAY = 1400; // ms before first preview
  const PREVIEW_REPEATS = 2;

  function startPreviewIfNeeded() {
    // don't preview if user is interacting or no next page
    if (autoTrying || page >= totalPages - 1) return;
    // reset
    stopPreview();
    previewAttempts.current = 0;

    const run = () => {
      // do preview animation (toggle class)
      setPreviewing(true);
      previewTimer.current = window.setTimeout(() => {
        setPreviewing(false);
        previewAttempts.current += 1;
        if (previewAttempts.current < PREVIEW_REPEATS) {
          previewTimer.current = window.setTimeout(run, 900 + 400);
        }
      }, 900); // duration matches CSS 900ms
    };

    previewTimer.current = window.setTimeout(run, PREVIEW_DELAY);
  }

  function stopPreview() {
    if (previewTimer.current) {
      clearTimeout(previewTimer.current);
    }
    previewTimer.current = null;
    previewAttempts.current = 0;
    setPreviewing(false);
  }

  // start preview on mount and when page changes (only if there's content ahead)
  useEffect(() => {
    startPreviewIfNeeded();
    return () => stopPreview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2
              id="testimonials-heading"
              className="text-3xl font-bold text-slate-900"
            >
              What our customers say
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Real feedback from teams using TatariNET
            </p>
          </div>

          {/* controls moved to sit alongside the cards below */}
        </div>

        <div className="overflow-hidden testimonials-wrap">
          {/* Row: cards (3) + inline controls */}
          <div className="flex items-start gap-6">
            <div className="flex-1">
              {/* key flips when page changes so child animations replay */}
              <div className="testimonials-viewport">
                <div
                  ref={containerRef}
                  onPointerDown={(e) => {
                    stopPreview();
                    stopAutoAttempts();
                    handlePointerDown(e);
                  }}
                  onPointerMove={(e) => {
                    stopPreview();
                    handlePointerMove(e);
                  }}
                  onPointerUp={(e) => {
                    stopPreview();
                    endPointer(e);
                  }}
                  onPointerCancel={(e) => {
                    stopPreview();
                    endPointer(e);
                  }}
                  key={page}
                  className={`${
                    previewing ? "animate-preview" : ""
                  } grid gap-6 sm:grid-cols-2 lg:grid-cols-3`}
                  aria-live="polite"
                >
                  {visible.map((t, i) => (
                    <blockquote
                      key={`${t.name}-${page}-${i}`}
                      className={`testimonial-card p-6 rounded-xl bg-white border shadow-sm ${
                        direction === "next"
                          ? "animate-slideInRight"
                          : "animate-slideInLeft"
                      }`}
                      style={{ animationDelay: `${i * 0.12}s` }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 font-semibold text-lg overflow-hidden testimonial-avatar">
                          <span aria-hidden>
                            {t.name.split(" ")[0].charAt(0)}
                          </span>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <StarRating value={t.rating} />
                              <div className="text-sm text-slate-600">
                                {t.rating}.0
                              </div>
                            </div>
                          </div>

                          <p className="mt-3 text-slate-700">{t.quote}</p>
                          <div className="mt-4 text-sm text-slate-600">
                            <div className="font-medium text-slate-900">
                              {t.name}
                            </div>
                            <div>{t.role}</div>
                          </div>
                        </div>
                      </div>
                    </blockquote>
                  ))}
                </div>
              </div>
            </div>

            {/* inline controls next to the 3 cards */}
            <div className="flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  stopAutoAttempts();
                  setDirection("prev");
                  setPage((p) => Math.max(0, p - 1));
                }}
                disabled={page === 0}
                aria-label="Previous testimonials"
                className={`w-10 h-10 rounded-full border flex items-center justify-center bg-white hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed`}
              >
                ‹
              </button>

              {/* auto-advance trigger indicator (pulses while trying) */}
              <button
                title="Auto-advance"
                aria-label="Auto advance trigger"
                onClick={() => {
                  // if currently trying, cancel attempts and force a single advance
                  stopAutoAttempts();
                  const dir = lastAutoDir.current ?? "next";
                  setDirection(dir);
                  setPage((p) =>
                    dir === "next"
                      ? Math.min(totalPages - 1, p + 1)
                      : Math.max(0, p - 1)
                  );
                }}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                  autoTrying
                    ? "bg-amber-100 ring-2 ring-amber-200 animate-pulse"
                    : "bg-white"
                }`}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M12 5v14M5 12h14"
                    stroke={autoTrying ? "#d97706" : "#94a3b8"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div className="text-xs text-slate-500">
                {page + 1}/{totalPages}
              </div>

              <button
                type="button"
                onClick={() => {
                  stopAutoAttempts();
                  setDirection("next");
                  setPage((p) => Math.min(totalPages - 1, p + 1));
                }}
                disabled={page >= totalPages - 1}
                aria-label="Next testimonials"
                className={`w-10 h-10 rounded-full border flex items-center justify-center bg-white hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed`}
              >
                ›
              </button>
            </div>
          </div>

          {/* visible hint button on the right edge to indicate more */}
          {page < totalPages - 1 && (
            <button
              onClick={() => {
                stopPreview();
                stopAutoAttempts();
                setDirection("next");
                setPage((p) => Math.min(totalPages - 1, p + 1));
              }}
              aria-label="See next testimonials"
              className={`testimonials-hint ${
                previewing ? "hint-animate" : ""
              }`}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M9 6l6 6-6 6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={filled ? "#FFD700" : "none"}
      stroke={filled ? "none" : "#cbd5e1"}
      strokeWidth={filled ? 0 : 1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="star"
      aria-hidden
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

function StarRating({ value }: { value: number }) {
  const stars = [0, 1, 2, 3, 4];
  return (
    <div className="flex items-center gap-1 text-xs" aria-hidden>
      {stars.map((s) => (
        <span key={s} className="inline-block">
          <Star filled={s < value} />
        </span>
      ))}
    </div>
  );
}
