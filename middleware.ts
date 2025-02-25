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
  let hasPermission = token.permission.includes(requestedPath);
  if (req.nextUrl.pathname.startsWith('/list') && !hasPermission) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  hasPermission = token.role.toLowerCase() === requestedPath;
  if (req.nextUrl.pathname.startsWith('/dashboard') && !hasPermission) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  const path = req.nextUrl.pathname.split('/')[3];
  if (path && !token.permission.includes(path)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/list/:path*', '/dashboard/:path*'],
};
