import type { Metadata } from "next";
import { FanoLogo, LOGO_COLORS } from "@/components/shared/fano-logo";
import { LoginForm } from "./_components/login-form";

export const metadata: Metadata = { title: "Sign In — Fano Admin" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <FanoLogo color={LOGO_COLORS.bronze} className="h-12" />
          </div>
          <h1 className="font-display text-[32px] font-normal leading-tight text-foreground">
            Admin sign in
          </h1>
          <p className="text-muted-foreground text-sm mt-2">
            Sign in to access the Fano dashboard
          </p>
        </div>

        {params.error === "unauthorized" && (
          <div className="mb-4 p-3 rounded-[4px] bg-[#F6E3DF] border border-[#E9C6BF] text-sm text-[#8A3B2E]">
            You don&apos;t have admin access.
          </div>
        )}

        <LoginForm />
      </div>
    </div>
  );
}
