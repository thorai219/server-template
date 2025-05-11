import { NextFunction, Request, Response } from "express";

import { logger } from "services/logger";

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 400,
    public errors: string[] = [],
  ) {
    super(message);
    this.name = "AppError";
  }
}

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const isAppError = err instanceof AppError;
  const status = isAppError ? err.statusCode : 500;
  const response = {
    success: false,
    message: isAppError ? err.message : "Internal server error",
    errors: isAppError && err.errors.length ? err.errors : [],
    statusCode: status,
    ...(process.env.NODE_ENV !== "production" &&
      !isAppError && { stack: err.stack }),
  };

  logger.error(err.stack || err.message);
  res.status(status).json(response);
}
