"use client";

import React, { useEffect, useRef } from 'react';

export default function Help() {
  const helpRef = useRef(null);

  useEffect(() => {
    const currentRef = helpRef.current;

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
    <section
      id="help"
      ref={helpRef}
      className="relative py-20 bg-gradient-to-r from-green-900 via-teal-800 to-blue-900 text-white transform translate-x-4 opacity-0"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl font-extrabold mb-10">How Can We Help?</h2>
          <p className="text-xl mb-12 leading-relaxed">
            Whether you have a question about our products, an order issue, or anything else, we&apos;re here to help. Browse
            through our FAQs or reach out to us directly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* FAQ Section */}
          <div className="bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-lg">
            <h3 className="text-3xl font-bold mb-6">Frequently Asked Questions</h3>
            <ul className="space-y-4 text-lg leading-relaxed">
              <li>
                <strong>How do I track my order?</strong>
                <p className="text-gray-300">
                  You can track your order using the tracking link provided in your order confirmation email. If you didn&apos;t
                  receive an email, please check your spam folder or contact us directly.
                </p>
              </li>
              <li>
                <strong>What is your return policy?</strong>
                <p className="text-gray-300">
                  We offer a 30-day return policy for all unused items. Please visit our returns page for more information
                  and instructions on how to initiate a return.
                </p>
              </li>
              <li>
                <strong>Do you ship internationally?</strong>
                <p className="text-gray-300">
                  Yes, we ship to many countries around the world. Shipping rates and times vary depending on your location.
                  Please see our shipping page for more details.
                </p>
              </li>
              <li>
                <strong>How can I contact customer support?</strong>
                <p className="text-gray-300">
                  You can contact our customer support team via email at support@warmhandwear.com or by calling our hotline at
                  1-800-WARM-HANDS. We&apos;re here to help!
                </p>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-lg">
            <h3 className="text-3xl font-bold mb-6">Contact Us</h3>
            <p className="text-lg leading-relaxed mb-6">
              Need further assistance? Reach out to our support team, and we’ll get back to you as soon as possible.
            </p>
            <div className="space-y-4">
              <p>
                <strong>Email:</strong> <a href="mailto:support@warmhandwear.com" className="text-yellow-300">support@warmhandwear.com</a>
              </p>
              <p>
                <strong>Phone:</strong> <a href="tel:1800WARMHANDS" className="text-yellow-300">1-800-WARM-HANDS</a>
              </p>
              <p>
                <strong>Address:</strong> 123 Warm Street, Cozy City, 98765
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
