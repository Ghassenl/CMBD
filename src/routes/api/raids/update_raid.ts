import { RaidsController } from "../../../controllers";
import { RequestHandler } from "express";
import { ApiError, ErrorStatusCode, IRaidPatchDTO } from "../../../models";

const updateRaid: RequestHandler<
  { id: string },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  IRaidPatchDTO
> = async (request, response, next): Promise<void> => {
  const id = parseInt(request.params.id);
  let itemUpdated = false;

  try {
    if (!isNaN(id)) {
      itemUpdated = await RaidsController.updateRaid(id, request.body);
    }
  } catch (err) {
    console.error(err);
  }

  if (itemUpdated) {
    response.json({
      message: `Raid(${id}) successfully updated!`,
      success: true,
    });
  } else {
    return next(
      new ApiError("Raid update failed !", ErrorStatusCode.NOT_FOUND),
    );
  }
};

export default updateRaid;
