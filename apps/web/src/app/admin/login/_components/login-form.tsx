"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!result || result.error) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    window.location.href = "/admin/dashboard";
  }

  const inputCls =
    "w-full h-12 px-4 rounded-[3px] border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-[#E2A862]/25 focus:border-[#E2A862] transition-all";

  return (
    <form onSubmit={handleSubmit} className="bg-card rounded-[4px] border border-border p-6 space-y-4">
      {error && (
        <div className="p-3 rounded-[4px] bg-[#F6E3DF] border border-[#E9C6BF] text-sm text-[#8A3B2E]">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@example.com"
          required
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          className={inputCls}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-gold w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Signing in…" : "Sign In"}
      </button>
    </form>
  );
}
