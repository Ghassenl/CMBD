import express from "express";

import { serversRoutes } from "./servers";

const apiRoutes = express
  .Router({ mergeParams: true })
  .use("/servers", serversRoutes);

export { apiRoutes };
