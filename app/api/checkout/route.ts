import { NextRequest, NextResponse } from 'next/server'
import { getStripe, SITE_URL } from '@/lib/stripe'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const stripe = getStripe()
    const body = await req.json()
    const { productId, licenseId, sessionId } = body

    if (!productId || !licenseId) {
      return NextResponse.json(
        { ok: false, error: 'Mahsulot va litsenziya kerak' },
        { status: 400 }
      )
    }

    // Get product and license from database
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { licenses: true },
    })

    if (!product) {
      return NextResponse.json(
        { ok: false, error: 'Mahsulot topilmadi' },
        { status: 404 }
      )
    }

    const license = product.licenses.find((l) => l.name.toLowerCase() === licenseId)
    if (!license) {
      return NextResponse.json(
        { ok: false, error: 'Litsenziya topilmadi' },
        { status: 404 }
      )
    }

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: `${license.name} License - ${product.description}`,
              images: [],
            },
            unit_amount: Math.round(license.price * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/products/${product.slug}`,
      metadata: {
        productId: product.id,
        licenseId: license.name.toLowerCase(),
        userId: sessionId || 'guest',
      },
    })

    // Create order in database
    await prisma.order.create({
      data: {
        userId: sessionId || 'guest',
        productId: product.id,
        licenseId: license.id,
        amount: license.price,
        status: 'pending',
      },
    })

    return NextResponse.json({
      ok: true,
      sessionId: checkoutSession.id,
      url: checkoutSession.url,
    })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { ok: false, error: 'To\'lov jarayonida xatolik yuz berdi' },
      { status: 500 }
    )
  }
}
