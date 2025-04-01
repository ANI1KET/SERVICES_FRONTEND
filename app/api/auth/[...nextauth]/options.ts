import bcrypt from 'bcryptjs';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

import prisma from '@/prisma/prismaClient';
import { Permission } from '@prisma/client';
import { PostedBy } from '@/app/types/types';

export const authOptions: NextAuthOptions = {
  // pages: {
  //   signIn: '/login',
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
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours for session expiry (cookie will follow this setting)
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours maxAge for JWT specifically
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      // authorization: {
      //   params: {
      //     scope:
      //       // "openid profile email https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/youtube.upload",
      //       'openid profile email https://www.googleapis.com/auth/drive.file',
      //     access_type: 'offline',
      //     prompt: 'consent',
      //   },
      // },
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Email' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
      },
      // async authorize(credentials, req) {
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error('Enter the Credentials');
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) {
            throw new Error('No user found with this email');
          }

          if (!user.password) {
            throw new Error('Password is not Created');
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isPasswordCorrect) {
            const { id, email, name, number, role, permission } = user;

            return {
              id,
              name,
              role,
              email,
              permission,
              number: number ?? undefined,
            };
          } else {
            throw new Error('Incoorect Email or Password');
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
          throw new Error('An unknown error occurred');
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, user }) {
      if (account?.provider === 'google') {
        try {
          // Use `upsert` to handle creation or no action if user exists
          const userDetails = await prisma.user.upsert({
            where: { email: user.email as string },
            update: {},
            create: {
              image: user.image,
              name: user.name as string,
              email: user.email as string,
            },
          });
          user.role = userDetails.role;
          user.userId = userDetails.id;
          user.permission = userDetails.permission as Permission[];

          return true;
        } catch (error) {
          console.error('Error signing in user:', error);
          return false; // Return `false` on validation or database error
        }
      }

      return true;
    },
    // async redirect({ baseUrl, url }) {
    //   console.log('! ', url);
    //   const callbackUrl = new URLSearchParams(url).get('callbackUrl');
    //   console.log('!! ', callbackUrl);
    //   const redirectUrl = callbackUrl
    //     ? decodeURIComponent(callbackUrl)
    //     : baseUrl;
    //   console.log('!!! ', redirectUrl);

    //   return redirectUrl;
    // },
    async jwt({ user, token, trigger, session }) {
      if (user) {
        token.id = user.id?.toString();
        token.name = user.name;
        token.role = user.role;
        token.email = user.email;
        token.userId = user.userId;
        token.number = user.number;
        token.permission = user.permission;

        // if (account?.provider === 'google') {
        //   token.refresh_token = account.refresh_token;
        //   token.access_token = account.access_token;
        // }
      }

      if (trigger === 'update') {
        return { ...token, ...session.user };
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string | undefined;
      session.user.number = token.number as string | undefined;
      session.user.role = token.role as PostedBy;
      session.user.userId = token.userId as string | undefined;
      session.user.permission = token.permission as Permission[] | [];
      // session.user.refresh_token = token?.refresh_token;
      // session.user.access_token = token?.access_token;

      return session;
    },
  },
};
