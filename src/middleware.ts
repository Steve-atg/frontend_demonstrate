import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const isProtectedRoute =
      pathname.startsWith('/admin-dashboard') ||
      pathname.startsWith('/user-dashboard');

    if (isProtectedRoute && !req.nextauth.token) {
      // Redirect to auth page with message parameter
      const url = new URL('/auth', req.url);
      url.searchParams.set('callbackUrl', pathname);
      url.searchParams.set('message', 'Please log in to access this page');
      return NextResponse.redirect(url);
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        return true;
      },
    },
  }
);

// Protect these routes with a safer pattern
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
