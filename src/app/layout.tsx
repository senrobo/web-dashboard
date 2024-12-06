import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export const metadata: Metadata = {
  title: "Telementry",
  description: "Sentinels Robotics Telementry",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased ${GeistSans.variable} ${GeistMono.variable} `}
      >
        {children}
      </body>
    </html>
  );
}
