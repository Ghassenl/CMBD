import { RequestHandler } from "express";
import { PartitionsController } from "../../../../controllers";
import {
  ApiError,
  ErrorStatusCode,
  IPartitionCreateDTO,
} from "../../../../models";

const addPartition: RequestHandler<
  Record<string, string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  IPartitionCreateDTO
> = async (request, response, next): Promise<void> => {
  let added = null;

  try {
    if (request.body) {
      added = await PartitionsController.addPartition(request.body);
    }
  } catch (err) {
    console.error(err);
  }

  if (added) {
    response.json({
      message: `Partition successfully added!`,
      success: true,
      count: 1,
      items: [added.toJson()],
    });
  } else {
    return next(
      new ApiError(
        "Partition add failed !",
        ErrorStatusCode.INTERNAL_SERVER_ERROR,
      ),
    );
  }
};

export default addPartition;
