import { ServersController } from "../../../controllers";
import { RequestHandler } from "express";
import { ApiError, ErrorStatusCode, IServerPatchDTO } from "../../../models";

const updateServer: RequestHandler<
  { id: string },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  IServerPatchDTO
> = async (request, response, next): Promise<void> => {
  const id = parseInt(request.params.id);
  let itemUpdated = false;

  try {
    if (!isNaN(id)) {
      itemUpdated = await ServersController.updateServer(id, request.body);
    }
  } catch (err) {
    console.error(err);
  }

  if (itemUpdated) {
    response.json({
      message: `Server(${id}) successfully updated!`,
      success: true,
    });
  } else {
    return next(
      new ApiError("Server update failed !", ErrorStatusCode.NOT_FOUND),
    );
  }
};

export default updateServer;
