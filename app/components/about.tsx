"use client";

import React, { useEffect, useRef } from 'react';

export default function About() {
  const aboutRef = useRef(null);

  useEffect(() => {
    const currentRef = aboutRef.current;

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
      id="about"
      ref={aboutRef}
      className="relative py-20 bg-gradient-to-r from-blue-900 via-purple-800 to-indigo-900 text-white transform translate-x-4 opacity-0"
      style={{
        backgroundImage: 'url(/images/snowymountains.jpg)', // Example background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto relative">
          {/* Optional Introductory Heading */}
          <div className="mb-8 text-center">
            <h3 className="text-2xl font-semibold text-yellow-300 uppercase tracking-wider">
              Experience the Warmth
            </h3>
          </div>

          <div className="relative border-l-8 border-yellow-500 pl-8 py-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-opacity-90 rounded-lg shadow-lg">
            <h2 className="text-5xl font-extrabold mb-6">About Us</h2>
            <p className="text-xl text-gray-200 mb-6 leading-relaxed">
              At Warm Handwear, our mission is to keep you warm, comfortable, and protected in the coldest environments.
              With our innovative heated gloves and other winter wear, we blend technology with comfort to provide you with
              the ultimate cold-weather gear.
            </p>
            <p className="text-xl text-gray-200 mb-6 leading-relaxed">
              Founded in 2021, Warm Handwear started with a simple idea: to create the most advanced heated gloves on the
              market. Since then, we&apos;ve expanded our product line to include a variety of winter accessories, each designed
              to help you enjoy the outdoors, no matter the temperature.
            </p>
            <p className="text-xl text-gray-200 mb-6 leading-relaxed">
              We believe in the power of innovation, quality, and customer satisfaction. Our products are rigorously tested
              to ensure they meet the highest standards, and we stand behind each item with a commitment to excellence.
            </p>
            <p className="text-xl text-gray-200 leading-relaxed">
              Whether you&apos;re skiing, hiking, or just trying to stay warm on your daily commute, Warm Handwear is here to keep
              you comfortable. Thank you for choosing us to be a part of your cold-weather adventures.
            </p>
          </div>
        </div>
      </div>

      {/* Left Image */}
      <img
        src="/images/Whynot.png"
        alt="Warm Handwear"
        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-16 rotate-6 w-48 h-48 object-cover rounded-lg shadow-2xl"
      />

      {/* Right Image */}
      <img
        src="/images/imlovinit.png"
        alt="Warm Handwear"
        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-16 -rotate-6 w-48 h-48 object-cover rounded-lg shadow-2xl"
      />
    </section>
  );
}
