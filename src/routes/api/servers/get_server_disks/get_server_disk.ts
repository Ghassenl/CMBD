import { RequestHandler } from "express";

import { ServersController } from "../../../../controllers";
import { ApiError, ErrorStatusCode, DiskModel } from "../../../../models";

const getServerDisk: RequestHandler<{ diskId: string; id: string }> = async (
  request,
  response,
  next,
): Promise<void> => {
  const id = parseInt(request.params.id);
  const diskId = parseInt(request.params.diskId);
  let item: DiskModel | null = null;

  if (!isNaN(id) && !isNaN(diskId)) {
    const serverDisks = (
      await ServersController.getServerWithDisks(id, diskId)
    )?.getDisks();

    if (serverDisks && serverDisks.length) {
      item = serverDisks[0];
    }
  }

  if (item) {
    response.json(item.toJson());
  } else {
    return next(
      new ApiError("Server Disk not found !", ErrorStatusCode.NOT_FOUND),
    );
  }
};

export default getServerDisk;
