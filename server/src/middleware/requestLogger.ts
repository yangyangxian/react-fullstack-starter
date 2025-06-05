import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger.js';
import { hrtime } from 'node:process';

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = hrtime.bigint();

  res.on('finish', () => {
    const end = hrtime.bigint();
    const durationInMs = Number((end - start) / BigInt(1000000)); 

    logger.info(`${req.method} ${req.originalUrl} - ${res.statusCode} ${durationInMs.toPrecision(1)}ms`); 
    if (req.method == 'GET') {
      logger.debug(`Params: ${JSON.stringify(req.params)} `);
    }
    if (req.method == 'POST') {
      logger.debug(`Body: ${JSON.stringify(req.body)} `);
    }
  });

  next();
};

export default requestLogger; 