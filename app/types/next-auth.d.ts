import 'next-auth';
import { DefaultSession } from 'next-auth';
import { Permission, Role } from '@prisma/client';

declare module 'next-auth' {
  interface User {
    // _id?: string;
    role?: string;
    userId?: string;
    number?: string;
    promoting?: Permission[];
    permission?: Permission[];
  }
  interface Session {
    user: {
      id?: string;
      role?: Role;
      userId?: string;
      number?: string;
      access_token?: string;
      refresh_token?: string;
      promoting?: Permission[];
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
