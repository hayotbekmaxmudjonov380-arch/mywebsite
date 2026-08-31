import { NextRequest, NextResponse } from 'next/server'
import { removeSession } from '@/lib/auth-store'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { sessionId } = body
    if (sessionId) {
      removeSession(sessionId)
    }
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
