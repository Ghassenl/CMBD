import { RequestHandler } from "express";
import { SecGroupsController } from "../../../../controllers";
import {
  ApiError,
  ErrorStatusCode,
  ISecGroupCreateDTO,
} from "../../../../models";

const addSecGroup: RequestHandler<
  Record<string, string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  ISecGroupCreateDTO
> = async (request, response, next): Promise<void> => {
  let added = null;

  try {
    if (request.body) {
      added = await SecGroupsController.addSecGroup(request.body);
    }
  } catch (err) {
    console.error(err);
  }

  if (added) {
    response.json({
      message: `SecGroup successfully added!`,
      success: true,
      count: 1,
      items: [added.toJson()],
    });
  } else {
    return next(
      new ApiError(
        "SecGroup add failed !",
        ErrorStatusCode.INTERNAL_SERVER_ERROR,
      ),
    );
  }
};

export default addSecGroup;
