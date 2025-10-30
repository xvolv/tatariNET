"use client";

// Using SVGs from public/social for colored social icons

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">TatariNET</h3>
            <p className="text-gray-400 text-sm">
              Leading network infrastructure solutions for modern businesses.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Security
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <div className="flex items-center justify-center gap-6 mb-4">
            <a
              href="https://t.me/tatari_net"
              aria-label="Telegram"
              className="hover:text-white"
            >
              <img
                src="/social/telegram.svg"
                alt="Telegram"
                className="w-5 h-5"
                loading="lazy"
              />
            </a>

            <a
              href="https://www.linkedin.com/company/tatarinet/"
              aria-label="LinkedIn"
              className="hover:text-white"
            >
              <img
                src="/social/linkedin.svg"
                alt="LinkedIn"
                className="w-5 h-5"
                loading="lazy"
              />
            </a>

            <a
              href="mailto:tattarinet@gmail.com"
              aria-label="Email"
              className="hover:text-white"
            >
              <img
                src="/social/email.svg"
                alt="Email"
                className="w-5 h-5"
                loading="lazy"
              />
            </a>

            <a
              href="https://www.youtube.com/@Tatarinet"
              aria-label="YouTube"
              className="hover:text-white"
            >
              {/* filename in public/social is 'youtbe.svg' — keep exact name */}
              <img
                src="/social/youtbe.svg"
                alt="YouTube"
                className="w-5 h-5"
                loading="lazy"
              />
            </a>

            <a
              href="https://www.tiktok.com/@tattarinet"
              aria-label="TikTok"
              className="hover:text-white"
            >
              <img
                src="/social/tiktok.svg"
                alt="TikTok"
                className="w-5 h-5"
                loading="lazy"
              />
            </a>
          </div>

          <p>&copy; 2025 TatariNET. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
