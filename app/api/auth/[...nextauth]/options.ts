import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/prisma/prismaClient";

const accessTokenSecret = process.env.ACCESS_TOKEN_JWT_SECRET;

export const authOptions: NextAuthOptions = {
  // pages: {
  //   signIn: "/login",
  // },
  // cookies: {
  //   sessionToken: {
  //     name: `__Secure-next-auth.session-token`,
  //     options: {
  //       httpOnly: true,
  //       sameSite: "lax",
  //       path: "/",
  //       secure: process.env.NODE_ENV === "production",
  //       maxAge: 24 * 60 * 60, // Adjust cookie max age here
  //     },
  //   },
  // },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours for session expiry (cookie will follow this setting)
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours maxAge for JWT specifically
  },
  providers: [
    CredentialsProvider({
      id: "Credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      // async authorize(credentials, req) {
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Enter the Credentials");
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) {
            throw new Error("No user found with this email");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!accessTokenSecret) {
            throw new Error(
              "ACCESS_TOKEN_JWT_SECRET is not defined in the environment variables."
            );
          }

          if (isPasswordCorrect) {
            const { id, email, name, number, role } = user;

            return {
              id,
              email,
              name,
              number,
              role,
            };
          } else {
            throw new Error("Incoorect Email or Password");
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
          throw new Error("An unknown error occurred");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.id = user.id?.toString();
        token.email = user.email;
        token.name = user.name;
        token.number = user.number;
        token.role = user.role;
      }
      console.log(token);

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string | undefined;
      session.user.number = token.number as string | undefined;
      session.user.role = token.role as string | undefined;

      return session;
    },
  },
};
