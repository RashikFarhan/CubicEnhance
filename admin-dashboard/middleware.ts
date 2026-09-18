// middleware.ts - Next.js Edge Middleware
// Protects all /admin routes; redirects unauthenticated users to /auth/login

import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public routes and auth API routes
  if (pathname.startsWith('/auth')) return NextResponse.next();
  if (pathname.startsWith('/api/auth')) return NextResponse.next();
  if (pathname.startsWith('/api/public')) return NextResponse.next();

  // Check session cookie
  const sessionCookie = req.cookies.get('cubicenhance_admin_session')?.value;

  if (!sessionCookie) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = '/auth/login';
    if (pathname !== '/') {
      loginUrl.searchParams.set('redirect', pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  // The full token verification happens in Server Components / API routes
  // Middleware just checks cookie presence for the redirect UX
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
