"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faInfoCircle,
  faTruck,
  faQuestionCircle,
  faFileAlt,
  faBars,
  faTimes,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutMessage from "./CheckoutMessage";


// Initialize Stripe
const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

if (!stripePublicKey) {
  throw new Error("Stripe public key is missing in the environment variables");
}

const stripePromise = loadStripe(stripePublicKey);

type CartItem = {
  title: string;
  description: string;
  mainImageUrl: string;
  gallery: string[];
  price: string;
  quantity: number;
};

type HeaderProps = {
  cartItems: CartItem[];
  updateCartItemQuantity: (title: string, newQuantity: number) => void;
};

export default function Header({
  cartItems,
  updateCartItemQuantity,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const toggleTermsModal = () => {
    setTermsOpen(!termsOpen);
    if (!termsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
        setCartOpen(false);
      }
    };

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.getBoundingClientRect().top + window.scrollY - 70,
        behavior: "smooth",
      });
    }
    setMenuOpen(false);
  };

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    if (!stripe) {
        console.error("Stripe failed to load.");
        alert("Something went wrong. Please try again later.");
        return;
    }

    const lineItems = cartItems.map((item) => ({
        price: "price_1PsTQ11JjEMfH4eC7UT4Oj9N", // Correct Price ID
        quantity: item.quantity,
    }));

    const { error } = await stripe.redirectToCheckout({
        lineItems,
        mode: "payment",
        successUrl: window.location.origin + "/#success",
        cancelUrl: window.location.origin + "/#cancel",
    });

    if (error) {
        console.error("Error:", error);
        window.location.href = window.location.origin + "/#cancel";
    }
};


  return (
    <><CheckoutMessage />
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-opacity-90 shadow-lg" : "bg-opacity-100"} bg-[rgb(3,14,37)] text-[#f7fafc] p-4`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-pink-500 to-yellow-500 drop-shadow-lg">
            HeatingGloves
          </h1>
        </Link>
        <div className="flex items-center space-x-4">
          <button
            className="md:hidden text-[#f7fafc] focus:outline-none z-50"
            onClick={toggleMenu}
          >
            <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} size="lg" />
          </button>
        </div>
        <nav
          className={`${menuOpen ? "translate-x-0" : "-translate-x-full"} fixed top-0 left-0 w-full h-full bg-[rgb(3,14,37)] flex flex-col items-center justify-center z-40 transform transition-transform duration-500 ease-in-out md:relative md:translate-x-0 md:flex md:flex-row md:space-x-4 md:h-auto md:w-auto md:top-auto md:left-auto`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-4 space-y-8 md:space-y-0 items-center">
            <li>
              <a
                href="#hero"
                onClick={(e) => handleSmoothScroll(e, "#hero")}
                className="text-[#f7fafc] hover:text-[#1a202c] hover:bg-[#f6ad55] px-6 py-4 rounded-md transition-all duration-300 ease-in-out flex items-center space-x-2"
              >
                <FontAwesomeIcon icon={faHome} className="text-[#f6ad55]" />
                <span>Home</span>
              </a>
            </li>
            <li>
              <a
                href="#about"
                onClick={(e) => handleSmoothScroll(e, "#about")}
                className="text-[#f7fafc] hover:text-[#1a202c] hover:bg-[#f6ad55] px-6 py-4 rounded-md transition-all duration-300 ease-in-out flex items-center space-x-2"
              >
                <FontAwesomeIcon icon={faInfoCircle} className="text-[#f6ad55]" />
                <span>About</span>
              </a>
            </li>
            <li>
              <a
                href="#shipping"
                onClick={(e) => handleSmoothScroll(e, "#shipping")}
                className="text-[#f7fafc] hover:text-[#1a202c] hover:bg-[#f6ad55] px-6 py-4 rounded-md transition-all duration-300 ease-in-out flex items-center space-x-2"
              >
                <FontAwesomeIcon icon={faTruck} className="text-[#f6ad55]" />
                <span>Shipping</span>
              </a>
            </li>
            <li>
              <a
                href="#help"
                onClick={(e) => handleSmoothScroll(e, "#help")}
                className="text-[#f7fafc] hover:text-[#1a202c] hover:bg-[#f6ad55] px-6 py-4 rounded-md transition-all duration-300 ease-in-out flex items-center space-x-2"
              >
                <FontAwesomeIcon icon={faQuestionCircle} className="text-[#f6ad55]" />
                <span>Help</span>
              </a>
            </li>
            <li>
              <button
                onClick={toggleTermsModal}
                className="text-[#f7fafc] hover:text-[#1a202c] hover:bg-[#f6ad55] px-6 py-4 rounded-md transition-all duration-300 ease-in-out flex items-center space-x-2"
              >
                <FontAwesomeIcon icon={faFileAlt} className="text-[#f6ad55]" />
                <span>Terms</span>
              </button>
            </li>
            <button
              className="text-[#f7fafc] focus:outline-none z-50 relative px-6 py-4"
              onClick={toggleCart}
            >
              <FontAwesomeIcon icon={faShoppingCart} size="lg" />
              <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full px-1">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            </button>
          </ul>
        </nav>
      </div>

      {termsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-[rgb(3,14,37)] text-[#f7fafc] p-6 rounded-lg max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Terms and Conditions</h2>
              <button onClick={toggleTermsModal} className="focus:outline-none">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="overflow-y-auto max-h-96">
              <p className="mb-4">
                Welcome to HeatingGloves.shop! These terms and conditions
                outline the rules and regulations for the use of our website and
                services.
              </p>
              <p className="mb-4">
                By placing an order on HeatingGloves.shop, you agree to these
                terms and conditions.
              </p>
              <h3 className="text-xl font-bold mb-2">Order Agreement</h3>
              <p className="mb-4">
                By placing an order, you agree to comply with and be bound by
                these terms. All sales are final, and no refunds will be
                provided unless you have a legitimate reason as determined by
                HeatingGloves.shop.
              </p>
              <p className="mb-4">
                If your order takes longer than 3 months to arrive, you are
                eligible for a full refund. For any queries or concerns,
                contact us at{" "}
                <a href="mailto:info@heatinggloves.shop" className="underline">
                  info@heatinggloves.shop
                </a>
                .
              </p>
              <h3 className="text-xl font-bold mb-2">Returns and Refunds</h3>
              <p className="mb-4">
                Returns are only accepted if the product is defective or does
                not match the description. The product must be returned in its
                original condition within 30 days of receipt.
              </p>
              <p className="mb-4">
                Refunds are not provided for change of mind or incorrect orders.
                If a refund is granted, it will be processed back to the
                original payment method within 14 days of approval.
              </p>
              <h3 className="text-xl font-bold mb-2">Liability</h3>
              <p className="mb-4">
                HeatingGloves.shop is not responsible for any damage or loss
                caused by the improper use of our products. It is the buyer&apos;s
                responsibility to follow all safety guidelines provided.
              </p>
              <h3 className="text-xl font-bold mb-2">Shipping</h3>
              <p className="mb-4">
                We are not responsible for delays caused by the shipping
                carrier. However, if your order takes longer than 3 months, you
                are entitled to a refund.
              </p>
              <h3 className="text-xl font-bold mb-2">Governing Law</h3>
              <p className="mb-4">
                These terms are governed by and construed in accordance with the
                laws of the jurisdiction in which HeatingGloves.shop operates.
              </p>
              <p className="mb-4">
                By continuing to use our services, you consent to these terms
                and any updates made to them.
              </p>
            </div>
          </div>
        </div>
      )}

      <div
        className={`fixed top-0 right-0 w-80 h-full bg-[rgb(3,14,37)] text-[#f7fafc] z-50 transform transition-transform duration-500 ease-in-out ${cartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <button onClick={toggleCart} className="focus:outline-none">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="p-4">
          {cartItems.length > 0 ? (
            <>
              <ul>
                {cartItems.map((item, index) => (
                  <li key={index} className="mb-4">
                    <div className="flex justify-between items-center">
                      <span>{item.title}</span>
                      <div className="flex items-center">
                        <button
                          onClick={() => updateCartItemQuantity(item.title, item.quantity - 1)}
                          className="px-2 py-1 bg-gray-300 text-black rounded-l"
                          disabled={item.quantity === 1}
                        >
                          -
                        </button>
                        <span className="px-4 py-1 bg-white text-black border">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartItemQuantity(item.title, item.quantity + 1)}
                          className="px-2 py-1 bg-gray-300 text-black rounded-r"
                        >
                          +
                        </button>
                      </div>
                      <span>
                        {(
                          item.quantity *
                          parseFloat(item.price.replace("$", ""))
                        ).toFixed(2)}
                        $
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
                <p className="text-sm text-gray-400 mt-2 text-center">
                  By placing your order, you agree to our{" "}
                  <button onClick={toggleTermsModal} className="underline">
                    terms and conditions
                  </button>
                  .
                </p>
              </div>
            </>
          ) : (
            <p className="text-lg">Your cart is empty.</p>
          )}
        </div>
      </div>
    </header></>
  );
}
