import { RequestHandler } from "express";

import { SecRulesController } from "../../../controllers";
import { ApiError, ErrorStatusCode } from "../../../models";

const deleteSecRule: RequestHandler<{ id: string }> = async (
  request,
  response,
  next,
): Promise<void> => {
  const id = parseInt(request.params.id);
  let itemDeleted = false;

  if (!isNaN(id)) {
    itemDeleted = await SecRulesController.deleteSecRule(id);
  }

  if (itemDeleted) {
    response.json({
      message: `SecRule(${id}) successfully deleted!`,
      success: true,
    });
  } else {
    return next(
      new ApiError("SecRule delete failed !", ErrorStatusCode.NOT_FOUND),
    );
  }
};

export default deleteSecRule;
