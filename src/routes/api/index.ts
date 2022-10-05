import express from "express";

import { serversRoutes } from "./servers";
import { raidsRoutes } from "./raids";
import { disksRoutes } from "./disks";
import { secGroupsRoutes } from "./sec_groups";
import { secRulesRoutes } from "./sec_rules";
import { secGroupServersRoutes } from "./sec_group_servers";
import { networkInterfacesRoutes } from "./network_interfaces";
import { partitionsRoutes } from "./partitions";

const apiRoutes = express
  .Router({ mergeParams: true })
  .use("/servers", serversRoutes)
  .use("/raids", raidsRoutes)
  .use("/disks", disksRoutes)
  .use("/sec-groups", secGroupsRoutes)
  .use("/sec-rules", secRulesRoutes)
  .use("/sec-group-servers", secGroupServersRoutes)
  .use("/network-interfaces", networkInterfacesRoutes)
  .use("/partitions", partitionsRoutes);

export { apiRoutes };
