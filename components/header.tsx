"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  async function handleServicesClick(e: React.MouseEvent) {
    e.preventDefault();
    // If already on home, just smooth-scroll to the section
    if (pathname === "/") {
      const el = document.getElementById("services");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", "/#services");
      }
      return;
    }

    // Not on home: navigate to home then scroll after brief delay
    await router.push("/");
    // small delay to allow content to mount
    setTimeout(() => {
      const el = document.getElementById("services");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", "/#services");
      }
    }, 80);
  }

  async function handleHomeClick(e: React.MouseEvent) {
    e.preventDefault();
    // If already on home, smooth-scroll to top
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.replaceState(null, "", "/");
      return;
    }

    // Not on home: navigate to home then scroll after brief delay
    await router.push("/");
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.replaceState(null, "", "/");
    }, 80);
  }

  return (
    <>
      {/* Top Banner */}
      <div className="bg-primary text-white text-center py-2 text-sm">
        <span>
          Start your business with TatariNET —
          <a
            href="/learn-more"
            target="_blank"
            rel="noopener noreferrer"
            className="underline ml-2"
          >
            Learn more →
          </a>
        </span>
      </div>

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <a href="/" aria-label="TatariNET home" onClick={handleHomeClick}>
                <Image
                  src="/logo.png"
                  alt="TatariNET"
                  width={140}
                  height={40}
                  className="h-22 w-auto"
                />
              </a>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              <a
                href="/"
                onClick={handleHomeClick}
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Home
              </a>
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

              <Link
                href="#"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                About
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                FAQs
              </Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Log in
              </Link>
              <Button className="bg-primary hover:opacity-90 text-white">
                Get Started →
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
