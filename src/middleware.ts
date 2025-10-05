// DoD/HIPAA Compliant Security Middleware with Clerk Authentication
// Implements security headers, CSP, access controls, and Clerk auth

import { NextRequest, NextResponse } from 'next/server'
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Define protected routes
const isProtectedRoute = createRouteMatcher([
  '/patient-portal(.*)',
  '/api/patient(.*)',
])

export default clerkMiddleware(async (auth, request: NextRequest) => {
  const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
  const userAgent = request.headers.get('user-agent') || 'unknown'
  const pathname = request.nextUrl.pathname

  try {
    // Protect routes that require authentication
    if (isProtectedRoute(request)) {
      console.log('Protected route detected:', pathname)
      await auth.protect({
        unauthenticatedUrl: '/sign-in'
      })
      console.log('Auth protection passed')
    }

    const response = NextResponse.next()

    // Apply security headers
    applySecurityHeaders(response)

    // Apply Content Security Policy
    applyCspHeaders(response)

    // Rate limiting
    if (await isRateLimited(clientIP)) {
      return new NextResponse('Too Many Requests', { status: 429 })
    }

    return response

  } catch (error) {
    console.error('Security middleware error:', error)
    return NextResponse.next()
  }
})

// Apply DoD/HIPAA required security headers
function applySecurityHeaders(response: NextResponse) {
  // Security headers for DoD/HIPAA compliance
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()')
  
  // HSTS for HTTPS
  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
  }
}

// Apply Content Security Policy
function applyCspHeaders(response: NextResponse) {
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.clerk.accounts.dev https://*.clerk.com",
    "style-src 'self' 'unsafe-inline' https://*.clerk.accounts.dev https://*.clerk.com",
    "img-src 'self' data: https: https://*.clerk.accounts.dev https://*.clerk.com",
    "font-src 'self' https://*.clerk.accounts.dev https://*.clerk.com",
    "connect-src 'self' https://*.clerk.accounts.dev https://*.clerk.com https://api.clerk.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self' https://*.clerk.accounts.dev https://*.clerk.com"
  ].join('; ')

  response.headers.set('Content-Security-Policy', csp)
}

// Rate limiting function
async function isRateLimited(ip: string): Promise<boolean> {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = 100

  const key = `rate_limit:${ip}`
  const current = rateLimitStore.get(key)

  if (!current) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs })
    return false
  }

  if (now > current.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs })
    return false
  }

  if (current.count >= maxRequests) {
    return true
  }

  current.count++
  return false
}


// Clean up expired rate limit entries
setInterval(() => {
  const now = Date.now()
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key)
    }
  }
}, 5 * 60 * 1000) // Clean up every 5 minutes

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}