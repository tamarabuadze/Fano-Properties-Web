import type { Metadata } from "next";
import WebNotFound from "./(web)/not-found";
import { WhatsAppFloat } from "@/components/shared/whatsapp-float";

export const metadata: Metadata = { title: "Page Not Found" };

// Addresses that match no route land here, outside the site layout: show the branded 404 page,
// with the WhatsApp button that every other page has
export default function NotFound() {
  return (
    <>
      <WebNotFound />
      <WhatsAppFloat />
    </>
  );
}
