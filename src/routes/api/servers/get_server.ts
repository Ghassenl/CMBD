import { RequestHandler } from "express";

import { ServersController } from "../../../controllers";
import { ServerModel, ApiError, ErrorStatusCode } from "../../../models";

const getServer: RequestHandler<{ id: string }> = async (
  request,
  response,
  next,
): Promise<void> => {
  const id = parseInt(request.params.id);
  let server: ServerModel | null = null;

  if (!isNaN(id)) {
    server = await ServersController.getServer(id);
  }

  if (server) {
    response.json(server.toJson());
  } else {
    return next(new ApiError("Server not found !", ErrorStatusCode.NOT_FOUND));
  }
};

export default getServer;
