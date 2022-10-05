import { RequestHandler } from "express";

import { PartitionsController } from "../../../controllers";
import { PartitionModel, ApiError, ErrorStatusCode } from "../../../models";

const getPartition: RequestHandler<{ id: string }> = async (
  request,
  response,
  next,
): Promise<void> => {
  const id = parseInt(request.params.id);
  let resource: PartitionModel | null = null;

  if (!isNaN(id)) {
    resource = await PartitionsController.getPartition(id);
  }

  if (resource) {
    response.json(resource.toJson());
  } else {
    return next(
      new ApiError("Partition not found !", ErrorStatusCode.NOT_FOUND),
    );
  }
};

export default getPartition;
