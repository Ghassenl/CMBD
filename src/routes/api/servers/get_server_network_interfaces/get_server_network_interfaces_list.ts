import { RequestHandler } from "express";

import { ServersController } from "../../../../controllers";
import {
  ApiError,
  ErrorStatusCode,
  NetworkInterfaceModel,
} from "../../../../models";

const getServerNetworkInterfacesList: RequestHandler<{ id: string }> = async (
  request,
  response,
  next,
): Promise<void> => {
  const id = parseInt(request.params.id);
  let itemsList: NetworkInterfaceModel[] | null = null;

  if (!isNaN(id)) {
    const serverNetworkInterfaces = (
      await ServersController.getServerWithNetworkInterfaces(id)
    )?.getNetworkInterfaces();

    if (serverNetworkInterfaces && serverNetworkInterfaces.length) {
      itemsList = serverNetworkInterfaces;
    }
  }

  if (itemsList) {
    response.json({
      items: itemsList.map((item) => item.toJson()),
    });
  } else {
    return next(
      new ApiError(
        "Server NetworkInterfaces not found !",
        ErrorStatusCode.NOT_FOUND,
      ),
    );
  }
};

export default getServerNetworkInterfacesList;
