"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faTimes, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons/faExclamationTriangle";

export default function Footer() {
  const [termsOpen, setTermsOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false); // State for the LinkedIn alert
  const [returnsOpen, setReturnsOpen] = useState(false);
  const [shippingOpen, setShippingOpen] = useState(false);
  const [trackOpen, setTrackOpen] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false); // State for fake email submission alert

  const toggleTermsModal = () => {
    setTermsOpen(!termsOpen);
    if (!termsOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling
    }
  };

  const togglePrivacyModal = () => {
    setPrivacyOpen(!privacyOpen);
    if (!privacyOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling
    }
  };

  const toggleAlert = () => {
    setAlertOpen(!alertOpen);
  };

  const toggleReturnsModal = () => {
    setReturnsOpen(!returnsOpen);
    if (!returnsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const toggleShippingModal = () => {
    setShippingOpen(!shippingOpen);
    if (!shippingOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const toggleTrackModal = () => {
    setTrackOpen(!trackOpen);
    if (!trackOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailSubmitted(true);
    setTimeout(() => {
      setEmailSubmitted(false);
    }, 3000); // Hide alert after 3 seconds
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="container mx-auto px-4">
        {/* Top section with multiple columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-3xl font-extrabold text-white mb-4">HeatingGloves</h3>
            <p className="text-gray-400">
              At HeatingGloves, we provide warmth and comfort through innovative handwear designed to withstand the coldest environments. Our mission is to ensure that you can enjoy the outdoors, no matter the temperature.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="#about" className="hover:text-white">About Us</a></li>
              <li><a href="#shipping" className="hover:text-white">Shipping Info</a></li>
              <li><a href="#help" className="hover:text-white">Help Center</a></li>
              <li><a href="#help" className="hover:text-white">Contact Us</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-xl font-bold text-white mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><button onClick={toggleReturnsModal} className="hover:text-white underline">Returns & Exchanges</button></li>
              <li><button onClick={toggleShippingModal} className="hover:text-white underline">Shipping Policy</button></li>
              <li><button onClick={toggleTrackModal} className="hover:text-white underline">Track Your Order</button></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="text-xl font-bold text-white mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates on products and promotions.
            </p>
            <form onSubmit={handleSubscribe}>
              <div className="flex mb-4">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full px-3 py-2 rounded-l-lg bg-gray-800 text-gray-300 placeholder-gray-500 border-none focus:ring-2 focus:ring-yellow-500"
                  required
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
              By subscribing, you agree to receive our newsletters and agree with our{" "}
              <button onClick={togglePrivacyModal} className="hover:text-white underline">
                Privacy Policy
              </button>.
            </p>
          </div>
        </div>

        {/* Bottom section with social links and legal info */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Social Media Links */}
            <div className="flex space-x-6 mb-8 md:mb-0">
              <a href="https://x.com/HeatingGloves_" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" onClick={toggleAlert} className="hover:text-white">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
              <a href="mailto:info@heatinggloves.shop" className="hover:text-white">
                <FontAwesomeIcon icon={faEnvelope} />
              </a>
            </div>

            {/* Legal Info */}
            <div className="text-center text-sm text-gray-500">
              <p>&copy; {new Date().getFullYear()} HeatingGloves. All rights reserved.</p>
              <p className="mt-2">
                <button onClick={toggleTermsModal} className="hover:text-white underline">
                  Terms of Service
                </button>{" "}
                |{" "}
                <button onClick={togglePrivacyModal} className="hover:text-white underline">
                  Privacy Policy
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fake Email Submitted Alert */}
      {emailSubmitted && (
        <div className="fixed bottom-4 right-4 z-50 bg-green-600 text-white p-4 rounded-lg shadow-lg flex items-center">
          <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
          <span>Email submitted successfully!</span>
          <button onClick={() => setEmailSubmitted(false)} className="ml-4 focus:outline-none">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      )}

      {/* LinkedIn Alert Modal */}
      {alertOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-red-600 text-white p-6 rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold flex items-center">
                <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
                Technical Issues
              </h2>
              <button onClick={toggleAlert} className="focus:outline-none">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <p>
              We are currently experiencing technical issues with our LinkedIn integration. Our team is working hard to resolve this as soon as possible. We apologize for the inconvenience.
            </p>
            <div className="mt-4 text-right">
              <button onClick={toggleAlert} className="bg-white text-red-600 px-4 py-2 rounded font-bold hover:bg-gray-100">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Returns & Exchanges Modal */}
      {returnsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-gray-900 text-gray-300 p-6 rounded-lg max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Returns & Exchanges</h2>
              <button onClick={toggleReturnsModal} className="focus:outline-none">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="overflow-y-auto max-h-96">
              <p className="mb-4">
                If you are not satisfied with your purchase, you may return the product within 30 days of receipt for a full refund or exchange, provided the item is in its original condition and packaging.
              </p>
              <p className="mb-4">
                Please note that returns or exchanges are not accepted for items that have been used or damaged after receipt.
              </p>
              <p className="mb-4">
                To initiate a return or exchange, please contact our customer service at{" "}
                <a href="mailto:info@heatinggloves.shop" className="underline">
                  info@heatinggloves.shop
                </a>.
              </p>
              {/* Add more returns-related information if necessary */}
            </div>
          </div>
        </div>
      )}

      {/* Shipping Policy Modal */}
      {shippingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-gray-900 text-gray-300 p-6 rounded-lg max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Shipping Policy</h2>
              <button onClick={toggleShippingModal} className="focus:outline-none">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="overflow-y-auto max-h-96">
              <p className="mb-4">
                We offer standard and express shipping options. Shipping costs vary depending on your location and the shipping method selected.
              </p>
              <p className="mb-4">
                Once your order has been processed and shipped, you will receive a confirmation email with your tracking information. Please allow 24-48 hours for the tracking information to update.
              </p>
              <p className="mb-4">
                Please note: Shipping details and updates will be sent directly to your email.
              </p>
              <p className="mb-4">
                For any shipping inquiries, please contact our customer service at{" "}
                <a href="mailto:info@heatinggloves.shop" className="underline">
                  info@heatinggloves.shop
                </a>.
              </p>
              {/* Add more shipping-related information if necessary */}
            </div>
          </div>
        </div>
      )}

      {/* Track Your Order Modal */}
      {trackOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-gray-900 text-gray-300 p-6 rounded-lg max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Track Your Order</h2>
              <button onClick={toggleTrackModal} className="focus:outline-none">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="overflow-y-auto max-h-96">
              <p className="mb-4">
                After your order has been processed and shipped, you will receive an email containing your tracking number and a link to track your order online.
              </p>
              <p className="mb-4">
                Please allow 24-48 hours for the tracking information to update after your order has been shipped.
              </p>
              <p className="mb-4">
                Please note: Tracking details will be sent directly to your email.
              </p>
              <p className="mb-4">
                For any inquiries regarding your order, please contact our customer service at{" "}
                <a href="mailto:info@heatinggloves.shop" className="underline">
                  info@heatinggloves.shop
                </a>.
              </p>
              {/* Add more tracking-related information if necessary */}
            </div>
          </div>
        </div>
      )}

      {/* Terms of Service Modal */}
      {termsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-gray-900 text-gray-300 p-6 rounded-lg max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Terms of Service</h2>
              <button onClick={toggleTermsModal} className="focus:outline-none">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="overflow-y-auto max-h-96">
              <p className="mb-4">
                Welcome to HeatingGloves! These terms and conditions outline the rules and regulations for the use of our website and services.
              </p>
              <p className="mb-4">
                By accessing this website we assume you accept these terms and conditions. Do not continue to use HeatingGloves if you do not agree to all of the terms and conditions stated on this page.
              </p>
              <h3 className="text-xl font-bold mb-2">Order Agreement</h3>
              <p className="mb-4">
                By placing an order on our website, you agree to comply with and be bound by these terms. All sales are final, and no refunds will be provided unless you have a legitimate reason as determined by HeatingGloves.
              </p>
              <p className="mb-4">
                If your order takes longer than 3 months to arrive, you are eligible for a full refund. For any queries or concerns, contact us at{" "}
                <a href="mailto:support@warmhandwear.com" className="underline">
                  support@warmhandwear.com
                </a>.
              </p>
              <h3 className="text-xl font-bold mb-2">Returns and Refunds</h3>
              <p className="mb-4">
                Returns are only accepted if the product is defective or does not match the description. The product must be returned in its original condition within 30 days of receipt.
              </p>
              <p className="mb-4">
                Refunds are not provided for change of mind or incorrect orders. If a refund is granted, it will be processed back to the original payment method within 14 days of approval.
              </p>
              <h3 className="text-xl font-bold mb-2">Liability</h3>
              <p className="mb-4">
                HeatingGloves is not responsible for any damage or loss caused by the improper use of our products. It is the buyer&apos;s responsibility to follow all safety guidelines provided.
              </p>
              <h3 className="text-xl font-bold mb-2">Shipping</h3>
              <p className="mb-4">
                We are not responsible for delays caused by the shipping carrier. However, if your order takes longer than 3 months, you are entitled to a refund.
              </p>
              <h3 className="text-xl font-bold mb-2">Governing Law</h3>
              <p className="mb-4">
                These terms are governed by and construed in accordance with the laws of the jurisdiction in which HeatingGloves operates.
              </p>
              <p className="mb-4">
                By continuing to use our services, you consent to these terms and any updates made to them.
              </p>
              {/* Add more rules as necessary */}
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {privacyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-gray-900 text-gray-300 p-6 rounded-lg max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Privacy Policy</h2>
              <button onClick={togglePrivacyModal} className="focus:outline-none">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="overflow-y-auto max-h-96">
              <p className="mb-4">
                At HeatingGloves, we are committed to protecting your privacy. This privacy policy explains how we collect, use, and disclose your personal information.
              </p>
              <h3 className="text-xl font-bold mb-2">Information We Collect</h3>
              <p className="mb-4">
                We collect information from you when you visit our site, place an order, subscribe to our newsletter, or fill out a form. The information we collect may include your name, email address, mailing address, phone number, and payment details.
              </p>
              <h3 className="text-xl font-bold mb-2">How We Use Your Information</h3>
              <p className="mb-4">
                The information we collect from you may be used in one of the following ways:
                <ul className="list-disc list-inside">
                  <li>To process transactions</li>
                  <li>To improve customer service</li>
                  <li>To send periodic emails regarding your order or other products and services</li>
                </ul>
              </p>
              <h3 className="text-xl font-bold mb-2">Data Protection</h3>
              <p className="mb-4">
                We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee its absolute security.
              </p>
              <h3 className="text-xl font-bold mb-2">Third-Party Disclosure</h3>
              <p className="mb-4">
                We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except for trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
              </p>
              <h3 className="text-xl font-bold mb-2">Your Consent</h3>
              <p className="mb-4">
                By using our site, you consent to our privacy policy. We may update our privacy policy from time to time, so please review it periodically.
              </p>
              {/* Add more privacy-related policies as necessary */}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
