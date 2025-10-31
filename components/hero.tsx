"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-700 mb-6 leading-tight animate-fadeInUp">
          TatariNET Engineering Digital Excellence
        </h1>

        <p className="text-lg text-gray-600 mb-8 animate-fadeInUp stagger-1 max-w-2xl mx-auto">
          We transform your vision into a robust, well-engineered digital
          product. Our team specializes in taking projects from concept to a
          fully launched solution, with a steadfast commitment to quality,
          clarity, and timeliness.
        </p>
      </div>
    </section>
  );
}
