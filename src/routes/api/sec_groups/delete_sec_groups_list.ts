import { RequestHandler } from "express";

import { SecGroupsController } from "../../../controllers";
import { ApiError, ErrorStatusCode } from "../../../models";

const deleteSecGroupsList: RequestHandler<
  Record<string, string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  { ids: number[] }
> = async (request, response, next): Promise<void> => {
  let itemsListDeleted = false;

  try {
    itemsListDeleted = await SecGroupsController.deleteSecGroups(
      request.body.ids,
    );
  } catch (err) {
    console.error(err);
  }

  if (itemsListDeleted) {
    response.json({
      message: `SecGroups list successfully deleted!`,
      success: true,
    });
  } else {
    return next(
      new ApiError("SecGroups list delete failed !", ErrorStatusCode.NOT_FOUND),
    );
  }
};

export default deleteSecGroupsList;
