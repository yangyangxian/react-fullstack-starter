import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger.js';
import { ApiErrorResponse, HttpStatusCode } from '@fullstack/common';
import { CustomError } from '../classes/CustomError.js';
import configs from '../appConfig.js';
import { createApiResponse } from '../utils/apiUtils.js';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  const isDevelopment = configs.envMode == 'development';
  let statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR;;
  let errorName = 'InternalServerError';
  let errorMessage = 'An unexpected error occurred.';
  let errorStack = err.stack;

  if (err instanceof CustomError) {
    statusCode = HttpStatusCode.UNPROCESSABLE_ENTITY; // Default status code for business errors caught by CustomError
    errorName = err.name;
    errorMessage = err.message;
  }

  const apiErrorResponse: ApiErrorResponse = {
    code: errorName,
    message: errorMessage,
    timestamp: (err instanceof CustomError) ? err.timestamp : new Date().toISOString(),
    ...(isDevelopment && { stack: errorStack }),
  };

  let errorLog = isDevelopment ? `API Error(status code:${statusCode}): ${apiErrorResponse.stack}` 
    : `API Error(status code:${statusCode}): ${apiErrorResponse.code} | ${apiErrorResponse.message}`;
  logger.error(errorLog);

  const finalResponse = createApiResponse<null>(null, apiErrorResponse);
  res.status(statusCode).json(finalResponse);
};

export default errorHandler;
