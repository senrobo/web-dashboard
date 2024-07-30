import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import { cn } from "@/lib/utils";

import "./globals.css";

export const metadata: Metadata = {
  title: "Web Telemetry | Sentinels Robotics",
  description: "Web Telemetry To Tweak And Refine Robot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          `${GeistSans.variable} ${GeistMono.variable} min-h-screen bg-background font-sans antialiased`
        )}
      >
        {children}
      </body>
    </html>
  );
}
