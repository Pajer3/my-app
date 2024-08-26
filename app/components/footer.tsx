"use client";

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="container mx-auto px-4">
        {/* Top section with multiple columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-3xl font-extrabold text-white mb-4">Warm Handwear</h3>
            <p className="text-gray-400">
              At Warm Handwear, we provide warmth and comfort through innovative handwear designed to withstand the coldest environments. Our mission is to ensure that you can enjoy the outdoors, no matter the temperature.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/about" className="hover:text-white">About Us</a></li>
              <li><a href="/shipping" className="hover:text-white">Shipping Info</a></li>
              <li><a href="/help" className="hover:text-white">Help Center</a></li>
              <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
              <li><a href="/faqs" className="hover:text-white">FAQs</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-xl font-bold text-white mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><a href="/returns" className="hover:text-white">Returns & Exchanges</a></li>
              <li><a href="/shipping" className="hover:text-white">Shipping Policy</a></li>
              <li><a href="/track" className="hover:text-white">Track Your Order</a></li>
              <li><a href="/support" className="hover:text-white">Support</a></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="text-xl font-bold text-white mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates on products and promotions.
            </p>
            <form>
              <div className="flex mb-4">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full px-3 py-2 rounded-l-lg bg-gray-800 text-gray-300 placeholder-gray-500 border-none focus:ring-2 focus:ring-yellow-500"
                />
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-yellow-500 rounded-r-lg text-gray-900 font-bold hover:bg-yellow-600"
                >
                  Subscribe
                </button>
              </div>
            </form>
            <p className="text-gray-400 text-sm">
              By subscribing, you agree to receive our newsletters and agree with our <a href="/privacy" className="hover:text-white underline">Privacy Policy</a>.
            </p>
          </div>
        </div>

        {/* Bottom section with social links and legal info */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Social Media Links */}
            <div className="flex space-x-6 mb-8 md:mb-0">
              <a href="#" className="hover:text-white">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="hover:text-white">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="hover:text-white">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" className="hover:text-white">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
              <a href="mailto:support@warmhandwear.com" className="hover:text-white">
                <FontAwesomeIcon icon={faEnvelope} />
              </a>
            </div>

            {/* Legal Info */}
            <div className="text-center text-sm text-gray-500">
              <p>&copy; {new Date().getFullYear()} Warm Handwear. All rights reserved.</p>
              <p className="mt-2">
                <a href="/terms" className="hover:text-white">Terms of Service</a> | 
                <a href="/privacy" className="hover:text-white ml-2">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
