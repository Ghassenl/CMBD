import { RequestHandler } from "express";
import { SecGroupServersController } from "../../../controllers";
import {
  ApiError,
  ErrorStatusCode,
  ISecGroupServerPatchDTO,
} from "../../../models";

const updateSecGroupServersList: RequestHandler<
  Record<string, string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  { ids: number[]; data: ISecGroupServerPatchDTO }
> = async (request, response, next): Promise<void> => {
  let itemsListUpdated = false;

  try {
    itemsListUpdated = await SecGroupServersController.updateSecGroupServers(
      request.body.ids,
      request.body.data,
    );
  } catch (err) {
    console.error(err);
  }

  if (itemsListUpdated) {
    response.json({
      message: `SecGroupServers successfully updated!`,
      success: true,
    });
  } else {
    return next(
      new ApiError(
        "SecGroupServers list update failed !",
        ErrorStatusCode.NOT_FOUND,
      ),
    );
  }
};

export default updateSecGroupServersList;
