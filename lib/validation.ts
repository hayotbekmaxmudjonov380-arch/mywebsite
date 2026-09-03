export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validateTelegramUsername(username: string): boolean {
  // Telegram usernames: 5-32 characters, letters, numbers, underscores
  const usernameRegex = /^[a-zA-Z0-9_]{5,32}$/
  return usernameRegex.test(username)
}

export function validateSlug(slug: string): boolean {
  // Slugs: lowercase letters, numbers, hyphens
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
  return slugRegex.test(slug)
}

export function validateCode(code: string): boolean {
  // Auth codes: 4-8 alphanumeric characters
  const codeRegex = /^[A-Z0-9]{4,8}$/i
  return codeRegex.test(code)
}

export function validatePrice(price: any): boolean {
  const num = Number(price)
  return !isNaN(num) && num >= 0 && num <= 1000000
}

export function validateString(value: any, maxLength: number = 1000): string {
  if (typeof value !== 'string') return ''
  return value.slice(0, maxLength)
}

export function validateObject(obj: any, allowedFields: string[]): Record<string, any> {
  if (typeof obj !== 'object' || obj === null) return {}
  
  const sanitized: Record<string, any> = {}
  for (const field of allowedFields) {
    if (obj[field] !== undefined) {
      sanitized[field] = obj[field]
    }
  }
  return sanitized
}

export function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return ['http:', 'https:'].includes(parsed.protocol)
  } catch {
    return false
  }
}

export function generateCSRFToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('')
}
