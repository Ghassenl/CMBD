import { RequestHandler } from "express";

import { SecRulesController } from "../../../controllers";
import { SecRuleModel, ApiError, ErrorStatusCode } from "../../../models";

const getSecRule: RequestHandler<{ id: string }> = async (
  request,
  response,
  next,
): Promise<void> => {
  const id = parseInt(request.params.id);
  let resource: SecRuleModel | null = null;

  if (!isNaN(id)) {
    resource = await SecRulesController.getSecRule(id);
  }

  if (resource) {
    response.json(resource.toJson());
  } else {
    return next(new ApiError("SecRule not found !", ErrorStatusCode.NOT_FOUND));
  }
};

export default getSecRule;
