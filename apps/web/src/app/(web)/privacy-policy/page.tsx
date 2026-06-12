import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Fano Real Estate privacy policy — how we collect, use, and protect your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="border-b border-border bg-zinc-50 py-12">
        <div className="container-site">
          <h1 className="text-4xl lg:text-5xl font-semibold [letter-spacing:-0.025em] text-[#1a1410]">
            Privacy Policy
          </h1>
          <p className="text-zinc-500 mt-3">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
        </div>
      </div>

      <div className="container-site max-w-3xl py-16">
        <div className="prose prose-zinc max-w-none prose-headings:font-semibold prose-headings:[letter-spacing:-0.02em]">
          <h2>Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you create an account, submit an inquiry, or communicate with our team. This may include your name, email address, phone number, and property preferences.
          </p>

          <h2>How We Use Your Information</h2>
          <p>
            We use the information we collect to provide, maintain, and improve our services, to respond to your inquiries, to send you updates about properties that match your criteria (where you have opted in), and to comply with legal obligations.
          </p>

          <h2>Information Sharing</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except to trusted third parties who assist us in operating our website and services, provided they agree to keep this information confidential.
          </p>

          <h2>Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2>Cookies</h2>
          <p>
            We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookie settings through your browser preferences.
          </p>

          <h2>Your Rights</h2>
          <p>
            Depending on your location, you may have rights regarding your personal data, including the right to access, correct, or delete your data. Contact us at privacy@fanorealestate.com to exercise these rights.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at:<br />
            <strong>Fano Real Estate</strong><br />
            123 Premium Avenue, New York, NY 10001<br />
            privacy@fanorealestate.com
          </p>
        </div>
      </div>
    </div>
  );
}
