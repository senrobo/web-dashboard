"use client";

import { useState } from "react";
import VerticalNavbar from "@/components/VerticalNav";
import { Button } from "@/components/ui/button";
import { Save, FlaskConical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <h2 className="text-3xl font-bold tracking-tight">
                Quick Actions
              </h2>
              <div className="space-x-2 space-y-2">
                <Button>Reset All</Button>
                <Button>Reset IMU</Button>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <h2 className="text-xl font-semibold tracking-tight">Online</h2>
                <h2 className="text-xl font-semibold tracking-tight">Tactic</h2>
                <h2 className="text-xl font-semibold tracking-tight">
                  IMU Readings
                </h2>
                <h2 className="text-xl font-semibold tracking-tight">
                  Kicker Status
                </h2>
                <h2 className="text-xl font-semibold tracking-tight">
                  Position
                </h2>
                <h2 className="text-xl font-semibold tracking-tight">
                  Ball Position
                </h2>
                <h2 className="text-xl font-semibold tracking-tight">
                  Strategy
                </h2>
              </div>
            </CardContent>
          </Card>
        );
      case "peripherals":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Peripherals</CardTitle>
            </CardHeader>
            <CardContent>
              <h2 className="text-3xl font-bold tracking-tight">
                Quick Actions
              </h2>
              <div className="space-x-2 space-y-2">
                <Button>Calibrate IMU</Button>
                <Button>Calibrate Lightring</Button>
              </div>
              <h2 className="text-3xl font-bold tracking-tight mt-4">
                Light Ring Data
              </h2>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <h3 className="text-xl font-semibold tracking-tight">
                  Current Values
                </h3>
                <h3 className="text-xl font-semibold tracking-tight">
                  White Values
                </h3>
                <h3 className="text-xl font-semibold tracking-tight">
                  Green Values
                </h3>
                <h3 className="text-xl font-semibold tracking-tight">
                  Threshold Values
                </h3>
              </div>
              <div className="my-2">
                <h2 className="text-3xl font-bold tracking-tight">IMU Data</h2>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <h3 className="text-xl font-semibold tracking-tight">
                    Acceleormter
                  </h3>
                  <h3 className="text-xl font-semibold tracking-tight">
                    Gyroscope
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case "toonig":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Toonig</CardTitle>
            </CardHeader>
            <CardContent>
              <h2 className="text-3xl font-bold tracking-tight">Movement</h2>
              <h2 className="text-3xl font-bold tracking-tight">
                Line Track PID
              </h2>
              <h2 className="text-3xl font-bold tracking-tight">IMU PID</h2>
              <h2 className="text-3xl font-bold tracking-tight">IMU Kalman</h2>
            </CardContent>
          </Card>
        );
      default:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <h2 className="text-3xl font-bold tracking-tight">
                Quick Actions
              </h2>
              <div className="space-x-2 space-y-2">
                <Button>Reset All</Button>
                <Button>Reset IMU</Button>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <h2 className="text-xl font-semibold tracking-tight">Online</h2>
                <h2 className="text-xl font-semibold tracking-tight">Tactic</h2>
                <h2 className="text-xl font-semibold tracking-tight">
                  IMU Readings
                </h2>
                <h2 className="text-xl font-semibold tracking-tight">
                  Kicker Status
                </h2>
                <h2 className="text-xl font-semibold tracking-tight">
                  Position
                </h2>
                <h2 className="text-xl font-semibold tracking-tight">
                  Ball Position
                </h2>
                <h2 className="text-xl font-semibold tracking-tight">
                  Strategy
                </h2>
              </div>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <>
      <nav className="flex justify-around w-screen p-4 bg-primary text-primary-foreground">
        <div>Status</div>
      </nav>
      <section className="grid grid-cols-6 m-2">
        <div className="col-span-1 h-full mr-2">
          <VerticalNavbar setActivePage={setActivePage} />
        </div>
        <main className="col-span-5 h-full">{renderContent()}</main>
        <div className="space-x-2 z-99 bottom-4 right-4 fixed">
          <Button>
            <FlaskConical className="w-5 h-5 mr-2" />
            Test
          </Button>
          <Button variant="destructive">
            <Save className="w-5 h-5 mr-2" />
            Save
          </Button>
        </div>
      </section>
    </>
  );
}
