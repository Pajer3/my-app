// /app/layout.tsx
"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./globals.css";
import Header from './components/header';
import Hero from './components/hero';
import Showcase from './components/showcase';
import Description from './components/description';
import Shipping from './components/shipping';
import About from './components/about';
import Help from './components/help';
import Footer from './components/footer';

type CartItem = {
  title: string;
  description: string;
  mainImageUrl: string;
  gallery: string[];
  price: string;
  quantity: number;
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Load cart items from cookies when the component mounts
    const savedCartItems = Cookies.get('cartItems');
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);

  useEffect(() => {
    // Save cart items to cookies whenever the cart changes
    if (cartItems.length > 0) {
      Cookies.set('cartItems', JSON.stringify(cartItems), { expires: 7 });
    } else {
      Cookies.remove('cartItems');
    }
  }, [cartItems]);

  const addToCart = (product: Omit<CartItem, 'quantity'>, quantity: number) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.title === product.title);
      if (itemExists) {
        return prevItems.map((item) =>
          item.title === product.title
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
  };

  const updateCartItemQuantity = (title: string, newQuantity: number) => {
    setCartItems((prevItems) => {
      return prevItems
        .map((item) =>
          item.title === title
            ? { ...item, quantity: Math.max(1, newQuantity) }
            : item
        )
        .filter((item) => item.quantity > 0);
    });
  };

  return (
    <html lang="en">
      <body>
        <Header cartItems={cartItems} updateCartItemQuantity={updateCartItemQuantity} />
        <Hero />
        <Showcase addToCart={addToCart} />
        <Description />
        <Shipping />
        <About />
        <Help />
        <Footer />
      </body>
    </html>
  );
}
