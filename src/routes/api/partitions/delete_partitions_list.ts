import { RequestHandler } from "express";

import { PartitionsController } from "../../../controllers";
import { ApiError, ErrorStatusCode } from "../../../models";

const deletePartitionsList: RequestHandler<
  Record<string, string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  { ids: number[] }
> = async (request, response, next): Promise<void> => {
  let itemsListDeleted = false;

  try {
    itemsListDeleted = await PartitionsController.deletePartitions(
      request.body.ids,
    );
  } catch (err) {
    console.error(err);
  }

  if (itemsListDeleted) {
    response.json({
      message: `Partitions list successfully deleted!`,
      success: true,
    });
  } else {
    return next(
      new ApiError(
        "Partitions list delete failed !",
        ErrorStatusCode.NOT_FOUND,
      ),
    );
  }
};

export default deletePartitionsList;
