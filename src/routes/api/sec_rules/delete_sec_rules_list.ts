import { RequestHandler } from "express";

import { SecRulesController } from "../../../controllers";
import { ApiError, ErrorStatusCode } from "../../../models";

const deleteSecRulesList: RequestHandler<
  Record<string, string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  { ids: number[] }
> = async (request, response, next): Promise<void> => {
  let itemsListDeleted = false;

  try {
    itemsListDeleted = await SecRulesController.deleteSecRules(
      request.body.ids,
    );
  } catch (err) {
    console.error(err);
  }

  if (itemsListDeleted) {
    response.json({
      message: `SecRules list successfully deleted!`,
      success: true,
    });
  } else {
    return next(
      new ApiError("SecRules list delete failed !", ErrorStatusCode.NOT_FOUND),
    );
  }
};

export default deleteSecRulesList;
