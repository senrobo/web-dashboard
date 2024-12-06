import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Toaster } from "@/components/ui/sonner";

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
        <Toaster richColors />
      </body>
    </html>
  );
}
