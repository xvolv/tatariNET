"use client";

export default function Features() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary to-primary-dark">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Card (replaced by "Why TatariNET") */}
          <div className="bg-white rounded-3xl p-8 shadow-lg animate-slideInLeft hover:shadow-2xl transition-all duration-300">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why TatariNET
            </h2>
            <p className="text-gray-700 mb-4">
              Built for reliability, speed, and easy operations — TatariNET
              combines managed hosting, expert migrations, and developer
              training so you can ship faster and run with confidence.
            </p>
            <ul className="list-disc pl-5 text-sm text-slate-600 mb-6">
              <li>
                Production-grade infrastructure with built-in observability
              </li>
              <li>Zero-downtime migrations and expert support</li>
              <li>Training and runbooks so your team stays productive</li>
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
              Learn <span className="text-primary">TatariNET</span>, Cloud
              <br />
              and More in Amharic
            </h2>
            <p className="text-gray-600 mb-6">
              Advance your career with our premier batch training through
              expert-led sessions designed to help you unlock your full
              potential.
            </p>
            <button className="bg-primary hover:opacity-90 text-white font-semibold py-3 px-6 rounded-lg transition-all hover:scale-105">
              View Courses →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
