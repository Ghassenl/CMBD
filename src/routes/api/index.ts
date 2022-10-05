import express from "express";

import { serversRoutes } from "./servers";
import { raidsRoutes } from "./raids";

const apiRoutes = express
  .Router({ mergeParams: true })
  .use("/servers", serversRoutes)
  .use("/raids", raidsRoutes);

export { apiRoutes };
