import { RequestHandler } from "express";
import { RaidsController } from "../../../../controllers";
import { ApiError, ErrorStatusCode, IRaidCreateDTO } from "../../../../models";

const addRaid: RequestHandler<
  Record<string, string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  IRaidCreateDTO
> = async (request, response, next): Promise<void> => {
  let added = null;

  try {
    if (request.body) {
      added = await RaidsController.addRaid(request.body);
    }
  } catch (err) {
    console.error(err);
  }

  if (added) {
    response.json({
      message: `Raid successfully added!`,
      success: true,
      count: 1,
      items: [added.toJson()],
    });
  } else {
    return next(
      new ApiError("Raid add failed !", ErrorStatusCode.INTERNAL_SERVER_ERROR),
    );
  }
};

export default addRaid;
