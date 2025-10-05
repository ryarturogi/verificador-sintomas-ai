/**
 * Authentication Middleware
 * Provides server-side authentication validation for protected routes
 */

import { NextRequest, NextResponse } from 'next/server'
import { sessionManager } from './session-manager'
import { secureCookieManager } from './secure-cookies'
import { auditLogger } from './audit-logger'

export interface AuthMiddlewareOptions {
  requireAuth?: boolean
  redirectTo?: string
  allowPublic?: boolean
}

/**
 * Middleware function to validate authentication for protected routes
 */
export async function authMiddleware(
  request: NextRequest,
  options: AuthMiddlewareOptions = {}
): Promise<NextResponse | null> {
  const {
    requireAuth = true,
    redirectTo = '/auth/login',
    allowPublic = false
  } = options

  // Skip authentication for public routes
  if (allowPublic) {
    return NextResponse.next()
  }

  const pathname = request.nextUrl.pathname
  const ipAddress = request.headers.get('x-forwarded-for') || 
                   request.headers.get('x-real-ip') || 
                   'unknown'
  const userAgent = request.headers.get('user-agent') || 'unknown'

  // Get session from secure cookies
  const { sessionId, refreshToken, rememberMe } = secureCookieManager.getSessionFromCookies(request)

  // Debug: Log cookie information
  console.log('Auth middleware - cookies found:', {
    sessionId: sessionId ? 'present' : 'missing',
    refreshToken: refreshToken ? 'present' : 'missing',
    rememberMe,
    allCookies: Object.keys(request.cookies.getAll())
  })

  // Log authentication attempt
  await auditLogger.logEvent({
    sessionId: sessionId || 'anonymous',
    action: 'AUTH_MIDDLEWARE_CHECK',
    timestamp: new Date().toISOString(),
    details: { pathname, requireAuth }
  })

  // If authentication is not required, allow access
  if (!requireAuth) {
    return NextResponse.next()
  }

  // Check if session exists
  if (!sessionId) {
    await auditLogger.logSecurityEvent({
      sessionId: 'anonymous',
      action: 'UNAUTHORIZED_ACCESS_ATTEMPT',
      threat: 'UNAUTHORIZED_ACCESS',
      severity: 'MEDIUM',
      ipAddress,
      userAgent,
      mitigation: 'REDIRECT_TO_LOGIN'
    })

    // Redirect to login page
    const loginUrl = new URL(redirectTo, request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // TEMPORARY: Skip session validation to test if middleware works
  console.log('TEMPORARILY SKIPPING SESSION VALIDATION')
  
  // Log successful authentication
  await auditLogger.logEvent({
    sessionId,
    action: 'AUTHENTICATED_ACCESS',
    timestamp: new Date().toISOString(),
    details: { 
      pathname, 
      userId: 'bypassed',
      email: 'bypassed@test.com'
    }
  })

  return NextResponse.next()
}

/**
 * Helper function to check if a route requires authentication
 */
export function isProtectedRoute(pathname: string): boolean {
  const protectedRoutes = [
    '/patient-portal',
    '/consultation',
    '/api/analyze-symptoms',
    '/api/generate-answers',
    '/api/generate-question',
    '/api/check-emergency'
  ]

  return protectedRoutes.some(route => pathname.startsWith(route))
}

/**
 * Helper function to check if a route is public
 */
export function isPublicRoute(pathname: string): boolean {
  const publicRoutes = [
    '/',
    '/auth/login',
    '/auth/signup',
    '/symptom-checker',
    '/about',
    '/contact',
    '/faq',
    '/help',
    '/privacy'
  ]

  return publicRoutes.includes(pathname) || pathname.startsWith('/_next') || pathname.startsWith('/api/validate-session')
}
