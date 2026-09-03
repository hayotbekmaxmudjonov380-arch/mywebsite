import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getSession } from '@/lib/auth-store'

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.headers.get('x-session-id')
    if (!sessionId) {
      return NextResponse.json({ ok: false, orders: [] }, { status: 401 })
    }

    const user = await getSession(sessionId)
    if (!user) {
      return NextResponse.json({ ok: false, orders: [] }, { status: 401 })
    }

    const orders = await prisma.order.findMany({
      where: {
        userId: String(user.telegramUserId),
      },
      include: {
        product: true,
        license: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({
      ok: true,
      orders: orders.map((order) => ({
        id: order.id,
        status: order.status,
        amount: order.amount,
        downloadToken: order.downloadToken,
        createdAt: order.createdAt,
        product: {
          name: order.product.name,
          slug: order.product.slug,
        },
        license: {
          name: order.license.name,
        },
      })),
    })
  } catch (error) {
    console.error('Orders API error:', error)
    return NextResponse.json(
      { ok: false, error: 'Buyurtmalarni olishda xatolik' },
      { status: 500 }
    )
  }
}
