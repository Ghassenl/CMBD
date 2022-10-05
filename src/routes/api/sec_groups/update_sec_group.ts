import { SecGroupsController } from "../../../controllers";
import { RequestHandler } from "express";
import { ApiError, ErrorStatusCode, ISecGroupPatchDTO } from "../../../models";

const updateSecGroup: RequestHandler<
  { id: string },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  ISecGroupPatchDTO
> = async (request, response, next): Promise<void> => {
  const id = parseInt(request.params.id);
  let itemUpdated = false;

  try {
    if (!isNaN(id)) {
      itemUpdated = await SecGroupsController.updateSecGroup(id, request.body);
    }
  } catch (err) {
    console.error(err);
  }

  if (itemUpdated) {
    response.json({
      message: `SecGroup(${id}) successfully updated!`,
      success: true,
    });
  } else {
    return next(
      new ApiError("SecGroup update failed !", ErrorStatusCode.NOT_FOUND),
    );
  }
};

export default updateSecGroup;
