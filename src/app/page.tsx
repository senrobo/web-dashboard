"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

import { Input } from "@/components/ui/input"; // Import Input component
import dynamic from "next/dynamic";

const FieldVisualization = dynamic(
  () => import("@/components/FieldVisualisation"),
  { ssr: false }
);

export default function Home() {
  const [ipAddress, setIpAddress] = useState("0.0.0.0"); // Default ESP32 IP
  const [isConnected, setIsConnected] = useState(false); // Connection status
  const [telemetryData, setTelemetryData] = useState({
    robot: {
      position: { x: 0, y: 0 }, // Robot position in cm
      orientation: 0, // Robot orientation in degrees
    },
    ball: {
      position: { x: 0, y: 0 }, // Ball position in cm
    },
    velocities: {
      vx: 0, // Velocity in X direction (cm/s)
      vy: 0, // Velocity in Y direction (cm/s)
      angularVelocity: 0, // Angular velocity (rad/s)
    },
  });

  useEffect(() => {
    const fetchTelemetry = async () => {
      try {
        const response = await fetch(`http://${ipAddress}/telemetry`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Received telemetry data:", data);

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

          if (!isConnected) {
            setIsConnected(true);
            toast.success("Connected to ESP32!");
          }
        } else {
          throw new Error("HTTP Error " + response.status);
        }
      } catch (error) {
        console.error("Failed to fetch telemetry data:", error);
        if (isConnected) {
          setIsConnected(false);
          toast.error("Disconnected from ESP32!");
        }
      }
    };

    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 1000);

    return () => clearInterval(interval);
  }, [ipAddress, isConnected]);

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
      <div className="p-6 flex justify-center font-mono">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Telemetry Dashboard</h1>
            <div className="flex items-center gap-4">
              <Input
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
                placeholder="Enter ESP32 IP Address"
              />
              <div
                className={`w-4 h-4 rounded-full ${
                  isConnected ? "bg-green-500" : "bg-red-500"
                }`}
                title={isConnected ? "Connected" : "Disconnected"}
              />
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
