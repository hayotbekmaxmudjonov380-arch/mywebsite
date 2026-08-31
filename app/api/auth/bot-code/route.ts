import { NextRequest, NextResponse } from 'next/server'
import { createAuthCode } from '@/lib/auth-store'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { code, telegramUserId, telegramUsername, telegramFirstName } = body

    if (!code || !telegramUserId) {
      return NextResponse.json({ ok: false, error: 'Kerakli ma\'lumotlar yo\'q' }, { status: 400 })
    }

    createAuthCode(
      Number(telegramUserId),
      telegramUsername || 'user',
      telegramFirstName || 'Foydalanuvchi',
      code.toUpperCase()
    )

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false, error: 'Server xatosi' }, { status: 500 })
  }
}
