import 'next-auth';
import { DefaultSession } from 'next-auth';
import { PostedBy, Permission } from './types';

declare module 'next-auth' {
  interface User {
    // _id?: string;
    role?: string;
    userId?: string;
    number?: string;
    permission?: Permission[];
  }
  interface Session {
    user: {
      id?: string;
      role?: PostedBy;
      userId?: string;
      number?: string;
      access_token?: string;
      refresh_token?: string;
      permission?: Permission[];
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
