const { sendSequence: sendSequenceService } = require("../services/program");

/**
 * Send Sequence to Car via TCP
 * @param {String} Sequence
 * @returns A Promise, an exception or a value.
 */
async function sendSequence(sequence) {
  //!!! Do some checks on sequence here
  if (sequence) {
    return sendSequenceService(sequence);
  } else {
    throw new Error("No sequence found");
  }
}

module.exports = { sendSequence };
