import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const token = (await getToken({ req, secret })) as unknown as {
    role: string;
    permission: string[];
  };

  if (!token) {
    const loginUrl = new URL('/auth/login', req.url);
    loginUrl.searchParams.set('callbackUrl', encodeURIComponent(req.url));
    return NextResponse.redirect(loginUrl);
  }

  const requestedPath = req.nextUrl.pathname.split('/')[2];
  const permission = token.permission.includes(requestedPath);
  if (req.nextUrl.pathname.startsWith('/list/') && !permission) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/list/:path*'],
};
