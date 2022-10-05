import { RequestHandler } from "express";

import { ServersController } from "../../../controllers";
import { ApiError, ErrorStatusCode } from "../../../models";

const getServersList: RequestHandler = async (
  request,
  response,
  next,
): Promise<void> => {
  const itemsList = await ServersController.getServers();

  if (itemsList) {
    response.json({
      items: itemsList.map((item) => item.toJson()),
    });
  } else {
    return next(
      new ApiError("Servers list not found !", ErrorStatusCode.NOT_FOUND),
    );
  }
};

export default getServersList;
