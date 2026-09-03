import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock Prisma
vi.mock('@/lib/db', () => ({
  prisma: {
    user: {
      upsert: vi.fn(),
      findUnique: vi.fn(),
    },
    session: {
      create: vi.fn().mockResolvedValue({}),
      findUnique: vi.fn(),
      delete: vi.fn(),
    },
  },
}))

import {
  createAuthCode,
  verifyAuthCode,
  ensureUser,
} from '@/lib/auth-store'

describe('Auth Store', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('createAuthCode', () => {
    it('should create an auth code', () => {
      const authCode = createAuthCode(123456, 'testuser', 'Test User')
      
      expect(authCode.code).toBeDefined()
      expect(authCode.code).toHaveLength(4)
      expect(authCode.telegramUserId).toBe(123456)
      expect(authCode.telegramUsername).toBe('testuser')
      expect(authCode.telegramFirstName).toBe('Test User')
      expect(authCode.expiresAt).toBeGreaterThan(Date.now())
    })

    it('should use external code when provided', () => {
      const authCode = createAuthCode(123456, 'testuser', 'Test User', 'ABCD')
      
      expect(authCode.code).toBe('ABCD')
    })

    it('should replace existing code for same user', () => {
      const firstCode = createAuthCode(123456, 'testuser', 'Test User')
      const secondCode = createAuthCode(123456, 'testuser', 'Test User')
      
      expect(firstCode.code).not.toBe(secondCode.code)
    })
  })

  describe('verifyAuthCode', () => {
    it('should verify valid code', async () => {
      const authCode = createAuthCode(123456, 'testuser', 'Test User', 'ABCD')
      const user = verifyAuthCode('ABCD')
      
      expect(user).toBeDefined()
      expect(user?.telegramUserId).toBe(123456)
      expect(user?.telegramUsername).toBe('testuser')
      expect(user?.telegramFirstName).toBe('Test User')
      expect(user?.sessionId).toBeDefined()
      expect(user?.sessionId).toHaveLength(64) // 32 bytes hex
      
      // Wait for async DB write
      await new Promise(resolve => setTimeout(resolve, 10))
    })

    it('should return null for invalid code', () => {
      const user = verifyAuthCode('INVALID')
      expect(user).toBeNull()
    })

    it('should return null for expired code', () => {
      createAuthCode(123456, 'testuser', 'Test User', 'ABCD')
      
      // Mock Date.now to be after expiry
      const originalNow = Date.now
      Date.now = vi.fn(() => originalNow() + 200000) // 200 seconds later
      
      const user = verifyAuthCode('ABCD')
      expect(user).toBeNull()
      
      Date.now = originalNow
    })

    it('should delete code after verification', async () => {
      createAuthCode(123456, 'testuser', 'Test User', 'ABCD')
      verifyAuthCode('ABCD')
      
      // Wait for async DB write
      await new Promise(resolve => setTimeout(resolve, 10))
      
      // Try to verify again
      const user = verifyAuthCode('ABCD')
      expect(user).toBeNull()
    })

    it('should handle case-insensitive codes', async () => {
      createAuthCode(123456, 'testuser', 'Test User', 'ABCD')
      const user = verifyAuthCode('abcd')
      
      expect(user).toBeDefined()
      expect(user?.telegramUserId).toBe(123456)
      
      // Wait for async DB write
      await new Promise(resolve => setTimeout(resolve, 10))
    })
  })

  describe('ensureUser', () => {
    it('should create user if not exists', async () => {
      const { prisma } = await import('@/lib/db')
      vi.mocked(prisma.user.upsert).mockResolvedValue({} as any)
      
      await ensureUser(123456, 'testuser', 'Test User')
      
      expect(prisma.user.upsert).toHaveBeenCalledWith({
        where: { telegramId: 123456 },
        create: {
          telegramId: 123456,
          telegramUsername: 'testuser',
          telegramFirstName: 'Test User',
        },
        update: {
          telegramUsername: 'testuser',
          telegramFirstName: 'Test User',
        },
      })
    })
  })
})
