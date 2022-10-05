import { RequestHandler } from "express";

import { DisksController } from "../../../controllers";
import { DiskModel, ApiError, ErrorStatusCode } from "../../../models";

const getDisk: RequestHandler<{ id: string }> = async (
  request,
  response,
  next,
): Promise<void> => {
  const id = parseInt(request.params.id);
  let resource: DiskModel | null = null;

  if (!isNaN(id)) {
    resource = await DisksController.getDisk(id);
  }

  if (resource) {
    response.json(resource.toJson());
  } else {
    return next(new ApiError("Disk not found !", ErrorStatusCode.NOT_FOUND));
  }
};

export default getDisk;
