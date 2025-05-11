export type ErrorCodes =
  | "NOT_FOUND"
  | "VALIDATION_ERROR"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "CONFLICT"
  | "INTERNAL_SERVER_ERROR"
  | "OAUTH_ERROR";

interface ErrorMetadata {
  statusCode: number;
  defaultMessage: string;
}

const ERROR_TYPES: Record<ErrorCodes, ErrorMetadata> = {
  NOT_FOUND: { statusCode: 404, defaultMessage: "Resource not found" },
  VALIDATION_ERROR: { statusCode: 400, defaultMessage: "Validation failed" },
  UNAUTHORIZED: { statusCode: 401, defaultMessage: "Unauthorized" },
  FORBIDDEN: { statusCode: 403, defaultMessage: "Forbidden" },
  CONFLICT: { statusCode: 409, defaultMessage: "Resource conflict" },
  OAUTH_ERROR: {
    statusCode: 400,
    defaultMessage: "Authorization code missing",
  },
  INTERNAL_SERVER_ERROR: {
    statusCode: 500,
    defaultMessage: "Internal server error",
  },
};

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: ErrorCodes;
  public readonly data?: unknown;

  constructor(code: ErrorCodes, message?: string, data?: unknown) {
    const { statusCode, defaultMessage } = ERROR_TYPES[code];
    super(message || defaultMessage);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = new.target.name;
    this.statusCode = statusCode;
    this.code = code;
    this.data = data;

    Error.captureStackTrace(this);
  }
}

export class NotFoundError extends AppError {
  constructor(message?: string, data?: unknown) {
    super("NOT_FOUND", message, data);
  }
}

export class ValidationError extends AppError {
  constructor(message?: string, data?: unknown) {
    super("VALIDATION_ERROR", message, data);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message?: string, data?: unknown) {
    super("UNAUTHORIZED", message, data);
  }
}

export class ForbiddenError extends AppError {
  constructor(message?: string, data?: unknown) {
    super("FORBIDDEN", message, data);
  }
}

export class ConflictError extends AppError {
  constructor(message?: string, data?: unknown) {
    super("CONFLICT", message, data);
  }
}

export class InternalServerError extends AppError {
  constructor(message?: string, data?: unknown) {
    super("INTERNAL_SERVER_ERROR", message, data);
  }
}
