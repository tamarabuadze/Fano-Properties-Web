import type { Metadata } from "next";
import Image from "next/image";
import { LoginForm } from "./_components/login-form";

export const metadata: Metadata = { title: "Sign In — Fano Admin" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Image
              src="/logo-dark.png"
              alt="Fano Properties"
              width={180}
              height={58}
              className="h-12 w-auto object-contain"
              priority
            />
          </div>
          <h1 className="text-2xl font-semibold text-foreground [letter-spacing:-0.02em]">
            Admin Sign In
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Sign in to access the Fano dashboard
          </p>
        </div>

        {params.error === "unauthorized" && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-700">
            You don&apos;t have admin access.
          </div>
        )}

        <LoginForm />
      </div>
    </div>
  );
}
