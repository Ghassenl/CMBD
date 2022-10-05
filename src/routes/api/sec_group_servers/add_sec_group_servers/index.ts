import { RequestHandler } from "express";
import {
  ApiError,
  ErrorStatusCode,
  ISecGroupServerCreateDTO,
} from "../../../../models";

import addSecGroupServer from "./add_sec_group_server";
import addSecGroupServersList from "./add_sec_group_servers_list";

const addSecGroupServers: RequestHandler<
  Record<string, string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  ISecGroupServerCreateDTO | ISecGroupServerCreateDTO[]
> = async (request, response, next): Promise<void> => {
  try {
    if (request.body) {
      if (Array.isArray(request.body)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return addSecGroupServersList(request as any, response, next);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return addSecGroupServer(request as any, response, next);
      }
    }
  } catch (err) {
    return next(
      new ApiError(
        "SecGroupServer add failed !",
        ErrorStatusCode.INTERNAL_SERVER_ERROR,
      ),
    );
  }
};

export default addSecGroupServers;
