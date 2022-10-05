import { RequestHandler } from "express";
import { NetworkInterfacesController } from "../../../../controllers";
import {
  NetworkInterfaceModel,
  ApiError,
  ErrorStatusCode,
  INetworkInterfaceCreateDTO,
} from "../../../../models";

const addNetworkInterfacesList: RequestHandler<
  Record<string, string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  INetworkInterfaceCreateDTO[]
> = async (request, response, next): Promise<void> => {
  let itemsListAdded: NetworkInterfaceModel[] | null = null;

  try {
    if (request.body && Array.isArray(request.body)) {
      itemsListAdded = await NetworkInterfacesController.addNetworkInterfaces(
        request.body,
      );
    }
  } catch (err) {
    console.error(err);
  }

  if (itemsListAdded) {
    response.json({
      message: `NetworkInterfaces list successfully added!`,
      success: true,
      count: itemsListAdded.length,
      items: itemsListAdded.map((item) => item.toJson()),
    });
  } else {
    return next(
      new ApiError(
        "NetworkInterface list add failed !",
        ErrorStatusCode.INTERNAL_SERVER_ERROR,
      ),
    );
  }
};

export default addNetworkInterfacesList;
