import { RequestHandler } from "express";
import { RaidsController } from "../../../controllers";
import { ApiError, ErrorStatusCode, IRaidPatchDTO } from "../../../models";

const updateRaidsList: RequestHandler<
  Record<string, string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  { ids: number[]; data: IRaidPatchDTO }
> = async (request, response, next): Promise<void> => {
  let itemsListUpdated = false;

  try {
    itemsListUpdated = await RaidsController.updateRaids(
      request.body.ids,
      request.body.data,
    );
  } catch (err) {
    console.error(err);
  }

  if (itemsListUpdated) {
    response.json({
      message: `Raids successfully updated!`,
      success: true,
    });
  } else {
    return next(
      new ApiError("Raids list update failed !", ErrorStatusCode.NOT_FOUND),
    );
  }
};

export default updateRaidsList;
