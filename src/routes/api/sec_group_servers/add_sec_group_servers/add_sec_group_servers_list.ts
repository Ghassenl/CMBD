import { RequestHandler } from "express";
import { SecGroupServersController } from "../../../../controllers";
import {
  SecGroupServerModel,
  ApiError,
  ErrorStatusCode,
  ISecGroupServerCreateDTO,
} from "../../../../models";

const addSecGroupServersList: RequestHandler<
  Record<string, string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  ISecGroupServerCreateDTO[]
> = async (request, response, next): Promise<void> => {
  let itemsListAdded: SecGroupServerModel[] | null = null;

  try {
    if (request.body && Array.isArray(request.body)) {
      itemsListAdded = await SecGroupServersController.addSecGroupServers(
        request.body,
      );
    }
  } catch (err) {
    console.error(err);
  }

  if (itemsListAdded) {
    response.json({
      message: `SecGroupServers list successfully added!`,
      success: true,
      count: itemsListAdded.length,
      items: itemsListAdded.map((item) => item.toJson()),
    });
  } else {
    return next(
      new ApiError(
        "SecGroupServer list add failed !",
        ErrorStatusCode.INTERNAL_SERVER_ERROR,
      ),
    );
  }
};

export default addSecGroupServersList;
