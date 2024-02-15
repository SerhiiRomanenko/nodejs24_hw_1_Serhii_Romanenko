const http = require("http");
const fs = require("fs");
const logger = require("./utils/logger")("server");

const server = http.createServer();
const port = 3000;

server.listen(port);

server.on("listening", () => console.log(`waiting on ${port} port`));

server.on("request", (req, res) => {
  if (req.url !== "/favicon.ico") {
    if (req.url === `/healthcheck` && req.method === "GET") {
      res.writeHead(200);
      res.write("healthcheck passed");
    } else if (
      (req.url === `/healthcheck` && req.method !== "GET") ||
      req.url !== "/healthcheck"
    ) {
      res.writeHead(404);
      res.write("404 Not Found");
    }

    if (res.statusCode === 200) {
      logger.info(`${req.method} ${req.url} ${res.statusCode}`);
    } else {
      logger.warn(`${req.method} ${req.url} ${res.statusCode}`);
    }
  }
  res.end();
});
