import { RequestHandler } from "express";

import { ServersController } from "../../../../controllers";
import {
  ApiError,
  ErrorStatusCode,
  SecGroupServerModel,
} from "../../../../models";

const getServerSecGroupServer: RequestHandler<{
  secGroupServerId: string;
  id: string;
}> = async (request, response, next): Promise<void> => {
  const id = parseInt(request.params.id);
  const secGroupServerId = parseInt(request.params.secGroupServerId);
  let item: SecGroupServerModel | null = null;

  if (!isNaN(id) && !isNaN(secGroupServerId)) {
    const serverSecGroupServers = (
      await ServersController.getServerWithSecGroupServers(id, secGroupServerId)
    )?.getSecGroupServers();

    if (serverSecGroupServers && serverSecGroupServers.length) {
      item = serverSecGroupServers[0];
    }
  }

  if (item) {
    response.json(item.toJson());
  } else {
    return next(
      new ApiError(
        "Server SecGroupServer not found !",
        ErrorStatusCode.NOT_FOUND,
      ),
    );
  }
};

export default getServerSecGroupServer;
