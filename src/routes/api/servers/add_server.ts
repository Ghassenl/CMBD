import { RequestHandler } from "express";

import { ServersController } from "../../../controllers";
import { ServerModel, ApiError, ErrorStatusCode } from "../../../models";

const addServer: RequestHandler = async (
  request,
  response,
  next,
): Promise<void> => {
  const bodyServer = request.body ?? {};
  let serverAdded = null;

  try {
    serverAdded = await ServersController.addServer(bodyServer);
  } catch (err) {
    console.error(err);
  }

  if (serverAdded) {
    response.json({
      message: `Server successfully added!`,
      success: true,
      count: 1,
      items: [
        new ServerModel({
          ...bodyServer,
          _id: serverAdded,
        }).toJson(),
      ],
    });
  } else {
    return next(
      new ApiError(
        "Server add failed !",
        ErrorStatusCode.INTERNAL_SERVER_ERROR,
      ),
    );
  }
};

export default addServer;
