import { RequestHandler } from "express";
import { RaidsController } from "../../../../controllers";
import {
  RaidModel,
  ApiError,
  ErrorStatusCode,
  IRaidCreateDTO,
} from "../../../../models";

const addRaidsList: RequestHandler<
  Record<string, string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  IRaidCreateDTO[]
> = async (request, response, next): Promise<void> => {
  let itemsListAdded: RaidModel[] | null = null;

  try {
    if (request.body && Array.isArray(request.body)) {
      itemsListAdded = await RaidsController.addRaids(request.body);
    }
  } catch (err) {
    console.error(err);
  }

  if (itemsListAdded) {
    response.json({
      message: `Raids list successfully added!`,
      success: true,
      count: itemsListAdded.length,
      items: itemsListAdded.map((item) => item.toJson()),
    });
  } else {
    return next(
      new ApiError(
        "Raid list add failed !",
        ErrorStatusCode.INTERNAL_SERVER_ERROR,
      ),
    );
  }
};

export default addRaidsList;
