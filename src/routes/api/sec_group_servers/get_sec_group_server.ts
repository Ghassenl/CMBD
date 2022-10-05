import { RequestHandler } from "express";

import { SecGroupServersController } from "../../../controllers";
import {
  SecGroupServerModel,
  ApiError,
  ErrorStatusCode,
} from "../../../models";

const getSecGroupServer: RequestHandler<{ id: string }> = async (
  request,
  response,
  next,
): Promise<void> => {
  const id = parseInt(request.params.id);
  let resource: SecGroupServerModel | null = null;

  if (!isNaN(id)) {
    resource = await SecGroupServersController.getSecGroupServer(id);
  }

  if (resource) {
    response.json(resource.toJson());
  } else {
    return next(
      new ApiError("SecGroupServer not found !", ErrorStatusCode.NOT_FOUND),
    );
  }
};

export default getSecGroupServer;
