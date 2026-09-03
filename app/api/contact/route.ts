import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { sanitizeInput, validateEmail } from '@/lib/validation'
import { sendEmail, generateContactFormEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Barcha maydonlar to\'ldirilishi shart' },
        { status: 400 }
      )
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Noto\'g\'ri email format' },
        { status: 400 }
      )
    }

    if (message.length < 10) {
      return NextResponse.json(
        { error: 'Xabar kamida 10 ta belgi bo\'lishi kerak' },
        { status: 400 }
      )
    }

    // Save to database
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name: sanitizeInput(name),
        email: sanitizeInput(email),
        subject: sanitizeInput(subject),
        message: sanitizeInput(message),
      },
    })

    // Send email notification
    const emailHtml = generateContactFormEmail(name, email, subject, message)
    await sendEmail({
      to: 'admin@itshopping.uz',
      subject: `ITSHOPPING: Yangi xabar - ${subject}`,
      html: emailHtml,
    })

    return NextResponse.json(
      { 
        message: 'Xabar muvaffaqiyatli yuborildi',
        id: contactMessage.id 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Xabar yuborishda xatolik yuz berdi' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const unreadOnly = searchParams.get('unread') === 'true'

    const where: any = {}
    if (unreadOnly) {
      where.read = false
    }

    const messages = await prisma.contactMessage.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(messages)
  } catch (error) {
    console.error('Contact messages fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}
