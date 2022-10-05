import { RequestHandler } from "express";

import { RaidsController } from "../../../controllers";
import { ApiError, ErrorStatusCode } from "../../../models";

const deleteRaid: RequestHandler<{ id: string }> = async (
  request,
  response,
  next,
): Promise<void> => {
  const id = parseInt(request.params.id);
  let itemDeleted = false;

  if (!isNaN(id)) {
    itemDeleted = await RaidsController.deleteRaid(id);
  }

  if (itemDeleted) {
    response.json({
      message: `Raid(${id}) successfully deleted!`,
      success: true,
    });
  } else {
    return next(
      new ApiError("Raid delete failed !", ErrorStatusCode.NOT_FOUND),
    );
  }
};

export default deleteRaid;
