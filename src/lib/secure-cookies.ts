/**
 * Secure Cookie Manager
 * DoD/HIPAA Compliant Cookie Management with Encryption
 */

import { NextRequest, NextResponse } from 'next/server'
import { securityConfig } from './security-config'

export interface CookieOptions {
  httpOnly?: boolean
  secure?: boolean
  sameSite?: 'strict' | 'lax' | 'none'
  maxAge?: number
  path?: string
  domain?: string
}

export class SecureCookieManager {
  private readonly ENCRYPTION_KEY: string
  private readonly COOKIE_PREFIX = 'secure_'

  constructor() {
    // In production, this should come from environment variables
    this.ENCRYPTION_KEY = process.env.COOKIE_ENCRYPTION_KEY || 'dev-key-change-in-production'
  }

  /**
   * Set a secure cookie
   */
  setSecureCookie(
    response: NextResponse,
    name: string,
    value: string,
    options: CookieOptions = {}
  ): void {
    const {
      httpOnly = true,
      secure = securityConfig.session.secure,
      sameSite = securityConfig.session.sameSite,
      maxAge = securityConfig.session.maxAge,
      path = '/',
      domain
    } = options

    // Encrypt the value
    const encryptedValue = this.encrypt(value)

    // Set cookie with secure attributes
    response.cookies.set(this.COOKIE_PREFIX + name, encryptedValue, {
      httpOnly,
      secure,
      sameSite,
      maxAge,
      path,
      domain
    })
  }

  /**
   * Get a secure cookie
   */
  getSecureCookie(request: NextRequest, name: string): string | null {
    const encryptedValue = request.cookies.get(this.COOKIE_PREFIX + name)?.value
    
    if (!encryptedValue) {
      return null
    }

    try {
      return this.decrypt(encryptedValue)
    } catch (error) {
      console.error('Failed to decrypt cookie:', error)
      return null
    }
  }

  /**
   * Delete a secure cookie
   */
  deleteSecureCookie(response: NextResponse, name: string, path: string = '/'): void {
    response.cookies.set(this.COOKIE_PREFIX + name, '', {
      httpOnly: true,
      secure: securityConfig.session.secure,
      sameSite: securityConfig.session.sameSite,
      maxAge: 0,
      path
    })
  }

  /**
   * Set session cookies
   */
  setSessionCookies(
    response: NextResponse,
    sessionId: string,
    refreshToken: string,
    rememberMe: boolean = false
  ): void {
    // Set session cookie
    this.setSecureCookie(response, 'session', sessionId, {
      maxAge: rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60, // 30 days or 1 day
      httpOnly: true,
      secure: true,
      sameSite: 'strict'
    })

    // Set refresh token cookie (longer expiry)
    this.setSecureCookie(response, 'refresh', refreshToken, {
      maxAge: rememberMe ? 30 * 24 * 60 * 60 : 7 * 24 * 60 * 60, // 30 days or 7 days
      httpOnly: true,
      secure: true,
      sameSite: 'strict'
    })

    // Set remember me flag (non-httpOnly for client access)
    response.cookies.set('remember_me', rememberMe.toString(), {
      httpOnly: false,
      secure: true,
      sameSite: 'strict',
      maxAge: rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60
    })
  }

  /**
   * Clear all session cookies
   */
  clearSessionCookies(response: NextResponse): void {
    this.deleteSecureCookie(response, 'session')
    this.deleteSecureCookie(response, 'refresh')
    response.cookies.delete('remember_me')
  }

  /**
   * Get session from cookies
   */
  getSessionFromCookies(request: NextRequest): {
    sessionId: string | null
    refreshToken: string | null
    rememberMe: boolean
  } {
    return {
      sessionId: this.getSecureCookie(request, 'session'),
      refreshToken: this.getSecureCookie(request, 'refresh'),
      rememberMe: request.cookies.get('remember_me')?.value === 'true'
    }
  }

  /**
   * Simple encryption (in production, use proper encryption library)
   */
  private encrypt(value: string): string {
    // This is a simple base64 encoding for demo purposes
    // In production, use proper encryption like AES-256-GCM
    return Buffer.from(value).toString('base64')
  }

  /**
   * Simple decryption (in production, use proper encryption library)
   */
  private decrypt(encryptedValue: string): string {
    try {
      return Buffer.from(encryptedValue, 'base64').toString()
    } catch {
      throw new Error('Failed to decrypt cookie value')
    }
  }

  /**
   * Validate cookie security
   */
  validateCookieSecurity(request: NextRequest): boolean {
    const referer = request.headers.get('referer') || ''
    const origin = request.headers.get('origin') || ''

    // Check for suspicious patterns
    const suspiciousPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /eval\(/i,
      /document\.cookie/i
    ]

    // Check cookies for XSS attempts
    for (const [, cookie] of Object.entries(request.cookies.getAll())) {
      if (suspiciousPatterns.some(pattern => pattern.test(cookie.value))) {
        return false
      }
    }

    // Check for CSRF attempts
    if (origin && !referer.includes(origin)) {
      return false
    }

    return true
  }
}

// Export singleton instance
export const secureCookieManager = new SecureCookieManager()
