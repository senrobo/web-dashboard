import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  type TelemetryData = {
    vx: number;
    vy: number;
    angularVelocity: number;
    xPosition: number;
    yPosition: number;
    bearing: number;
    ballDistance: number;
  };

  // Define the fields with keys limited to TelemetryData keys
  type TelemetryField<T extends keyof TelemetryData> = {
    key: T;
    title: string;
    unit: string;
  };

  const telemetryData: TelemetryData = {
    vx: 2.5,
    vy: 1.8,
    angularVelocity: 0.75,
    xPosition: 10.5,
    yPosition: 5.2,
    bearing: 45.0,
    ballDistance: 3.8,
  };

  // Define fields for UI with units
  const telemetryFields = {
    velocities: [
      { key: "vx", title: "Vx", unit: "m/s" },
      { key: "vy", title: "Vy", unit: "m/s" },
      { key: "angularVelocity", title: "Angular Velocity", unit: "rad/s" },
    ] as TelemetryField<"vx" | "vy" | "angularVelocity">[],
    fieldData: [
      { key: "xPosition", title: "X Position", unit: "m" },
      { key: "yPosition", title: "Y Position", unit: "m" },
      { key: "bearing", title: "Bearing", unit: "°" },
      { key: "ballDistance", title: "Ball Distance", unit: "m" },
    ] as TelemetryField<
      "xPosition" | "yPosition" | "bearing" | "ballDistance"
    >[],
  };
  return (
    <>
      <div className="p-6 flex justify-center">
        <div className="w-full max-w-4xl">
          {/* Title */}
          <h1 className="font-sans text-2xl font-bold mb-6">
            Telemetry Dashboard
          </h1>

          {/* Velocities Section */}
          <div className="mb-8">
            <h2 className="font-sans text-xl mb-4">Velocities</h2>
            <div className="grid grid-cols-3 gap-4">
              {telemetryFields.velocities.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="font-sans font-bold">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xl font-mono">
                      {telemetryData[item.key]} {item.unit}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Field Data Section */}
          <div>
            <h2 className="font-sans text-xl mb-4">Field Data</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {telemetryFields.fieldData.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="font-sans font-bold">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xl font-mono">
                      {telemetryData[item.key]} {item.unit}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
