import type { Metadata } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: "Fano Admin",
    template: "%s | Fano Admin",
  },
  description: "Fano Real Estate administration dashboard",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-root">
      {children}
      <Toaster position="bottom-right" richColors />
    </div>
  );
}
