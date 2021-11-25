const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const customEventEmitter = require("./event-emitter/CustomEventEmitter");
const { UserController } = require("./controllers/UserController");
const { ProgramController } = require("./controllers/ProgramController");

const controllers = [new UserController(), new ProgramController()];

module.exports = class Server {
  app = express();

  constructor(mongoUri, PORT) {
    this.initDB(mongoUri);
    this.initExpressMiddleWare();
    this.initControllers();
    this.initEventListener();
    this.start(PORT);
  }

  initDB(mongoUri) {
    mongoose
      .connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("MongoDB database Connected..."))
      .catch((err) => console.log(err));
  }
  initExpressMiddleWare() {
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }
  initControllers() {
    this.app.get("/", (req, res) => res.send("hello world"));
    controllers.forEach((controller) => {
      this.app.use(controller.path, controller.setRoutes());
    });
  }
  start(PORT) {
    this.app.listen(PORT, () => {
      console.log(`App listening at http://localhost:${PORT}`);
    });
  }
  initEventListener() {
    // customEventEmitter.getEventEmitter().on("DATA", ({ sensorData }) => {
    //   console.log(sensorData);
    // });
    customEventEmitter.getEventEmitter().on("CONNECTED", ({ connected }) => {
      global.connected = connected;
      console.log(`Is the car connected? ${global.connected}`);
    });
  }
};
