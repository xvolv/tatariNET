"use client";

import { useState } from "react";

export default function ContactPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fullName = `${firstName} ${lastName}`.trim();
    const subject = encodeURIComponent(`Contact from ${fullName || "Website"}`);
    const body = encodeURIComponent(
      `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`
    );
    // Open default mail client with prefilled subject/body
    window.location.href = `mailto:tattarinet@gmail.com?subject=${subject}&body=${body}`;
  }

  return (
    <main className="min-h-screen bg-white py-2">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-2 items-start">
          {/* Left: Contact Form */}
          <section aria-labelledby="contact-form-heading">
            <h2 id="contact-form-heading" className="text-3xl font-bold mb-2">
              Send us a message
            </h2>
            <p className="text-slate-600 mb-6">
              Have a question, complaint, or need help choosing a solution? Tell
              us briefly and we’ll respond as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex flex-col">
                  <span className="text-sm font-medium text-slate-700">
                    First Name
                  </span>
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mt-1 p-3 border rounded-md"
                    placeholder="First name"
                    required
                  />
                </label>

                <label className="flex flex-col">
                  <span className="text-sm font-medium text-slate-700">
                    Last Name
                  </span>
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="mt-1 p-3 border rounded-md"
                    placeholder="Last name"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex flex-col">
                  <span className="text-sm font-medium text-slate-700">
                    Email
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 p-3 border rounded-md"
                    placeholder="you@example.com"
                    required
                  />
                </label>
                <div>
                  <label className="flex flex-col">
                    <span className="text-sm font-medium text-slate-700">
                      Phone
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="mt-1 p-3 border rounded-md"
                      placeholder="phone number"
                    />
                  </label>
                </div>
              </div>

              <label className="flex flex-col">
                <span className="text-sm font-medium text-slate-700">
                  Message
                </span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1 p-3 border rounded-md min-h-[160px]"
                  placeholder="Write your message here"
                  required
                />
              </label>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center bg-slate-900 text-white px-6 py-3 rounded-md hover:bg-slate-800"
                >
                  Send a Message
                </button>
              </div>
            </form>
          </section>

          {/* Right: Contact Information Panel */}
          <aside aria-labelledby="contact-info-heading">
            <div className="p-6 rounded-lg bg-slate-50 border">
              <h3
                id="contact-info-heading"
                className="text-xl font-semibold mb-2"
              >
                Hi! We are always here to help you.
              </h3>
              <p className="text-slate-600 mb-6">
                Prefer to reach us directly? Use any of the options below — we
                monitor these channels and reply quickly.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <img src="/social/call.svg" alt="Call" className="w-6 h-6" />
                  <div>
                    <div className="text-sm font-medium">Hotline</div>
                    <a
                      className="text-sm text-slate-600"
                      href="tel:+251909146096"
                    >
                      +251909 146 096
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src="/social/whatsapp.svg"
                    alt="WhatsApp"
                    className="w-6 h-6"
                  />
                  <div>
                    <div className="text-sm font-medium">SMS / WhatsApp</div>
                    <a
                      className="text-sm text-slate-600"
                      href="https://wa.me/909146096"
                    >
                      909 146 096
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src="/social/email.svg"
                    alt="Email"
                    className="w-6 h-6"
                  />
                  <div>
                    <div className="text-sm font-medium">Email</div>
                    <a
                      className="text-sm text-slate-600"
                      href="mailto:tattarinet@gmail.com"
                    >
                      tattarinet@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t pt-4">
                <div className="text-sm font-medium text-slate-700 mb-2">
                  Follow us
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="https://t.me/tatari_net"
                    aria-label="Telegram"
                    className="hover:text-slate-900"
                  >
                    <img
                      src="/social/telegram.svg"
                      alt="Telegram"
                      className="w-6 h-6"
                    />
                  </a>

                  <a
                    href="https://www.linkedin.com/company/tatarinet/"
                    aria-label="LinkedIn"
                    className="hover:text-slate-900"
                  >
                    <img
                      src="/social/linkedin.svg"
                      alt="LinkedIn"
                      className="w-6 h-6"
                    />
                  </a>

                  <a
                    href="mailto:tattarinet@gmail.com"
                    aria-label="Email"
                    className="hover:text-slate-900"
                  >
                    <img
                      src="/social/email.svg"
                      alt="Email"
                      className="w-6 h-6"
                    />
                  </a>

                  <a
                    href="https://www.youtube.com/@Tatarinet"
                    aria-label="YouTube"
                    className="hover:text-slate-900"
                  >
                    <img
                      src="/social/youtbe.svg"
                      alt="YouTube"
                      className="w-6 h-6"
                    />
                  </a>

                  <a
                    href="https://www.tiktok.com/@tattarinet"
                    aria-label="TikTok"
                    className="hover:text-slate-900"
                  >
                    <img
                      src="/social/tiktok.svg"
                      alt="TikTok"
                      className="w-6 h-6"
                    />
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
