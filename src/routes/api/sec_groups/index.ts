import express from "express";

import getSecGroup from "./get_sec_group";
import getSecGroupsList from "./get_sec_groups_list";
import deleteSecGroup from "./delete_sec_group";
import addSecGroups from "./add_sec_groups";
import updateSecGroup from "./update_sec_group";
import deleteSecGroupsList from "./delete_sec_groups_list";
import updateSecGroupsList from "./update_sec_groups_list";
import {
  getSecGroupSecRule,
  getSecGroupSecRulesList,
} from "./get_sec_group_sec_rules";
import {
  getSecGroupSecGroupServer,
  getSecGroupSecGroupServersList,
} from "./get_sec_group_sec_group_servers";
import {
  secGroupCreateValidationMiddleware,
  secGroupUpdateValidationMiddleware,
} from "../../../middlewares";

const secRulesRoutes = express
  .Router({ mergeParams: true })
  .get("/:secRuleId", getSecGroupSecRule)
  .get("/", getSecGroupSecRulesList);

const secGroupServersRoutes = express
  .Router({ mergeParams: true })
  .get("/:secGroupServerId", getSecGroupSecGroupServer)
  .get("/", getSecGroupSecGroupServersList);

const secGroupsRoutes = express
  .Router({ mergeParams: true })
  .post("/", secGroupCreateValidationMiddleware, addSecGroups)
  .get("/:id", getSecGroup)
  .get("/", getSecGroupsList)
  .delete("/:id", deleteSecGroup)
  .delete("/", deleteSecGroupsList)
  .patch("/:id", secGroupUpdateValidationMiddleware, updateSecGroup)
  .patch("/", secGroupUpdateValidationMiddleware, updateSecGroupsList)
  .use("/:id/sec-rules", secRulesRoutes)
  .use("/:id/sec-group-servers", secGroupServersRoutes);

export { secGroupsRoutes };
