import { RequestHandler } from "express";
import { PartitionsController } from "../../../controllers";
import { ApiError, ErrorStatusCode, IPartitionPatchDTO } from "../../../models";

const updatePartitionsList: RequestHandler<
  Record<string, string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  { ids: number[]; data: IPartitionPatchDTO }
> = async (request, response, next): Promise<void> => {
  let itemsListUpdated = false;

  try {
    itemsListUpdated = await PartitionsController.updatePartitions(
      request.body.ids,
      request.body.data,
    );
  } catch (err) {
    console.error(err);
  }

  if (itemsListUpdated) {
    response.json({
      message: `Partitions successfully updated!`,
      success: true,
    });
  } else {
    return next(
      new ApiError(
        "Partitions list update failed !",
        ErrorStatusCode.NOT_FOUND,
      ),
    );
  }
};

export default updatePartitionsList;
