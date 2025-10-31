import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Header from "@/components/header";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TatariNET",
  description: "TatariNET Engineering Digital Excellence",
  generator: "TatariNET",
  icons: {
    // Use the generated favicon set in public/favicons/favicon_io
    icon: [
      {
        url: "/favicons/favicon_io/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicons/favicon_io/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    shortcut: "/favicons/favicon_io/favicon.ico",
    apple: "/favicons/favicon_io/apple-touch-icon.png",
    other: [
      { rel: "manifest", url: "/favicons/favicon_io/site.webmanifest" },
      {
        rel: "android-chrome-192x192",
        url: "/favicons/favicon_io/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/favicons/favicon_io/android-chrome-512x512.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <Header />
        <div className="pt-28">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
