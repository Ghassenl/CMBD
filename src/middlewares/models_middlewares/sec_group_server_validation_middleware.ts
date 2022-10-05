import { RequestHandler } from "express";
import {
  ApiError,
  ErrorStatusCode,
  ISecGroupServerCreateDTO,
  ISecGroupServerPatchDTO,
} from "../../models";
import {
  assert,
  object,
  Describe,
  optional,
  StructError,
  number,
} from "superstruct";

const secGroupServerCreateValidationMiddleware: RequestHandler = async (
  req,
  _,
  next,
) => {
  const SecGroupServer: Describe<ISecGroupServerCreateDTO> = object({
    id_sec_group: number(),
    id_server: number(),
  });

  try {
    if (req.body) {
      if (Array.isArray(req.body)) {
        for (const secGroupServer of req.body) {
          assert(secGroupServer, SecGroupServer);
        }
      } else {
        assert(req.body, SecGroupServer);
      }
    } else {
      return next(
        new ApiError("Request body is required", ErrorStatusCode.BAD_REQUEST),
      );
    }
  } catch (err) {
    return next(
      new ApiError(
        `SecGroupServerCreateValidation Error: ${(err as StructError)
          .failures()
          .map((failure) => failure.message)
          .join(", ")}`,
        ErrorStatusCode.BAD_REQUEST,
      ),
    );
  }

  return next();
};

const secGroupServerUpdateValidationMiddleware: RequestHandler = async (
  req,
  _,
  next,
) => {
  const SecGroupServer: Describe<ISecGroupServerPatchDTO> = object({
    id_sec_group: optional(number()),
    id_server: optional(number()),
  });

  try {
    if (req.body) {
      if (["ids", "data"].every((key) => Object.keys(req.body).includes(key))) {
        assert(req.body.data, SecGroupServer);
      } else {
        assert(req.body, SecGroupServer);
      }
    } else {
      return next(
        new ApiError("Request body is required", ErrorStatusCode.BAD_REQUEST),
      );
    }
  } catch (err) {
    return next(
      new ApiError(
        `SecGroupServerUpdateValidation Error: ${(err as StructError)
          .failures()
          .map((failure) => failure.message)
          .join(", ")}`,
        ErrorStatusCode.BAD_REQUEST,
      ),
    );
  }

  return next();
};

export {
  secGroupServerCreateValidationMiddleware,
  secGroupServerUpdateValidationMiddleware,
};
