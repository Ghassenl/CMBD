import { RequestHandler } from "express";
import { DisksController } from "../../../../controllers";
import { ApiError, ErrorStatusCode, IDiskCreateDTO } from "../../../../models";

const addDisk: RequestHandler<
  Record<string, string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  IDiskCreateDTO
> = async (request, response, next): Promise<void> => {
  let added = null;

  try {
    if (request.body) {
      added = await DisksController.addDisk(request.body);
    }
  } catch (err) {
    console.error(err);
  }

  if (added) {
    response.json({
      message: `Disk successfully added!`,
      success: true,
      count: 1,
      items: [added.toJson()],
    });
  } else {
    return next(
      new ApiError("Disk add failed !", ErrorStatusCode.INTERNAL_SERVER_ERROR),
    );
  }
};

export default addDisk;
