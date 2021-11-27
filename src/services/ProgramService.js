const customEventEmitter = require("../event-emitter/CustomEventEmitter");

class ProgramService {
  static sensorData = {};
  static connected = false;
  static eventListener = customEventEmitter
    .getEventEmitter()
    .on("DATA", ({ sensorData }) => {
      ProgramService.sensorData = sensorData;
    });
  static connectedEventListener = customEventEmitter
    .getEventEmitter()
    .on("CONNECTED", ({ connected }) => {
      this.connected = connected;
    });
  constructor(sequence) {
    this.sequence = sequence;
  }

  static async sendSequence(sequence) {
    if (ProgramService.connected) {
      customEventEmitter
        .getEventEmitter()
        .emit("SEQUENCE", { sequenceData: sequence });
      return {
        message: `${sequence} Sequence successfully send`,
        success: true,
      };
    } else {
      return {
        message: "Car is not connected. Unable to send",
        success: false,
      };
    }
  }

  static async getSensorData() {
    if (ProgramService.connected) {
      return {
        message: {
          sensorData: ProgramService.sensorData,
        },
        success: true,
      };
    } else {
      return {
        message: "Car is not connected. Unable to receive data",
        success: false,
      };
    }
  }
}

module.exports = { ProgramService };
