import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { checkAdminAuth, createUnauthorizedResponse } from '@/lib/admin-auth'

export async function GET(req: NextRequest) {
  const auth = await checkAdminAuth(req)
  if (!auth.authorized) {
    return createUnauthorizedResponse(auth.error || 'Ruxsat yo\'q')
  }

  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const where: any = {}
    if (status) {
      where.status = status
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          product: true,
          license: true,
          user: true,
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.order.count({ where }),
    ])

    return NextResponse.json({
      ok: true,
      orders: orders.map((order) => ({
        id: order.id,
        status: order.status,
        amount: order.amount,
        downloadCount: order.downloadCount,
        createdAt: order.createdAt,
        user: {
          telegramId: order.user.telegramId,
          username: order.user.telegramUsername,
          firstName: order.user.telegramFirstName,
        },
        product: {
          name: order.product.name,
          slug: order.product.slug,
        },
        license: {
          name: order.license.name,
        },
      })),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Admin orders error:', error)
    return NextResponse.json({ ok: false, error: 'Xatolik' }, { status: 500 })
  }
}
