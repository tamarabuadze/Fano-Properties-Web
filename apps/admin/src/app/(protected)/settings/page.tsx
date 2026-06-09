import type { Metadata } from "next";
import { getSettings } from "./_actions";
import { SettingsForm } from "./_components/settings-form";

export const metadata: Metadata = { title: "Settings" };

export default async function SettingsPage() {
  const settings = await getSettings();

  return (
    <div className="p-6 lg:p-8 max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground [letter-spacing:-0.02em]">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage your site-wide configuration and contact details.
        </p>
      </div>

      <SettingsForm defaultValues={settings} />
    </div>
  );
}
