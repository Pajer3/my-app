import { useEffect, useState } from "react";

const CheckoutMessage = () => {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash;

    if (hash === "#success") {
      setMessage("Your payment was successful! Thank you for your purchase.");
    } else if (hash === "#cancel") {
      setMessage("Your payment was canceled. Please try again.");
    }
  }, []);

  if (!message) return null;

  return (
    <div className="fixed top-20 right-5 bg-blue-500 text-white p-4 rounded-lg shadow-lg z-50">
      <p>{message}</p>
    </div>
  );
};

export default CheckoutMessage;
