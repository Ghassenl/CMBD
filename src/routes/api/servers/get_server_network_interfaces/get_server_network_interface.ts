import { RequestHandler } from "express";

import { ServersController } from "../../../../controllers";
import {
  ApiError,
  ErrorStatusCode,
  NetworkInterfaceModel,
} from "../../../../models";

const getServerNetworkInterface: RequestHandler<{
  networkInterfaceId: string;
  id: string;
}> = async (request, response, next): Promise<void> => {
  const id = parseInt(request.params.id);
  const networkInterfaceId = parseInt(request.params.networkInterfaceId);
  let item: NetworkInterfaceModel | null = null;

  if (!isNaN(id) && !isNaN(networkInterfaceId)) {
    const serverNetworkInterfaces = (
      await ServersController.getServerWithNetworkInterfaces(
        id,
        networkInterfaceId,
      )
    )?.getNetworkInterfaces();

    if (serverNetworkInterfaces && serverNetworkInterfaces.length) {
      item = serverNetworkInterfaces[0];
    }
  }

  if (item) {
    response.json(item.toJson());
  } else {
    return next(
      new ApiError(
        "Server NetworkInterface not found !",
        ErrorStatusCode.NOT_FOUND,
      ),
    );
  }
};

export default getServerNetworkInterface;
