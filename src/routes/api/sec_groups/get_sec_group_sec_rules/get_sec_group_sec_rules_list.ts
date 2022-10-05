import { RequestHandler } from "express";

import { SecGroupsController } from "../../../../controllers";
import { ApiError, ErrorStatusCode, SecRuleModel } from "../../../../models";

const getSecGroupSecRulesList: RequestHandler<{ id: string }> = async (
  request,
  response,
  next,
): Promise<void> => {
  const id = parseInt(request.params.id);
  let itemsList: SecRuleModel[] | null = null;

  if (!isNaN(id)) {
    const serverSecRules = (
      await SecGroupsController.getSecGroupWithSecRules(id)
    )?.getSecRules();

    if (serverSecRules && serverSecRules.length) {
      itemsList = serverSecRules;
    }
  }

  if (itemsList) {
    response.json({
      items: itemsList.map((item) => item.toJson()),
    });
  } else {
    return next(
      new ApiError("SecGroup SecRules not found !", ErrorStatusCode.NOT_FOUND),
    );
  }
};

export default getSecGroupSecRulesList;
