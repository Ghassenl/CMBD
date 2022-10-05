import { RequestHandler } from "express";

import { PartitionsController } from "../../../controllers";
import { ApiError, ErrorStatusCode } from "../../../models";

const getPartitionsList: RequestHandler = async (
  request,
  response,
  next,
): Promise<void> => {
  const itemsList = await PartitionsController.getPartitions();

  if (itemsList) {
    response.json({
      items: itemsList.map((item) => item.toJson()),
    });
  } else {
    return next(
      new ApiError("Partitions list not found !", ErrorStatusCode.NOT_FOUND),
    );
  }
};

export default getPartitionsList;
