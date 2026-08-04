import type { Metadata } from "next";
import { Inter, Manrope, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body"
})

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-heading"
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono"
})

export const metadata: Metadata = {
  title: "Korverna Limited",
  description: "Building businesses that build tomorrow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} ${geistMono.variable} 
      h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>

          {children}
          
        </Providers>
      </body>
    </html>
  );
}
