import { RequestHandler } from "express";

import { ServersController } from "../../../../controllers";
import {
  ApiError,
  ErrorStatusCode,
  SecGroupServerModel,
} from "../../../../models";

const getServerSecGroupServersList: RequestHandler<{ id: string }> = async (
  request,
  response,
  next,
): Promise<void> => {
  const id = parseInt(request.params.id);
  let itemsList: SecGroupServerModel[] | null = null;

  if (!isNaN(id)) {
    const serverSecGroupServers = (
      await ServersController.getServerWithSecGroupServers(id)
    )?.getSecGroupServers();

    if (serverSecGroupServers && serverSecGroupServers.length) {
      itemsList = serverSecGroupServers;
    }
  }

  if (itemsList) {
    response.json({
      items: itemsList.map((item) => item.toJson()),
    });
  } else {
    return next(
      new ApiError(
        "Server SecGroupServers not found !",
        ErrorStatusCode.NOT_FOUND,
      ),
    );
  }
};

export default getServerSecGroupServersList;
