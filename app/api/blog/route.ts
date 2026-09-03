import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { sanitizeInput } from '@/lib/validation'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    const where: any = { published: true }
    if (category) {
      where.category = category
    }

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          coverImage: true,
          author: true,
          category: true,
          tags: true,
          views: true,
          createdAt: true,
        },
      }),
      prisma.blogPost.count({ where }),
    ])

    return NextResponse.json({ posts, total })
  } catch (error) {
    console.error('Blog fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, excerpt, coverImage, category, tags } = body

    if (!title || !content || !excerpt || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    // Check if slug exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug },
    })

    if (existingPost) {
      return NextResponse.json(
        { error: 'A post with this title already exists' },
        { status: 400 }
      )
    }

    const post = await prisma.blogPost.create({
      data: {
        title: sanitizeInput(title),
        slug,
        content: sanitizeInput(content),
        excerpt: sanitizeInput(excerpt),
        coverImage: coverImage || null,
        category: sanitizeInput(category),
        tags: tags || '',
        published: false,
      },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('Blog create error:', error)
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}
