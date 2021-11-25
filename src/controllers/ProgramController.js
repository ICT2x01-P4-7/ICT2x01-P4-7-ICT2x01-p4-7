const { BaseController } = require("./BaseController");
const { ProgramService } = require("../services/ProgramService");
const { Token } = require("../services/TokenService");

// !!! Remember to add authentication middleware !!!
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
    {
      path: "/sensorData",
      method: "GET",
      handler: this.handleGetSensorData,
      localMiddleware: [],
    },
  ];

  async handleSendSequence(req, res, next) {
    try {
      const sequence = req.body.sequence;
      const result = await ProgramService.sendSequence(sequence);
      if (result.success) {
        super.sendSuccess(res, result.message);
      } else {
        super.sendError(res, result.message);
      }
    } catch (e) {
      super.sendError(res);
    }
  }

  async handleGetSensorData(req, res, next) {
    try {
      const sequence = req.body.sequence;
      const result = await ProgramService.getSensorData(sequence);
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

module.exports = { ProgramController };
