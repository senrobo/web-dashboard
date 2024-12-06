"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Sun, Moon, List } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import * as XLSX from "xlsx";

const FieldVisualization = dynamic(
  () => import("@/components/FieldVisualisation"),
  { ssr: false }
);

type LogEntry = {
  time: string;
  vx: number;
  vy: number;
  angularVelocity: number;
  xPosition: number;
  yPosition: number;
  ballX: number;
  ballY: number;
};

export default function Home() {
  const [telemetryData, setTelemetryData] = useState({
    robot: {
      position: { x: 0, y: 0 },
      orientation: 0,
    },
    ball: {
      position: { x: 0, y: 0 },
    },
    velocities: {
      vx: 0,
      vy: 0,
      angularVelocity: 0,
    },
  });
  const [esp32Ip, setEsp32Ip] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [theme, setTheme] = useState("light");
  const [isLogging, setIsLogging] = useState(false);
  const [logData, setLogData] = useState<LogEntry[]>([]);

  const fetchTelemetry = async () => {
    if (!esp32Ip) {
      toast.error("Please enter a valid ESP32 IP address.");
      return;
    }

    setIsFetching(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
      toast.error("Connection timed out. Unable to connect to ESP32.");
      setIsFetching(false);
    }, 3000); // 5 seconds timeout

    try {
      const response = await fetch(`http://${esp32Ip}/telemetry`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId); // Clear the timeout if the fetch succeeds

      if (response.ok) {
        const data = await response.json();

        setTelemetryData({
          robot: {
            position: {
              x: data.xPosition || 0,
              y: data.yPosition || 0,
            },
            orientation: data.bearing || 0,
          },
          ball: {
            position: {
              x: data.ballX || 0,
              y: data.ballY || 0,
            },
          },
          velocities: {
            vx: data.vx || 0,
            vy: data.vy || 0,
            angularVelocity: data.angularVelocity || 0,
          },
        });

        const timestampedData: LogEntry = {
          time: new Date().toLocaleTimeString(),
          vx: data.vx || 0,
          vy: data.vy || 0,
          angularVelocity: data.angularVelocity || 0,
          xPosition: data.xPosition || 0,
          yPosition: data.yPosition || 0,
          ballX: data.ballX || 0,
          ballY: data.ballY || 0,
        };

        setLogData((prev) => [...prev, timestampedData]);

        if (!isConnected) {
          setIsConnected(true);
          toast.success("Connected to ESP32 successfully!");
        }
      } else {
        if (isConnected) {
          toast.error(`ESP32 Connection Failed: HTTP ${response.status}`);
          setIsConnected(false);
        }
      }
    } catch (error) {
      if (error.name === "AbortError") {
        console.warn("Fetch aborted due to timeout.");
      } else {
        if (isConnected) {
          toast.error("Unable to connect to ESP32.");
          setIsConnected(false);
        }
        console.error("Fetch Error:", error);
      }
    } finally {
      setIsFetching(false);
    }
  };

  const disconnectEsp32 = () => {
    setIsConnected(false);
    setTelemetryData({
      robot: {
        position: { x: 0, y: 0 },
        orientation: 0,
      },
      ball: {
        position: { x: 0, y: 0 },
      },
      velocities: {
        vx: 0,
        vy: 0,
        angularVelocity: 0,
      },
    });
    toast.error("Disconnected from ESP32.");
  };

  useEffect(() => {
    if (esp32Ip && isConnected) {
      const interval = setInterval(fetchTelemetry, 1000);
      return () => clearInterval(interval);
    }
  }, [esp32Ip, isConnected]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const startLogging = () => {
    if (isLogging) {
      const worksheet = XLSX.utils.json_to_sheet(logData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Telemetry Logs");
      XLSX.writeFile(workbook, "telemetry_logs.xlsx");
      toast("Log saved as telemetry_logs.xlsx!");
    }
    setIsLogging(!isLogging);
  };

  const robotFields = [
    {
      key: "xPosition",
      title: "X Position",
      unit: "cm",
      value: telemetryData.robot.position.x,
    },
    {
      key: "yPosition",
      title: "Y Position",
      unit: "cm",
      value: telemetryData.robot.position.y,
    },
    {
      key: "bearing",
      title: "Bearing",
      unit: "°",
      value: telemetryData.robot.orientation,
    },
  ];

  const ballFields = [
    {
      key: "ballX",
      title: "Ball X",
      unit: "cm",
      value: telemetryData.ball.position.x,
    },
    {
      key: "ballY",
      title: "Ball Y",
      unit: "cm",
      value: telemetryData.ball.position.y,
    },
    { key: "ballDistance", title: "Ball Distance", unit: "cm", value: 50.0 },
  ];

  const velocities = [
    {
      key: "vx",
      title: "Vx",
      unit: "cm/s",
      value: telemetryData.velocities.vx,
    },
    {
      key: "vy",
      title: "Vy",
      unit: "cm/s",
      value: telemetryData.velocities.vy,
    },
    {
      key: "angularVelocity",
      title: "Angular Velocity",
      unit: "rad/s",
      value: telemetryData.velocities.angularVelocity,
    },
  ];

  return (
    <>
      <div className="p-6 flex flex-col items-center">
        <div className="w-full max-w-6xl">
          {/* Header */}
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
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline" disabled={!isConnected}>
                    <List />
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="mx-auto w-full max-w-fit">
                    <DrawerHeader>
                      <DrawerTitle>Data Logging</DrawerTitle>
                      <DrawerDescription>
                        View and log raw telemetry data.
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                      <pre className="bg-muted p-4 rounded text-sm overflow-auto h-64">
                        {logData
                          .map(
                            (log, index) =>
                              `Time: ${log.time}, Vx: ${log.vx}, Vy: ${log.vy}, Angular: ${log.angularVelocity}, X: ${log.xPosition}, Y: ${log.yPosition}, BallX: ${log.ballX}, BallY: ${log.ballY}`
                          )
                          .join("\n")}
                      </pre>
                    </div>
                    <DrawerFooter>
                      <Button
                        onClick={startLogging}
                        variant={isLogging ? "destructive" : "default"}
                      >
                        {isLogging ? "Stop Logging" : "Start Logging"}
                      </Button>
                      <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </div>
                </DrawerContent>
              </Drawer>
              <Button onClick={toggleTheme} variant="ghost">
                {theme === "light" ? <Moon /> : <Sun />}
              </Button>
            </div>
          </div>

          {/* Velocities Section */}
          <div className="mb-8">
            <h2 className="text-xl mb-4">Velocities</h2>
            <div className="grid grid-cols-3 gap-4">
              {velocities.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="font-bold">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xl">
                      {item.value.toFixed(2)} {item.unit}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Field Data Section */}
          <div>
            <h2 className="text-xl mb-4">Field Data</h2>
            <div className="grid grid-cols-3 gap-4 mb-4">
              {robotFields.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="font-bold">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xl">
                      {item.value.toFixed(2)} {item.unit}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
              {ballFields.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="font-bold">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xl">
                      {item.value.toFixed(2)} {item.unit}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      <FieldVisualization telemetryData={telemetryData} />
    </>
  );
}
