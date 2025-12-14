import { config } from "@/config/config";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        device_name: { label: "Device Name", type: "text" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${config.apiBaseUrl}/admin-login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.message || "Login failed");
          }

          return data;
        } catch (error) {
          throw new Error(error.message || "Internal Server Error");
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  secret: config.authSecret,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.data.token;
        token.user = user.data.user;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
