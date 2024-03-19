import { NextFunction, Request, Response } from "express";

interface ExtendError extends Error {
  httpCode: number;
  isOperational: boolean;
  errors: {};
  statusCode: number;
}
function developmentModeError(err: ExtendError, res: Response) {
  const ErrorName = err.name;
  const httpCode = err.httpCode || 500;
  const isOperational = err.isOperational || false;
  const message = err.message || "Something went wrong";
  const stack = err.stack;
  const formValidation = err.errors;
  if (err.httpCode === undefined) {
    err.httpCode = 500;
  }
  res.status(err.httpCode).json({
    ErrorName,
    httpCode,
    isOperational,
    message,
    stack,
    formValidation,
  });
}
function productionModeError(err: ExtendError, res: Response) {
  const isOperational = err.isOperational || false;
  const message = err.message || "Something went wrong";
  res.status(err.httpCode).json({
    isOperational,
    message,
  });
}
class ErrorHandler {
  HandleExpressErrorsMiddleware(
    err: ExtendError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const CurrentMode = process.env.NODE_ENV;

    if (CurrentMode === "development") {
      developmentModeError(err, res);
    } else {
      productionModeError(err, res);
    }
    next();
  }
}

export default ErrorHandler;
