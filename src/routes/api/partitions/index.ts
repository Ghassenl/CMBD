import express from "express";

import getPartition from "./get_partition";
import getPartitionsList from "./get_partitions_list";
import deletePartition from "./delete_partition";
import addPartitions from "./add_partitions";
import updatePartition from "./update_partition";
import deletePartitionsList from "./delete_partitions_list";
import updatePartitionsList from "./update_partitions_list";
import {
  partitionCreateValidationMiddleware,
  partitionUpdateValidationMiddleware,
} from "../../../middlewares";

const partitionsRoutes = express
  .Router({ mergeParams: true })
  .post("/", partitionCreateValidationMiddleware, addPartitions)
  .get("/:id", getPartition)
  .get("/", getPartitionsList)
  .delete("/:id", deletePartition)
  .delete("/", deletePartitionsList)
  .patch("/:id", partitionUpdateValidationMiddleware, updatePartition)
  .patch("/", partitionUpdateValidationMiddleware, updatePartitionsList);
export { partitionsRoutes };
