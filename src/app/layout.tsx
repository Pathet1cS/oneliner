import type { Metadata } from "next";
import { Pixelify_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const pixelify = Pixelify_Sans({
  subsets: ["latin"],
  variable: "--font-pixelify",
});

export const metadata: Metadata = {
  title: "Enileno",
  description: "Enileno application",
  icons: {
    icon: "/enileno_logo.png",
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
      className={`${pixelify.variable} ${pixelify.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#334173] text-white">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
