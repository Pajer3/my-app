import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

const calculateOrderAmount = (items: any[]) => {
  // Replace this with the actual calculation based on items
  return 1400; // Example: $14.00
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items } = body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function GET() {
  return new NextResponse('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });
}

// Correct usage for Next.js App Router API
const handler = async (req: Request) => {
  if (req.method === 'POST') {
    return POST(req);
  } else if (req.method === 'GET') {
    return GET();
  } else {
    return new NextResponse('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });
  }
};

export default handler;
