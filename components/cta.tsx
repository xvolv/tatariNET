"use client";

export default function CTA() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* single-column layout so content takes full width after image removal */}
        <div className="grid gap-8 md:grid-cols-1 items-start">
          <div className="max-w-3xl mx-auto">
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

            <h3 className="text-xl font-semibold mb-4">Our Principles</h3>

            <ul className="grid gap-4">
              <li className="p-4 rounded-lg shadow-sm bg-gradient-to-r from-sky-50 to-white border-l-4 border-sky-500">
                <div className="font-semibold text-sky-800">P — Precision</div>

                <div className="text-sm text-slate-600 mt-2">
                  We approach every project with clarity, discipline, and
                  attention to detail — small decisions add up to reliable
                  systems.
                </div>
              </li>

              <li className="p-4 rounded-lg shadow-sm bg-gradient-to-r from-sky-50 to-white border-l-4 border-sky-500">
                <div className="font-semibold text-sky-800">D — Delivery</div>

                <div className="text-sm text-slate-600 mt-2">
                  We take full ownership — from concept to launch — ensuring
                  projects are delivered on time and built to last.
                </div>
              </li>

              <li className="p-4 rounded-lg shadow-sm bg-linear-to-r from-sky-50 to-white border-l-4 border-sky-500">
                <div className="font-semibold text-sky-800">C — Craft</div>

                <div className="text-sm text-slate-600 mt-2">
                  We take pride in creating software that’s as dependable as it
                  is elegant — thoughtful UX and solid engineering, hand in
                  hand.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
