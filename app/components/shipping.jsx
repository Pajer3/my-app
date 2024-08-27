"use client";

import React, { useEffect, useRef } from 'react';

export default function Shipping() {
  const shippingRef = useRef(null);

  useEffect(() => {
    const currentRef = shippingRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section id="shipping" ref={shippingRef} className="py-16 bg-gray-200 transform translate-x-4 opacity-0">
      <div className="container mx-auto px-4">
        <div className="border-l-4 border-green-500 pl-8">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Shipping Information</h2>
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-gray-800">Estimated Processing Time</h3>
            <p className="text-lg text-gray-700">1-3 days for 80% of orders</p>
          </div>
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-gray-800">Estimated Delivery Time</h3>
            <p className="text-lg text-gray-700">12-25 days</p>
          </div>
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-gray-800">Shipping Fee</h3>
            <p className="text-lg text-gray-700">$3.42 - $9.20</p>
          </div>
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-gray-800">Additional Information</h3>
            <ul className="list-disc list-inside text-lg text-gray-700">
              <li>Tracking is available for all orders.</li>
              <li>International shipping is available, but delivery times may vary depending on the destination.</li>
              <li>Please allow extra time during holidays or for custom items.</li>
              <li>If you have any issues with your order, our customer service team is here to help.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
