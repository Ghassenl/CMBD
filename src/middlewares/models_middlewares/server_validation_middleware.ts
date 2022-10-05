import { RequestHandler } from "express";
import {
  ApiError,
  ErrorStatusCode,
  IServerCreateDTO,
  IServerPatchDTO,
} from "../../models";
import {
  assert,
  object,
  string,
  Describe,
  number,
  refine,
  optional,
  max,
  StructError,
} from "superstruct";

const serverCreateValidationMiddleware: RequestHandler = async (
  req,
  _,
  next,
) => {
  const Server: Describe<IServerCreateDTO> = object({
    type: refine(string(), "Server Type validation Error", (value) =>
      ["virtual", "physical"].includes(value),
    ),
    hostname: string(),
    ram: max(number(), 255),
    cpu_count: max(number(), 63),
  });

  try {
    if (req.body) {
      if (Array.isArray(req.body)) {
        for (const server of req.body) {
          assert(server, Server);
        }
      } else {
        assert(req.body, Server);
      }
    } else {
      return next(
        new ApiError("Request body is required", ErrorStatusCode.BAD_REQUEST),
      );
    }
  } catch (err) {
    return next(
      new ApiError(
        `ServerCreateValidation Error: ${
          (err as StructError).name === "Server Type validation Error"
            ? `Expected a value of type 'virtual' or 'physical', but received: ${
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

const serverUpdateValidationMiddleware: RequestHandler = async (
  req,
  _,
  next,
) => {
  const Server: Describe<IServerPatchDTO> = object({
    type: optional(
      refine(string(), "Server Type validation Error", (value) =>
        ["virtual", "physical"].includes(value),
      ),
    ),
    hostname: optional(string()),
    ram: optional(max(number(), 255)),
    cpu_count: optional(max(number(), 63)),
  });

  try {
    if (req.body) {
      if (["ids", "data"].every((key) => Object.keys(req.body).includes(key))) {
        assert(req.body.data, Server);
      } else {
        assert(req.body, Server);
      }
    } else {
      return next(
        new ApiError("Request body is required", ErrorStatusCode.BAD_REQUEST),
      );
    }
  } catch (err) {
    return next(
      new ApiError(
        `ServerUpdateValidation Error: ${
          (err as StructError).name === "Server Type validation Error"
            ? `Expected a value of type 'virtual' or 'physical', but received: ${
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

export { serverCreateValidationMiddleware, serverUpdateValidationMiddleware };
