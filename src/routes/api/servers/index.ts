import express from "express";

import getServer from "./get_server";
import getServersList from "./get_servers_list";
import deleteServer from "./delete_server";
import addServers from "./add_servers";
import updateServer from "./update_server";
import deleteServersList from "./delete_servers_list";
import updateServersList from "./update_servers_list";
import {
  serverCreateValidationMiddleware,
  serverUpdateValidationMiddleware,
} from "../../../middlewares";

const serversRoutes = express
  .Router({ mergeParams: true })
  .post("/", serverCreateValidationMiddleware, addServers)
  .get("/:id", getServer)
  .get("/", getServersList)
  .delete("/:id", deleteServer)
  .delete("/", deleteServersList)
  .patch("/:id", serverUpdateValidationMiddleware, updateServer)
  .patch("/", serverUpdateValidationMiddleware, updateServersList);
export { serversRoutes };
