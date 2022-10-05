import { RequestHandler } from "express";
import {
  ApiError,
  ErrorStatusCode,
  IPartitionCreateDTO,
} from "../../../../models";

import addPartition from "./add_partition";
import addPartitionsList from "./add_partitions_list";

const addPartitions: RequestHandler<
  Record<string, string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  IPartitionCreateDTO | IPartitionCreateDTO[]
> = async (request, response, next): Promise<void> => {
  try {
    if (request.body) {
      if (Array.isArray(request.body)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return addPartitionsList(request as any, response, next);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return addPartition(request as any, response, next);
      }
    }
  } catch (err) {
    return next(
      new ApiError(
        "Partition add failed !",
        ErrorStatusCode.INTERNAL_SERVER_ERROR,
      ),
    );
  }
};

export default addPartitions;
