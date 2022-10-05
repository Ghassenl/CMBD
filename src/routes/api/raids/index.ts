import express from "express";

import getRaid from "./get_raid";
import getRaidsList from "./get_raids_list";
import deleteRaid from "./delete_raid";
import addRaids from "./add_raids";
import updateRaid from "./update_raid";
import deleteRaidsList from "./delete_raids_list";
import updateRaidsList from "./update_raids_list";
import { getRaidDisk, getRaidDisksList } from "./get_raid_disks";
import {
  raidCreateValidationMiddleware,
  raidUpdateValidationMiddleware,
} from "../../../middlewares";

const disksRoutes = express
  .Router({ mergeParams: true })
  .get("/:diskId", getRaidDisk)
  .get("/", getRaidDisksList);

const raidsRoutes = express
  .Router({ mergeParams: true })
  .post("/", raidCreateValidationMiddleware, addRaids)
  .get("/:id", getRaid)
  .get("/", getRaidsList)
  .delete("/:id", deleteRaid)
  .delete("/", deleteRaidsList)
  .patch("/:id", raidUpdateValidationMiddleware, updateRaid)
  .patch("/", raidUpdateValidationMiddleware, updateRaidsList)
  .use("/:id/disks", disksRoutes);

export { raidsRoutes };
