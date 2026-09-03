import * as Sentry from '@sentry/nextjs'

export interface ErrorContext {
  component?: string
  action?: string
  userId?: string
  metadata?: Record<string, any>
}

export function reportError(error: Error, context?: ErrorContext) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', error)
    if (context) {
      console.error('Context:', context)
    }
  }

  // Report to Sentry in production
  if (process.env.NODE_ENV === 'production' && process.env.SENTRY_DSN) {
    Sentry.withScope((scope) => {
      if (context) {
        if (context.component) {
          scope.setTag('component', context.component)
        }
        if (context.action) {
          scope.setTag('action', context.action)
        }
        if (context.userId) {
          scope.setUser({ id: context.userId })
        }
        if (context.metadata) {
          scope.setExtras(context.metadata)
        }
      }
      Sentry.captureException(error)
    })
  }
}

export function reportMessage(
  message: string,
  level: 'error' | 'warning' | 'info' | 'debug' = 'info',
  context?: ErrorContext
) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console[level === 'error' ? 'error' : level === 'warning' ? 'warn' : 'log'](`[${level.toUpperCase()}] ${message}`)
    if (context) {
      console.error('Context:', context)
    }
  }

  // Report to Sentry in production
  if (process.env.NODE_ENV === 'production' && process.env.SENTRY_DSN) {
    Sentry.withScope((scope) => {
      if (context) {
        if (context.component) {
          scope.setTag('component', context.component)
        }
        if (context.action) {
          scope.setTag('action', context.action)
        }
        if (context.userId) {
          scope.setUser({ id: context.userId })
        }
        if (context.metadata) {
          scope.setExtras(context.metadata)
        }
      }
      Sentry.captureMessage(message, level)
    })
  }
}

export function setUserContext(userId: string, username?: string) {
  Sentry.setUser({
    id: userId,
    username,
  })
}

export function clearUserContext() {
  Sentry.setUser(null)
}
