import { RequestHandler } from "express";
import {
  ApiError,
  ErrorStatusCode,
  INetworkInterfaceCreateDTO,
} from "../../../../models";

import addNetworkInterface from "./add_network_interface";
import addNetworkInterfacesList from "./add_network_interfaces_list";

const addNetworkInterfaces: RequestHandler<
  Record<string, string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  INetworkInterfaceCreateDTO | INetworkInterfaceCreateDTO[]
> = async (request, response, next): Promise<void> => {
  try {
    if (request.body) {
      if (Array.isArray(request.body)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return addNetworkInterfacesList(request as any, response, next);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return addNetworkInterface(request as any, response, next);
      }
    }
  } catch (err) {
    return next(
      new ApiError(
        "NetworkInterface add failed !",
        ErrorStatusCode.INTERNAL_SERVER_ERROR,
      ),
    );
  }
};

export default addNetworkInterfaces;
