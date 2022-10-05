import { RequestHandler } from "express";
import { ApiError, ErrorStatusCode, IDiskCreateDTO } from "../../../../models";

import addDisk from "./add_disk";
import addDisksList from "./add_disks_list";

const addDisks: RequestHandler<
  Record<string, string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  IDiskCreateDTO | IDiskCreateDTO[]
> = async (request, response, next): Promise<void> => {
  try {
    if (request.body) {
      if (Array.isArray(request.body)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return addDisksList(request as any, response, next);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return addDisk(request as any, response, next);
      }
    }
  } catch (err) {
    return next(
      new ApiError("Disk add failed !", ErrorStatusCode.INTERNAL_SERVER_ERROR),
    );
  }
};

export default addDisks;
