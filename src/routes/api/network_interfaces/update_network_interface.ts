import { NetworkInterfacesController } from "../../../controllers";
import { RequestHandler } from "express";
import {
  ApiError,
  ErrorStatusCode,
  INetworkInterfacePatchDTO,
} from "../../../models";

const updateNetworkInterface: RequestHandler<
  { id: string },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  INetworkInterfacePatchDTO
> = async (request, response, next): Promise<void> => {
  const id = parseInt(request.params.id);
  let itemUpdated = false;

  try {
    if (!isNaN(id)) {
      itemUpdated = await NetworkInterfacesController.updateNetworkInterface(
        id,
        request.body,
      );
    }
  } catch (err) {
    console.error(err);
  }

  if (itemUpdated) {
    response.json({
      message: `NetworkInterface(${id}) successfully updated!`,
      success: true,
    });
  } else {
    return next(
      new ApiError(
        "NetworkInterface update failed !",
        ErrorStatusCode.NOT_FOUND,
      ),
    );
  }
};

export default updateNetworkInterface;
