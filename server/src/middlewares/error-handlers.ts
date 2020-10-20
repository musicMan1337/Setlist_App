import { ErrorRequestHandler, RequestHandler } from 'express';

import { NODE_ENV } from '../config';

const errorTypes = {
  ValidationError: 422,
  UniqueViolationError: 409
};

const errorMessages = {
  ValidationError: 'Invalid request',
  UniqueViolationError: 'Already exists.'
};

const notFound: RequestHandler = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);

  res.status(404);
  next(error);
};

const errorHandler: ErrorRequestHandler = (error: Express.ExtError, _req, res, _next) => {
  const statusCode =
    res.statusCode === 200 ? errorTypes[error.name] || 500 : res.statusCode;

  res.status(statusCode).json({
    status: statusCode,
    message: errorMessages[error.name] || error.message,
    stack: NODE_ENV === 'production' ? '🥞' : error.stack,
    errors: error.errors || undefined
  });
};

export default {
  notFound,
  errorHandler
};
