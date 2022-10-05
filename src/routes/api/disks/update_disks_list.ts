import { RequestHandler } from "express";
import { DisksController } from "../../../controllers";
import { ApiError, ErrorStatusCode, IDiskPatchDTO } from "../../../models";

const updateDisksList: RequestHandler<
  Record<string, string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  { ids: number[]; data: IDiskPatchDTO }
> = async (request, response, next): Promise<void> => {
  let itemsListUpdated = false;

  try {
    itemsListUpdated = await DisksController.updateDisks(
      request.body.ids,
      request.body.data,
    );
  } catch (err) {
    console.error(err);
  }

  if (itemsListUpdated) {
    response.json({
      message: `Disks successfully updated!`,
      success: true,
    });
  } else {
    return next(
      new ApiError("Disks list update failed !", ErrorStatusCode.NOT_FOUND),
    );
  }
};

export default updateDisksList;
