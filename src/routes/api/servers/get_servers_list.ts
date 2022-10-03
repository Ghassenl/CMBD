import { RequestHandler } from "express";

import { ServersController } from "../../../controllers";
import { ApiError, ErrorStatusCode } from "../../../models";

const getServersList: RequestHandler = async (
  request,
  response,
  next,
): Promise<void> => {
  const ServersResult = await ServersController.getServers();

  if (ServersResult) {
    const ServersResultResponse = ServersResult.map((item) => item.toJson());
    response.json(ServersResultResponse);
  } else {
    return next(
      new ApiError("Servers list not found !", ErrorStatusCode.NOT_FOUND),
    );
  }
};

export default getServersList;
