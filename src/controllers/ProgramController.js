const { BaseController } = require("./BaseController");
const { ProgramService } = require("../services/ProgramService");
const { Token } = require("../services/TokenService");

class ProgramController extends BaseController {
  constructor() {
    super();
  }
  path = "/program";
  routes = [
    {
      path: "/sendSequence",
      method: "POST",
      handler: this.handleSendSequence,
      localMiddleware: [],
    },
  ];

  async handleSendSequence(req, res, next) {
    try {
      const sequence = req.body.sequence;
      const programService = new ProgramService(sequence);
      const result = await programService.sendSequence();
      if (result.success) {
        super.sendSuccess(res, result.message);
      } else {
        super.sendError(res, result.message);
      }
    } catch (e) {
      super.sendError(res);
    }
  }
}

const {
  sendSequence: sendSequenceService,
} = require("../services/ProgramService");

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

module.exports = { ProgramController };
