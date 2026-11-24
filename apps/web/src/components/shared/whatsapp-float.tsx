// Round WhatsApp button fixed to the corner of every page, the same one the Fano team app's
// landing pages use: WhatsApp green with a soft pulse, and a "Chat on WhatsApp" label on computers.
// It sits above the "List Your Property" button. Taps count as whatsapp_click conversions (google-tag.tsx).
const WA_URL =
  "https://wa.me/971525719164?text=" +
  encodeURIComponent("Hello Fano Properties, I'm interested in a property. Please send me more details.");

export function WhatsAppFloat() {
  return (
    <a href={WA_URL} target="_blank" rel="noopener noreferrer" aria-label="Chat with Fano Properties on WhatsApp" className="wa-float">
      <span className="wa-float-lbl">Chat on WhatsApp</span>
      <span className="wa-float-dot">
        <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="#fff"
            d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3z"
          />
        </svg>
      </span>
    </a>
  );
}
