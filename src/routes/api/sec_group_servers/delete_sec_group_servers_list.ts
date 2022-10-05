import { RequestHandler } from "express";

import { SecGroupServersController } from "../../../controllers";
import { ApiError, ErrorStatusCode } from "../../../models";

const deleteSecGroupServersList: RequestHandler<
  Record<string, string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  { ids: number[] }
> = async (request, response, next): Promise<void> => {
  let itemsListDeleted = false;

  try {
    itemsListDeleted = await SecGroupServersController.deleteSecGroupServers(
      request.body.ids,
    );
  } catch (err) {
    console.error(err);
  }

  if (itemsListDeleted) {
    response.json({
      message: `SecGroupServers list successfully deleted!`,
      success: true,
    });
  } else {
    return next(
      new ApiError(
        "SecGroupServers list delete failed !",
        ErrorStatusCode.NOT_FOUND,
      ),
    );
  }
};

export default deleteSecGroupServersList;
