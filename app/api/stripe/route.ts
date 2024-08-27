import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize the Stripe client with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

// Function to calculate the order amount (replace with actual logic)
const calculateOrderAmount = (items: any[]) => {
  return 1400; // Example: $14.00
};

// Handle POST requests
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items } = body;

    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Respond with the client secret
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// Handle GET requests (usually not needed for payment APIs)
export async function GET() {
  return new NextResponse('Method Not Allowed', {
    status: 405,
    headers: { Allow: 'POST' },
  });
}
