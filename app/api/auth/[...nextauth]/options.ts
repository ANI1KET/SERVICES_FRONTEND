import bcrypt from 'bcryptjs';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

import prisma from '@/prisma/prismaClient';
import { Permission, Role } from '@prisma/client';

const isProd = process.env.NODE_ENV === 'production';
export const authOptions: NextAuthOptions = {
  // pages: {
  //   signIn: '/login',
  // },
  cookies: {
    sessionToken: {
      name: isProd
        ? '__Secure-next-auth.session-token'
        : 'next-auth.session-token',
      options: {
        path: '/',
        httpOnly: true,
        secure: isProd,
        sameSite: 'lax',
        ...(isProd && { domain: '.aniketrouniyar.com.np' }),
      },
    },
    // callbackUrl: {
    //   name: isProd
    //     ? '__Secure-next-auth.callback-url'
    //     : 'next-auth.callback-url',
    //   options: {
    //     sameSite: 'lax',
    //     path: '/',
    //     secure: isProd,
    //     ...(isProd && { domain: '.aniketrouniyar.com.np' }),
    //   },
    // },
    csrfToken: {
      name: isProd ? '__Host-next-auth.csrf-token' : 'next-auth.csrf-token',
      options: {
        path: '/',
        secure: isProd,
        httpOnly: false,
        sameSite: 'lax',
      },
    },
  },
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
            throw new Error('User not found, Create your account.');
          }

          if (!user.password) {
            throw new Error('Password is not Created');
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isPasswordCorrect) {
            const { id, email, name, number, role, permission, promoting } =
              user;

            return {
              id,
              name,
              role,
              email,
              promoting,
              permission,
              number: number ?? undefined,
            };
          }

          throw new Error('Incoorect Email or Password');
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
          user.promoting = userDetails.promoting;
          user.permission = userDetails.permission;
          user.number = userDetails.number as string;

          return true;
        } catch (error) {
          console.error('Error signing in user:', error);
          return false;
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
        token.promoting = user.promoting;
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
      session.user.role = token.role as Role;
      session.user.id = token.id as string | undefined;
      session.user.number = token.number as string | undefined;
      session.user.userId = token.userId as string | undefined;
      session.user.promoting = token.promoting as Permission[] | [];
      session.user.permission = token.permission as Permission[] | [];
      // session.user.refresh_token = token?.refresh_token;
      // session.user.access_token = token?.access_token;

      return session;
    },
  },
};
