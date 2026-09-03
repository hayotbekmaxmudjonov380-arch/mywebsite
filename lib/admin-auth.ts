import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth-store'
import { prisma } from '@/lib/db'

export async function checkAdminAuth(req: NextRequest): Promise<{
  authorized: boolean
  user?: any
  error?: string
}> {
  // Check for API key first
  const apiKey = req.headers.get('x-api-key')
  if (apiKey && apiKey === process.env.ADMIN_API_KEY) {
    return { authorized: true }
  }

  // Check session
  const sessionId = req.headers.get('x-session-id')
  if (!sessionId) {
    return { authorized: false, error: 'Kirish kerak' }
  }

  const user = await getSession(sessionId)
  if (!user) {
    return { authorized: false, error: 'Sessiya muddati tugagan' }
  }

  // Check if user is admin
  const dbUser = await prisma.user.findUnique({
    where: { telegramId: user.telegramUserId },
  })

  if (!dbUser || dbUser.role !== 'admin') {
    return { authorized: false, error: 'Ruxsat yo\'q' }
  }

  return { authorized: true, user: dbUser }
}

export function createUnauthorizedResponse(error: string) {
  return NextResponse.json(
    { ok: false, error },
    { status: 401 }
  )
}
