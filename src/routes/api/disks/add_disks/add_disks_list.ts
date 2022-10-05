import { RequestHandler } from "express";
import { DisksController } from "../../../../controllers";
import {
  DiskModel,
  ApiError,
  ErrorStatusCode,
  IDiskCreateDTO,
} from "../../../../models";

const addDisksList: RequestHandler<
  Record<string, string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  IDiskCreateDTO[]
> = async (request, response, next): Promise<void> => {
  let itemsListAdded: DiskModel[] | null = null;

  try {
    if (request.body && Array.isArray(request.body)) {
      itemsListAdded = await DisksController.addDisks(request.body);
    }
  } catch (err) {
    console.error(err);
  }

  if (itemsListAdded) {
    response.json({
      message: `Disks list successfully added!`,
      success: true,
      count: itemsListAdded.length,
      items: itemsListAdded.map((item) => item.toJson()),
    });
  } else {
    return next(
      new ApiError(
        "Disk list add failed !",
        ErrorStatusCode.INTERNAL_SERVER_ERROR,
      ),
    );
  }
};

export default addDisksList;
