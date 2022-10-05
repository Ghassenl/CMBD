import express from "express";

import getSecRule from "./get_sec_rule";
import getSecRulesList from "./get_sec_rules_list";
import deleteSecRule from "./delete_sec_rule";
import addSecRules from "./add_sec_rules";
import updateSecRule from "./update_sec_rule";
import deleteSecRulesList from "./delete_sec_rules_list";
import updateSecRulesList from "./update_sec_rules_list";
import {
  secRuleCreateValidationMiddleware,
  secRuleUpdateValidationMiddleware,
} from "../../../middlewares";

const secRulesRoutes = express
  .Router({ mergeParams: true })
  .post("/", secRuleCreateValidationMiddleware, addSecRules)
  .get("/:id", getSecRule)
  .get("/", getSecRulesList)
  .delete("/:id", deleteSecRule)
  .delete("/", deleteSecRulesList)
  .patch("/:id", secRuleUpdateValidationMiddleware, updateSecRule)
  .patch("/", secRuleUpdateValidationMiddleware, updateSecRulesList);

export { secRulesRoutes };
