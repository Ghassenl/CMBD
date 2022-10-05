import { RequestHandler } from "express";
import { SecRulesController } from "../../../../controllers";
import {
  SecRuleModel,
  ApiError,
  ErrorStatusCode,
  ISecRuleCreateDTO,
} from "../../../../models";

const addSecRulesList: RequestHandler<
  Record<string, string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  ISecRuleCreateDTO[]
> = async (request, response, next): Promise<void> => {
  let itemsListAdded: SecRuleModel[] | null = null;

  try {
    if (request.body && Array.isArray(request.body)) {
      itemsListAdded = await SecRulesController.addSecRules(request.body);
    }
  } catch (err) {
    console.error(err);
  }

  if (itemsListAdded) {
    response.json({
      message: `SecRules list successfully added!`,
      success: true,
      count: itemsListAdded.length,
      items: itemsListAdded.map((item) => item.toJson()),
    });
  } else {
    return next(
      new ApiError(
        "SecRule list add failed !",
        ErrorStatusCode.INTERNAL_SERVER_ERROR,
      ),
    );
  }
};

export default addSecRulesList;
