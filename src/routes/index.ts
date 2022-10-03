import express from "express";

import { apiRoutes } from "./api";
import { heartbeatRouter } from "./heartbeat";

const routes = express
  .Router({ mergeParams: true })
  .use("/api/v1", apiRoutes)
  .use("/heartbeat", heartbeatRouter);

export { routes };
