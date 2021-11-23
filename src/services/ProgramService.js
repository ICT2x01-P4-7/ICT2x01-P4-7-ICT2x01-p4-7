const customEventEmitter = require("../event-emitter/CustomEventEmitter");

class ProgramService {
  constructor(sequence) {
    this.sequence = sequence;
  }
  async sendSequence() {
    if (global.connected) {
      customEventEmitter
        .getEventEmitter()
        .emit("SEQUENCE", { sequenceData: this.sequence });
      return {
        message: `${this.sequence} Sequence successfully send`,
        success: true,
      };
    } else {
      return {
        message: "Car is not connected. Unable to send",
        success: false,
      };
    }
  }
}

module.exports = { ProgramService };
