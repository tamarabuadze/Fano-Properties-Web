/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { type NextAuthResult, type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface User { role?: string }
  interface Session {
    user: { role: string } & DefaultSession["user"]
  }
}

const authConfig: Parameters<typeof NextAuth>[0] = {
  providers: [
    Credentials({
      credentials: {
        email:    { label: "Email",    type: "email"    },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Build list of admins from env — supports up to 5 pairs
        const admins: { email: string; hash: string }[] = [];
        for (let i = 1; i <= 5; i++) {
          const suffix = i === 1 ? "" : `${i}`;
          const email = process.env[`ADMIN${suffix}_EMAIL`];
          const hash  = process.env[`ADMIN${suffix}_PASSWORD_HASH`];
          // Tolerate stray spaces, quotes and \$ escapes from pasting into a settings panel
          if (email && hash) {
            admins.push({
              email: email.trim().toLowerCase(),
              hash: hash.trim().replace(/^["']|["']$/g, "").replace(/\\\$/g, "$"),
            });
          }
        }
        // Logs never include the password, the hash or the email that was typed
        if (admins.length === 0) {
          console.warn("[admin-login] failed: no admin configured (need ADMIN_EMAIL and ADMIN_PASSWORD_HASH)", {
            hasAdminEmail: !!process.env.ADMIN_EMAIL,
            hasPasswordHash: !!process.env.ADMIN_PASSWORD_HASH,
            hasAdminPasswordVar: !!process.env.ADMIN_PASSWORD,
          });
          return null;
        }

        const admin = admins.find(a => a.email === (credentials.email as string).trim().toLowerCase());
        if (!admin) {
          console.warn("[admin-login] failed: email does not match any configured admin", { configuredAdmins: admins.length });
          return null;
        }

        const valid = await bcrypt.compare(credentials.password as string, admin.hash);
        if (!valid) {
          console.warn("[admin-login] failed: password does not match the hash", {
            hashLength: admin.hash.length,
            hashFormatOk: /^\$2[aby]\$\d{2}\$.{53}$/.test(admin.hash),
          });
          return null;
        }
        return { id: admin.email, email: admin.email, role: "admin" } as any;
      },
    }),
  ],
  pages: { signIn: "/admin/login" },
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = (user as any).role;
      return token;
    },
    session({ session, token }) {
      session.user.role = (token.role as string) ?? "admin";
      return session;
    },
  },
  trustHost: true,
};

// Use NextAuthResult type to avoid "cannot be named" TS error
const result = NextAuth(authConfig) as NextAuthResult;
export const handlers = result.handlers;
export const signIn   = result.signIn   as NextAuthResult["signIn"];
export const signOut  = result.signOut  as NextAuthResult["signOut"];
export const auth     = result.auth as NextAuthResult["auth"];
