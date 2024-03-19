"use strict";
// We create this to get extra information about error , not only message error
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(name, httpCode, errorMsg, isOperational, errors) {
        super(errorMsg);
        this.name = name;
        this.httpCode = httpCode;
        this.isOperational = isOperational;
        this.errors = errors;
        Error.captureStackTrace(this);
    }
}
exports.AppError = AppError;
