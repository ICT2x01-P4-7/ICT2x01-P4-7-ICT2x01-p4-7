const customEventEmitter = require("../event-emitter/eventemitter");

async function sendSequence(sequence) {
  customEventEmitter
    .getEventEmitter()
    .emit("SEQUENCE", { sequenceData: sequence });
}

module.exports = { sendSequence };
