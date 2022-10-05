import { RequestHandler } from "express";
import { SecGroupsController } from "../../../../controllers";
import {
  SecGroupModel,
  ApiError,
  ErrorStatusCode,
  ISecGroupCreateDTO,
} from "../../../../models";

const addSecGroupsList: RequestHandler<
  Record<string, string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  ISecGroupCreateDTO[]
> = async (request, response, next): Promise<void> => {
  let itemsListAdded: SecGroupModel[] | null = null;

  try {
    if (request.body && Array.isArray(request.body)) {
      itemsListAdded = await SecGroupsController.addSecGroups(request.body);
    }
  } catch (err) {
    console.error(err);
  }

  if (itemsListAdded) {
    response.json({
      message: `SecGroups list successfully added!`,
      success: true,
      count: itemsListAdded.length,
      items: itemsListAdded.map((item) => item.toJson()),
    });
  } else {
    return next(
      new ApiError(
        "SecGroup list add failed !",
        ErrorStatusCode.INTERNAL_SERVER_ERROR,
      ),
    );
  }
};

export default addSecGroupsList;
