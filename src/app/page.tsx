"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dynamic from "next/dynamic";

const FieldVisualization = dynamic(
  () => import("@/components/FieldVisualisation"),
  { ssr: false }
);

export default function Home() {
  const telemetryData = {
    robot: {
      position: { x: 0, y: 0 }, // Robot position in cm
      orientation: 0, // Robot orientation in degrees
    },
    ball: {
      position: { x: 0, y: 0 }, // Ball position in cm
    },
  };

  const velocities = [
    { key: "vx", title: "Vx", unit: "cm/s", value: 25.5 },
    { key: "vy", title: "Vy", unit: "cm/s", value: 30.2 },
    {
      key: "angularVelocity",
      title: "Angular Velocity",
      unit: "rad/s",
      value: 0.75,
    },
  ];

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

  return (
    <>
      <div className="p-6 flex justify-center font-mono">
        <div className="w-full max-w-4xl">
          {/* Title */}
          <h1 className="text-2xl font-bold mb-6">Telemetry Dashboard</h1>

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
