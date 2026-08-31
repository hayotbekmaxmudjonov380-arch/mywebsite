import { NextRequest, NextResponse } from 'next/server'
import { createAuthCode } from '@/lib/auth-store'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { telegramUserId, telegramUsername, telegramFirstName } = body

    const authCode = createAuthCode(
      Number(telegramUserId) || 0,
      telegramUsername || 'user',
      telegramFirstName || 'Foydalanuvchi'
    )

    return NextResponse.json({
      ok: true,
      code: authCode.code,
      expiresAt: authCode.expiresAt,
    })
  } catch {
    return NextResponse.json({ ok: false, error: 'Server xatosi' }, { status: 500 })
  }
}
