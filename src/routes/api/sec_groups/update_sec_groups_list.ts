import { RequestHandler } from "express";
import { SecGroupsController } from "../../../controllers";
import { ApiError, ErrorStatusCode, ISecGroupPatchDTO } from "../../../models";

const updateSecGroupsList: RequestHandler<
  Record<string, string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  { ids: number[]; data: ISecGroupPatchDTO }
> = async (request, response, next): Promise<void> => {
  let itemsListUpdated = false;

  try {
    itemsListUpdated = await SecGroupsController.updateSecGroups(
      request.body.ids,
      request.body.data,
    );
  } catch (err) {
    console.error(err);
  }

  if (itemsListUpdated) {
    response.json({
      message: `SecGroups successfully updated!`,
      success: true,
    });
  } else {
    return next(
      new ApiError("SecGroups list update failed !", ErrorStatusCode.NOT_FOUND),
    );
  }
};

export default updateSecGroupsList;
