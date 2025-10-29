"use client";

import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-fadeInUp">
          All in one Network.
          <br />
          <span className="text-primary">Simple, powerful, affordable!</span>
        </h1>

        <p className="text-xl text-gray-600 mb-8 animate-fadeInUp stagger-1">
          Start with <span className="font-bold text-primary">TatariNET</span>,
          the world's leading
          <br />
          <span className="text-primary font-semibold">
            network infrastructure solution.
          </span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp stagger-2">
          <Button className="bg-primary hover:opacity-90 text-white px-8 py-6 text-lg transition-all hover:scale-105">
            Get Started Now →
          </Button>
          <Button
            variant="outline"
            className="border-2 border-primary text-primary hover:opacity-95 px-8 py-6 text-lg bg-transparent transition-all hover:scale-105"
          >
            TatariNET Trainings →
          </Button>
        </div>
      </div>
    </section>
  );
}
