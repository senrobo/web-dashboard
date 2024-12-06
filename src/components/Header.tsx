"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sun, Moon, Github } from "lucide-react";
import { toast } from "sonner";

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const [esp32Ip, setEsp32Ip] = useState(""); // Default is empty

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [isDark]);

  // Function to check connection to ESP32
  const checkConnection = async () => {
    if (!esp32Ip) {
      toast.error("ESP32 IP address is empty");
      return;
    }

    try {
      const response = await fetch(`http://${esp32Ip}/telemetry`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Connected to ESP32!");
        console.log("Connected to ESP32");
      } else {
        toast.error(`Failed to connect to ESP32: HTTP ${response.status}`);
        console.error("Failed to connect to ESP32");
      }
    } catch (error) {
      toast.error("Error connecting to ESP32");
      console.error("Error connecting to ESP32:", error);
    }
  };

  return (
    <header className="w-full bg-background border-b border-border py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo or Title */}
        <div className="text-lg font-bold text-foreground">
          <Link href="/">Telemetry Dashboard</Link>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-6">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Dashboard
          </Link>
          <Link
            href="/raw-data"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Raw Data
          </Link>
          <Link
            href="/logs"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Logs
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          {/* ESP32 IP Input */}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={esp32Ip}
              onChange={(e) => setEsp32Ip(e.target.value)}
              placeholder="Enter ESP32 IP"
              className="w-40 px-3 py-1 border border-border rounded text-sm bg-card text-foreground"
            />
            <button
              onClick={checkConnection}
              className="px-4 py-1 text-sm font-medium rounded bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Connect
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded text-muted-foreground hover:text-foreground"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          {/* GitHub Link */}
          <Link
            href="https://github.com/your-github-repo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <Github className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
