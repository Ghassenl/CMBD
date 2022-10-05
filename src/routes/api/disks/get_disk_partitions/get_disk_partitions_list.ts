import { RequestHandler } from "express";

import { DisksController } from "../../../../controllers";
import { ApiError, ErrorStatusCode, PartitionModel } from "../../../../models";

const getDiskPartitionsList: RequestHandler<{ id: string }> = async (
  request,
  response,
  next,
): Promise<void> => {
  const id = parseInt(request.params.id);
  let itemsList: PartitionModel[] | null = null;

  if (!isNaN(id)) {
    const diskPartitions = (
      await DisksController.getDiskWithPartitions(id)
    )?.getPartitions();

    if (diskPartitions && diskPartitions.length) {
      itemsList = diskPartitions;
    }
  }

  if (itemsList) {
    response.json({
      items: itemsList.map((item) => item.toJson()),
    });
  } else {
    return next(
      new ApiError("Disk Partitions not found !", ErrorStatusCode.NOT_FOUND),
    );
  }
};

export default getDiskPartitionsList;
