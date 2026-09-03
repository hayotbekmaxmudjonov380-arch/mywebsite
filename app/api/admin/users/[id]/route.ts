import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { checkAdminAuth, createUnauthorizedResponse } from '@/lib/admin-auth'

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await checkAdminAuth(req)
  if (!auth.authorized) {
    return createUnauthorizedResponse(auth.error || 'Ruxsat yo\'q')
  }

  try {
    const { id } = await params
    const body = await req.json()
    const { role } = body

    if (!role || !['user', 'admin'].includes(role)) {
      return NextResponse.json(
        { ok: false, error: 'Noto\'g\'ri role' },
        { status: 400 }
      )
    }

    const user = await prisma.user.update({
      where: { id },
      data: { role },
    })

    return NextResponse.json({ ok: true, user })
  } catch (error) {
    console.error('Admin update user error:', error)
    return NextResponse.json({ ok: false, error: 'Yangilashda xatolik' }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await checkAdminAuth(req)
  if (!auth.authorized) {
    return createUnauthorizedResponse(auth.error || 'Ruxsat yo\'q')
  }

  try {
    const { id } = await params

    // Delete user sessions
    await prisma.session.deleteMany({ where: { userId: id } })

    // Delete user favorites
    await prisma.favorite.deleteMany({ where: { userId: id } })

    // Delete user
    await prisma.user.delete({ where: { id } })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Admin delete user error:', error)
    return NextResponse.json({ ok: false, error: 'O\'chirishda xatolik' }, { status: 500 })
  }
}
