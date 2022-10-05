enum ErrorStatusCode {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

class ApiError extends Error {
  status: ErrorStatusCode;

  constructor(message: string, status: ErrorStatusCode) {
    super(message);
    this.status = status;
  }
}

export { ApiError, ErrorStatusCode };
