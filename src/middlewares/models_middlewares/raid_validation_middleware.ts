import { RequestHandler } from "express";
import {
  ApiError,
  ErrorStatusCode,
  IRaidCreateDTO,
  IRaidPatchDTO,
} from "../../models";
import {
  assert,
  object,
  Describe,
  number,
  refine,
  optional,
  StructError,
} from "superstruct";

const raidCreateValidationMiddleware: RequestHandler = async (req, _, next) => {
  const Raid: Describe<IRaidCreateDTO> = object({
    raid_type: refine(number(), "Raid Type validation Error", (value) =>
      [0, 1, 5, 6].includes(value),
    ),
  });

  try {
    if (req.body) {
      if (Array.isArray(req.body)) {
        for (const raid of req.body) {
          assert(raid, Raid);
        }
      } else {
        assert(req.body, Raid);
      }
    } else {
      return next(
        new ApiError("Request body is required", ErrorStatusCode.BAD_REQUEST),
      );
    }
  } catch (err) {
    return next(
      new ApiError(
        `RaidCreateValidation Error: ${
          (err as StructError).name === "Raid Type validation Error"
            ? `Expected a value of type 0 or 1 or 5 or 6, but received: ${
                (err as StructError).value
              }`
            : (err as StructError)
                .failures()
                .map((failure) => failure.message)
                .join(", ")
        }`,
        ErrorStatusCode.BAD_REQUEST,
      ),
    );
  }

  return next();
};

const raidUpdateValidationMiddleware: RequestHandler = async (req, _, next) => {
  const Raid: Describe<IRaidPatchDTO> = object({
    raid_type: optional(
      refine(number(), "Raid Type validation Error", (value) =>
        [0, 1, 5, 6].includes(value),
      ),
    ),
  });

  try {
    if (req.body) {
      if (["ids", "data"].every((key) => Object.keys(req.body).includes(key))) {
        assert(req.body.data, Raid);
      } else {
        assert(req.body, Raid);
      }
    } else {
      return next(
        new ApiError("Request body is required", ErrorStatusCode.BAD_REQUEST),
      );
    }
  } catch (err) {
    return next(
      new ApiError(
        `RaidUpdateValidation Error: ${
          (err as StructError).name === "Raid Type validation Error"
            ? `Expected a value of type 0 or 1 or 5 or 6, but received: ${
                (err as StructError).value
              }`
            : (err as StructError)
                .failures()
                .map((failure) => failure.message)
                .join(", ")
        }`,
        ErrorStatusCode.BAD_REQUEST,
      ),
    );
  }

  return next();
};

export { raidCreateValidationMiddleware, raidUpdateValidationMiddleware };
