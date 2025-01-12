import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret });

  if (token) {
    return NextResponse.next();
  }

  const loginUrl = new URL('/auth/login', req.url);
  loginUrl.searchParams.set('callbackUrl', encodeURIComponent(req.url));
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/list/:path*'],
};
