import { RequestHandler } from "express";

import { NetworkInterfacesController } from "../../../controllers";
import { ApiError, ErrorStatusCode } from "../../../models";

const getNetworkInterfacesList: RequestHandler = async (
  request,
  response,
  next,
): Promise<void> => {
  const itemsList = await NetworkInterfacesController.getNetworkInterfaces();

  if (itemsList) {
    response.json({
      items: itemsList.map((item) => item.toJson()),
    });
  } else {
    return next(
      new ApiError(
        "NetworkInterfaces list not found !",
        ErrorStatusCode.NOT_FOUND,
      ),
    );
  }
};

export default getNetworkInterfacesList;
