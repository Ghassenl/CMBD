import { RequestHandler } from "express";

import { SecGroupServersController } from "../../../controllers";
import { ApiError, ErrorStatusCode } from "../../../models";

const deleteSecGroupServer: RequestHandler<{ id: string }> = async (
  request,
  response,
  next,
): Promise<void> => {
  const id = parseInt(request.params.id);
  let itemDeleted = false;

  if (!isNaN(id)) {
    itemDeleted = await SecGroupServersController.deleteSecGroupServer(id);
  }

  if (itemDeleted) {
    response.json({
      message: `SecGroupServer(${id}) successfully deleted!`,
      success: true,
    });
  } else {
    return next(
      new ApiError("SecGroupServer delete failed !", ErrorStatusCode.NOT_FOUND),
    );
  }
};

export default deleteSecGroupServer;
