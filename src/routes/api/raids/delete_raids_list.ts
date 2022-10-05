import { RequestHandler } from "express";

import { RaidsController } from "../../../controllers";
import { ApiError, ErrorStatusCode } from "../../../models";

const deleteRaidsList: RequestHandler<
  Record<string, string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  { ids: number[] }
> = async (request, response, next): Promise<void> => {
  let itemsListDeleted = false;

  try {
    itemsListDeleted = await RaidsController.deleteRaids(request.body.ids);
  } catch (err) {
    console.error(err);
  }

  if (itemsListDeleted) {
    response.json({
      message: `Raids list successfully deleted!`,
      success: true,
    });
  } else {
    return next(
      new ApiError("Raids list delete failed !", ErrorStatusCode.NOT_FOUND),
    );
  }
};

export default deleteRaidsList;
