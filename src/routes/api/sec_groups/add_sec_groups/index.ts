import { RequestHandler } from "express";
import {
  ApiError,
  ErrorStatusCode,
  ISecGroupCreateDTO,
} from "../../../../models";

import addSecGroup from "./add_sec_group";
import addSecGroupsList from "./add_sec_groups_list";

const addSecGroups: RequestHandler<
  Record<string, string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  ISecGroupCreateDTO | ISecGroupCreateDTO[]
> = async (request, response, next): Promise<void> => {
  try {
    if (request.body) {
      if (Array.isArray(request.body)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return addSecGroupsList(request as any, response, next);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return addSecGroup(request as any, response, next);
      }
    }
  } catch (err) {
    return next(
      new ApiError(
        "SecGroup add failed !",
        ErrorStatusCode.INTERNAL_SERVER_ERROR,
      ),
    );
  }
};

export default addSecGroups;
