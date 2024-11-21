import type { Metadata } from "next";
import localFont from "next/font/local";
import React from "react";

import "./globals.css";

// localFont function is used to load a local font file
// and to eliminate need to request external font providers

const inter = localFont({
  src: "./fonts/interVF.ttf",
  variable: "--font-inter",
  weight: "100 200 300 400 500 700 800 900",
});

const spaceGrotesk = localFont({
  src: "./fonts/spaceGroteskVF.ttf",
  variable: "--font-space-grotesk",
  weight: "300 400 500 700",
})

export const metadata: Metadata = {
  title: "DevOverflow",
  description: "A Better Version of Stack Overflow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${spaceGrotesk.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
