import express from "express";

import getServer from "./get_server";
import getServersList from "./get_servers_list";
import deleteServer from "./delete_server";
import addServers from "./add_servers";
import updateServer from "./update_server";
import deleteServersList from "./delete_servers_list";
import updateServersList from "./update_servers_list";
import { getServerDisk, getServerDisksList } from "./get_server_disks";
import {
  getServerSecGroupServer,
  getServerSecGroupServersList,
} from "./get_server_sec_group_servers";

import {
  getServerNetworkInterface,
  getServerNetworkInterfacesList,
} from "./get_server_network_interfaces";
import {
  serverCreateValidationMiddleware,
  serverUpdateValidationMiddleware,
} from "../../../middlewares";

const disksRoutes = express
  .Router({ mergeParams: true })
  .get("/:diskId", getServerDisk)
  .get("/", getServerDisksList);

const secGroupServersRoutes = express
  .Router({ mergeParams: true })
  .get("/:secGroupServerId", getServerSecGroupServer)
  .get("/", getServerSecGroupServersList);

const networkInterfacesRoutes = express
  .Router({ mergeParams: true })
  .get("/:networkInterfaceId", getServerNetworkInterface)
  .get("/", getServerNetworkInterfacesList);

const serversRoutes = express
  .Router({ mergeParams: true })
  .post("/", serverCreateValidationMiddleware, addServers)
  .get("/:id", getServer)
  .get("/", getServersList)
  .delete("/:id", deleteServer)
  .delete("/", deleteServersList)
  .patch("/:id", serverUpdateValidationMiddleware, updateServer)
  .patch("/", serverUpdateValidationMiddleware, updateServersList)
  .use("/:id/disks", disksRoutes)
  .use("/:id/sec-group-servers", secGroupServersRoutes)
  .use("/:id/network-interfaces", networkInterfacesRoutes);

export { serversRoutes };
