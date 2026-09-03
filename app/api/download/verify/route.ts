import { NextRequest, NextResponse } from 'next/server'
import { getDownloadUrl } from '@/lib/s3'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { token, orderId } = body

    if (!token || !orderId) {
      return NextResponse.json(
        { ok: false, error: 'Noto\'g\'ri so\'rov' },
        { status: 400 }
      )
    }

    // Find order with matching token
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        downloadToken: token,
        status: 'completed',
      },
      include: {
        product: true,
        license: true,
      },
    })

    if (!order) {
      return NextResponse.json(
        { ok: false, error: 'Buyurtma topilmadi yoki noto\'g\'ri token' },
        { status: 404 }
      )
    }

    // Generate download URL (valid for 1 hour)
    const key = `products/${order.product.id}/${order.product.slug}.zip`
    const downloadUrl = await getDownloadUrl(key, 3600)

    return NextResponse.json({
      ok: true,
      downloadUrl,
      productName: order.product.name,
      licenseName: order.license.name,
      expiresIn: 3600,
    })
  } catch (error) {
    console.error('Download verify error:', error)
    return NextResponse.json(
      { ok: false, error: 'Tekshirish xatolik' },
      { status: 500 }
    )
  }
}
