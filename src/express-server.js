const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { PORT, mongoUri } = require("./config/config.js");
const cors = require("cors");
const programRoutes = require("./routes/program.route");

const customEventEmitter = require("./event-emitter/eventemitter");
const { UserController } = require("./controllers/UserController");

const controllers = [new UserController()];

module.exports = class Server {
  constructor() {
    this.initDB();
    this.initExpressMiddleWare();
    this.initControllers();
    this.initEventListener();
    this.start();
  }

  initDB() {
    mongoose
      .connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("MongoDB database Connected..."))
      .catch((err) => console.log(err));
  }
  initExpressMiddleWare() {
    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
  }
  initControllers() {
    app.get("/", (req, res) => res.send("hello world"));
    controllers.forEach((controller) => {
      app.use(controller.path, controller.setRoutes());
    });
    //app.use("/user", userRoutes);
    // app.use("/program", programRoutes);
  }
  start() {
    app.listen(PORT, () => {
      console.log(`App listening at http://localhost:${PORT}`);
    });
  }
  initEventListener() {
    customEventEmitter.getEventEmitter().on("DATA", ({ sensorData }) => {
      console.log(sensorData);
    });
  }
};
