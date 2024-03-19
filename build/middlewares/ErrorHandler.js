"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function developmentModeError(err, res) {
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
function productionModeError(err, res) {
    const isOperational = err.isOperational || false;
    const message = err.message || "Something went wrong";
    res.status(err.httpCode).json({
        isOperational,
        message,
    });
}
class ErrorHandler {
    HandleExpressErrorsMiddleware(err, req, res, next) {
        const CurrentMode = process.env.NODE_ENV;
        if (CurrentMode === "development") {
            developmentModeError(err, res);
        }
        else {
            productionModeError(err, res);
        }
        next();
    }
}
exports.default = ErrorHandler;
