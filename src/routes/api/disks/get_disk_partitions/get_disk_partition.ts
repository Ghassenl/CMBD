import { RequestHandler } from "express";

import { DisksController } from "../../../../controllers";
import { ApiError, ErrorStatusCode, PartitionModel } from "../../../../models";

const getDiskPartition: RequestHandler<{
  partitionId: string;
  id: string;
}> = async (request, response, next): Promise<void> => {
  const id = parseInt(request.params.id);
  const partitionId = parseInt(request.params.partitionId);
  let item: PartitionModel | null = null;

  if (!isNaN(id) && !isNaN(partitionId)) {
    const diskPartitions = (
      await DisksController.getDiskWithPartitions(id, partitionId)
    )?.getPartitions();

    if (diskPartitions && diskPartitions.length) {
      item = diskPartitions[0];
    }
  }

  if (item) {
    response.json(item.toJson());
  } else {
    return next(
      new ApiError("Disk Partition not found !", ErrorStatusCode.NOT_FOUND),
    );
  }
};

export default getDiskPartition;
