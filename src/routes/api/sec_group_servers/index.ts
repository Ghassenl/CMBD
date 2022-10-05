import express from "express";

import getSecGroupServer from "./get_sec_group_server";
import getSecGroupServersList from "./get_sec_group_servers_list";
import deleteSecGroupServer from "./delete_sec_group_server";
import addSecGroupServers from "./add_sec_group_servers";
import updateSecGroupServer from "./update_sec_group_server";
import deleteSecGroupServersList from "./delete_sec_group_servers_list";
import updateSecGroupServersList from "./update_sec_group_servers_list";
import {
  secGroupServerCreateValidationMiddleware,
  secGroupServerUpdateValidationMiddleware,
} from "../../../middlewares";

const secGroupServersRoutes = express
  .Router({ mergeParams: true })
  .post("/", secGroupServerCreateValidationMiddleware, addSecGroupServers)
  .get("/:id", getSecGroupServer)
  .get("/", getSecGroupServersList)
  .delete("/:id", deleteSecGroupServer)
  .delete("/", deleteSecGroupServersList)
  .patch("/:id", secGroupServerUpdateValidationMiddleware, updateSecGroupServer)
  .patch(
    "/",
    secGroupServerUpdateValidationMiddleware,
    updateSecGroupServersList,
  );
export { secGroupServersRoutes };
