"use client";

import React, { useState } from "react";
import { CardElement, useElements, useStripe, PaymentRequestButtonElement } from "@stripe/react-stripe-js";
import { PaymentRequest, StripeCardElement } from "@stripe/stripe-js";

interface CheckoutFormProps {
  clientSecret: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null);

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setError("Card Element not found");
      setProcessing(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement as StripeCardElement,
        billing_details: {
          name: (event.currentTarget.elements.namedItem("name") as HTMLInputElement).value,
          email: (event.currentTarget.elements.namedItem("email") as HTMLInputElement).value,
          address: {
            line1: (event.currentTarget.elements.namedItem("address") as HTMLInputElement).value,
            city: (event.currentTarget.elements.namedItem("city") as HTMLInputElement).value,
            state: (event.currentTarget.elements.namedItem("state") as HTMLInputElement).value,
            postal_code: (event.currentTarget.elements.namedItem("zip") as HTMLInputElement).value,
            country: (event.currentTarget.elements.namedItem("country") as HTMLInputElement).value,
          },
        },
      },
    });

    if (error) {
      setError(`Payment failed: ${error.message}`);
      setProcessing(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  // Setup for Payment Request Button for Apple Pay, Google Pay, etc.
  React.useEffect(() => {
    if (stripe && clientSecret) {
      const pr = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: 'Total',
          amount: 5000, // Replace with dynamic total
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      pr.canMakePayment().then((result) => {
        if (result) {
          setPaymentRequest(pr);
        }
      });
    }
  }, [stripe, clientSecret]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" name="name" placeholder="Full Name" required />
      <input type="email" name="email" placeholder="Email" required />
      <input type="text" name="address" placeholder="Address" required />
      <input type="text" name="city" placeholder="City" required />
      <input type="text" name="state" placeholder="State" required />
      <input type="text" name="zip" placeholder="ZIP Code" required />
      <input type="text" name="country" placeholder="Country" required />

      <CardElement />

      {paymentRequest && (
        <PaymentRequestButtonElement options={{ paymentRequest }} />
      )}

      <button type="submit" disabled={processing || !stripe || succeeded} className="btn">
        {processing ? "Processing..." : "Pay"}
      </button>

      {error && <div className="error-message">{error}</div>}
      {succeeded && <div className="success-message">Payment succeeded!</div>}
    </form>
  );
};

export default CheckoutForm;
