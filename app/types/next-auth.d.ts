import 'next-auth';
import { DefaultSession } from 'next-auth';
import { PostedBy } from './types';

declare module 'next-auth' {
  interface User {
    // _id?: string;
    role?: string;
    userId?: string;
    number?: string;
  }
  interface Session {
    user: {
      id?: string;
      role?: PostedBy;
      userId?: string;
      number?: string;
      refresh_token?: string;
      access_token?: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    userId?: string;
    access_token?: string;
    refresh_token?: string;
  }
}
