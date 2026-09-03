import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { prisma } from '@/lib/db'
import { randomBytes } from 'crypto'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  try {
    const stripe = getStripe()
    const body = await req.text()
    const sig = req.headers.get('stripe-signature')

    if (!sig) {
      return NextResponse.json({ ok: false, error: 'No signature' }, { status: 400 })
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(
        body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET || ''
      )
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json({ ok: false, error: 'Invalid signature' }, { status: 400 })
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session

      try {
        // Generate download token
        const downloadToken = randomBytes(32).toString('hex')

        // Update order status and add download token
        await prisma.order.updateMany({
          where: {
            productId: session.metadata?.productId,
            status: 'pending',
          },
          data: {
            status: 'completed',
            downloadToken,
          },
        })

        console.log('Order completed with download token:', session.metadata?.productId)
      } catch (error) {
        console.error('Failed to update order:', error)
      }
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ ok: false, error: 'Webhook error' }, { status: 500 })
  }
}
