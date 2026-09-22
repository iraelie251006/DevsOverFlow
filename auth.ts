import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { api } from "./lib/api";
import { SignInSchema } from "./lib/validations";

import dbConnect from "@/lib/mongoose";
import Account from "@/database/account.model";
import User from "@/database/user.model";


export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    GitHub,
    Google,
    Credentials({
      async authorize(credentials) {
        const validatedFields = SignInSchema.safeParse(credentials);
        if (!validatedFields.success) return null;

        const { email, password } = validatedFields.data;

        await dbConnect();

        // For credentials, providerAccountId is stored as email
        const existingAccount = await Account.findOne({
          provider: "credentials",
          providerAccountId: email,
        });
        if (!existingAccount) return null;

        const existingUser = await User.findById(existingAccount.userId);
        if (!existingUser) return null;

        const isValid = await bcrypt.compare(password, existingAccount.password!);
        if (!isValid) return null;

        return {
          id: existingUser._id.toString(),
          name: existingUser.name,
          email: existingUser.email,
          image: existingUser.image,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, profile, account }) {
      if (account?.type === "credentials") return true;
      if (!account || !user) return false;

      const userInfo = {
        name: user.name!,
        email: user.email!,
        image: user.image!,
        username:
          account.provider === "github"
            ? (profile?.login as string)
            : (user.name?.toLowerCase() as string),
      };

      const { success } = (await api.auth.oAuthSignIn({
        user: userInfo,
        provider: account.provider as "github" | "google",
        providerAccountId: account.providerAccountId,
      })) as ActionResponse;

      return success ? true : false;
    },

    async jwt({ token, account }) {
      if (account) {
        await dbConnect();

        // Query DB directly — no fetch
        const existingAccount = await Account.findOne({
          providerAccountId:
            account.type === "credentials"
              ? token.email!
              : account.providerAccountId,
        });

        if (existingAccount?.userId) {
          token.sub = existingAccount.userId.toString();
        }
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.sub as string;
      return session;
    },
  },
});
