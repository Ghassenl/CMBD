import { RequestHandler } from "express";

import { NetworkInterfacesController } from "../../../controllers";
import {
  NetworkInterfaceModel,
  ApiError,
  ErrorStatusCode,
} from "../../../models";

const getNetworkInterface: RequestHandler<{ id: string }> = async (
  request,
  response,
  next,
): Promise<void> => {
  const id = parseInt(request.params.id);
  let resource: NetworkInterfaceModel | null = null;

  if (!isNaN(id)) {
    resource = await NetworkInterfacesController.getNetworkInterface(id);
  }

  if (resource) {
    response.json(resource.toJson());
  } else {
    return next(
      new ApiError("NetworkInterface not found !", ErrorStatusCode.NOT_FOUND),
    );
  }
};

export default getNetworkInterface;
