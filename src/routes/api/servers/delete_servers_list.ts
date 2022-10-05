import { RequestHandler } from "express";

import { ServersController } from "../../../controllers";
import { ApiError, ErrorStatusCode } from "../../../models";

const deleteServersList: RequestHandler<
  Record<string, string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  { ids: number[] }
> = async (request, response, next): Promise<void> => {
  let itemsListDeleted = false;

  try {
    itemsListDeleted = await ServersController.deleteServers(request.body.ids);
  } catch (err) {
    console.error(err);
  }

  if (itemsListDeleted) {
    response.json({
      message: `Servers list successfully deleted!`,
      success: true,
    });
  } else {
    return next(
      new ApiError("Servers list delete failed !", ErrorStatusCode.NOT_FOUND),
    );
  }
};

export default deleteServersList;
