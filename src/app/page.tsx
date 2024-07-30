"use client";

import { useState } from "react";
import VerticalNavbar from "@/components/VerticalNav";
export default function Home() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <div>Dashboard Content</div>;
      case "ports":
        return <div>Ports Content</div>;
      case "peripherals":
        return <div>Peripherals Content</div>;
      case "tune":
        return <div>Tune Content</div>;
      case "info":
        return <div>Info Content</div>;
      default:
        return <div>Dashboard Content</div>;
    }
  };

  return (
    <>
      <nav className="flex justify-around w-screen p-4">
        <div>Logo</div>
        <div>Status</div>
        <div>Something Else</div>
      </nav>
      <section className="grid grid-cols-6 h-screen">
        <div className="col-span-1 h-full">
          <VerticalNavbar setActivePage={setActivePage} />
        </div>
        <main className="col-span-5 h-full">{renderContent()}</main>
      </section>
    </>
  );
}
