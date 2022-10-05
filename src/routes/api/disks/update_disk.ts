import { DisksController } from "../../../controllers";
import { RequestHandler } from "express";
import { ApiError, ErrorStatusCode, IDiskPatchDTO } from "../../../models";

const updateDisk: RequestHandler<
  { id: string },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  IDiskPatchDTO
> = async (request, response, next): Promise<void> => {
  const id = parseInt(request.params.id);
  let itemUpdated = false;

  try {
    if (!isNaN(id)) {
      itemUpdated = await DisksController.updateDisk(id, request.body);
    }
  } catch (err) {
    console.error(err);
  }

  if (itemUpdated) {
    response.json({
      message: `Disk(${id}) successfully updated!`,
      success: true,
    });
  } else {
    return next(
      new ApiError("Disk update failed !", ErrorStatusCode.NOT_FOUND),
    );
  }
};

export default updateDisk;
