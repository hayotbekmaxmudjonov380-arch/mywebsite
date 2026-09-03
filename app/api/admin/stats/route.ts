import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { checkAdminAuth, createUnauthorizedResponse } from '@/lib/admin-auth'

export async function GET(req: NextRequest) {
  const auth = await checkAdminAuth(req)
  if (!auth.authorized) {
    return createUnauthorizedResponse(auth.error || 'Ruxsat yo\'q')
  }

  try {
    const [
      totalProducts,
      totalOrders,
      totalUsers,
      totalRevenue,
      recentOrders,
      ordersByStatus,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.user.count(),
      prisma.order.aggregate({
        where: { status: 'completed' },
        _sum: { amount: true },
      }),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { product: true, user: true },
      }),
      prisma.order.groupBy({
        by: ['status'],
        _count: true,
      }),
    ])

    return NextResponse.json({
      ok: true,
      stats: {
        totalProducts,
        totalOrders,
        totalUsers,
        totalRevenue: totalRevenue._sum.amount || 0,
        recentOrders: recentOrders.map((order) => ({
          id: order.id,
          amount: order.amount,
          status: order.status,
          createdAt: order.createdAt,
          product: order.product.name,
          user: order.user.telegramUsername || order.user.telegramFirstName,
        })),
        ordersByStatus: ordersByStatus.map((item) => ({
          status: item.status,
          count: item._count,
        })),
      },
    })
  } catch (error) {
    console.error('Admin stats error:', error)
    return NextResponse.json({ ok: false, error: 'Xatolik' }, { status: 500 })
  }
}
