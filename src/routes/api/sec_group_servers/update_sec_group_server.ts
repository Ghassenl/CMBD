import { SecGroupServersController } from "../../../controllers";
import { RequestHandler } from "express";
import {
  ApiError,
  ErrorStatusCode,
  ISecGroupServerPatchDTO,
} from "../../../models";

const updateSecGroupServer: RequestHandler<
  { id: string },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  ISecGroupServerPatchDTO
> = async (request, response, next): Promise<void> => {
  const id = parseInt(request.params.id);
  let itemUpdated = false;

  try {
    if (!isNaN(id)) {
      itemUpdated = await SecGroupServersController.updateSecGroupServer(
        id,
        request.body,
      );
    }
  } catch (err) {
    console.error(err);
  }

  if (itemUpdated) {
    response.json({
      message: `SecGroupServer(${id}) successfully updated!`,
      success: true,
    });
  } else {
    return next(
      new ApiError("SecGroupServer update failed !", ErrorStatusCode.NOT_FOUND),
    );
  }
};

export default updateSecGroupServer;
