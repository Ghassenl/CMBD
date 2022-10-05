import { RequestHandler } from "express";

import { DisksController } from "../../../controllers";
import { ApiError, ErrorStatusCode } from "../../../models";

const deleteDisksList: RequestHandler<
  Record<string, string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  { ids: number[] }
> = async (request, response, next): Promise<void> => {
  let itemsListDeleted = false;

  try {
    itemsListDeleted = await DisksController.deleteDisks(request.body.ids);
  } catch (err) {
    console.error(err);
  }

  if (itemsListDeleted) {
    response.json({
      message: `Disks list successfully deleted!`,
      success: true,
    });
  } else {
    return next(
      new ApiError("Disks list delete failed !", ErrorStatusCode.NOT_FOUND),
    );
  }
};

export default deleteDisksList;
