import { RequestHandler } from "express";

import { SecRulesController } from "../../../controllers";
import { ApiError, ErrorStatusCode } from "../../../models";

const getSecRulesList: RequestHandler = async (
  request,
  response,
  next,
): Promise<void> => {
  const itemsList = await SecRulesController.getSecRules();

  if (itemsList) {
    response.json({
      items: itemsList.map((item) => item.toJson()),
    });
  } else {
    return next(
      new ApiError("SecRules list not found !", ErrorStatusCode.NOT_FOUND),
    );
  }
};

export default getSecRulesList;
