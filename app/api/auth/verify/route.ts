import { NextRequest, NextResponse } from 'next/server'
import { verifyAuthCode, ensureUser } from '@/lib/auth-store'
import { logAuthAttempt } from '@/lib/audit-log'
import { validateCode } from '@/lib/validation'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { code } = body
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ ok: false, error: 'Kod kiritilmagan' }, { status: 400 })
    }

    if (!validateCode(code)) {
      logAuthAttempt('verify', undefined, ip, false, { reason: 'invalid_format' })
      return NextResponse.json({ ok: false, error: 'Noto\'g\'ri kod formati' }, { status: 400 })
    }

    const user = verifyAuthCode(code)
    if (!user) {
      logAuthAttempt('verify', undefined, ip, false, { reason: 'invalid_code' })
      return NextResponse.json({ ok: false, error: 'Noto\'g\'ri kod yoki muddati tugagan' }, { status: 401 })
    }

    // Ensure user exists in database
    await ensureUser(
      user.telegramUserId,
      user.telegramUsername,
      user.telegramFirstName
    )

    logAuthAttempt('verify', String(user.telegramUserId), ip, true)

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
