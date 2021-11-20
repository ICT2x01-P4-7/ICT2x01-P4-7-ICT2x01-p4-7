const { EventEmitter } = require("events");
const { HOSTNAME, TCP_PORT } = require("./config/config.js");

const TCPServer = require("./tcp");
const ExpressServer = require("./express-server");

const tcpserve = new TCPServer(HOSTNAME, TCP_PORT);
const serve = new ExpressServer();
