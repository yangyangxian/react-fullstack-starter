import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger.js';
import { ApiErrorResponse, ApiResponse } from '@fullstack/common';
import { CustomError } from '../classes/CustomError.js';
import configs from '../appConfig.js';
import { createApiResponse } from '../utils/apiResponseUtils.js';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  const isDevelopment = configs.envMode == 'development';
  let statusCode = 500;
  let errorName = 'InternalServerError';
  let errorMessage = 'An unexpected error occurred.';
  let errorStack = err.stack;

  if (err instanceof CustomError) {
    statusCode = 422; // Default status code for business errors caught by CustomError
    errorName = err.name;
    errorMessage = err.message;
  }

  const apiErrorResponse: ApiErrorResponse = {
    name: errorName,
    message: errorMessage,
    timestamp: (err instanceof CustomError) ? err.timestamp : new Date().toISOString(),
    ...(isDevelopment && { stack: errorStack }),
  };

  let errorLog = isDevelopment ? `API Error(status code:${statusCode}): ${apiErrorResponse.stack}` 
    : `API Error(status code:${statusCode}): ${apiErrorResponse.name} | ${apiErrorResponse.message}`;
  logger.error(errorLog);

  const finalResponse = createApiResponse<null>(null, apiErrorResponse);
  res.status(statusCode).json(finalResponse);
};

export default errorHandler;
