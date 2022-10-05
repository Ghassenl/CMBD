import { RequestHandler } from "express";

import { DisksController } from "../../../controllers";
import { ApiError, ErrorStatusCode } from "../../../models";

const deleteDisk: RequestHandler<{ id: string }> = async (
  request,
  response,
  next,
): Promise<void> => {
  const id = parseInt(request.params.id);
  let itemDeleted = false;

  if (!isNaN(id)) {
    itemDeleted = await DisksController.deleteDisk(id);
  }

  if (itemDeleted) {
    response.json({
      message: `Disk(${id}) successfully deleted!`,
      success: true,
    });
  } else {
    return next(
      new ApiError("Disk delete failed !", ErrorStatusCode.NOT_FOUND),
    );
  }
};

export default deleteDisk;
