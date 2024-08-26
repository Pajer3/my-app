"use client";

import React, { useEffect, useRef } from 'react';

export default function Description() {
  const descriptionRef = useRef(null);

  useEffect(() => {
    const currentRef = descriptionRef.current;

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
    <section ref={descriptionRef} className="py-16 bg-white transform translate-x-4 opacity-0">
      <div className="container mx-auto px-4">
        <div className="border-l-4 border-yellow-500 pl-8">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Heating Thermostat Gloves</h2>
          <p className="text-lg text-gray-700 mb-6">
            Our heating thermostat gloves are designed to keep you warm and comfortable in any cold environment. With a
            sleek design and advanced features, these gloves are perfect for outdoor activities like skiing, motorcycling,
            and more.
          </p>
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-gray-800">Material</h3>
            <p className="text-lg text-gray-700">Nylon + Cotton</p>
          </div>
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-gray-800">Product Attributes</h3>
            <ul className="list-disc list-inside text-lg text-gray-700">
              <li>Battery: 1.5V/3</li>
              <li>Package Size: 240*180*170(1mm); 310*180*90(1mm)</li>
              <li>Name: Heating thermostat gloves</li>
              <li>Size: L</li>
              <li>Features: Waterproof, Warmth, Non-slip, Touch screen</li>
              <li>Holding Time: Constant temperature about 3-6 hours</li>
              <li>Scene: Motorcycle, Skiing, Outdoor activities</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">Size Information</h3>
            <p className="text-lg text-gray-700">L width: 8-10cm, Palm circumference 19-23cm</p>
          </div>
        </div>
      </div>
    </section>
  );
}
