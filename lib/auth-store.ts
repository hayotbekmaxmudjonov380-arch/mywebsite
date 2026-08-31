import { randomBytes } from 'crypto'

export interface AuthCode {
  code: string
  telegramUserId: number
  telegramUsername: string
  telegramFirstName: string
  createdAt: number
  expiresAt: number
}

export interface AuthUser {
  sessionId: string
  telegramUserId: number
  telegramUsername: string
  telegramFirstName: string
  loggedAt: number
}

const CODE_EXPIRY_MS = 120_000
const SESSION_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000

const pendingCodes = new Map<string, AuthCode>()
const activeSessions = new Map<string, AuthUser>()

function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const bytes = randomBytes(4)
  return Array.from(bytes).map((b) => chars[b % chars.length]).join('')
}

function generateSessionId(): string {
  return randomBytes(32).toString('hex')
}

export function createAuthCode(telegramUserId: number, telegramUsername: string, telegramFirstName: string): AuthCode {
  for (const [, existing] of pendingCodes) {
    if (existing.telegramUserId === telegramUserId) {
      pendingCodes.delete(existing.code)
    }
  }
  const code = generateCode()
  const now = Date.now()
  const authCode: AuthCode = { code, telegramUserId, telegramUsername, telegramFirstName, createdAt: now, expiresAt: now + CODE_EXPIRY_MS }
  pendingCodes.set(code, authCode)
  return authCode
}

export function verifyAuthCode(code: string): AuthUser | null {
  const upper = code.toUpperCase().trim()
  const authCode = pendingCodes.get(upper)
  if (!authCode) return null
  if (Date.now() > authCode.expiresAt) {
    pendingCodes.delete(upper)
    return null
  }
  pendingCodes.delete(upper)
  const sessionId = generateSessionId()
  const user: AuthUser = {
    sessionId,
    telegramUserId: authCode.telegramUserId,
    telegramUsername: authCode.telegramUsername,
    telegramFirstName: authCode.telegramFirstName,
    loggedAt: Date.now(),
  }
  activeSessions.set(sessionId, user)
  return user
}

export function getSession(sessionId: string): AuthUser | null {
  const user = activeSessions.get(sessionId)
  if (!user) return null
  if (Date.now() - user.loggedAt > SESSION_EXPIRY_MS) {
    activeSessions.delete(sessionId)
    return null
  }
  return user
}

export function removeSession(sessionId: string): void {
  activeSessions.delete(sessionId)
}
