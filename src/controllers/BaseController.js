const { Router } = require("express");

class BaseController {
  constructor() {
    if (this.constructor === BaseController) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    this.router = Router();
    this.path;
    this.routes = [];
  }

  setRoutes() {
    for (const route of this.routes) {
      for (const mw of route.localMiddleware) {
        this.router.use(route.path, mw);
      }
      console.log(route.path, route.handler);
      switch (route.method) {
        case "GET":
          this.router.get(route.path, route.handler);
          break;
        case "POST":
          this.router.post(route.path, route.handler);
          break;
        default:
          console.log("not a valid method");
          break;
      }
    }

    return this.router;
  }
  // these methods below must not be a properties< but methods (no "=>")
  sendSuccess(res, data, message) {
    return res.status(200).json({
      message: message || "success",
      data: data,
    });
  }

  sendError(res, message) {
    return res.status(500).json({
      message: message || "internal server error",
    });
  }
}

module.exports = { BaseController };
