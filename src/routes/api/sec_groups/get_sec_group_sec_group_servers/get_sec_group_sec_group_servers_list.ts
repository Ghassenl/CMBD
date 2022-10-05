import { RequestHandler } from "express";

import { SecGroupsController } from "../../../../controllers";
import {
  ApiError,
  ErrorStatusCode,
  SecGroupServerModel,
} from "../../../../models";

const getSecGroupSecGroupServersList: RequestHandler<{ id: string }> = async (
  request,
  response,
  next,
): Promise<void> => {
  const id = parseInt(request.params.id);
  let itemsList: SecGroupServerModel[] | null = null;

  if (!isNaN(id)) {
    const serverSecGroupServers = (
      await SecGroupsController.getSecGroupWithSecGroupServers(id)
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
        "SecGroup SecGroupServers not found !",
        ErrorStatusCode.NOT_FOUND,
      ),
    );
  }
};

export default getSecGroupSecGroupServersList;
