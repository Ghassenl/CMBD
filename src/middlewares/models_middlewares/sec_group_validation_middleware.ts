import { RequestHandler } from "express";
import {
  ApiError,
  ErrorStatusCode,
  ISecGroupCreateDTO,
  ISecGroupPatchDTO,
} from "../../models";
import {
  assert,
  object,
  Describe,
  string,
  optional,
  StructError,
} from "superstruct";

const secGroupCreateValidationMiddleware: RequestHandler = async (
  req,
  _,
  next,
) => {
  const SecGroup: Describe<ISecGroupCreateDTO> = object({
    name: string(),
  });

  try {
    if (req.body) {
      if (Array.isArray(req.body)) {
        for (const secGroup of req.body) {
          assert(secGroup, SecGroup);
        }
      } else {
        assert(req.body, SecGroup);
      }
    } else {
      return next(
        new ApiError("Request body is required", ErrorStatusCode.BAD_REQUEST),
      );
    }
  } catch (err) {
    return next(
      new ApiError(
        `SecGroupCreateValidation Error: ${(err as StructError)
          .failures()
          .map((failure) => failure.message)
          .join(", ")}`,
        ErrorStatusCode.BAD_REQUEST,
      ),
    );
  }

  return next();
};

const secGroupUpdateValidationMiddleware: RequestHandler = async (
  req,
  _,
  next,
) => {
  const SecGroup: Describe<ISecGroupPatchDTO> = object({
    name: optional(string()),
  });

  try {
    if (req.body) {
      if (["ids", "data"].every((key) => Object.keys(req.body).includes(key))) {
        assert(req.body.data, SecGroup);
      } else {
        assert(req.body, SecGroup);
      }
    } else {
      return next(
        new ApiError("Request body is required", ErrorStatusCode.BAD_REQUEST),
      );
    }
  } catch (err) {
    return next(
      new ApiError(
        `SecGroupUpdateValidation Error: ${(err as StructError)
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
  secGroupCreateValidationMiddleware,
  secGroupUpdateValidationMiddleware,
};
