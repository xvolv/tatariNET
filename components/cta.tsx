"use client";

export default function CTA() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              We are TatariNET — an engineering company that builds digital
              products.
            </h2>

            <p className="text-lg text-slate-600 mb-6">
              TatariNET is a team of engineers dedicated to transforming ideas
              into powerful web solutions. We handle everything — from design
              and development to deployment and ongoing support. Our goal is
              simple: deliver reliable, high-quality products that perform
              beautifully and launch on time.
            </p>

            <h3 className="text-xl font-semibold mb-3">Our Principles</h3>

            <ul className="grid gap-4">
              <li className="p-4 bg-white rounded-lg shadow">
                <div className="font-semibold">P — Precision</div>
                <div className="text-sm text-slate-600 mt-1">
                  We approach every project with clarity, discipline, and
                  attention to detail.
                </div>
              </li>

              <li className="p-4 bg-white rounded-lg shadow">
                <div className="font-semibold">D — Delivery</div>
                <div className="text-sm text-slate-600 mt-1">
                  We take full ownership — from concept to launch — ensuring
                  projects are delivered on time and built to last.
                </div>
              </li>

              <li className="p-4 bg-white rounded-lg shadow">
                <div className="font-semibold">C — Craft</div>
                <div className="text-sm text-slate-600 mt-1">
                  We take pride in creating software that’s as dependable as it
                  is elegant.
                </div>
              </li>
            </ul>

            <div className="mt-6">
              <a
                href="/learn-more"
                className="inline-block bg-primary text-white py-2 px-4 rounded-md font-medium"
              >
                Learn More
              </a>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <div className="w-full h-64 bg-slate-50 rounded-lg border flex items-center justify-center">
              <svg
                width="220"
                height="140"
                viewBox="0 0 220 140"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="220" height="140" rx="12" fill="#f8fafc" />
                <text
                  x="50%"
                  y="50%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="14"
                >
                  About image
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
