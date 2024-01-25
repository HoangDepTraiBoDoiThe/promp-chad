import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import { connectToDatabase } from "@ultils/Database";
import user from "@models/user";
import nextAuth from "next-auth";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async session({ session }) {
      // Check if user is already exit.
      const sessionUser = await user.findOne({
        email: session.user.email,
      });

      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDatabase();
        // Check if user is already exit.
        const exitingUser = await user.findOne({
          email: profile.email,
        });
        if (!exitingUser) {
          user.create({
            email: profile.email,
            name: profile.name,
            password: profile.password,
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
      // If not, create a new one.
    },
  },
});

export { handler as GET, handler as POST };
