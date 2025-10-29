import React from "react";

export default function LearnMorePage() {
  return (
    <main className="min-h-screen bg-background text-foreground py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl font-bold mb-4">Learn more about TatariNET</h1>
        <p className="text-lg text-slate-800 mb-6">
          TatariNET helps startups and teams get production-ready infrastructure
          with minimal friction. We provide managed hosting, expert migrations,
          and training so your applications run fast and stay reliable.
        </p>

        <section className="grid gap-6">
          <article className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-2">Managed Hosting</h2>
            <p className="text-sm text-slate-600">
              Our managed hosting takes care of scaling, backups, and monitoring
              so your team can focus on product development.
            </p>
          </article>

          <article className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-2">
              Migrations & Reliability
            </h2>
            <p className="text-sm text-slate-600">
              We plan and execute migrations with zero downtime and implement
              robust observability to reduce incident toil.
            </p>
          </article>

          <article className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-2">Training & Support</h2>
            <p className="text-sm text-slate-600">
              Onboarding, runbooks, and hands-on training to get your engineers
              productive with production practices quickly.
            </p>
          </article>
        </section>

        <div className="mt-8">
          <a
            href="#"
            className="inline-block bg-primary text-white px-4 py-2 rounded-md hover:opacity-90"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact Sales
          </a>
        </div>
      </div>
    </main>
  );
}
