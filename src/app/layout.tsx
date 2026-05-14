import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aether News | Cyberpunk Tech Updates",
  description: "Real-time intelligence from the frontier of technology, AI, and the automotive sector.",
  other: {
    // Monetag site verification
    monetag: "61b182f4a72e0a91030a3028343e6e7f",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Monetag site verification */}
        <meta name="monetag" content="61b182f4a72e0a91030a3028343e6e7f" />
        {/* Global Monetag Script */}
        <Script
          id="monetag-global"
          strategy="afterInteractive"
          src="https://quge5.com/88/tag.min.js"
          data-zone="239048"
          data-cfasync="false"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
