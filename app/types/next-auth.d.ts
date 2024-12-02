import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    // _id?: string;
    number?: string;
    role?: string;
  }
  interface Session {
    user: {
      id?: string;
      number?: string;
      role?: string;
      refresh_token?: string;
      access_token?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    access_token?: string;
    refresh_token?: string;
  }
}
