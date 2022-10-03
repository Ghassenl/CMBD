import { ServersController } from "../../../controllers";
import { RequestHandler } from "express";
import { ApiError, ErrorStatusCode } from "../../../models";

const updateServer: RequestHandler<{ id: string }> = async (
  request,
  response,
  next,
): Promise<void> => {
  const id = parseInt(request.params.id);
  const updatedServer = request.body ?? {};
  let serverUpdated = false;

  try {
    if (!isNaN(id)) {
      serverUpdated = await ServersController.updateServer(id, updatedServer);
    }
  } catch (err) {
    console.error(err);
  }

  if (serverUpdated) {
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
