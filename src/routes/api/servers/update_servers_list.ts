import { RequestHandler } from "express";
import { ServersController } from "../../../controllers";
import { ApiError, ErrorStatusCode, IServerPatchDTO } from "../../../models";

const updateServersList: RequestHandler<
  Record<string, string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  { ids: number[]; data: IServerPatchDTO }
> = async (request, response, next): Promise<void> => {
  let itemsListUpdated = false;

  try {
    itemsListUpdated = await ServersController.updateServers(
      request.body.ids,
      request.body.data,
    );
  } catch (err) {
    console.error(err);
  }

  if (itemsListUpdated) {
    response.json({
      message: `Servers successfully updated!`,
      success: true,
    });
  } else {
    return next(
      new ApiError("Servers list update failed !", ErrorStatusCode.NOT_FOUND),
    );
  }
};

export default updateServersList;
