export interface ServiceStatus {
  name: string
  configured: boolean
  required: boolean
  message: string
}

export function validateEnvironment(): ServiceStatus[] {
  const services: ServiceStatus[] = []

  // Database
  services.push({
    name: 'Database (PostgreSQL)',
    configured: !!process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith('postgresql'),
    required: true,
    message: process.env.DATABASE_URL?.startsWith('postgresql')
      ? 'PostgreSQL configured'
      : 'Using SQLite (development only)',
  })

  // Stripe
  services.push({
    name: 'Stripe',
    configured: !!process.env.STRIPE_SECRET_KEY && !process.env.STRIPE_SECRET_KEY.includes('test'),
    required: true,
    message: process.env.STRIPE_SECRET_KEY?.startsWith('sk_live_')
      ? 'Live mode enabled'
      : process.env.STRIPE_SECRET_KEY?.startsWith('sk_test_')
      ? 'Test mode - use live keys for production'
      : 'Not configured',
  })

  // AWS S3
  services.push({
    name: 'AWS S3',
    configured: !!process.env.AWS_ACCESS_KEY_ID && !!process.env.AWS_SECRET_ACCESS_KEY,
    required: true,
    message: process.env.AWS_ACCESS_KEY_ID
      ? 'Configured'
      : 'Not configured - file delivery will not work',
  })

  // Telegram Bot
  services.push({
    name: 'Telegram Bot',
    configured: !!process.env.TELEGRAM_BOT_TOKEN,
    required: true,
    message: process.env.TELEGRAM_BOT_TOKEN
      ? `Bot: @${process.env.TELEGRAM_BOT_USERNAME || 'unknown'}`
      : 'Not configured - authentication will not work',
  })

  // Resend (Email)
  services.push({
    name: 'Resend (Email)',
    configured: !!process.env.RESEND_API_KEY,
    required: false,
    message: process.env.RESEND_API_KEY
      ? 'Email notifications enabled'
      : 'Not configured - email notifications disabled',
  })

  // Sentry
  services.push({
    name: 'Sentry',
    configured: !!process.env.SENTRY_DSN,
    required: false,
    message: process.env.SENTRY_DSN
      ? 'Error tracking enabled'
      : 'Not configured - error tracking disabled',
  })

  // Site URL
  services.push({
    name: 'Site URL',
    configured: !!process.env.NEXT_PUBLIC_SITE_URL,
    required: true,
    message: process.env.NEXT_PUBLIC_SITE_URL || 'Not configured',
  })

  return services
}

export function getEnvironmentStatus(): {
  isProduction: boolean
  isDevelopment: boolean
  isTest: boolean
  nodeEnv: string
} {
  const nodeEnv = process.env.NODE_ENV || 'development'
  return {
    isProduction: nodeEnv === 'production',
    isDevelopment: nodeEnv === 'development',
    isTest: nodeEnv === 'test',
    nodeEnv,
  }
}

export function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Required environment variable ${name} is not set`)
  }
  return value
}

export function getOptionalEnv(name: string, defaultValue: string = ''): string {
  return process.env[name] || defaultValue
}
