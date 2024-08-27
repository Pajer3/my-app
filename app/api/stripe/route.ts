import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Safely handle the environment variable
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error("Stripe secret key is missing in the environment variables");
}

// Initialize the Stripe client with your secret key
const stripe = new Stripe(stripeSecretKey, {
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
    const { items, province } = body;  // Receive province from frontend (optional)

    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      shipping: {
        name: 'Customer Name', // Replace with the actual customer name if available
        address: {
          line1: '1234 Main Street', // Placeholder, Stripe will collect this
          city: 'City',             // Placeholder, Stripe will collect this
          postal_code: '90210',     // Placeholder, Stripe will collect this
          state: province || '',    // Use province if provided
          country: 'US',            // Set default country or collect via Stripe
        },
      },
      metadata: {
        province: province || 'Not provided', // Store province in metadata
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
