import NextAuth, { type NextAuthResult, type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface User { role?: string }
  interface Session {
    user: { role: string } & DefaultSession["user"]
  }
}

const result: NextAuthResult = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminHash = process.env.ADMIN_PASSWORD_HASH;
        if (!adminEmail || !adminHash) return null;
        if (!credentials?.email || !credentials?.password) return null;
        if (credentials.email !== adminEmail) return null;

        const valid = await bcrypt.compare(credentials.password as string, adminHash);
        if (!valid) return null;

        return { id: "admin", email: adminEmail, role: "admin" };
      },
    }),
  ],
  pages: { signIn: "/login" },
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = (user as { role?: string }).role;
      return token;
    },
    session({ session, token }) {
      session.user.role = (token.role as string) ?? "admin";
      return session;
    },
  },
});

export const { handlers, signIn, signOut, auth } = result;
