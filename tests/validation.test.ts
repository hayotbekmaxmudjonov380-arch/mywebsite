import { describe, it, expect } from 'vitest'
import {
  sanitizeInput,
  validateEmail,
  validateTelegramUsername,
  validateSlug,
  validateCode,
  validatePrice,
  validateString,
  isValidUrl,
} from '@/lib/validation'

describe('Validation Utilities', () => {
  describe('sanitizeInput', () => {
    it('should escape HTML characters', () => {
      expect(sanitizeInput('<script>alert("xss")</script>')).toBe(
        '&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;'
      )
    })

    it('should handle normal text', () => {
      expect(sanitizeInput('Hello World')).toBe('Hello World')
    })

    it('should handle empty string', () => {
      expect(sanitizeInput('')).toBe('')
    })
  })

  describe('validateEmail', () => {
    it('should validate correct emails', () => {
      expect(validateEmail('test@example.com')).toBe(true)
      expect(validateEmail('user.name@domain.co')).toBe(true)
      expect(validateEmail('user+tag@example.com')).toBe(true)
    })

    it('should reject invalid emails', () => {
      expect(validateEmail('invalid')).toBe(false)
      expect(validateEmail('invalid@')).toBe(false)
      expect(validateEmail('@invalid.com')).toBe(false)
      expect(validateEmail('invalid.com')).toBe(false)
    })
  })

  describe('validateTelegramUsername', () => {
    it('should validate correct usernames', () => {
      expect(validateTelegramUsername('john_doe')).toBe(true)
      expect(validateTelegramUsername('user123')).toBe(true)
      expect(validateTelegramUsername('TestUser')).toBe(true)
    })

    it('should reject invalid usernames', () => {
      expect(validateTelegramUsername('john')).toBe(false) // Too short
      expect(validateTelegramUsername('john-doe')).toBe(false) // Hyphen not allowed
      expect(validateTelegramUsername('john doe')).toBe(false) // Space not allowed
    })
  })

  describe('validateSlug', () => {
    it('should validate correct slugs', () => {
      expect(validateSlug('orbit-crm')).toBe(true)
      expect(validateSlug('my-product-123')).toBe(true)
      expect(validateSlug('product')).toBe(true)
    })

    it('should reject invalid slugs', () => {
      expect(validateSlug('Orbit-CRM')).toBe(false) // Uppercase
      expect(validateSlug('orbit_crm')).toBe(false) // Underscore
      expect(validateSlug('orbit crm')).toBe(false) // Space
    })
  })

  describe('validateCode', () => {
    it('should validate correct codes', () => {
      expect(validateCode('ABCD')).toBe(true)
      expect(validateCode('1234')).toBe(true)
      expect(validateCode('A1B2')).toBe(true)
    })

    it('should reject invalid codes', () => {
      expect(validateCode('ABC')).toBe(false) // Too short
      expect(validateCode('ABCDEFGHIJK')).toBe(false) // Too long
      expect(validateCode('abc')).toBe(false) // Lowercase (should be uppercase)
    })
  })

  describe('validatePrice', () => {
    it('should validate correct prices', () => {
      expect(validatePrice(0)).toBe(true)
      expect(validatePrice(99.99)).toBe(true)
      expect(validatePrice(1000)).toBe(true)
    })

    it('should reject invalid prices', () => {
      expect(validatePrice(-1)).toBe(false)
      expect(validatePrice(NaN)).toBe(false)
      expect(validatePrice(1000001)).toBe(false)
    })
  })

  describe('validateString', () => {
    it('should truncate long strings', () => {
      expect(validateString('a'.repeat(2000), 1000)).toHaveLength(1000)
    })

    it('should return empty string for non-strings', () => {
      expect(validateString(null, 100)).toBe('')
      expect(validateString(undefined, 100)).toBe('')
      expect(validateString(123, 100)).toBe('')
    })
  })

  describe('isValidUrl', () => {
    it('should validate correct URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true)
      expect(isValidUrl('http://example.com')).toBe(true)
    })

    it('should reject invalid URLs', () => {
      expect(isValidUrl('ftp://example.com')).toBe(false)
      expect(isValidUrl('invalid')).toBe(false)
      expect(isValidUrl('example.com')).toBe(false)
    })
  })
})
