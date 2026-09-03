import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const bestseller = searchParams.get('bestseller')
    const search = searchParams.get('search')

    let where: any = {}

    if (category) {
      where.categoryPlatform = category
    }

    if (featured === 'true') {
      where.isFeatured = true
    }

    if (bestseller === 'true') {
      where.isBestseller = true
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
        { tags: { contains: search } },
      ]
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        licenses: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Products API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
