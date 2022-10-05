import { RequestHandler } from "express";

import { RaidsController } from "../../../../controllers";
import { ApiError, ErrorStatusCode, DiskModel } from "../../../../models";

const getRaidDisk: RequestHandler<{ diskId: string; id: string }> = async (
  request,
  response,
  next,
): Promise<void> => {
  const id = parseInt(request.params.id);
  const diskId = parseInt(request.params.diskId);
  let item: DiskModel | null = null;

  if (!isNaN(id) && !isNaN(diskId)) {
    const raidDisks = (
      await RaidsController.getRaidWithDisks(id, diskId)
    )?.getDisks();

    if (raidDisks && raidDisks.length) {
      item = raidDisks[0];
    }
  }

  if (item) {
    response.json(item.toJson());
  } else {
    return next(
      new ApiError("Raid Disk not found !", ErrorStatusCode.NOT_FOUND),
    );
  }
};

export default getRaidDisk;
