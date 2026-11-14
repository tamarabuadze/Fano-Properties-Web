import type { Metadata } from "next";
import { buildPageMeta } from "@/lib/seo";

const title = "Privacy Policy";
const description = "Fano Properties privacy policy — how we collect, use, and protect your data.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy-policy" },
  ...buildPageMeta({ path: "/privacy-policy", title, description }),
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="page-band py-14 lg:py-20">
        <div className="container-site">
          <p className="lx-eyebrow mb-5">Legal</p>
          <h1 className="font-display text-[clamp(36px,4.6vw,56px)] font-normal leading-[1.02] tracking-[-0.01em] text-lx-text">
            Privacy policy
          </h1>
          <p className="mt-5 text-[13px] tracking-[0.04em] text-lx-text/55">Last updated: November 4, 2026</p>
        </div>
      </div>

      <div className="container-site max-w-3xl py-14 lg:py-20">
        <div className="prose prose-invert max-w-none prose-headings:font-display prose-headings:font-normal prose-headings:tracking-[-0.01em] prose-headings:text-lx-text prose-h2:text-[28px] prose-h2:mt-12 prose-h2:mb-4 prose-p:text-[15px] prose-p:leading-[1.85] prose-p:text-lx-text/80 prose-strong:text-lx-text prose-a:text-lx-gold">
          <h2>Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you submit an inquiry, use our ROI calculator, or communicate with our team. This may include your name, email address, phone number, and property preferences.
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

          <h2>Cookies, Analytics and Advertising</h2>
          <p>
            We use Google Analytics to understand how visitors use our website, and Google Ads to show our property advertisements and measure how they perform, for example when an inquiry is sent or a call or WhatsApp link is tapped. These services use cookies and similar technologies and may collect information such as your device, browser, approximate location and the pages you visit. Google processes this information under its own privacy policy, available at policies.google.com/privacy.
          </p>
          <p>
            Visitors in the European Economic Area, the United Kingdom and Switzerland are asked for consent before these cookies are used, and can decline. Anyone can control or delete cookies through their browser settings, and can manage personalised advertising at adssettings.google.com.
          </p>

          <h2>Your Rights</h2>
          <p>
            Depending on your location, you may have rights regarding your personal data, including the right to access, correct, or delete your data. Contact us at <a href="mailto:info@fanoproperties.com">info@fanoproperties.com</a> to exercise these rights.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at:<br />
            <strong>Fano Properties</strong><br />
            3404, 34th Floor, Churchill Executive Tower, Business Bay, Dubai, UAE<br />
            <a href="mailto:info@fanoproperties.com">info@fanoproperties.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}
