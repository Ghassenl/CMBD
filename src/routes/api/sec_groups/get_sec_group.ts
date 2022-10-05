import { RequestHandler } from "express";

import { SecGroupsController } from "../../../controllers";
import { SecGroupModel, ApiError, ErrorStatusCode } from "../../../models";

const getSecGroup: RequestHandler<{ id: string }> = async (
  request,
  response,
  next,
): Promise<void> => {
  const id = parseInt(request.params.id);
  let resource: SecGroupModel | null = null;

  if (!isNaN(id)) {
    resource = await SecGroupsController.getSecGroup(id);
  }

  if (resource) {
    response.json(resource.toJson());
  } else {
    return next(
      new ApiError("SecGroup not found !", ErrorStatusCode.NOT_FOUND),
    );
  }
};

export default getSecGroup;
