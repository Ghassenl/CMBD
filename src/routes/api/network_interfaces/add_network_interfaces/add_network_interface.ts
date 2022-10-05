import { RequestHandler } from "express";
import { NetworkInterfacesController } from "../../../../controllers";
import {
  ApiError,
  ErrorStatusCode,
  INetworkInterfaceCreateDTO,
} from "../../../../models";

const addNetworkInterface: RequestHandler<
  Record<string, string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  INetworkInterfaceCreateDTO
> = async (request, response, next): Promise<void> => {
  let added = null;

  try {
    if (request.body) {
      added = await NetworkInterfacesController.addNetworkInterface(
        request.body,
      );
    }
  } catch (err) {
    console.error(err);
  }

  if (added) {
    response.json({
      message: `NetworkInterface successfully added!`,
      success: true,
      count: 1,
      items: [added.toJson()],
    });
  } else {
    return next(
      new ApiError(
        "NetworkInterface add failed !",
        ErrorStatusCode.INTERNAL_SERVER_ERROR,
      ),
    );
  }
};

export default addNetworkInterface;
