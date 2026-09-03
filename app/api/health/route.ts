import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { validateEnvironment, getEnvironmentStatus } from '@/lib/env'
import { validateS3Config } from '@/lib/s3'

export async function GET() {
  const envStatus = getEnvironmentStatus()
  const services = validateEnvironment()
  const s3Status = validateS3Config()

  // Check database connection
  let databaseStatus = 'connected'
  try {
    await prisma.$queryRaw`SELECT 1`
  } catch (error) {
    databaseStatus = 'disconnected'
  }

  // Check if all required services are configured
  const requiredServices = services.filter((s) => s.required)
  const allConfigured = requiredServices.every((s) => s.configured)

  const status = {
    status: allConfigured && databaseStatus === 'connected' ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    environment: envStatus,
    database: {
      status: databaseStatus,
      provider: process.env.DATABASE_URL?.startsWith('postgresql') ? 'postgresql' : 'sqlite',
    },
    services: {
      s3: {
        configured: s3Status.valid,
        errors: s3Status.errors,
      },
      stripe: {
        configured: !!process.env.STRIPE_SECRET_KEY,
        mode: process.env.STRIPE_SECRET_KEY?.startsWith('sk_live_') ? 'live' : 'test',
      },
      telegram: {
        configured: !!process.env.TELEGRAM_BOT_TOKEN,
        username: process.env.TELEGRAM_BOT_USERNAME || null,
      },
      resend: {
        configured: !!process.env.RESEND_API_KEY,
      },
      sentry: {
        configured: !!process.env.SENTRY_DSN,
      },
    },
    servicesList: services,
  }

  const httpStatus = status.status === 'healthy' ? 200 : 503

  return NextResponse.json(status, { status: httpStatus })
}
