"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import { useState, useEffect, useRef } from "react";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navigating, setNavigating] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setNavigating(false);
  }, [pathname]);

  // Recompute active section when mobile menu opens so the menu highlights are correct
  useEffect(() => {
    if (!mobileOpen) return;
    if (typeof window === "undefined") return;
    const ids = ["services", "about"];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!els || els.length === 0) return;
    const viewportCenter = window.innerHeight / 2;
    let bestId: string | null = null;
    let bestDist = Infinity;
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      const center = r.top + r.height / 2;
      const dist = Math.abs(center - viewportCenter);
      if (dist < bestDist) {
        bestDist = dist;
        bestId = el.id;
      }
    });
    if (bestDist < window.innerHeight * 0.5) setActiveSection(bestId);
    else setActiveSection(null);
  }, [mobileOpen, pathname]);

  // Accessibility: manage focus when mobile menu opens (focus trap + restore)
  const menuRef = useRef<HTMLElement | null>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const menu = menuRef.current;
    const btn = toggleButtonRef.current;

    if (mobileOpen) {
      // prevent body scroll while menu is open
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      // focus first focusable element in menu
      const first = menu?.querySelector<HTMLElement>(
        "a,button,[tabindex]:not([tabindex='-1'])"
      );
      first?.focus();

      // trap focus within menu
      const handleKey = (e: KeyboardEvent) => {
        if (e.key !== "Tab") return;
        const focusable = menu?.querySelectorAll<HTMLElement>(
          "a,button,[tabindex]:not([tabindex='-1'])"
        );
        if (!focusable || focusable.length === 0) return;
        const firstEl = focusable[0];
        const lastEl = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      };

      window.addEventListener("keydown", handleKey);

      return () => {
        window.removeEventListener("keydown", handleKey);
        document.body.style.overflow = prevOverflow;
      };
    } else {
      // restore focus to toggle button when menu closes
      btn?.focus();
    }
  }, [mobileOpen]);

  // Auto-scroll mobile menu to the active item when it opens
  useEffect(() => {
    if (!mobileOpen) return;
    // wait a tick for the menu DOM to render
    const t = setTimeout(() => {
      const menu = menuRef.current;
      if (!menu) return;
      // active key can be either a section id (services/about) when on home
      // or the pathname for full-page routes (e.g. /projects, /contact)
      const activeKey =
        pathname === "/" ? activeSection : pathname.replace(/^\//, "");
      if (!activeKey) return;
      const item = menu.querySelector<HTMLElement>(
        `[data-item="${activeKey}"]`
      );
      if (item) item.scrollIntoView({ block: "center", behavior: "smooth" });
    }, 80);
    return () => clearTimeout(t);
  }, [mobileOpen, activeSection, pathname]);

  // track which section is currently visible on the page (for anchors like #services / #about)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const ids = ["services", "about"];
    const getEls = () =>
      ids
        .map((id) => document.getElementById(id))
        .filter(Boolean) as HTMLElement[];

    const updateActive = () => {
      const els = getEls();
      if (!els || els.length === 0) return;
      const viewportCenter = window.innerHeight / 2;

      const isVisible = (r: DOMRect) => {
        // consider visible if it overlaps a central viewport band or its center is close
        const top = r.top;
        const bottom = r.bottom;
        const vh = window.innerHeight;
        const bandTop = vh * 0.2;
        const bandBottom = vh * 0.8;
        const center = top + r.height / 2;
        const centerDist = Math.abs(center - viewportCenter);
        if (top <= bandBottom && bottom >= bandTop) return true;
        if (centerDist < vh * 0.45) return true;
        return false;
      };

      // pick the first visible element preferring closest to center
      let bestId: string | null = null;
      let bestDist = Infinity;
      els.forEach((el) => {
        // Special-case services: prefer the first card so the menu highlights
        // when users are viewing the start of the services list (first card)
        let r = el.getBoundingClientRect();
        if (el.id === "services") {
          const firstCard = el.querySelector("article");
          if (firstCard) {
            r = (firstCard as HTMLElement).getBoundingClientRect();
          }
        }

        if (!isVisible(r)) return;
        const center = r.top + r.height / 2;
        const dist = Math.abs(center - viewportCenter);
        if (dist < bestDist) {
          bestDist = dist;
          bestId = el.id;
        }
      });
      setActiveSection(bestId);
    };

    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    window.addEventListener("hashchange", updateActive);
    // initial run shortly after mount so page content can layout
    const t = setTimeout(updateActive, 40);

    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
      window.removeEventListener("hashchange", updateActive);
    };
  }, [pathname]);

  async function handleServicesClick(e: React.MouseEvent) {
    // If already on home, intercept to smooth-scroll to the section
    if (pathname === "/") {
      e.preventDefault();
      const el = document.getElementById("services");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }

    // Not on home: navigate to home, then wait for the #services element
    // to appear and scroll to it immediately. We poll for a short window
    // instead of relying on a fixed timeout so clicks from anywhere act
    // as a single-step navigation+scroll.
    e.preventDefault();
    setNavigating(true);
    await router.push("/");

    const waitForEl = (id: string, timeout = 1000) =>
      new Promise<HTMLElement | null>((resolve) => {
        const existing = document.getElementById(id);
        if (existing) return resolve(existing as HTMLElement);

        const interval = 50;
        let elapsed = 0;
        const t = setInterval(() => {
          elapsed += interval;
          const found = document.getElementById(id);
          if (found) {
            clearInterval(t);
            resolve(found as HTMLElement);
          } else if (elapsed >= timeout) {
            clearInterval(t);
            resolve(null);
          }
        }, interval);
      });

    const el = await waitForEl("services", 1200);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleHomeClick(e: React.MouseEvent) {
    // If already on home, intercept to smooth-scroll to top
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    // Otherwise allow Link to handle navigation normally
  }

  async function handleAboutClick(e: React.MouseEvent) {
    // If already on home, smooth-scroll to the CTA/about section
    if (pathname === "/") {
      e.preventDefault();
      const el = document.getElementById("about");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    // Not on home: navigate to home, then scroll to the about section
    e.preventDefault();
    setNavigating(true);
    await router.push("/");

    // Wait for the #about element to appear (poll shortly) and then scroll to it.
    const waitForEl = (id: string, timeout = 1200) =>
      new Promise<HTMLElement | null>((resolve) => {
        const existing = document.getElementById(id);
        if (existing) return resolve(existing as HTMLElement);

        const interval = 50;
        let elapsed = 0;
        const t = setInterval(() => {
          elapsed += interval;
          const found = document.getElementById(id);
          if (found) {
            clearInterval(t);
            resolve(found as HTMLElement);
          } else if (elapsed >= timeout) {
            clearInterval(t);
            resolve(null);
          }
        }, interval);
      });

    const el = await waitForEl("about", 1200);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 sm:h-16">
            {/* Logo */}
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/"
                aria-label="TatariNET home"
                onClick={handleHomeClick}
              >
                <Image
                  src="/logo.png"
                  alt="TatariNET"
                  width={200}
                  height={64}
                  className="h-14 sm:h-12 md:h-14 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <Link href="/contact" className="inline-block">
                <Button className="hover:cursor-pointer bg-primary hover:opacity-90 text-white focus-visible:ring-0 focus:outline-none transition-none active:scale-100">
                  Contact →
                </Button>
              </Link>
              <div className="hidden md:block">
                <Link href="/consulting" className="inline-block">
                  <Button className="hover:cursor-pointer bg-white text-xl text-slate-700">Join consulting →</Button>
                </Link>
              </div>
            </div>

            {/* Navigation Links (desktop) */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                onClick={handleHomeClick}
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Home
              </Link>
              <a
                href="/#services"
                onClick={handleServicesClick}
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Services
              </a>
              <a
                href="/projects"
                onClick={async (e) => {
                  e.preventDefault();
                  if (pathname === "/projects") {
                    // replay animation on the projects page
                    window.dispatchEvent(new CustomEvent("projects:replay"));
                    return;
                  }
                  await router.push("/projects");
                  // small delay to allow projects component to mount, then trigger animation
                  setTimeout(
                    () =>
                      window.dispatchEvent(new CustomEvent("projects:replay")),
                    120
                  );
                }}
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Projects
              </a>

              <a
                href="/#about"
                onClick={handleAboutClick}
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                About
              </a>
            </nav>

            {/* Mobile hamburger */}
            <div className="md:hidden">
              <button
                ref={toggleButtonRef}
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                onClick={() => setMobileOpen((s) => !s)}
                className="p-2 rounded-md border bg-white"
              >
                {mobileOpen ? "✕" : "☰"}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu panel (absolute - overlays page content) */}
        {mobileOpen && (
          <div
            id="mobile-menu"
            ref={(el) => {
              menuRef.current = el;
            }}
            className="md:hidden absolute left-0 right-0 top-full z-40 bg-white border-b border-gray-200 shadow-sm"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <nav
                className="flex flex-col gap-3"
                role="menu"
                aria-label="Main"
              >
                {/** Helper to compute active state for simple paths */}
                {/* Home */}
                <Link
                  href="/"
                  onClick={(e) => {
                    // if already on home, close menu and scroll; otherwise keep menu open until navigation completes
                    if (pathname === "/") {
                      setMobileOpen(false);
                    } else {
                      setNavigating(true);
                    }
                    handleHomeClick(e as unknown as React.MouseEvent);
                  }}
                  className={
                    "w-full px-4 py-3 flex items-center justify-between gap-3 rounded-md text-gray-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-500" +
                    (pathname === "/" && !activeSection
                      ? " border-l-4 border-cyan-500 bg-slate-50 font-semibold"
                      : " border-l-4 border-transparent")
                  }
                  role="menuitem"
                  aria-current={pathname === "/" ? "page" : undefined}
                  data-item="home"
                >
                  <span className="text-left">Home</span>
                  <span className="text-slate-400">›</span>
                </Link>

                {/** Services (anchor to section) */}
                <a
                  href="/#services"
                  onClick={(e) => {
                    // if already on home, close menu and scroll; otherwise let handler set navigating and await
                    if (pathname === "/") {
                      setMobileOpen(false);
                    }
                    handleServicesClick(e as unknown as React.MouseEvent);
                  }}
                  className={
                    "w-full px-4 py-3 flex items-center justify-between gap-3 rounded-md text-gray-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-500" +
                    (pathname === "/" && activeSection === "services"
                      ? " border-l-4 border-cyan-500 bg-slate-50 font-semibold"
                      : " border-l-4 border-transparent")
                  }
                  role="menuitem"
                  data-item="services"
                >
                  <span className="text-left">Services</span>
                  <span className="text-slate-400">›</span>
                </a>

                {/** Projects */}
                <a
                  href="/projects"
                  onClick={async (e) => {
                    e.preventDefault();
                    if (pathname === "/projects") {
                      setMobileOpen(false);
                      window.dispatchEvent(new CustomEvent("projects:replay"));
                      return;
                    }
                    // avoid closing menu immediately to prevent header/layout flicker
                    setNavigating(true);
                    await router.push("/projects");
                    setTimeout(
                      () =>
                        window.dispatchEvent(
                          new CustomEvent("projects:replay")
                        ),
                      120
                    );
                  }}
                  className={
                    "w-full px-4 py-3 flex items-center justify-between gap-3 rounded-md text-gray-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-500" +
                    (pathname === "/projects"
                      ? " border-l-4 border-cyan-500 bg-slate-50 font-semibold"
                      : " border-l-4 border-transparent")
                  }
                  role="menuitem"
                  aria-current={pathname === "/projects" ? "page" : undefined}
                  data-item="projects"
                >
                  <span className="text-left">Projects</span>
                  <span className="text-slate-400">›</span>
                </a>

                {/** About (anchor) */}
                <a
                  href="/#about"
                  onClick={(e) => {
                    if (pathname === "/") {
                      setMobileOpen(false);
                    }
                    handleAboutClick(e as unknown as React.MouseEvent);
                  }}
                  className={
                    "w-full px-4 py-3 flex items-center justify-between gap-3 rounded-md text-gray-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-500" +
                    (pathname === "/" && activeSection === "about"
                      ? " border-l-4 border-cyan-500 bg-slate-50 font-semibold"
                      : " border-l-4 border-transparent")
                  }
                  role="menuitem"
                  data-item="about"
                >
                  <span className="text-left">About</span>
                  <span className="text-slate-400">›</span>
                </a>

                {/** Contact */}
                <Link
                  href="/contact"
                  onClick={() => {
                    // keep the menu until navigation completes to avoid layout shifts
                    setNavigating(true);
                  }}
                  className={
                    "w-full px-4 py-3 flex items-center justify-between gap-3 rounded-md text-gray-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-500" +
                    (pathname === "/contact"
                      ? " border-l-4 border-cyan-500 bg-slate-50 font-semibold"
                      : " border-l-4 border-transparent")
                  }
                  role="menuitem"
                  aria-current={pathname === "/contact" ? "page" : undefined}
                  data-item="contact"
                >
                  <span className="text-left">Contact</span>
                  <span className="text-slate-400">›</span>
                </Link>

                {/* Consulting action is intentionally omitted from mobile menu - consulting is accessible in the Consulting section of Features */}
              </nav>
            </div>
          </div>
        )}
        {/* navigation overlay to mask content shifts while client nav occurs */}
        {navigating && (
          <div className="fixed inset-0 z-40 bg-white/70 backdrop-blur-sm flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <svg
                className="h-10 w-10 text-cyan-600 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
