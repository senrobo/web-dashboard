export type LogEntry = {
  time: string;
  vx: number;
  vy: number;
  angularVelocity: number;
  xPosition: number;
  yPosition: number;
  ballX: number;
  ballY: number;
};

export type TelemetryData = {
  robot: {
    position: { x: number; y: number };
    orientation: number;
  };
  ball: {
    position: { x: number; y: number };
  };
  velocities: {
    vx: number;
    vy: number;
    angularVelocity: number;
  };
};
