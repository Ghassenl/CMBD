import { RequestHandler } from "express";
import {
  ApiError,
  ErrorStatusCode,
  ISecRuleCreateDTO,
  ISecRulePatchDTO,
} from "../../models";
import {
  object,
  Describe,
  string,
  optional,
  refine,
  coerce,
  nullable,
  number,
  StructError,
  create,
} from "superstruct";

const secRuleCreateValidationMiddleware: RequestHandler = async (
  req,
  _,
  next,
) => {
  const SecRule: Describe<ISecRuleCreateDTO> = object({
    port: number(),
    direction: refine(string(), "SecRule Direction validation Error", (value) =>
      ["IN", "OUT"].includes(value),
    ),
    destination: coerce(
      nullable(string()),
      optional(string()),
      (value) => value ?? null,
    ),
    policy: refine(string(), "SecRule Policy validation Error", (value) =>
      ["ACCEPT", "REJECT", "DESTROY"].includes(value),
    ),
    //if 'id_sec_group' not specified/defined it defaults to 1 (default group)
    id_sec_group: coerce(number(), optional(number()), (value) => value ?? 1),
  });

  try {
    if (req.body) {
      if (Array.isArray(req.body)) {
        req.body = [];

        for (const disk of req.body) {
          req.body.push(create(disk, SecRule));
        }
      } else {
        req.body = create(req.body, SecRule);
      }
    } else {
      return next(
        new ApiError("Request body is required", ErrorStatusCode.BAD_REQUEST),
      );
    }
  } catch (err) {
    return next(
      new ApiError(
        `SecRuleCreateValidation Error: ${
          (err as StructError).name === "SecRule Direction validation Error"
            ? `Expected a value of type 'IN' or 'OUT', but received: ${
                (err as StructError).value
              }`
            : (err as StructError).name === "SecRule Policy validation Error"
            ? `Expected a value of type 'ACCEPT' or 'REJECT' or 'DESTROY', but received: ${
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

const secRuleUpdateValidationMiddleware: RequestHandler = async (
  req,
  _,
  next,
) => {
  const SecRule: Describe<ISecRulePatchDTO> = object({
    port: optional(number()),
    direction: optional(
      refine(string(), "SecRule Direction validation Error", (value) =>
        ["IN", "OUT"].includes(value),
      ),
    ),
    destination: optional(
      coerce(nullable(string()), optional(string()), (value) => value ?? null),
    ),
    policy: optional(
      refine(string(), "SecRule Policy validation Error", (value) =>
        ["ACCEPT", "REJECT", "DESTROY"].includes(value),
      ),
    ),
    id_sec_group: optional(
      coerce(number(), optional(number()), (value) => value ?? 1),
    ),
  });

  try {
    if (req.body) {
      if (["ids", "data"].every((key) => Object.keys(req.body).includes(key))) {
        req.body.data = create(req.body.data, SecRule);
      } else {
        req.body = create(req.body, SecRule);
      }
    } else {
      return next(
        new ApiError("Request body is required", ErrorStatusCode.BAD_REQUEST),
      );
    }
  } catch (err) {
    return next(
      new ApiError(
        `SecRuleUpdateValidation Error: ${
          (err as StructError).name === "SecRule Direction validation Error"
            ? `Expected a value of type 'IN' or 'OUT', but received: ${
                (err as StructError).value
              }`
            : (err as StructError).name === "SecRule Policy validation Error"
            ? `Expected a value of type 'ACCEPT' or 'REJECT' or 'DESTROY', but received: ${
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

export { secRuleCreateValidationMiddleware, secRuleUpdateValidationMiddleware };
