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
    try {
      const { PIN } = req.body;
      const userService = new UserService(PIN);
      const data = await userService.login();
      console.log(data);
      if (data.success) {
        super.sendSuccess(res, data.token, data.message);
      } else {
        console.log(data.message);
        super.sendError(res, data.message);
      }
    } catch (e) {
      console.log(e);
      super.sendError(res);
    }
  }

  async handleCreate(req, res, next) {
    try {
      const { PIN, choosePIN, confirmPIN } = req.body;
      const userService = new UserService(PIN, choosePIN, confirmPIN);
      const data = await userService.createUser();
      if (data.success) {
        super.sendSuccess(res, data.message);
      } else {
        super.sendError(res, data.message);
      }
    } catch (e) {
      console.log(e);
      super.sendError(res);
    }
  }
  async handleResetPIN(req, res, next) {
    try {
      const { PIN, choosePIN, confirmPIN } = req.body;
      const userService = new UserService(PIN, choosePIN, confirmPIN);
      const data = await userService.resetPIN();
      if (data.success) {
        super.sendSuccess(res, data.message);
      } else {
        super.sendError(res, data.message);
      }
    } catch (e) {
      console.log(e);
      super.sendError(res);
    }
  }
}

module.exports = { UserController };
