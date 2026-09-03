import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { checkAdminAuth, createUnauthorizedResponse } from '@/lib/admin-auth'
import { validateString } from '@/lib/validation'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await checkAdminAuth(req)
  if (!auth.authorized) {
    return createUnauthorizedResponse(auth.error || 'Ruxsat yo\'q')
  }

  try {
    const { id } = await params
    const product = await prisma.product.findUnique({
      where: { id },
      include: { licenses: true },
    })

    if (!product) {
      return NextResponse.json({ ok: false, error: 'Mahsulot topilmadi' }, { status: 404 })
    }

    return NextResponse.json({ ok: true, product })
  } catch (error) {
    console.error('Admin get product error:', error)
    return NextResponse.json({ ok: false, error: 'Xatolik' }, { status: 500 })
  }
}

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
    const { name, slug, description, longDescription, category, categoryPlatform, price, cover, badges, tags, licenses } = body

    const existing = await prisma.product.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ ok: false, error: 'Mahsulot topilmadi' }, { status: 404 })
    }

    // Update product
    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(name && { name: validateString(name, 100) }),
        ...(slug && { slug: validateString(slug, 100) }),
        ...(description && { description: validateString(description, 500) }),
        ...(longDescription !== undefined && { longDescription: validateString(longDescription, 2000) }),
        ...(category && { category: validateString(category, 50) }),
        ...(categoryPlatform && { categoryPlatform: validateString(categoryPlatform, 50) }),
        ...(price !== undefined && { price: Number(price) }),
        ...(cover !== undefined && { cover: validateString(cover, 500) }),
        ...(badges !== undefined && { badges: validateString(badges, 200) }),
        ...(tags !== undefined && { tags: validateString(tags, 500) }),
      },
      include: { licenses: true },
    })

    // Update licenses if provided
    if (licenses && Array.isArray(licenses)) {
      // Delete existing licenses
      await prisma.license.deleteMany({ where: { productId: id } })

      // Create new licenses
      await prisma.license.createMany({
        data: licenses.map((l: any) => ({
          productId: id,
          name: validateString(l.name, 50),
          description: validateString(l.description || '', 200),
          price: Number(l.price),
          features: validateString(l.features || '', 500),
        })),
      })
    }

    return NextResponse.json({ ok: true, product })
  } catch (error) {
    console.error('Admin update product error:', error)
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

    const existing = await prisma.product.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ ok: false, error: 'Mahsulot topilmadi' }, { status: 404 })
    }

    // Delete licenses first
    await prisma.license.deleteMany({ where: { productId: id } })

    // Delete product
    await prisma.product.delete({ where: { id } })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Admin delete product error:', error)
    return NextResponse.json({ ok: false, error: 'O\'chirishda xatolik' }, { status: 500 })
  }
}
