import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth-store'

export async function GET(req: NextRequest) {
  const sessionId = req.headers.get('x-session-id')
  if (!sessionId) {
    return NextResponse.json({ ok: false, user: null })
  }

  const user = await getSession(sessionId)
  if (!user) {
    return NextResponse.json({ ok: false, user: null })
  }

  return NextResponse.json({
    ok: true,
    user: {
      telegramUserId: user.telegramUserId,
      telegramUsername: user.telegramUsername,
      telegramFirstName: user.telegramFirstName,
      loggedAt: user.loggedAt,
    },
  })
}
