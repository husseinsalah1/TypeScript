"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GlobalErrorHandler = (err, req, res, next) => {
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || "Something went wrong";
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        stack: process.env.NODE_ENV === "development" ? err.stack : {},
    });
    next();
};
exports.default = GlobalErrorHandler;
