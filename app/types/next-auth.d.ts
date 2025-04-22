import 'next-auth';
import { DefaultSession } from 'next-auth';
import { Permission, Role } from '@prisma/client';

declare module 'next-auth' {
  interface User {
    // _id?: string;
    role?: string;
    userId?: string;
    number?: string;
    toPromote?: boolean;
    permission?: Permission[];
  }
  interface Session {
    user: {
      id?: string;
      role?: Role;
      userId?: string;
      number?: string;
      toPromote?: boolean;
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
    toPromote?: boolean;
    access_token?: string;
    refresh_token?: string;
  }
}
