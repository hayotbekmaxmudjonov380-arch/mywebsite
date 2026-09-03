export interface AuditLogEntry {
  timestamp: string
  action: string
  userId?: string
  ip?: string
  userAgent?: string
  details?: Record<string, any>
  success: boolean
}

// In production, this would write to a database or logging service
const auditLogs: AuditLogEntry[] = []

export function logAudit(entry: Omit<AuditLogEntry, 'timestamp'>) {
  const log: AuditLogEntry = {
    ...entry,
    timestamp: new Date().toISOString(),
  }

  auditLogs.push(log)

  // Keep only last 1000 logs in memory
  if (auditLogs.length > 1000) {
    auditLogs.shift()
  }

  // Console log for debugging
  if (!entry.success) {
    console.error('[AUDIT]', log)
  }
}

export function logAuthAttempt(
  action: string,
  userId: string | undefined,
  ip: string | undefined,
  success: boolean,
  details?: Record<string, any>
) {
  logAudit({
    action: `auth:${action}`,
    userId,
    ip,
    success,
    details,
  })
}

export function logPaymentAttempt(
  orderId: string,
  userId: string | undefined,
  ip: string | undefined,
  success: boolean,
  details?: Record<string, any>
) {
  logAudit({
    action: `payment:${success ? 'success' : 'failed'}`,
    userId,
    ip,
    success,
    details: { orderId, ...details },
  })
}

export function logDownloadAttempt(
  orderId: string,
  userId: string | undefined,
  ip: string | undefined,
  success: boolean
) {
  logAudit({
    action: 'download',
    userId,
    ip,
    success,
    details: { orderId },
  })
}

export function getAuditLogs(limit: number = 100): AuditLogEntry[] {
  return auditLogs.slice(-limit)
}
