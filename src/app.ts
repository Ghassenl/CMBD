import express, { Express, Router } from "express";
import { errorHandlingMiddleware } from "./middlewares";

interface ExpressAppFactoryConfig {
  app?: Express;
  router: Router;
}

class ExpressAppFactory {
  public static createExpressApp(config: ExpressAppFactoryConfig): Express {
    const app = config.app ?? express();
    app.use(express.json());
    app.use(config.router);
    app.use(errorHandlingMiddleware);

    return app;
  }
}

export { ExpressAppFactory };
