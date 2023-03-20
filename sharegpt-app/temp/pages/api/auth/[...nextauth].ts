import NextAuth, { NextAuthOptions } from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import { TwitterLegacyProfile } from "next-auth/providers/twitter";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          username: profile.name.replace(/\s/g, "").toLowerCase(),
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
      profile(profile: TwitterLegacyProfile) {
        return {
          id: profile.id_str,
          name: profile.name,
          username: profile.screen_name,
          twitter: profile.screen_name,
          // @ts-ignore
          email: profile.email && profile.email != "" ? profile.email : null,
          image: profile.profile_image_url_https.replace(
            /_normal\.(jpg|png|gif)$/,
            ".$1"
          ),
        };
      },
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    async session({ session, user }) {
      // @ts-ignore
      session.user.id = user.id;
      // @ts-ignore
      session.user.username = user.username;
      return session;
    },
  },
};

export default NextAuth(authOptions);
