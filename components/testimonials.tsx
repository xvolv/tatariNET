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
  // autoplay state: cycles pages circularly; paused on hover or user interaction
  const [pausedAuto, setPausedAuto] = useState(false);

  const pages = useMemo(() => {
    const out: Array<Array<(typeof testimonials)[number]>> = [];
    for (let i = 0; i < testimonials.length; i += perPage) {
      out.push(testimonials.slice(i, i + perPage));
    }
    return out;
  }, []);

  const visible = pages[page] || [];

  // simplified: no autoplay, no pointer nudge/auto attempts — only click left/right

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

        <div className="overflow-hidden testimonials-wrap relative">
          {/* Row: cards (3) + inline controls */}
          <div className="flex items-start gap-6">
            <div className="flex-1">
              {/* key flips when page changes so child animations replay */}
              <div className="testimonials-viewport">
                <div
                  className="testimonials-slider__viewport"
                  aria-live="polite"
                >
                  <div
                    className="testimonials-slider__inner"
                    style={{
                      width: `${pages.length * 100}%`,
                      display: "flex",
                      transition: "transform 600ms ease",
                      transform: `translateX(-${(page * 100) / pages.length}%)`,
                    }}
                  >
                    {pages.map((pg, pi) => (
                      <div
                        key={pi}
                        className="testimonials-slider__page"
                        style={{
                          width: `${100 / pages.length}%`,
                          paddingRight: "0",
                          boxSizing: "border-box",
                        }}
                      >
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                          {pg.map((t, i) => (
                            <blockquote
                              key={`${t.name}-${pi}-${i}`}
                              className="testimonial-card p-6 rounded-xl bg-white border shadow-sm"
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

                                  <p className="mt-3 text-slate-700">
                                    {t.quote}
                                  </p>
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
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* controls removed here — replaced by edge overlay buttons below */}
          </div>

          {/* overlay left/right buttons (edge controls) */}
          <button
            type="button"
            aria-label="Previous testimonials"
            onClick={() => {
              setDirection("prev");
              setPage((p) => (p - 1 + totalPages) % totalPages);
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border bg-white flex items-center justify-center shadow-sm hover:opacity-90"
          >
            ‹
          </button>

          <button
            type="button"
            aria-label="Next testimonials"
            onClick={() => {
              setDirection("next");
              setPage((p) => (p + 1) % totalPages);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border bg-white flex items-center justify-center shadow-sm hover:opacity-90"
          >
            ›
          </button>
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
