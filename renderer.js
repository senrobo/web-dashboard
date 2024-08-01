const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

function updateDOM(data) {
  // Split the data into lines
  const lines = data.split("\n");

  // Loop through each line and update the DOM elements
  lines.forEach((line) => {
    if (line.startsWith("onLine:")) {
      const onlineStatusValue = line.split(":")[1].trim();
      const onlineStatusElement = document.getElementById(
        "online-status-value"
      );
      onlineStatusElement.textContent = getOnlineStatusText(onlineStatusValue);
      onlineStatusElement.style.color = getOnlineStatusColor(onlineStatusValue);
    } else if (line.startsWith("kickerStatus:")) {
      const kickerStatusValue = line.split(":")[1].trim() === "true";
      const kickerStatusElement = document.getElementById(
        "kicker-status-value"
      );
      kickerStatusElement.textContent = kickerStatusValue
        ? "Armed"
        : "Disarmed";
      kickerStatusElement.style.color = kickerStatusValue ? "green" : "red";
    } else if (line.startsWith("imuData:")) {
      const imuData = line.split(":")[1].trim();
      document.getElementById("imu-data").textContent = `IMU Data: ${imuData}`;
    } else if (line.startsWith("accelData:")) {
      const accelData = line.split(":")[1].trim();
      document.getElementById(
        "accel-data"
      ).textContent = `Accel Data: ${accelData}`;
    } else if (line.startsWith("gyroData:")) {
      const gyroData = line.split(":")[1].trim();
      document.getElementById(
        "gyro-data"
      ).textContent = `Gyro Data: ${gyroData}`;
    }
  });
}

function getOnlineStatusText(status) {
  switch (status) {
    case "0":
      return "Offline";
    case "1":
      return "Online";
    case "2":
      return "Tracking";
    default:
      return "Unknown";
  }
}

function getOnlineStatusColor(status) {
  switch (status) {
    case "0":
      return "red";
    case "1":
      return "green";
    case "2":
      return "yellow";
    default:
      return "black";
  }
}

async function listSerialPorts() {
  const port = new SerialPort({
    path: "/dev/tty.usbmodem146258901", // Change to the correct path for your system
    baudRate: 9600,
    autoOpen: true,
  });

  const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

  parser.on("data", (data) => {
    console.log(data); // Log data to console for debugging
    updateDOM(data); // Update the DOM with the received data
  });
}

listSerialPorts();
