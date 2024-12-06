import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";
import { LogEntry } from "@/app/types";

type DataDrawerProps = {
  logData: LogEntry[];
  isLogging: boolean;
  startLogging: () => void;
};

export const DataDrawer: React.FC<DataDrawerProps> = ({
  logData,
  isLogging,
  startLogging,
}) => {
  return (
    <Drawer>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
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
                  (log) =>
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
  );
};
