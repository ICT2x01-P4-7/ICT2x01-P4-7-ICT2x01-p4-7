const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { PORT, mongoUri } = require("./config/config.js");
const cors = require("cors");
const userRoutes = require("./routes/user.route");
const customEventEmitter = require("./event-emitter/eventemitter");

module.exports = class Server {
  constructor() {
    this.initDB();
    this.initExpressMiddleWare();
    this.initRoutes();
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
  initRoutes() {
    app.get("/", (req, res) => res.send("hello world"));
    app.use("/user", userRoutes);
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
