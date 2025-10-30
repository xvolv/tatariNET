"use client";

import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Contact from ${name || "Website"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    // Open default mail client with prefilled subject/body
    window.location.href = `mailto:hello@tatarinet.com?subject=${subject}&body=${body}`;
  }

  return (
    <main className="min-h-screen bg-white py-5">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl font-bold mb-4">Contact TatariNET</h1>
        <p className="text-lg text-slate-700 mb-6">
          Want to work with our team or have questions? Send us a message and
          we'll get back to you.
        </p>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <label className="flex flex-col">
            <span className="text-sm font-medium text-slate-700">Name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-3 border rounded-md"
              placeholder="Your name"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-3 border rounded-md"
              placeholder="you@example.com"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-sm font-medium text-slate-700">Message</span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 p-3 border rounded-md min-h-[120px]"
              placeholder="Tell us about your project or question"
            />
          </label>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-md"
            >
              Send message
            </button>

            <a
              href="mailto:hello@tatarinet.com"
              className="text-sm text-slate-600 underline"
            >
              Or email hello@tatarinet.com
            </a>
          </div>
        </form>
      </div>
    </main>
  );
}
