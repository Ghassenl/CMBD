import { RequestHandler } from "express";

import { SecGroupsController } from "../../../controllers";
import { ApiError, ErrorStatusCode } from "../../../models";

const getSecGroupsList: RequestHandler = async (
  request,
  response,
  next,
): Promise<void> => {
  const itemsList = await SecGroupsController.getSecGroups();

  if (itemsList) {
    response.json({
      items: itemsList.map((item) => item.toJson()),
    });
  } else {
    return next(
      new ApiError("SecGroups list not found !", ErrorStatusCode.NOT_FOUND),
    );
  }
};

export default getSecGroupsList;
