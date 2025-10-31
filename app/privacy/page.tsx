import React from "react";

export const metadata = {
  title: "Privacy & Policy - TatariNET",
  description:
    "Privacy policy for TatariNET — how we collect, use, and protect data.",
};

export default function PrivacyPage() {
  return (
    <main className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold mb-6">Privacy &amp; Policy</h1>

      <section className="prose prose-invert mb-6">
        <p>
          At TatariNET, we respect your privacy and are committed to protecting
          your personal information. This policy explains how we collect, use,
          disclose, and safeguard your information when you visit our website or
          engage with our services.
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          We may collect personal information you provide directly to us, such
          as your name, email address, phone number, and message when you use
          our contact forms. We also collect technical information automatically
          when you visit our site, such as IP address, browser type, pages
          visited, and referring URLs.
        </p>

        <h2>2. How We Use Your Information</h2>
        <p>
          We use the information to respond to inquiries, provide and improve
          our services, send administrative messages, and to comply with legal
          obligations. We may use aggregated or anonymized data for analytics
          and performance monitoring.
        </p>

        <h2>3. Cookies and Tracking</h2>
        <p>
          We may use cookies and similar tracking technologies to enhance your
          experience. You can control cookies through your browser settings.
          Note that disabling cookies may affect the functionality of the
          website.
        </p>

        <h2>4. Sharing and Disclosure</h2>
        <p>
          We do not sell your personal information. We may share data with
          trusted service providers who help us operate the website and provide
          services, and when required by law or to protect our rights.
        </p>

        <h2>5. Data Security</h2>
        <p>
          We take reasonable measures to protect your information, but no system
          is completely secure. If you suspect any misuse of your data, contact
          us at tattarinet@gmail.com.
        </p>

        <h2>6. Links to Other Sites</h2>
        <p>
          Our website may contain links to third-party sites. We are not
          responsible for the privacy practices of those sites and encourage you
          to review their policies.
        </p>

        <h2>7. Children's Privacy</h2>
        <p>
          Our services are not directed to children under 13, and we do not
          knowingly collect information from children.
        </p>

        <h2>8. Changes to This Policy</h2>
        <p>
          We may update this policy from time to time. We will post the updated
          policy on this page with a revised effective date.
        </p>

        <h2>9. Contact Us</h2>
        <p>
          If you have questions about this policy, email us at
          <a
            className="text-blue-400 hover:underline"
            href="mailto:tattarinet@gmail.com"
          >
            {" "}
            tattarinet@gmail.com
          </a>
          .
        </p>
      </section>
    </main>
  );
}
