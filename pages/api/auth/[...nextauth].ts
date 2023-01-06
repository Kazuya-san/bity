import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prisma";
import GoogleProvider from "next-auth/providers/google";

interface ProviderOptions {
  clientId: string;
  clientSecret: string;
}

export const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // GithubProvider({
    // clientId: process.env.GITHUB_ID,
    // clientSecret: process.env.GITHUB_SECRET,
    // } as GithubProviderOptions),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    } as ProviderOptions),
  ],
  callbacks: {
    session: async ({ session, user }: { session: any; user: any }) => {
      if (session?.user) {
        session.user.id = user.id ?? "";
        session.user.isAdmin = user.isAdmin ?? false;
      }
      return session;
    },
  },
  secret: process.env.JWT_SECRET,
};

export default NextAuth(options);
