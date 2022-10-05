import { RequestHandler } from "express";

import { DisksController } from "../../../controllers";
import { ApiError, ErrorStatusCode } from "../../../models";

const getDisksList: RequestHandler = async (
  request,
  response,
  next,
): Promise<void> => {
  const itemsList = await DisksController.getDisks();

  if (itemsList) {
    response.json({
      items: itemsList.map((item) => item.toJson()),
    });
  } else {
    return next(
      new ApiError("Disks list not found !", ErrorStatusCode.NOT_FOUND),
    );
  }
};

export default getDisksList;
