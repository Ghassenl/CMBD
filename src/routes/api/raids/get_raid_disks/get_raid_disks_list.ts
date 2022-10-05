import { RequestHandler } from "express";

import { RaidsController } from "../../../../controllers";
import { ApiError, ErrorStatusCode, DiskModel } from "../../../../models";

const getRaidDisksList: RequestHandler<{ id: string }> = async (
  request,
  response,
  next,
): Promise<void> => {
  const id = parseInt(request.params.id);
  let itemsList: DiskModel[] | null = null;

  if (!isNaN(id)) {
    const raidDisks = (await RaidsController.getRaidWithDisks(id))?.getDisks();

    if (raidDisks && raidDisks.length) {
      itemsList = raidDisks;
    }
  }

  if (itemsList) {
    response.json({
      items: itemsList.map((item) => item.toJson()),
    });
  } else {
    return next(
      new ApiError("Raid Disks not found !", ErrorStatusCode.NOT_FOUND),
    );
  }
};

export default getRaidDisksList;
