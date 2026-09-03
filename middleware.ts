import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { rateLimit } from '@/lib/rate-limit'
import { securityHeaders } from '@/lib/security-headers'

const protectedRoutes = ['/admin', '/account']
const authRoutes = ['/auth']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionId = request.cookies.get('itshopping_session')?.value

  // Check if route is protected
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route))

  if (isProtected && !sessionId) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    url.searchParams.set('login', 'true')
    return NextResponse.redirect(url)
  }

  // Rate limiting
  const rateLimitResponse = rateLimit(request)
  if (rateLimitResponse) {
    return rateLimitResponse
  }

  // Apply security headers
  const response = NextResponse.next()
  return securityHeaders(response)
}

export const config = {
  matcher: ['/admin/:path*', '/account/:path*', '/api/:path*'],
}
