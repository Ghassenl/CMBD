enum ErrorStatusCode {
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
