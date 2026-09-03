import { randomBytes } from 'crypto'
import { prisma } from './db'

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

const CODE_EXPIRY_MS = Number(process.env.AUTH_CODE_EXPIRY_MS) || 120_000

function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const bytes = randomBytes(4)
  return Array.from(bytes).map((b) => chars[b % chars.length]).join('')
}

function generateSessionId(): string {
  return randomBytes(32).toString('hex')
}

const pendingCodes = new Map<string, AuthCode>()

export function createAuthCode(
  telegramUserId: number,
  telegramUsername: string,
  telegramFirstName: string,
  externalCode?: string
): AuthCode {
  for (const [, existing] of pendingCodes) {
    if (existing.telegramUserId === telegramUserId) {
      pendingCodes.delete(existing.code)
    }
  }
  const code = externalCode || generateCode()
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
  // Session is saved synchronously in memory, DB write happens async
  prisma.session.create({
    data: {
      id: sessionId,
      userId: String(authCode.telegramUserId),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  }).catch((e) => console.error('Failed to save session to DB:', e))
  return user
}

export async function getSession(sessionId: string): Promise<AuthUser | null> {
  try {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { user: true },
    })
    if (!session) return null
    if (new Date() > session.expiresAt) {
      await prisma.session.delete({ where: { id: sessionId } })
      return null
    }
    return {
      sessionId: session.id,
      telegramUserId: session.user.telegramId,
      telegramUsername: session.user.telegramUsername || '',
      telegramFirstName: session.user.telegramFirstName || '',
      loggedAt: session.createdAt.getTime(),
    }
  } catch {
    return null
  }
}

export async function removeSession(sessionId: string): Promise<void> {
  try {
    await prisma.session.delete({ where: { id: sessionId } })
  } catch {}
}

export async function ensureUser(
  telegramUserId: number,
  telegramUsername: string,
  telegramFirstName: string
): Promise<void> {
  try {
    await prisma.user.upsert({
      where: { telegramId: telegramUserId },
      create: {
        telegramId: telegramUserId,
        telegramUsername,
        telegramFirstName,
      },
      update: {
        telegramUsername,
        telegramFirstName,
      },
    })
  } catch (e) {
    console.error('Failed to ensure user:', e)
  }
}
