import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { ContactForm } from "./_components/contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Fano Real Estate. We're ready to help you with your property needs.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="grid lg:grid-cols-2 min-h-[calc(100vh-80px)]">
        {/* Left — form */}
        <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-24 py-16">
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-400 mb-4">Contact Us</p>
          <h1 className="text-4xl lg:text-5xl font-semibold [letter-spacing:-0.025em] text-black mb-4">
            Get in Touch
          </h1>
          <p className="text-zinc-500 mb-10 leading-relaxed max-w-md">
            Whether you're buying, selling, or just exploring your options — our team is here to help.
          </p>

          <div className="space-y-6 mb-10">
            {[
              { icon: MapPin, text: "3404, 34th Floor, Churchill Tower, Business Bay, Dubai, UAE" },
              { icon: Phone, text: "+971 52 571 9164" },
              { icon: Mail, text: "info@fanoproperties.com" },
              { icon: Clock, text: "Mon–Fri 9am–6pm, Sat 10am–4pm" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-4 text-sm text-zinc-600">
                <div className="h-9 w-9 rounded-xl bg-zinc-100 flex items-center justify-center shrink-0">
                  <Icon className="h-4 w-4 text-zinc-500" />
                </div>
                <span>{text}</span>
              </div>
            ))}
          </div>

          <ContactForm />
        </div>

        {/* Right — image */}
        <div className="hidden lg:block relative">
          <Image
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000&auto=format"
            alt="Contact Fano"
            fill
            sizes="50vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>
      </div>
    </div>
  );
}
