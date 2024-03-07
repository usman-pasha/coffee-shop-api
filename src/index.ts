import { Server } from "http";
import app from "./app";
import config from "./api/config";
import logger from "./api/core/log";

let server: Server;

server = app.listen(config.port, () => {
  logger.info(`App Is Running On Port http://localhost:${config.port} !`);
});

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
