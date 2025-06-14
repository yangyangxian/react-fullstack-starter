import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger.js';
import { ApiErrorResponse } from '@fullstack/common';

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }
  
  // Don't send error details in production
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  const apiErrorResponse: ApiErrorResponse = {
    name: error.name || 'Error',
    message: error.message || 'Internal server error',
    timestamp: new Date().toISOString(),
    ...(isDevelopment && { stack: error.stack })
  };
  
  // Log the structured error response with better formatting
  logger.error(`API Error Response:\n${JSON.stringify(apiErrorResponse, null, 2)}`);
  
  // Send formatted JSON response (Express will handle pretty-printing in development)
  res.status(500).json(apiErrorResponse);
};

export default errorHandler;
