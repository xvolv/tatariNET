import React from "react";

export default function LearnMorePage() {
  return (
    <main className="min-h-screen bg-background text-foreground py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl font-bold mb-4">
          We are TatariNET — an engineering company that builds digital
          products.
        </h1>

        <p className="text-lg text-slate-800 mb-6">
          TatariNET is a team of engineers dedicated to transforming ideas into
          powerful web solutions. We handle everything — from design and
          development to deployment and ongoing support. Our goal is simple:
          deliver reliable, high-quality products that perform beautifully and
          launch on time.
        </p>

        <section className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Our Principles</h2>

          <div className="grid gap-4">
            <article className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-semibold">P — Precision</h3>
              <p className="text-sm text-slate-600 mt-1">
                We approach every project with clarity, discipline, and
                attention to detail.
              </p>
            </article>

            <article className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-semibold">D — Delivery</h3>
              <p className="text-sm text-slate-600 mt-1">
                We take full ownership — from concept to launch — ensuring
                projects are delivered on time and built to last.
              </p>
            </article>

            <article className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-semibold">C — Craft</h3>
              <p className="text-sm text-slate-600 mt-1">
                We take pride in creating software that’s as dependable as it is
                elegant.
              </p>
            </article>
          </div>
        </section>

        <div className="mt-8">
          <a
            href="/learn-more"
            className="inline-block bg-primary text-white px-4 py-2 rounded-md hover:opacity-90"
          >
            Learn More
          </a>
        </div>
      </div>
    </main>
  );
}
