import { Request, Response } from "express";
import { AppError } from "utils/app.error";

interface ErrorResponse {
  status: string;
  message: string;
  code?: string;
  data?: unknown;
  stack?: string;
}

export const errorHandler = (err: Error, req: Request, res: Response): void => {
  const isDevelopment = process.env.NODE_ENV === "development";

  const errorResponse: ErrorResponse = {
    status: "error",
    message: "Internal Server Error",
  };

  let statusCode = 500;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    errorResponse.status = statusCode < 500 ? "fail" : "error";
    errorResponse.message = err.message;

    if (err.code) {
      errorResponse.code = err.code;
    }

    if (err.data) {
      errorResponse.data = err.data;
    }
  } else if (err.name === "TokenExpiredError") {
    statusCode = 401;
    errorResponse.status = "fail";
    errorResponse.code = "TOKEN_EXPIRED";
  } else if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    errorResponse.status = "fail";
    errorResponse.code = "INVALID_TOKEN";
  }

  if (isDevelopment && err.stack) {
    errorResponse.stack = err.stack;
  }

  console.error({
    path: req.path,
    method: req.method,
    error: err.message,
    stack: err.stack,
  });

  res.status(statusCode).json(errorResponse);
};
