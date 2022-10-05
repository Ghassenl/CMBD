import { RequestHandler } from "express";

import { RaidsController } from "../../../controllers";
import { RaidModel, ApiError, ErrorStatusCode } from "../../../models";

const getRaid: RequestHandler<{ id: string }> = async (
  request,
  response,
  next,
): Promise<void> => {
  const id = parseInt(request.params.id);
  let resource: RaidModel | null = null;

  if (!isNaN(id)) {
    resource = await RaidsController.getRaid(id);
  }

  if (resource) {
    response.json(resource.toJson());
  } else {
    return next(new ApiError("Raid not found !", ErrorStatusCode.NOT_FOUND));
  }
};

export default getRaid;
