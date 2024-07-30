"use client";

import { useState } from "react";
import VerticalNavbar from "@/components/VerticalNav";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <div className="border py-4 px-6 rounded-md shadow">
            <h1 className="text-4xl font-bold tracking-tight underline">
              Peripherals
            </h1>
            <div className="my-2">
              <h2 className="text-3xl font-bold tracking-tight">
                Quick Actions
              </h2>
              <div className="space-x-2 space-y-2">
                <Button>Reset All</Button>
                <Button>Reset IMU</Button>
              </div>
            </div>
            {/* Might Consider Adding Motor Speed Data */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <h2 className="text-xl font-semibold tracking-tight">Online</h2>
              <h2 className="text-xl font-semibold tracking-tight">Tactic</h2>
              <h2 className="text-xl font-semibold tracking-tight">
                IMU Readings
              </h2>
              <h2 className="text-xl font-semibold tracking-tight">
                Kicker Status
              </h2>
              <h2 className="text-xl font-semibold tracking-tight">Position</h2>
              <h2 className="text-xl font-semibold tracking-tight">
                Ball Position
              </h2>
              <h2 className="text-xl font-semibold tracking-tight">Strategy</h2>
            </div>
          </div>
        );
      case "peripherals":
        return (
          <div className="border py-4 px-6 rounded-md shadow">
            <h1 className="text-4xl font-bold tracking-tight underline">
              Peripherals
            </h1>
            <div className="my-2">
              <h2 className="text-3xl font-bold tracking-tight">
                Quick Actions
              </h2>
              <div className="space-x-2 space-y-2">
                <Button>Calibrate IMU</Button>
                <Button>Calibrate Lightring</Button>
              </div>
            </div>
            <div className="my-2">
              <h2 className="text-3xl font-bold tracking-tight">
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
          </div>
        );
      case "tune":
        return (
          <div className="border py-4 px-6 rounded-md shadow">
            <h1 className="text-4xl font-bold tracking-tight underline">
              Tooning
            </h1>
            <div className="my-2">
              <h2 className="text-3xl font-bold tracking-tight">
                Line Track PID
              </h2>
            </div>
            <div className="my-2">
              <h2 className="text-3xl font-bold tracking-tight">IMU PID</h2>
            </div>
          </div>
        );
      default:
        return <div>Dashboard Content</div>;
    }
  };

  return (
    <>
      <nav className="flex justify-around w-screen p-4 bg-primary text-primary-foreground">
        <div>Logo</div>
        <div>Status</div>
        <div>Something Else</div>
      </nav>
      <section className="grid grid-cols-6 m-2">
        <div className="col-span-1 h-full mr-2">
          <VerticalNavbar setActivePage={setActivePage} />
        </div>
        <main className="col-span-5 h-full">{renderContent()}</main>
      </section>
    </>
  );
}
