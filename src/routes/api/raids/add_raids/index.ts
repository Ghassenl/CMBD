import { RequestHandler } from "express";
import { ApiError, ErrorStatusCode, IRaidCreateDTO } from "../../../../models";

import addRaid from "./add_raid";
import addRaidsList from "./add_raids_list";

const addRaids: RequestHandler<
  Record<string, string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  IRaidCreateDTO | IRaidCreateDTO[]
> = async (request, response, next): Promise<void> => {
  try {
    if (request.body) {
      if (Array.isArray(request.body)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return addRaidsList(request as any, response, next);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return addRaid(request as any, response, next);
      }
    }
  } catch (err) {
    return next(
      new ApiError("Raid add failed !", ErrorStatusCode.INTERNAL_SERVER_ERROR),
    );
  }
};

export default addRaids;
