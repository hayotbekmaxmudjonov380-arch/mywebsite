import { NextRequest, NextResponse } from 'next/server'
import { verifyAuthCode } from '@/lib/auth-store'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { code } = body

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ ok: false, error: 'Kod kiritilmagan' }, { status: 400 })
    }

    const user = verifyAuthCode(code)
    if (!user) {
      return NextResponse.json({ ok: false, error: 'Noto\'g\'ri kod yoki muddati tugagan' }, { status: 401 })
    }

    return NextResponse.json({
      ok: true,
      sessionId: user.sessionId,
      user: {
        telegramUserId: user.telegramUserId,
        telegramUsername: user.telegramUsername,
        telegramFirstName: user.telegramFirstName,
        loggedAt: user.loggedAt,
      },
    })
  } catch {
    return NextResponse.json({ ok: false, error: 'Server xatosi' }, { status: 500 })
  }
}
