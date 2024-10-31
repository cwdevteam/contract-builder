import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
  if (req.method === 'POST') {
    try {
      const { amount, baseUrl } = await req.json()
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Automized Contract',
              },
              unit_amount: amount,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${baseUrl}/docusign`,
        cancel_url: `${baseUrl}/docusign`,
      })

      return NextResponse.json({ url: session.url }, { status: 200 })
    } catch (err: any) {
      console.error(err)
      return NextResponse.json(
        {
          error: 'Error creating checkout',
        },
        { status: 500 },
      )
    }
  } else {
    return NextResponse.json(
      {
        error: 'method not allowed',
      },
      { status: 405 },
    )
  }
}
