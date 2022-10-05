import { RequestHandler } from "express";

import { SecGroupsController } from "../../../../controllers";
import {
  ApiError,
  ErrorStatusCode,
  SecGroupServerModel,
} from "../../../../models";

const getSecGroupSecGroupServer: RequestHandler<{
  secGroupServerId: string;
  id: string;
}> = async (request, response, next): Promise<void> => {
  const id = parseInt(request.params.id);
  const secGroupServerId = parseInt(request.params.secGroupServerId);
  let item: SecGroupServerModel | null = null;

  if (!isNaN(id) && !isNaN(secGroupServerId)) {
    const serverSecGroupServers = (
      await SecGroupsController.getSecGroupWithSecGroupServers(
        id,
        secGroupServerId,
      )
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
        "SecGroup SecGroupServer not found !",
        ErrorStatusCode.NOT_FOUND,
      ),
    );
  }
};

export default getSecGroupSecGroupServer;
