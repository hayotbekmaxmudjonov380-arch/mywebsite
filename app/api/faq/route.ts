import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { sanitizeInput } from '@/lib/validation'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    const where: any = {}
    if (category) {
      where.category = category
    }

    const faqs = await prisma.fAQ.findMany({
      where,
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(faqs)
  } catch (error) {
    console.error('FAQ fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch FAQs' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { question, answer, category, order } = body

    if (!question || !answer || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const faq = await prisma.fAQ.create({
      data: {
        question: sanitizeInput(question),
        answer: sanitizeInput(answer),
        category: sanitizeInput(category),
        order: order || 0,
      },
    })

    return NextResponse.json(faq, { status: 201 })
  } catch (error) {
    console.error('FAQ create error:', error)
    return NextResponse.json(
      { error: 'Failed to create FAQ' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, question, answer, category, order } = body

    if (!id) {
      return NextResponse.json(
        { error: 'FAQ ID is required' },
        { status: 400 }
      )
    }

    const faq = await prisma.fAQ.update({
      where: { id },
      data: {
        ...(question && { question: sanitizeInput(question) }),
        ...(answer && { answer: sanitizeInput(answer) }),
        ...(category && { category: sanitizeInput(category) }),
        ...(order !== undefined && { order }),
      },
    })

    return NextResponse.json(faq)
  } catch (error) {
    console.error('FAQ update error:', error)
    return NextResponse.json(
      { error: 'Failed to update FAQ' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'FAQ ID is required' },
        { status: 400 }
      )
    }

    await prisma.fAQ.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'FAQ deleted' })
  } catch (error) {
    console.error('FAQ delete error:', error)
    return NextResponse.json(
      { error: 'Failed to delete FAQ' },
      { status: 500 }
    )
  }
}
