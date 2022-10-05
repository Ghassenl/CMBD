import { RequestHandler } from "express";
import { SecRulesController } from "../../../controllers";
import { ApiError, ErrorStatusCode, ISecRulePatchDTO } from "../../../models";

const updateSecRulesList: RequestHandler<
  Record<string, string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  { ids: number[]; data: ISecRulePatchDTO }
> = async (request, response, next): Promise<void> => {
  let itemsListUpdated = false;

  try {
    itemsListUpdated = await SecRulesController.updateSecRules(
      request.body.ids,
      request.body.data,
    );
  } catch (err) {
    console.error(err);
  }

  if (itemsListUpdated) {
    response.json({
      message: `SecRules successfully updated!`,
      success: true,
    });
  } else {
    return next(
      new ApiError("SecRules list update failed !", ErrorStatusCode.NOT_FOUND),
    );
  }
};

export default updateSecRulesList;
