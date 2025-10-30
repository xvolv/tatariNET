"use client";

export default function Features() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary to-primary-dark">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Card (replaced by "Why TatariNET") */}
          <div className="bg-white rounded-3xl p-8 shadow-lg animate-slideInLeft hover:shadow-2xl transition-all duration-300">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why partner with our developers
            </h2>
            <p className="text-gray-700 mb-4">
              We don't just deliver code — we join your team to ship web
              features, improve reliability, and transfer practical knowledge.
              Our engineers work alongside your product and engineering teams
              from design to production on client projects.
            </p>
            <ul className="list-disc pl-5 text-sm text-slate-600 mb-6">
              <li>Embed with your team to deliver production features</li>
              <li>Operational handoff, runbooks and long-term support</li>
              <li>Developer-focused tooling and integrations</li>
            </ul>
            <a
              href="/learn-more"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary hover:opacity-90 text-white font-semibold py-3 px-6 rounded-lg transition-all hover:scale-105"
            >
              Learn why →
            </a>
          </div>

          {/* Right Card */}
          <div className="bg-white rounded-3xl p-8 shadow-lg animate-slideInRight hover:shadow-2xl transition-all duration-300">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Consulting
            </h2>
            <p className="text-gray-600 mb-6">
              We're preparing a consulting program with practical advice on
              freelancing, finding clients, pricing, and running a successful
              client services business. This will include guides like how to win
              work on platforms such as Upwork, how to price projects, and how
              to build a reliable pipeline.
            </p>
            <a
              href="/consulting"
              className="bg-primary hover:opacity-90 text-white font-semibold py-3 px-6 rounded-lg transition-all hover:scale-105 inline-block"
            >
              join Consulting →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
