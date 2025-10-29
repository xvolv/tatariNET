"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
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
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="TatariNET"
                width={140}
                height={40}
                className="h-22 w-auto"
              />
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="#"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Home
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Services
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Products
              </Link>

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
