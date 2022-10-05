import { RequestHandler } from "express";

import { NetworkInterfacesController } from "../../../controllers";
import { ApiError, ErrorStatusCode } from "../../../models";

const deleteNetworkInterface: RequestHandler<{ id: string }> = async (
  request,
  response,
  next,
): Promise<void> => {
  const id = parseInt(request.params.id);
  let itemDeleted = false;

  if (!isNaN(id)) {
    itemDeleted = await NetworkInterfacesController.deleteNetworkInterface(id);
  }

  if (itemDeleted) {
    response.json({
      message: `NetworkInterface(${id}) successfully deleted!`,
      success: true,
    });
  } else {
    return next(
      new ApiError(
        "NetworkInterface delete failed !",
        ErrorStatusCode.NOT_FOUND,
      ),
    );
  }
};

export default deleteNetworkInterface;
