import { NextRequest, NextResponse } from 'next/server'
import { getDownloadUrl } from '@/lib/s3'
import { prisma } from '@/lib/db'
import { getSession } from '@/lib/auth-store'
import { randomBytes } from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { orderId, productId } = body

    // Get session
    const sessionId = req.headers.get('x-session-id')
    if (!sessionId) {
      return NextResponse.json(
        { ok: false, error: 'Kirish kerak' },
        { status: 401 }
      )
    }

    const user = await getSession(sessionId)
    if (!user) {
      return NextResponse.json(
        { ok: false, error: 'Sessiya muddati tugagan' },
        { status: 401 }
      )
    }

    // Verify order exists and is completed
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        userId: String(user.telegramUserId),
        status: 'completed',
      },
      include: {
        product: true,
        license: true,
      },
    })

    if (!order) {
      return NextResponse.json(
        { ok: false, error: 'Buyurtma topilmadi yoki hali tugallanmagan' },
        { status: 404 }
      )
    }

    // Generate download token if not exists
    let downloadToken = order.downloadToken
    if (!downloadToken) {
      downloadToken = randomBytes(32).toString('hex')
      await prisma.order.update({
        where: { id: order.id },
        data: { downloadToken },
      })
    }

    // Generate download URL (valid for 1 hour)
    const key = `products/${order.product.id}/${order.product.slug}.zip`
    const downloadUrl = await getDownloadUrl(key, 3600)

    // Increment download count
    await prisma.order.update({
      where: { id: order.id },
      data: { downloadCount: { increment: 1 } },
    })

    return NextResponse.json({
      ok: true,
      downloadUrl,
      downloadToken,
      productName: order.product.name,
      licenseName: order.license.name,
      expiresIn: 3600,
    })
  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json(
      { ok: false, error: 'Yuklab olish xatolik' },
      { status: 500 }
    )
  }
}
