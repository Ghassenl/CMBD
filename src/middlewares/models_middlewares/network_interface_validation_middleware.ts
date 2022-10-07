import { RequestHandler } from "express";
import {
  ApiError,
  ErrorStatusCode,
  INetworkInterfaceCreateDTO,
  INetworkInterfacePatchDTO,
} from "../../models";
import {
  object,
  Describe,
  number,
  optional,
  nullable,
  StructError,
  coerce,
  pattern,
  assert,
  string,
} from "superstruct";

const networkInterfaceCreateValidationMiddleware: RequestHandler = async (
  req,
  _,
  next,
) => {
  const NetworkInterface: Describe<INetworkInterfaceCreateDTO> = object({
    ip: pattern(
      string(),
      /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/,
    ),
    mask: pattern(
      string(),
      /^(((255\.){3}(255|254|252|248|240|224|192|128|0+))|((255\.){2}(255|254|252|248|240|224|192|128|0+)\.0)|((255\.)(255|254|252|248|240|224|192|128|0+)(\.0+){2})|((255|254|252|248|240|224|192|128|0+)(\.0+){3}))$/,
    ),
    //if 'id_gateway' not specified/defined it defaults to null
    id_gateway: coerce(
      optional(nullable(number())),
      optional(number()),
      (value) => value ?? null,
    ),
  });

  try {
    if (req.body) {
      if (Array.isArray(req.body)) {
        for (const networkInterface of req.body) {
          assert(networkInterface, NetworkInterface);
        }
      } else {
        assert(req.body, NetworkInterface);
      }
    } else {
      return next(
        new ApiError("Request body is required", ErrorStatusCode.BAD_REQUEST),
      );
    }
  } catch (err) {
    return next(
      new ApiError(
        `NetworkInterfaceCreateValidation Error: ${(err as StructError)
          .failures()
          .map((failure) => failure.message)
          .join(", ")}`,
        ErrorStatusCode.BAD_REQUEST,
      ),
    );
  }

  return next();
};

const networkInterfaceUpdateValidationMiddleware: RequestHandler = async (
  req,
  _,
  next,
) => {
  const NetworkInterface: Describe<INetworkInterfacePatchDTO> = object({
    ip: optional(
      pattern(
        string(),
        /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/,
      ),
    ),
    mask: optional(
      pattern(
        string(),
        /^(((255\.){3}(255|254|252|248|240|224|192|128|0+))|((255\.){2}(255|254|252|248|240|224|192|128|0+)\.0)|((255\.)(255|254|252|248|240|224|192|128|0+)(\.0+){2})|((255|254|252|248|240|224|192|128|0+)(\.0+){3}))$/,
      ),
    ),
    id_gateway: optional(nullable(number())),
  });

  try {
    if (req.body) {
      if (["ids", "data"].every((key) => Object.keys(req.body).includes(key))) {
        assert(req.body.data, NetworkInterface);
      } else {
        assert(req.body, NetworkInterface);
      }
    } else {
      return next(
        new ApiError("Request body is required", ErrorStatusCode.BAD_REQUEST),
      );
    }
  } catch (err) {
    return next(
      new ApiError(
        `NetworkInterfaceUpdateValidation Error: ${(err as StructError)
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
  networkInterfaceCreateValidationMiddleware,
  networkInterfaceUpdateValidationMiddleware,
};
