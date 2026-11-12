import { toast } from "sonner";

// react-hook-form stays silent when validation fails; the error text sits under a
// field that may be far above the submit button, so the click looks ignored.
// This names the field in a toast and scrolls it into view.
export function reportInvalid(labels: Record<string, string> = {}) {
  return (errors: Record<string, { message?: string } | undefined>) => {
    const [field, err] = Object.entries(errors).find(([, e]) => e?.message) ?? [];
    if (!field) return;
    const label = labels[field] ?? field.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
    toast.error(`${label}: ${err?.message}`);
    const el = document.querySelector<HTMLElement>(`[name="${field}"]`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    el?.focus?.();
  };
}
