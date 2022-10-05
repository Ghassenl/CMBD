import { RequestHandler } from "express";
import { NetworkInterfacesController } from "../../../controllers";
import {
  ApiError,
  ErrorStatusCode,
  INetworkInterfacePatchDTO,
} from "../../../models";

const updateNetworkInterfacesList: RequestHandler<
  Record<string, string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  { ids: number[]; data: INetworkInterfacePatchDTO }
> = async (request, response, next): Promise<void> => {
  let itemsListUpdated = false;

  try {
    itemsListUpdated =
      await NetworkInterfacesController.updateNetworkInterfaces(
        request.body.ids,
        request.body.data,
      );
  } catch (err) {
    console.error(err);
  }

  if (itemsListUpdated) {
    response.json({
      message: `NetworkInterfaces successfully updated!`,
      success: true,
    });
  } else {
    return next(
      new ApiError(
        "NetworkInterfaces list update failed !",
        ErrorStatusCode.NOT_FOUND,
      ),
    );
  }
};

export default updateNetworkInterfacesList;
