import { RequestHandler } from "express";

import { NetworkInterfacesController } from "../../../controllers";
import { ApiError, ErrorStatusCode } from "../../../models";

const deleteNetworkInterfacesList: RequestHandler<
  Record<string, string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  { ids: number[] }
> = async (request, response, next): Promise<void> => {
  let itemsListDeleted = false;

  try {
    itemsListDeleted =
      await NetworkInterfacesController.deleteNetworkInterfaces(
        request.body.ids,
      );
  } catch (err) {
    console.error(err);
  }

  if (itemsListDeleted) {
    response.json({
      message: `NetworkInterfaces list successfully deleted!`,
      success: true,
    });
  } else {
    return next(
      new ApiError(
        "NetworkInterfaces list delete failed !",
        ErrorStatusCode.NOT_FOUND,
      ),
    );
  }
};

export default deleteNetworkInterfacesList;
