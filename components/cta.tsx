"use client";

export default function CTA() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-primary-dark">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 animate-fadeInUp">
          Ready to Transform Your Business?
        </h2>
        <p
          className="text-xl text-primary mb-8 animate-fadeInUp"
          style={{ animationDelay: "0.1s" }}
        >
          Join thousands of companies already using TatariNET to power their
          infrastructure
        </p>
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp"
          style={{ animationDelay: "0.2s" }}
        >
          <button className="bg-white text-primary hover:opacity-95 font-bold py-4 px-8 rounded-lg transition-all hover:scale-105 text-lg">
            Start Free Trial
          </button>
          <button className="border-2 border-white text-white hover:bg-white hover:text-primary font-bold py-4 px-8 rounded-lg transition-all hover:scale-105 text-lg">
            Schedule a Demo
          </button>
        </div>
      </div>
    </section>
  );
}
