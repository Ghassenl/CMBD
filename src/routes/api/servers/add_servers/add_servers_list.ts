import { RequestHandler } from "express";
import { ServersController } from "../../../../controllers";
import {
  ServerModel,
  ApiError,
  ErrorStatusCode,
  IServerCreateDTO,
} from "../../../../models";

const addServersList: RequestHandler<
  Record<string, string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  IServerCreateDTO[]
> = async (request, response, next): Promise<void> => {
  let itemsListAdded: ServerModel[] | null = null;

  try {
    if (request.body && Array.isArray(request.body)) {
      itemsListAdded = await ServersController.addServers(request.body);
    }
  } catch (err) {
    console.error(err);
  }

  if (itemsListAdded) {
    response.json({
      message: `Servers list successfully added!`,
      success: true,
      count: itemsListAdded.length,
      items: itemsListAdded.map((item) => item.toJson()),
    });
  } else {
    return next(
      new ApiError(
        "Server list add failed !",
        ErrorStatusCode.INTERNAL_SERVER_ERROR,
      ),
    );
  }
};

export default addServersList;
