import { Router } from "express";
import http, { Server } from "http";
import { ExpressAppFactory } from "./app";
import config from "./configs";
import { routes } from "./routes";

interface IExpressAppServer {
  create(): IExpressAppServer;
  addListener(): IExpressAppServer;
  start(): Server;
}

interface IExpressAppServerConfig {
  router: Router;
  port: number;
}

abstract class AExpressAppServer implements IExpressAppServer {
  protected server: Server;
  private port: number;

  constructor(port: number) {
    this.port = port;
  }

  abstract create(): IExpressAppServer;

  addListener(): AExpressAppServer {
    this.server.addListener("listening", () => {
      console.info(`The server is running on port ${this.port}`);
    });

    return this;
  }

  start(): Server {
    return this.server.listen({ port: this.port });
  }
}

class ExpressAppServer extends AExpressAppServer implements IExpressAppServer {
  private router: Router;

  constructor(config: IExpressAppServerConfig) {
    super(config.port);

    this.router = config.router;
  }

  create(): IExpressAppServer {
    this.server = http.createServer(
      ExpressAppFactory.createExpressApp({ router: this.router }),
    );

    return this;
  }
}

new ExpressAppServer({
  router: routes,
  port: config.port,
})
  .create()
  .addListener()
  .start();
