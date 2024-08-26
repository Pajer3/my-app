// app/components/Header.tsx

"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faInfoCircle,
  faTruck,
  faQuestionCircle,
  faGlobe,
  faFileAlt,
  faBars,
  faTimes,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
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
    setMenuOpen(false); // Close the menu after click
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-opacity-90 shadow-lg" : "bg-opacity-100"
      } bg-[rgb(3,14,37)] text-[#f7fafc] p-4`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-pink-500 to-yellow-500 drop-shadow-lg">
            Warm Handwear
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
          className={`${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } fixed top-0 left-0 w-full h-full bg-[rgb(3,14,37)] flex flex-col items-center justify-center z-40 transform transition-transform duration-500 ease-in-out md:relative md:translate-x-0 md:flex md:flex-row md:space-x-4 md:h-auto md:w-auto md:top-auto md:left-auto`}
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
              <a
                href="#language"
                onClick={(e) => handleSmoothScroll(e, "#language")}
                className="text-[#f7fafc] hover:text-[#1a202c] hover:bg-[#f6ad55] px-6 py-4 rounded-md transition-all duration-300 ease-in-out flex items-center space-x-2"
              >
                <FontAwesomeIcon icon={faGlobe} className="text-[#f6ad55]" />
                <span>Language</span>
              </a>
            </li>
            <li>
              <a
                href="#terms"
                onClick={(e) => handleSmoothScroll(e, "#terms")}
                className="text-[#f7fafc] hover:text-[#1a202c] hover:bg-[#f6ad55] px-6 py-4 rounded-md transition-all duration-300 ease-in-out flex items-center space-x-2"
              >
                <FontAwesomeIcon icon={faFileAlt} className="text-[#f6ad55]" />
                <span>Terms</span>
              </a>
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

      {/* Cart Panel */}
      <div
        className={`fixed top-0 right-0 w-80 h-full bg-[rgb(3,14,37)] text-[#f7fafc] z-50 transform transition-transform duration-500 ease-in-out ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
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
                          onClick={() =>
                            updateCartItemQuantity(item.title, item.quantity - 1)
                          }
                          className="px-2 py-1 bg-gray-300 text-black rounded-l"
                          disabled={item.quantity === 1}
                        >
                          -
                        </button>
                        <span className="px-4 py-1 bg-white text-black border">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateCartItemQuantity(item.title, item.quantity + 1)
                          }
                          className="px-2 py-1 bg-gray-300 text-black rounded-r"
                        >
                          +
                        </button>
                      </div>
                      <span>
                        {(item.quantity * parseFloat(item.price.replace('$', ''))).toFixed(2)}$
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded">
                  Checkout
                </button>
              </div>
            </>
          ) : (
            <p className="text-lg">Your cart is empty.</p>
          )}
        </div>
      </div>
    </header>
  );
}
