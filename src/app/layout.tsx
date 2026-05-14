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
      <body className="min-h-full flex flex-col">
        {children}
        {/* Force Load Monetag Script */}
        <script 
          dangerouslySetInnerHTML={{
            __html: `
              (function(d,z,s){
                s.src='https://alwingulla.com/pfe/current/tag.min.js?z='+z;
                s.async=true;
                d.body.appendChild(s);
              })(document,11002426,document.createElement('script'));
            `
          }}
        />
      </body>
    </html>
  );
}
