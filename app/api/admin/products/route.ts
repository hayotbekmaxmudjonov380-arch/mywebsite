import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { checkAdminAuth, createUnauthorizedResponse } from '@/lib/admin-auth'
import { validateString, validatePrice } from '@/lib/validation'

export async function GET(req: NextRequest) {
  const auth = await checkAdminAuth(req)
  if (!auth.authorized) {
    return createUnauthorizedResponse(auth.error || 'Ruxsat yo\'q')
  }

  try {
    const products = await prisma.product.findMany({
      include: {
        licenses: true,
        _count: {
          select: { orders: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ ok: true, products })
  } catch (error) {
    console.error('Admin products error:', error)
    return NextResponse.json({ ok: false, error: 'Xatolik' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const auth = await checkAdminAuth(req)
  if (!auth.authorized) {
    return createUnauthorizedResponse(auth.error || 'Ruxsat yo\'q')
  }

  try {
    const body = await req.json()
    const { name, slug, description, longDescription, category, categoryPlatform, price, cover, badges, tags, licenses } = body

    if (!name || !slug || !description || !category || !price) {
      return NextResponse.json(
        { ok: false, error: 'Kerakli maydonlar to\'ldirilmagan' },
        { status: 400 }
      )
    }

    // Check if slug already exists
    const existing = await prisma.product.findUnique({ where: { slug } })
    if (existing) {
      return NextResponse.json(
        { ok: false, error: 'Bu slug allaqachon mavjud' },
        { status: 400 }
      )
    }

    const product = await prisma.product.create({
      data: {
        name: validateString(name, 100),
        slug: validateString(slug, 100),
        description: validateString(description, 500),
        longDescription: validateString(longDescription || '', 2000),
        category: validateString(category, 50),
        categoryPlatform: validateString(categoryPlatform, 50),
        price: Number(price),
        cover: validateString(cover || '', 500),
        badges: validateString(badges || '', 200),
        tags: validateString(tags || '', 500),
        licenses: {
          create: licenses?.map((l: any) => ({
            name: validateString(l.name, 50),
            description: validateString(l.description || '', 200),
            price: Number(l.price),
            features: validateString(l.features || '', 500),
          })) || [
            {
              name: 'Personal',
              description: 'For learning and personal projects',
              price: Number(price),
              features: 'Source code,Documentation,Community support',
            },
            {
              name: 'Commercial',
              description: 'For client and business use',
              price: Math.round(Number(price) * 2.5),
              features: 'Source code,Commercial license,Priority support,Lifetime updates',
            },
          ],
        },
      },
      include: { licenses: true },
    })

    return NextResponse.json({ ok: true, product })
  } catch (error) {
    console.error('Admin create product error:', error)
    return NextResponse.json({ ok: false, error: 'Yaratishda xatolik' }, { status: 500 })
  }
}
