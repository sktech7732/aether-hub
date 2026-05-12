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
  title: "AetherHub | Cyberpunk AI Tools",
  description: "A premium unified platform for AI video processing and futuristic gaming.",
  other: {
    // Monetag site verification
    monetag: "3330237",
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
        <meta name="monetag" content="3330237" />
        {/* Monetag ad script */}
        <Script
          id="monetag-ads"
          strategy="afterInteractive"
          src="https://bountiesworks.com/tag.min.js"
          data-zone="3330237"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
