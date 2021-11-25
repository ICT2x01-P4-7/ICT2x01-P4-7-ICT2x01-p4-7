const { BaseController } = require("./BaseController");
const { UserService } = require("../services/UserService");
const { Token } = require("../services/TokenService");

class UserController extends BaseController {
  constructor() {
    super();
  }
  path = "/user";
  routes = [
    {
      path: "/create",
      method: "POST",
      handler: this.handleCreate,
      localMiddleware: [],
    },
    {
      path: "/login",
      method: "POST",
      handler: this.handleLogin,
      localMiddleware: [],
    },
    {
      path: "/reset",
      method: "POST",
      handler: this.handleResetPIN,
      localMiddleware: [Token.verify],
    },
  ];

  async handleLogin(req, res, next) {
    const { PIN } = req.body;
    const userService = new UserService(PIN);
    const data = await userService.login();
    if (data.success) {
      super.sendSuccess(res, { token: data.token }, data.message);
    } else {
      if (data.lockUntil) {
        super.sendError(res, { lockUntil: data.lockUntil }, data.message);
      } else {
        super.sendError(res, data.message);
      }
    }
  }

  async handleCreate(req, res, next) {
    const { PIN, choosePIN, confirmPIN } = req.body;
    const userService = new UserService(PIN, choosePIN, confirmPIN);
    const data = await userService.createUser();
    if (data.success) {
      super.sendSuccess(res, { success: data.success }, data.message);
    } else {
      super.sendError(res, data.message);
    }
  }
  async handleResetPIN(req, res, next) {
    const { PIN, choosePIN, confirmPIN } = req.body;
    const userService = new UserService(PIN, choosePIN, confirmPIN);
    const data = await userService.resetPIN();
    if (data.success) {
      super.sendSuccess(res, { success: data.success }, data.message);
    } else {
      super.sendError(res, data.message);
    }
  }
}

module.exports = { UserController };
