import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// In-memory rate limit store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

function getRateLimitKey(ip: string, path: string): string {
  return `${ip}:${path}`
}

function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const record = rateLimitStore.get(key)

  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs })
    return { allowed: true, remaining: limit - 1, resetTime: now + windowMs }
  }

  if (record.count >= limit) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime }
  }

  record.count++
  return { allowed: true, remaining: limit - record.count, resetTime: record.resetTime }
}

// Rate limit configurations
const RATE_LIMITS = {
  // Auth endpoints: 10 requests per minute
  auth: { limit: 10, windowMs: 60 * 1000 },
  // Checkout: 5 requests per minute
  checkout: { limit: 5, windowMs: 60 * 1000 },
  // Download: 10 requests per minute
  download: { limit: 10, windowMs: 60 * 1000 },
  // API general: 100 requests per minute
  api: { limit: 100, windowMs: 60 * 1000 },
  // Webhook: 50 requests per minute
  webhook: { limit: 50, windowMs: 60 * 1000 },
}

function getRateLimitConfig(path: string) {
  if (path.startsWith('/api/auth')) return RATE_LIMITS.auth
  if (path.startsWith('/api/checkout')) return RATE_LIMITS.checkout
  if (path.startsWith('/api/download')) return RATE_LIMITS.download
  if (path.startsWith('/api/webhooks')) return RATE_LIMITS.webhook
  if (path.startsWith('/api/')) return RATE_LIMITS.api
  return null
}

export function rateLimit(request: NextRequest): NextResponse | null {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
  const path = request.nextUrl.pathname

  const config = getRateLimitConfig(path)
  if (!config) return null

  const key = getRateLimitKey(ip, path)
  const { allowed, remaining, resetTime } = checkRateLimit(key, config.limit, config.windowMs)

  if (!allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Too many requests',
        retryAfter: Math.ceil((resetTime - Date.now()) / 1000),
      },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': String(config.limit),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(Math.ceil(resetTime / 1000)),
          'Retry-After': String(Math.ceil((resetTime - Date.now()) / 1000)),
        },
      }
    )
  }

  return null
}

export function getRateLimitHeaders(path: string, ip: string): Record<string, string> {
  const config = getRateLimitConfig(path)
  if (!config) return {}

  const key = getRateLimitKey(ip, path)
  const record = rateLimitStore.get(key)

  if (!record) {
    return {
      'X-RateLimit-Limit': String(config.limit),
      'X-RateLimit-Remaining': String(config.limit - 1),
    }
  }

  return {
    'X-RateLimit-Limit': String(config.limit),
    'X-RateLimit-Remaining': String(Math.max(0, config.limit - record.count)),
    'X-RateLimit-Reset': String(Math.ceil(record.resetTime / 1000)),
  }
}
