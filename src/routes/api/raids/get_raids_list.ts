import { RequestHandler } from "express";

import { RaidsController } from "../../../controllers";
import { ApiError, ErrorStatusCode } from "../../../models";

const getRaidsList: RequestHandler = async (
  request,
  response,
  next,
): Promise<void> => {
  const itemsList = await RaidsController.getRaids();

  if (itemsList) {
    response.json({
      items: itemsList.map((item) => item.toJson()),
    });
  } else {
    return next(
      new ApiError("Raids list not found !", ErrorStatusCode.NOT_FOUND),
    );
  }
};

export default getRaidsList;
