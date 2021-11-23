const customEventEmitter = require("../event-emitter/eventemitter");

class ProgramService {
  constructor(sequence) {
    this.sequence = sequence;
  }
  async sendSequence() {
    customEventEmitter
      .getEventEmitter()
      .emit("SEQUENCE", { sequenceData: this.sequence });
    return {
      message: `${this.sequence} Sequence successfully send`,
      success: true,
    };
  }
}

module.exports = { ProgramService };
