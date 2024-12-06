"use client";
import React from "react";
import { Stage, Layer, Rect, Arc, Line, Circle } from "react-konva";

// Constants for the field dimensions in cm
const FIELD_WIDTH = 219; // Including the outer boundary
const FIELD_HEIGHT = 158; // Including the outer boundary
const PLAYABLE_WIDTH = 207; // Playable area width
const PLAYABLE_HEIGHT = 146; // Playable area height
const GOAL_WIDTH = 80; // Width of the goal area
const GOAL_DEPTH = 25; // Depth of the goal area
const GOAL_ARC_RADIUS = 15; // Radius of the semicircle in the goal area
const SCALE = 4; // Scale for rendering (pixels per cm)
const ROBOT_RADIUS = 8.75; // Robot radius in cm
const BALL_RADIUS = 3.5; // Ball radius in cm
const WALL_THICKNESS = 1.2; // Wall thickness in cm

const neutralPoints = [
  { x: -45, y: -23 },
  { x: 45, y: -23 },
  { x: -45, y: 23 },
  { x: 45, y: 23 },
];

const FieldVisualization = ({ telemetryData }: { telemetryData: any }) => {
  return (
    <div className="mt-8 flex justify-center">
      <Stage
        width={FIELD_WIDTH * SCALE}
        height={FIELD_HEIGHT * SCALE}
        style={{ border: "2px solid black" }}
      >
        <Layer>
          {/* Outer Field */}
          <Rect
            x={0}
            y={0}
            width={FIELD_WIDTH * SCALE}
            height={FIELD_HEIGHT * SCALE}
            fill="#004d00"
          />

          {/* Playable Area */}
          <Rect
            x={((FIELD_WIDTH - PLAYABLE_WIDTH) / 2) * SCALE}
            y={((FIELD_HEIGHT - PLAYABLE_HEIGHT) / 2) * SCALE}
            width={PLAYABLE_WIDTH * SCALE}
            height={PLAYABLE_HEIGHT * SCALE}
            stroke="white"
            strokeWidth={2}
          />

          {/* Center Circle */}
          <Circle
            x={(FIELD_WIDTH / 2) * SCALE}
            y={(FIELD_HEIGHT / 2) * SCALE}
            radius={(60 / 2) * SCALE} // 60 cm diameter
            stroke="white"
            strokeWidth={2}
          />

          {/* Neutral Points */}
          {neutralPoints.map((point, index) => (
            <Circle
              key={index}
              x={(FIELD_WIDTH / 2 + point.x) * SCALE}
              y={(FIELD_HEIGHT / 2 + point.y) * SCALE}
              radius={0.5 * SCALE} // Neutral points as small circles
              fill="black"
            />
          ))}

          {/* Goals */}
          {/* Left Goal Area */}
          <Rect
            x={((FIELD_WIDTH - PLAYABLE_WIDTH) / 2 - GOAL_DEPTH) * SCALE}
            y={(FIELD_HEIGHT / 2 - GOAL_WIDTH / 2) * SCALE}
            width={GOAL_DEPTH * SCALE}
            height={GOAL_WIDTH * SCALE}
            fill="yellow"
          />
          {/* Right Goal Area */}
          <Rect
            x={((FIELD_WIDTH - PLAYABLE_WIDTH) / 2 + PLAYABLE_WIDTH) * SCALE}
            y={(FIELD_HEIGHT / 2 - GOAL_WIDTH / 2) * SCALE}
            width={GOAL_DEPTH * SCALE}
            height={GOAL_WIDTH * SCALE}
            fill="blue"
          />

          {/* Left Semi-Circular Keep-Out Area */}
          <Line
            points={[
              ((FIELD_WIDTH - PLAYABLE_WIDTH) / 2) * SCALE,
              (FIELD_HEIGHT / 2 - GOAL_WIDTH / 2) * SCALE,
              ((FIELD_WIDTH - PLAYABLE_WIDTH) / 2 -
                GOAL_DEPTH +
                GOAL_ARC_RADIUS) *
                SCALE,
              (FIELD_HEIGHT / 2 - GOAL_WIDTH / 2) * SCALE,
            ]}
            stroke="white"
            strokeWidth={2}
          />
          <Arc
            x={
              ((FIELD_WIDTH - PLAYABLE_WIDTH) / 2 -
                GOAL_DEPTH +
                GOAL_ARC_RADIUS) *
              SCALE
            }
            y={(FIELD_HEIGHT / 2) * SCALE}
            innerRadius={GOAL_ARC_RADIUS * SCALE}
            outerRadius={GOAL_ARC_RADIUS * SCALE}
            angle={180}
            rotation={-90}
            stroke="white"
            strokeWidth={2}
          />
          <Line
            points={[
              ((FIELD_WIDTH - PLAYABLE_WIDTH) / 2 -
                GOAL_DEPTH +
                GOAL_ARC_RADIUS) *
                SCALE,
              (FIELD_HEIGHT / 2 + GOAL_WIDTH / 2) * SCALE,
              ((FIELD_WIDTH - PLAYABLE_WIDTH) / 2) * SCALE,
              (FIELD_HEIGHT / 2 + GOAL_WIDTH / 2) * SCALE,
            ]}
            stroke="white"
            strokeWidth={2}
          />

          {/* Right Semi-Circular Keep-Out Area */}
          <Line
            points={[
              ((FIELD_WIDTH - PLAYABLE_WIDTH) / 2 + PLAYABLE_WIDTH) * SCALE,
              (FIELD_HEIGHT / 2 - GOAL_WIDTH / 2) * SCALE,
              ((FIELD_WIDTH - PLAYABLE_WIDTH) / 2 +
                PLAYABLE_WIDTH +
                GOAL_DEPTH -
                GOAL_ARC_RADIUS) *
                SCALE,
              (FIELD_HEIGHT / 2 - GOAL_WIDTH / 2) * SCALE,
            ]}
            stroke="white"
            strokeWidth={2}
          />
          <Arc
            x={
              ((FIELD_WIDTH - PLAYABLE_WIDTH) / 2 +
                PLAYABLE_WIDTH +
                GOAL_DEPTH -
                GOAL_ARC_RADIUS) *
              SCALE
            }
            y={(FIELD_HEIGHT / 2) * SCALE}
            innerRadius={GOAL_ARC_RADIUS * SCALE}
            outerRadius={GOAL_ARC_RADIUS * SCALE}
            angle={180}
            rotation={90}
            stroke="white"
            strokeWidth={2}
          />
          <Line
            points={[
              ((FIELD_WIDTH - PLAYABLE_WIDTH) / 2 +
                PLAYABLE_WIDTH +
                GOAL_DEPTH -
                GOAL_ARC_RADIUS) *
                SCALE,
              (FIELD_HEIGHT / 2 + GOAL_WIDTH / 2) * SCALE,
              ((FIELD_WIDTH - PLAYABLE_WIDTH) / 2 + PLAYABLE_WIDTH) * SCALE,
              (FIELD_HEIGHT / 2 + GOAL_WIDTH / 2) * SCALE,
            ]}
            stroke="white"
            strokeWidth={2}
          />

          {/* Robot */}
          <Circle
            x={(FIELD_WIDTH / 2 + telemetryData.robot.position.x) * SCALE}
            y={(FIELD_HEIGHT / 2 - telemetryData.robot.position.y) * SCALE}
            radius={ROBOT_RADIUS * SCALE}
            fill="blue"
          />
          <Line
            points={[
              (FIELD_WIDTH / 2 + telemetryData.robot.position.x) * SCALE,
              (FIELD_HEIGHT / 2 - telemetryData.robot.position.y) * SCALE,
              (FIELD_WIDTH / 2 + telemetryData.robot.position.x) * SCALE +
                Math.cos((telemetryData.robot.orientation * Math.PI) / 180) *
                  ROBOT_RADIUS *
                  SCALE,
              (FIELD_HEIGHT / 2 - telemetryData.robot.position.y) * SCALE -
                Math.sin((telemetryData.robot.orientation * Math.PI) / 180) *
                  ROBOT_RADIUS *
                  SCALE,
            ]}
            stroke="white"
            strokeWidth={2}
          />

          {/* Ball */}
          <Circle
            x={(FIELD_WIDTH / 2 + telemetryData.ball.position.x) * SCALE}
            y={(FIELD_HEIGHT / 2 - telemetryData.ball.position.y) * SCALE}
            radius={BALL_RADIUS * SCALE}
            fill="orange"
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default FieldVisualization;
