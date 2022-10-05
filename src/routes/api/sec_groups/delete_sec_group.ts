import { RequestHandler } from "express";

import { SecGroupsController } from "../../../controllers";
import { ApiError, ErrorStatusCode } from "../../../models";

const deleteSecGroup: RequestHandler<{ id: string }> = async (
  request,
  response,
  next,
): Promise<void> => {
  const id = parseInt(request.params.id);
  let itemDeleted = false;

  if (!isNaN(id)) {
    itemDeleted = await SecGroupsController.deleteSecGroup(id);
  }

  if (itemDeleted) {
    response.json({
      message: `SecGroup(${id}) successfully deleted!`,
      success: true,
    });
  } else {
    return next(
      new ApiError("SecGroup delete failed !", ErrorStatusCode.NOT_FOUND),
    );
  }
};

export default deleteSecGroup;
