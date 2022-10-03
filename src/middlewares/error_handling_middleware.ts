import { ErrorRequestHandler } from "express";

import { ApiError, ErrorStatusCode } from "../models";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandlingMiddleware: ErrorRequestHandler = (err, _, res, __) => {
  if (err instanceof ApiError) {
    return res.status(err.status).send({
      success: false,
      message: err.message,
    });
  }

  return res.status(ErrorStatusCode.INTERNAL_SERVER_ERROR).send({
    success: false,
    message:
      "Something went wrong! The server encountered an error and was unable to complete your request.",
  });
};

export { errorHandlingMiddleware };
