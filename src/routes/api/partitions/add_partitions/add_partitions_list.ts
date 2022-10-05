import { RequestHandler } from "express";
import { PartitionsController } from "../../../../controllers";
import {
  PartitionModel,
  ApiError,
  ErrorStatusCode,
  IPartitionCreateDTO,
} from "../../../../models";

const addPartitionsList: RequestHandler<
  Record<string, string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  IPartitionCreateDTO[]
> = async (request, response, next): Promise<void> => {
  let itemsListAdded: PartitionModel[] | null = null;

  try {
    if (request.body && Array.isArray(request.body)) {
      itemsListAdded = await PartitionsController.addPartitions(request.body);
    }
  } catch (err) {
    console.error(err);
  }

  if (itemsListAdded) {
    response.json({
      message: `Partitions list successfully added!`,
      success: true,
      count: itemsListAdded.length,
      items: itemsListAdded.map((item) => item.toJson()),
    });
  } else {
    return next(
      new ApiError(
        "Partition list add failed !",
        ErrorStatusCode.INTERNAL_SERVER_ERROR,
      ),
    );
  }
};

export default addPartitionsList;
