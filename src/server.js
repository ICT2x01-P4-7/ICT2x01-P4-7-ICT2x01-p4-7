const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { PORT, mongoUri, HOSTNAME, TCP_PORT } = require("./config/config.js");
const cors = require("cors");
const userRoutes = require("./routes/user.route");
const TCPServer = require("./controllers/tcp");

class Server {
  constructor() {
    this.initDB();
    this.initRoutes();
    this.initExpressMiddleWare();
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
    app.use("/api/User", userRoutes);
  }
  start() {
    app.listen(PORT, () => {
      console.log(`App listening at http://localhost:${PORT}`);
    });
  }
}

const serve = new Server();
const tcpserve = new TCPServer(HOSTNAME, TCP_PORT);
