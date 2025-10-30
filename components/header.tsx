"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

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

    // Not on home: navigate to home, then scroll after a short delay
    e.preventDefault();
    await router.push("/");
    setTimeout(() => {
      const el = document.getElementById("services");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
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
    await router.push("/");
    setTimeout(() => {
      const el = document.getElementById("about");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  }

  return (
    <>
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Link
                href="/"
                aria-label="TatariNET home"
                onClick={handleHomeClick}
              >
                <Image
                  src="/logo.png"
                  alt="TatariNET"
                  width={140}
                  height={40}
                  className="h-22 w-auto"
                />
              </Link>
            </div>

            {/* Navigation Links */}
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

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <Link
                href="/contact"
                className="text-gray-700 hover:text-gray-900 font-medium border-2 border-transparent"
              >
                Contact
              </Link>
              <Link href="/consulting" className="inline-block">
                <Button className="bg-primary hover:opacity-90 text-white focus-visible:ring-0 focus:outline-none transition-none active:scale-100">
                  Join Consulting →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
