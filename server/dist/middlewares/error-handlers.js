"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const errorTypes = {
    ValidationError: 422,
    UniqueViolationError: 409
};
const errorMessages = {
    ValidationError: 'Invalid request',
    UniqueViolationError: 'Already exists.'
};
const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};
const errorHandler = (error, _req, res, _next) => {
    const statusCode = res.statusCode === 200 ? errorTypes[error.name] || 500 : res.statusCode;
    res.status(statusCode).json({
        status: statusCode,
        message: errorMessages[error.name] || error.message,
        stack: config_1.NODE_ENV === 'production' ? '🥞' : error.stack,
        errors: error.errors || undefined
    });
};
exports.default = {
    notFound,
    errorHandler
};
//# sourceMappingURL=error-handlers.js.map