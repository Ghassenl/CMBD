import { RequestHandler } from "express";

import { SecGroupsController } from "../../../../controllers";
import { ApiError, ErrorStatusCode, SecRuleModel } from "../../../../models";

const getSecGroupSecRule: RequestHandler<{
  secRuleId: string;
  id: string;
}> = async (request, response, next): Promise<void> => {
  const id = parseInt(request.params.id);
  const diskId = parseInt(request.params.secRuleId);
  let item: SecRuleModel | null = null;

  if (!isNaN(id) && !isNaN(diskId)) {
    const serverSecRules = (
      await SecGroupsController.getSecGroupWithSecRules(id, diskId)
    )?.getSecRules();

    if (serverSecRules && serverSecRules.length) {
      item = serverSecRules[0];
    }
  }

  if (item) {
    response.json(item.toJson());
  } else {
    return next(
      new ApiError("SecGroup SecRule not found !", ErrorStatusCode.NOT_FOUND),
    );
  }
};

export default getSecGroupSecRule;
