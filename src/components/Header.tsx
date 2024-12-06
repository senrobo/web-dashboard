import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Moon, Sun, List } from "lucide-react";
import { DrawerTrigger } from "@/components/ui/drawer";

type HeaderProps = {
  esp32Ip: string;
  setEsp32Ip: (ip: string) => void;
  isConnected: boolean;
  isFetching: boolean;
  fetchTelemetry: () => void;
  disconnectEsp32: () => void;
  toggleTheme: () => void;
  theme: string;
};

export const Header: React.FC<HeaderProps> = ({
  esp32Ip,
  setEsp32Ip,
  isConnected,
  isFetching,
  fetchTelemetry,
  disconnectEsp32,
  toggleTheme,
  theme,
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold">Telemetry Dashboard</h1>
      <div className="flex items-center gap-4">
        <Input
          placeholder="Enter ESP32 IP"
          value={esp32Ip}
          onChange={(e) => setEsp32Ip(e.target.value)}
          className="w-48"
        />
        {!isConnected ? (
          <Button onClick={fetchTelemetry} disabled={isFetching}>
            Connect
          </Button>
        ) : (
          <Button onClick={disconnectEsp32} variant="destructive">
            Disconnect
          </Button>
        )}
        <DrawerTrigger asChild>
          <Button variant="outline" disabled={!isConnected}>
            <List />
          </Button>
        </DrawerTrigger>
        <Button onClick={toggleTheme} variant="ghost">
          {theme === "light" ? <Moon /> : <Sun />}
        </Button>
      </div>
    </div>
  );
};
