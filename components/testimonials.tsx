"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";

const testimonials = [
  {
    quote:
      "TatariNET helped us migrate our infrastructure with zero downtime — our users noticed the speed immediately.",
    name: "Kaleb Admasu",
    role: "CTO",
    rating: 5,
  },
  {
    quote:
      "The team is responsive and professional. We reduced costs and improved reliability within weeks.",
    name: "Samuel Tadesse",
    role: "Head of Tech",
    rating: 5,
  },
  {
    quote:
      "Great tooling and outstanding support — the rollout was seamless and the training was top-notch.",
    name: "Amina",
    role: "Product Lead",
    rating: 4,
  },
  {
    quote:
      "Excellent SLAs and monitoring — incidents are much easier to resolve now.",
    name: "Daniel Ashebir",
    role: "Former client",
    rating: 5,
  },
  {
    quote:
      "Their team guided us from PoC to production in record time. Highly recommended.",
    name: "Fatima Nur",
    role: "Startup Founder",
    rating: 4,
  },
];

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

export default function Testimonials() {
  const [perPage, setPerPage] = useState(3);
  const [page, setPage] = useState(0);

  function MobileTestimonials() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const innerRef = useRef<HTMLDivElement | null>(null);
    const autoplayRef = useRef<number | null>(null);
    const resumeTimerRef = useRef<number | null>(null);
    const currentIndexRef = useRef(0);
    const dirRef = useRef(1); // 1 = forward, -1 = backward (ping-pong)

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;
      // items are the individual testimonial elements
      const items = container.querySelectorAll<HTMLElement>(
        "[data-testimonial-item]"
      );
      if (!items || items.length === 0) return;

      const animateScrollLeft = (
        el: HTMLElement,
        to: number,
        duration = 240
      ) => {
        const start = el.scrollLeft;
        const change = to - start;
        const startTime = performance.now();

        const easeInOut = (t: number) =>
          t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

        const step = (now: number) => {
          const elapsed = Math.min(1, (now - startTime) / duration);
          const eased = easeInOut(elapsed);
          el.scrollLeft = Math.round(start + change * eased);
          if (elapsed < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
      };

      const scrollToIndex = (i: number) => {
        const el = items[i];
        if (!el) return;

        const isWrapAround =
          currentIndexRef.current === items.length - 1 && i === 0;

        // If we're wrapping from last -> first, temporarily disable snap to allow smooth long scroll
        const inner = innerRef.current;
        if (isWrapAround && inner) {
          // store previous value
          const prev = inner.style.scrollSnapType;
          inner.style.scrollSnapType = "none";
          animateScrollLeft(container, el.offsetLeft, 240);
          // restore snap after animation completes
          window.setTimeout(() => {
            inner.style.scrollSnapType = prev || "x mandatory";
          }, 280);
        } else {
          animateScrollLeft(container, el.offsetLeft, 240);
        }

        currentIndexRef.current = i;
      };

      const next = () => {
        const len = items.length;
        let nextIndex = currentIndexRef.current + dirRef.current;
        // if we hit the end, reverse direction and step one back
        if (nextIndex >= len) {
          dirRef.current = -1;
          nextIndex = Math.max(0, len - 2);
        } else if (nextIndex < 0) {
          dirRef.current = 1;
          nextIndex = Math.min(len - 1, 1);
        }
        scrollToIndex(nextIndex);
      };

      const startAutoplay = () => {
        if (autoplayRef.current) return;
        // faster autoplay on mobile
        autoplayRef.current = window.setInterval(next, 2400);
      };
      const stopAutoplay = () => {
        if (autoplayRef.current) {
          clearInterval(autoplayRef.current);
          autoplayRef.current = null;
        }
      };

      const pauseAndResume = () => {
        stopAutoplay();
        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
        // resume slightly sooner
        resumeTimerRef.current = window.setTimeout(() => {
          startAutoplay();
        }, 2500);
      };

      // start autoplay
      startAutoplay();

      const onPointerDown = () => pauseAndResume();
      const onWheel = () => pauseAndResume();

      // debounce scroll end to update currentIndexRef
      let scrollDebounce: number | null = null;
      const onScroll = () => {
        if (scrollDebounce) clearTimeout(scrollDebounce);
        scrollDebounce = window.setTimeout(() => {
          const sc = container.scrollLeft;
          let closest = 0;
          let best = Infinity;
          items.forEach((it, idx) => {
            const off = Math.abs(it.offsetLeft - sc);
            if (off < best) {
              best = off;
              closest = idx;
            }
          });
          currentIndexRef.current = closest;
        }, 200);
        // user interaction should pause autoplay and resume later
        pauseAndResume();
      };

      container.addEventListener("pointerdown", onPointerDown, {
        passive: true,
      });
      container.addEventListener("touchstart", onPointerDown, {
        passive: true,
      });
      container.addEventListener("wheel", onWheel, { passive: true });
      container.addEventListener("scroll", onScroll, { passive: true });

      return () => {
        stopAutoplay();
        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
        if (scrollDebounce) clearTimeout(scrollDebounce);
        container.removeEventListener("pointerdown", onPointerDown);
        container.removeEventListener("touchstart", onPointerDown);
        container.removeEventListener("wheel", onWheel);
        container.removeEventListener("scroll", onScroll);
      };
    }, []);

    return (
      <div className="sm:hidden">
        <div ref={containerRef} className="overflow-x-auto -mx-4 px-4">
          <div ref={innerRef} className="flex gap-4 snap-x snap-mandatory">
            {testimonials.map((t, i) => (
              <div
                key={i}
                data-testimonial-item
                className="snap-start min-w-[92%] mx-auto"
              >
                {renderCard(t, `mobile-${i}`)}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w < 640) setPerPage(1);
      else if (w < 1024) setPerPage(2);
      else setPerPage(3);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const pages = useMemo(() => {
    const out: Array<Array<(typeof testimonials)[number]>> = [];
    for (let i = 0; i < testimonials.length; i += perPage) {
      out.push(testimonials.slice(i, i + perPage));
    }
    return out;
  }, [perPage]);

  const totalPages = Math.max(1, pages.length);

  const renderCard = (
    t: (typeof testimonials)[number],
    key: string | number
  ) => (
    <blockquote className="testimonial-card py-4 px-6 sm:p-6 rounded-xl bg-white border shadow-sm">
      <div className="flex items-start gap-4 ">
        {/* Avatar */}

        {/* Right content */}

        <div className="flex-1">
          <div className="flex gap-2">
            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 font-semibold text-lg overflow-hidden testimonial-avatar">
              <span aria-hidden>{t.name.charAt(0)}</span>
            </div>
            {/* Stars on the top */}
            <div className="flex items-center gap-3">
              <StarRating value={t.rating} />
              <div className="text-sm text-slate-600">{t.rating}.0</div>
            </div>
          </div>
          {/* Quote now spans full width under avatar + stars */}
          <p className="mt-2 text-base sm:text-sm text-slate-700">{t.quote}</p>

          {/* Name & role */}
          <div className="mt-3 text-sm text-slate-600">
            <div className="font-medium text-slate-900">{t.name}</div>
            <div>{t.role}</div>
          </div>
        </div>
      </div>
    </blockquote>
  );

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2
              id="testimonials-heading"
              className="text-3xl font-bold text-slate-700"
            >
              What our customers say
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Real feedback from teams using TatariNET
            </p>
          </div>
        </div>

        <div className="relative">
          {/* Mobile: horizontal snap list */}
          {perPage === 1 ? (
            <MobileTestimonials />
          ) : (
            <div className="hidden sm:block">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((t, i) => (
                  <div key={i}>{renderCard(t, i)}</div>
                ))}
              </div>
            </div>
          )}

          {/* edge controls for larger screens */}
          <button
            type="button"
            aria-label="Previous testimonials"
            onClick={() => setPage((p) => (p - 1 + totalPages) % totalPages)}
            className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full border bg-white items-center justify-center shadow-sm hover:opacity-90 sm:w-10 sm:h-10"
          >
            ‹
          </button>

          <button
            type="button"
            aria-label="Next testimonials"
            onClick={() => setPage((p) => (p + 1) % totalPages)}
            className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full border bg-white items-center justify-center shadow-sm hover:opacity-90 sm:w-10 sm:h-10"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
