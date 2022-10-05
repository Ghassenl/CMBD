import { PartitionsController } from "../../../controllers";
import { RequestHandler } from "express";
import { ApiError, ErrorStatusCode, IPartitionPatchDTO } from "../../../models";

const updatePartition: RequestHandler<
  { id: string },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  IPartitionPatchDTO
> = async (request, response, next): Promise<void> => {
  const id = parseInt(request.params.id);
  let itemUpdated = false;

  try {
    if (!isNaN(id)) {
      itemUpdated = await PartitionsController.updatePartition(
        id,
        request.body,
      );
    }
  } catch (err) {
    console.error(err);
  }

  if (itemUpdated) {
    response.json({
      message: `Partition(${id}) successfully updated!`,
      success: true,
    });
  } else {
    return next(
      new ApiError("Partition update failed !", ErrorStatusCode.NOT_FOUND),
    );
  }
};

export default updatePartition;
