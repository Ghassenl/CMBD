import { SecRulesController } from "../../../controllers";
import { RequestHandler } from "express";
import { ApiError, ErrorStatusCode, ISecRulePatchDTO } from "../../../models";

const updateSecRule: RequestHandler<
  { id: string },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  ISecRulePatchDTO
> = async (request, response, next): Promise<void> => {
  const id = parseInt(request.params.id);
  let itemUpdated = false;

  try {
    if (!isNaN(id)) {
      itemUpdated = await SecRulesController.updateSecRule(id, request.body);
    }
  } catch (err) {
    console.error(err);
  }

  if (itemUpdated) {
    response.json({
      message: `SecRule(${id}) successfully updated!`,
      success: true,
    });
  } else {
    return next(
      new ApiError("SecRule update failed !", ErrorStatusCode.NOT_FOUND),
    );
  }
};

export default updateSecRule;
