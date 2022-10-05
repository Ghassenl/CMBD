import { RequestHandler } from "express";

import { ServersController } from "../../../controllers";
import { ApiError, ErrorStatusCode } from "../../../models";

const deleteServer: RequestHandler<{ id: string }> = async (
  request,
  response,
  next,
): Promise<void> => {
  const id = parseInt(request.params.id);
  let itemDeleted = false;

  if (!isNaN(id)) {
    itemDeleted = await ServersController.deleteServer(id);
  }

  if (itemDeleted) {
    response.json({
      message: `Server(${id}) successfully deleted!`,
      success: true,
    });
  } else {
    return next(
      new ApiError("Server delete failed !", ErrorStatusCode.NOT_FOUND),
    );
  }
};

export default deleteServer;
