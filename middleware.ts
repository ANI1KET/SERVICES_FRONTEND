import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  console.log('object');
  const token = await getToken({ req, secret });

  if (!token) {
    const loginUrl = new URL('/auth/login', req.url);
    loginUrl.searchParams.set('callbackUrl', encodeURIComponent(req.url));
    return NextResponse.redirect(loginUrl);
  }

  if (req.nextUrl.pathname.startsWith('/list/room') && token.role === 'USER') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/list/:path*'],
};
