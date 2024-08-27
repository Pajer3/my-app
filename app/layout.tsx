// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Page from "./page"; // Import the Client-side layout
import Head from "next/head"; // Import Next.js Head for additional SEO tags

export const metadata: Metadata = {
  title: "Heating Gloves - Stay Warm in Extreme Conditions",
  description: "Discover our advanced heating gloves, designed for maximum comfort and warmth in the harshest environments. Ideal for outdoor activities like skiing, hiking, and snowboarding.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        {/* Basic SEO Metadata */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metadata.description || "Default description"} />
        <meta name="keywords" content="heating gloves, heated gloves, winter gloves, outdoor sports, skiing gloves, hiking gloves, snowboarding gloves" />
        <meta name="author" content="Your Brand Name" />
        
        {/* Open Graph Metadata */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://heatinggloves.shop" />
        <meta property="og:title" content={metadata.title?.toString() || "Default title"} />
        <meta property="og:description" content={metadata.description || "Default description"} />
        <meta property="og:image" content="https://heatinggloves.shop/images/heating-gloves.jpg" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
        
        {/* Twitter Card Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="https://x.com/HeatingGloves_" />
        <meta name="twitter:title" content={metadata.title?.toString() || "Default title"} />
        <meta name="twitter:description" content={metadata.description || "Default description"} />
        <meta name="twitter:image" content="https://x.com/HeatingGloves_/photo" />
      </Head>
      <body>
        <Page>
          {children}
        </Page>
      </body>
    </html>
  );
}
