import { RequestHandler } from "express";
import {
  ApiError,
  ErrorStatusCode,
  IServerCreateDTO,
} from "../../../../models";

import addServer from "./add_server";
import addServersList from "./add_servers_list";

const addServers: RequestHandler<
  Record<string, string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  IServerCreateDTO | IServerCreateDTO[]
> = async (request, response, next): Promise<void> => {
  try {
    if (request.body) {
      if (Array.isArray(request.body)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return addServersList(request as any, response, next);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return addServer(request as any, response, next);
      }
    }
  } catch (err) {
    return next(
      new ApiError(
        "Server add failed !",
        ErrorStatusCode.INTERNAL_SERVER_ERROR,
      ),
    );
  }
};

export default addServers;
