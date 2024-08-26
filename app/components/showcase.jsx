"use client";

import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Cookies from "js-cookie";import Image from 'next/image'; // Import the Image component

// Initialize Stripe
const stripePromise = loadStripe("pk_test_51Pr0cN1JjEMfH4eCCsoaHjxTmOQ7tFPnAkjtsuqPvbUH5cUyegAgmEcc1G6qHldgR8Xb6Sp7Il6aPW8I0NPTkwZH00sJCyomYs");

// Replace this with your actual Price ID from Stripe
const priceId = "price_1Ps2sD1JjEMfH4eCJvwlJ7kJ"; // Example Price ID

const product = {
  title: "Heated Gloves",
  description:
    "Heated Gloves: Stay warm and comfortable with our premium heated gloves, perfect for cold weather. Designed for outdoor activities like skiing, hiking, and more, these gloves provide reliable warmth and comfort in even the harshest conditions.",
  mainImageUrl: "/images/glove.png",
  gallery: [
    "/images/gloves2.png",
    "/images/gloves3.png",
    "/images/gloves4.png",
  ],
  price: "$54.99",
};

export default function Showcase({ addToCart }) {
  const [selectedImage, setSelectedImage] = useState(product.mainImageUrl);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (type) => {
    setQuantity((prevQuantity) =>
      type === "increment" ? prevQuantity + 1 : Math.max(1, prevQuantity - 1)
    );
  };

  const handleBuyNow = async () => {
    if (quantity < 1) {
      alert("Please select a quantity of at least 1");
      return;
    }

    const stripe = await stripePromise;

    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: priceId, // Use the pre-configured Price ID from Stripe
          quantity,
        },
      ],
      mode: "payment",
      successUrl: window.location.origin + "/success",
      cancelUrl: window.location.origin + "/cancel",
    });

    if (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div id="showcase" className="py-12 bg-gray-100">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center md:items-start justify-between">
        {/* Product Details */}
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-4xl font-extrabold text-left text-gray-900 mb-6">
            {product.title}
          </h2>
          <p className="text-lg text-left text-gray-700 mb-4 max-w-xl">
            {product.description}
          </p>
          <p className="text-3xl font-bold text-left mb-8 text-gray-900">
            {product.price}
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center mb-8">
            <button
              className="px-4 py-2 text-lg font-bold bg-gray-300 hover:bg-gray-400 rounded-l focus:outline-none"
              onClick={() => handleQuantityChange("decrement")}
            >
              -
            </button>
            <span className="px-6 py-2 text-lg font-bold text-gray-900 bg-white border border-gray-300">
              {quantity}
            </span>
            <button
              className="px-4 py-2 text-lg font-bold bg-gray-300 hover:bg-gray-400 rounded-r focus:outline-none"
              onClick={() => handleQuantityChange("increment")}
            >
              +
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-6">
            <button
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded shadow transition-transform transform hover:scale-105 focus:outline-none"
              onClick={() => addToCart(product, quantity)}
            >
              Add to Cart
            </button>
            <button
              className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded shadow transition-transform transform hover:scale-105 focus:outline-none"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>

        <div>
        <div className="md:w-1/2 flex flex-col items-center">
          <div className="w-full max-w-lg mb-8">
            <Image
              src={selectedImage}
              alt={product.title}
              width={500} // Specify width
              height={500} // Specify height
              className="w-full h-auto object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105"
            />
          </div>

          <div className="flex space-x-4">
            {product.gallery.map((imageUrl, index) => (
              <Image
                key={index}
                src={imageUrl}
                alt={`${product.title} ${index + 1}`}
                width={96} // Specify width
                height={96} // Specify height
                className={`w-24 h-24 object-cover rounded-lg cursor-pointer shadow-md transition-transform transform hover:scale-105 ${
                  selectedImage === imageUrl ? "border-4 border-blue-500" : ""
                }`}
                onClick={() => setSelectedImage(imageUrl)}
              />
            ))}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
