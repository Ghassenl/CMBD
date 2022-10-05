import { RequestHandler } from "express";
import {
  ApiError,
  ErrorStatusCode,
  IDiskCreateDTO,
  IDiskPatchDTO,
} from "../../models";
import {
  object,
  Describe,
  number,
  refine,
  optional,
  create,
  nullable,
  StructError,
  coerce,
  string,
} from "superstruct";

const diskCreateValidationMiddleware: RequestHandler = async (req, _, next) => {
  const Disk: Describe<IDiskCreateDTO> = object({
    type: refine(string(), "Disk Type validation Error", (value) =>
      ["ssd", "hdd"].includes(value),
    ),
    size: number(),
    //if 'id_raid' not specified/defined it defaults to null
    id_raid: coerce(
      nullable(number()),
      optional(number()),
      (value) => value ?? null,
    ),
    id_server: number(),
  });

  try {
    if (req.body) {
      if (Array.isArray(req.body)) {
        req.body = [];

        for (const disk of req.body) {
          req.body.push(create(disk, Disk));
        }
      } else {
        req.body = create(req.body, Disk);
      }
    } else {
      return next(
        new ApiError("Request body is required", ErrorStatusCode.BAD_REQUEST),
      );
    }
  } catch (err) {
    return next(
      new ApiError(
        `DiskCreateValidation Error: ${
          (err as StructError).name === "Disk Type validation Error"
            ? `Expected a value of type 'ssd' or 'hdd', but received: ${
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

const diskUpdateValidationMiddleware: RequestHandler = async (req, _, next) => {
  const Disk: Describe<IDiskPatchDTO> = object({
    type: optional(
      refine(string(), "Disk Type validation Error", (value) =>
        ["ssd", "hdd"].includes(value),
      ),
    ),
    size: optional(number()),
    id_raid: optional(
      coerce(nullable(number()), optional(number()), (value) => value ?? null),
    ),
    id_server: optional(number()),
  });

  try {
    if (req.body) {
      if (["ids", "data"].every((key) => Object.keys(req.body).includes(key))) {
        req.body.data = create(req.body.data, Disk);
      } else {
        req.body = create(req.body, Disk);
      }
    } else {
      return next(
        new ApiError("Request body is required", ErrorStatusCode.BAD_REQUEST),
      );
    }
  } catch (err) {
    return next(
      new ApiError(
        `DiskUpdateValidation Error: ${
          (err as StructError).name === "Disk Type validation Error"
            ? `Expected a value of type 'ssd' or 'hdd', but received: ${
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

export { diskCreateValidationMiddleware, diskUpdateValidationMiddleware };
