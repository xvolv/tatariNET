"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Features() {
  return (
    <section
      id="features"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary to-primary-dark"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Card (replaced by "Why TatariNET") */}
          <div className="bg-white rounded-3xl p-8 shadow-lg animate-slideInLeft hover:shadow-2xl transition-all duration-300">
            <h2 className="text-3xl font-bold text-gray-700 mb-4">
              Why Work with TatariNET
            </h2>
            <p className="text-gray-700 mb-4">
              We do not just write  code we deliver complete digital products.
              From concept to launch, our engineers take full ownership,
              ensuring your web solutions are reliable, high-quality, and
              delivered on time.
            </p>

            <ul className="list-disc pl-5 text-sm text-slate-600 mb-6">
              <li>Build and launch web products efficiently</li>
              <li>Maintain long-term performance and scalability</li>
              <li>Focused on delivering results, not just features</li>
            </ul>

            <Link href="/contact" className="inline-block">
              <Button className="bg-primary hover:opacity-90 text-white focus-visible:ring-0 focus:outline-none transition-none active:scale-100">
                Get Started →
              </Button>
            </Link>
          </div>

          {/* Right Card */}
          <div className="bg-white rounded-3xl p-8 shadow-lg animate-slideInRight hover:shadow-2xl transition-all duration-300">
            <h2 className="text-3xl font-bold text-gray-700 mb-4">
              Consulting
            </h2>
            <p className="text-gray-600 mb-6">
              We're preparing a consulting program with practical advice on
              freelancing, finding clients, pricing, and running a successful
              client services business. This will include guides like how to win
              work on platforms such as Upwork, how to price projects, and how
              to build a reliable pipeline.
            </p>
            <Link href="/consulting" className="inline-block">
              <Button className="bg-primary hover:opacity-90 text-white focus-visible:ring-0 focus:outline-none transition-none active:scale-100">
                Join Consulting →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
