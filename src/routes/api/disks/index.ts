import express from "express";

import getDisk from "./get_disk";
import getDisksList from "./get_disks_list";
import deleteDisk from "./delete_disk";
import addDisks from "./add_disks";
import updateDisk from "./update_disk";
import deleteDisksList from "./delete_disks_list";
import updateDisksList from "./update_disks_list";
import { getDiskPartition, getDiskPartitionsList } from "./get_disk_partitions";
import {
  diskCreateValidationMiddleware,
  diskUpdateValidationMiddleware,
} from "../../../middlewares";

const partitionsRoutes = express
  .Router({ mergeParams: true })
  .get("/:partitionId", getDiskPartition)
  .get("/", getDiskPartitionsList);

const disksRoutes = express
  .Router({ mergeParams: true })
  .post("/", diskCreateValidationMiddleware, addDisks)
  .get("/:id", getDisk)
  .get("/", getDisksList)
  .delete("/:id", deleteDisk)
  .delete("/", deleteDisksList)
  .patch("/:id", diskUpdateValidationMiddleware, updateDisk)
  .patch("/", diskUpdateValidationMiddleware, updateDisksList)
  .use("/:id/partitions", partitionsRoutes);

export { disksRoutes };
