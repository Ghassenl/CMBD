import { RequestHandler } from "express";
import {
  ApiError,
  ErrorStatusCode,
  ISecRuleCreateDTO,
} from "../../../../models";

import addSecRule from "./add_sec_rule";
import addSecRulesList from "./add_sec_rules_list";

const addSecRules: RequestHandler<
  Record<string, string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  ISecRuleCreateDTO | ISecRuleCreateDTO[]
> = async (request, response, next): Promise<void> => {
  try {
    if (request.body) {
      if (Array.isArray(request.body)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return addSecRulesList(request as any, response, next);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return addSecRule(request as any, response, next);
      }
    }
  } catch (err) {
    return next(
      new ApiError(
        "SecRule add failed !",
        ErrorStatusCode.INTERNAL_SERVER_ERROR,
      ),
    );
  }
};

export default addSecRules;
