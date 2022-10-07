import { RequestHandler } from "express";
import { SecRulesController } from "../../../../controllers";
import { ApiError, ErrorStatusCode, ISecRule } from "../../../../models";

const addSecRule: RequestHandler<
  Record<string, string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  ISecRule
> = async (request, response, next): Promise<void> => {
  let added = null;

  try {
    if (request.body) {
      added = await SecRulesController.addSecRule(request.body);
    }
  } catch (err) {
    console.error(err);
  }

  if (added) {
    response.json({
      message: `SecRule successfully added!`,
      success: true,
      count: 1,
      items: [added.toJson()],
    });
  } else {
    return next(
      new ApiError(
        "SecRule add failed !",
        ErrorStatusCode.INTERNAL_SERVER_ERROR,
      ),
    );
  }
};

export default addSecRule;
