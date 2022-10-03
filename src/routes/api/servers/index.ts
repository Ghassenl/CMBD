import express from "express";

import getServer from "./get_server";
import getServersList from "./get_servers_list";
import deleteServer from "./delete_server";
import addServer from "./add_server";
import updateServer from "./update_server";

const serversRoutes = express
  .Router({ mergeParams: true })
  .post("/", addServer)
  .get("/:id", getServer)
  .get("/", getServersList)
  .delete("/:id", deleteServer)
  .patch("/:id", updateServer);
export { serversRoutes };
