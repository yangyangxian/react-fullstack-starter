import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger.js';

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = process.hrtime(); // High-resolution time

  res.on('finish', () => {
    const end = process.hrtime(start);
    const durationInMs = (end[0] * 1000) + (end[1] / 1_000_000); // Convert to milliseconds

    logger.info(`${req.method} ${req.originalUrl} - ${res.statusCode} ${durationInMs.toFixed(2)}ms`);
  });

  next();
};

export default requestLogger; 