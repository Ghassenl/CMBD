import { RequestHandler } from "express";
import { ServersController } from "../../../../controllers";
import {
  ApiError,
  ErrorStatusCode,
  IServerCreateDTO,
} from "../../../../models";

const addServer: RequestHandler<
  Record<string, string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  IServerCreateDTO
> = async (request, response, next): Promise<void> => {
  let added = null;

  try {
    if (request.body) {
      added = await ServersController.addServer(request.body);
    }
  } catch (err) {
    console.error(err);
  }

  if (added) {
    response.json({
      message: `Server successfully added!`,
      success: true,
      count: 1,
      items: [added.toJson()],
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
