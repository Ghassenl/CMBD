import { RequestHandler } from "express";

import { PartitionsController } from "../../../controllers";
import { ApiError, ErrorStatusCode } from "../../../models";

const deletePartition: RequestHandler<{ id: string }> = async (
  request,
  response,
  next,
): Promise<void> => {
  const id = parseInt(request.params.id);
  let itemDeleted = false;

  if (!isNaN(id)) {
    itemDeleted = await PartitionsController.deletePartition(id);
  }

  if (itemDeleted) {
    response.json({
      message: `Partition(${id}) successfully deleted!`,
      success: true,
    });
  } else {
    return next(
      new ApiError("Partition delete failed !", ErrorStatusCode.NOT_FOUND),
    );
  }
};

export default deletePartition;
