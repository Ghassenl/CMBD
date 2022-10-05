import { RequestHandler } from "express";
import {
  ApiError,
  ErrorStatusCode,
  IPartitionCreateDTO,
  IPartitionPatchDTO,
} from "../../models";
import {
  object,
  Describe,
  number,
  refine,
  optional,
  StructError,
  string,
  assert,
} from "superstruct";
import { DisksController } from "../../controllers";

const partitionCreateValidationMiddleware: RequestHandler = async (
  req,
  _,
  next,
) => {
  const Partition: Describe<IPartitionCreateDTO> = object({
    fs_format: refine(
      string(),
      "Partition fs_format validation Error",
      (value) => ["ext4", "ntfs", "xfs"].includes(value),
    ),
    size: number(),
    id_disk: number(),
  });

  try {
    if (req.body) {
      if (Array.isArray(req.body)) {
        req.body = [];

        for (const partition of req.body) {
          assert(partition, Partition);

          const disk = await DisksController.getDisk(partition.id_disk);

          if (disk && disk?.getSize() <= partition.size) {
            return next(
              new ApiError(
                `PartitionCreateValidation Error: Partition size must be less than its disk size!`,
                ErrorStatusCode.BAD_REQUEST,
              ),
            );
          }
        }
      } else {
        assert(req.body, Partition);

        const disk = await DisksController.getDisk(req.body.id_disk);

        if (disk && disk?.getSize() <= req.body.size) {
          return next(
            new ApiError(
              `PartitionCreateValidation Error: Partition size must be less than its disk size!`,
              ErrorStatusCode.BAD_REQUEST,
            ),
          );
        }
      }
    } else {
      return next(
        new ApiError("Request body is required", ErrorStatusCode.BAD_REQUEST),
      );
    }
  } catch (err) {
    return next(
      new ApiError(
        `PartitionCreateValidation Error: ${
          (err as StructError).name === "Partition fs_format validation Error"
            ? `Expected a value of type 'ext4' or 'ntfs' or 'xfs', but received: ${
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

const partitionUpdateValidationMiddleware: RequestHandler = async (
  req,
  _,
  next,
) => {
  const Partition: Describe<IPartitionPatchDTO> = object({
    fs_format: optional(
      refine(string(), "Partition fs_format validation Error", (value) =>
        ["ext4", "ntfs", "xfs"].includes(value),
      ),
    ),
    size: optional(number()),
    id_disk: optional(number()),
  });

  try {
    if (req.body) {
      if (["ids", "data"].every((key) => Object.keys(req.body).includes(key))) {
        assert(req.body.data, Partition);
      } else {
        assert(req.body, Partition);
      }
    } else {
      return next(
        new ApiError("Request body is required", ErrorStatusCode.BAD_REQUEST),
      );
    }
  } catch (err) {
    return next(
      new ApiError(
        `PartitionUpdateValidation Error: ${
          (err as StructError).name === "Partition fs_format validation Error"
            ? `Expected a value of type 'ext4' or 'ntfs' or 'xfs', but received: ${
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

export {
  partitionCreateValidationMiddleware,
  partitionUpdateValidationMiddleware,
};
