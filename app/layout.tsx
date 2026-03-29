import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Fuel Finder",
  description: "Find nearby petrol stations and compare live-ready fuel prices."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
