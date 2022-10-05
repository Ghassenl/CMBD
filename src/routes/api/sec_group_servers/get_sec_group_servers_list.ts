import { RequestHandler } from "express";

import { SecGroupServersController } from "../../../controllers";
import { ApiError, ErrorStatusCode } from "../../../models";

const getSecGroupServersList: RequestHandler = async (
  request,
  response,
  next,
): Promise<void> => {
  const itemsList = await SecGroupServersController.getSecGroupServers();

  if (itemsList) {
    response.json({
      items: itemsList.map((item) => item.toJson()),
    });
  } else {
    return next(
      new ApiError(
        "SecGroupServers list not found !",
        ErrorStatusCode.NOT_FOUND,
      ),
    );
  }
};

export default getSecGroupServersList;
