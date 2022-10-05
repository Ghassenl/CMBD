import http from "http";
import { ExpressAppFactory } from "./app";
import config from "./configs";
import { routes } from "./routes";

const server = http.createServer(
  ExpressAppFactory.createExpressApp({
    router: routes,
  }),
);

server.addListener("listening", () => {
  console.info(`The server is running on port ${config.port}`);
});

server.listen({
  port: config.port,
});
