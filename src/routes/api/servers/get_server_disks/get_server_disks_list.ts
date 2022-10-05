import { RequestHandler } from "express";

import { ServersController } from "../../../../controllers";
import { ApiError, ErrorStatusCode, DiskModel } from "../../../../models";

const getServerDisksList: RequestHandler<{ id: string }> = async (
  request,
  response,
  next,
): Promise<void> => {
  const id = parseInt(request.params.id);
  let itemsList: DiskModel[] | null = null;

  if (!isNaN(id)) {
    const serverDisks = (
      await ServersController.getServerWithDisks(id)
    )?.getDisks();

    if (serverDisks && serverDisks.length) {
      itemsList = serverDisks;
    }
  }

  if (itemsList) {
    response.json({
      items: itemsList.map((item) => item.toJson()),
    });
  } else {
    return next(
      new ApiError("Server Disks not found !", ErrorStatusCode.NOT_FOUND),
    );
  }
};

export default getServerDisksList;
