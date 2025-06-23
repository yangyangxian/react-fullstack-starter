import jwt from 'jsonwebtoken';
import configs from '../appConfig.js';
import { CustomError } from '../classes/CustomError.js';
import { ErrorCodes } from '@fullstack/common';

export interface JWTPayload {
  userId: string;
  email: string;
  name: string;
}

export function createJWT(payload: JWTPayload): string {
  if (!configs.jwtSecret) {
    throw new CustomError(
      'JWT_SECRET is not configured',
      ErrorCodes.JWT_CONFIGURATION_ERROR
    );
  }
  
  return jwt.sign(payload, configs.jwtSecret, {
    expiresIn: '7d' // Token expires in 7 days
  });
}

export function verifyJWT(token: string): JWTPayload {
  if (!configs.jwtSecret) {
    throw new CustomError(
      'JWT_SECRET is not configured',
      ErrorCodes.JWT_CONFIGURATION_ERROR
    );
  }
  
  try {
    return jwt.verify(token, configs.jwtSecret) as JWTPayload;
  } catch (error) {
    throw new CustomError(
      'Invalid or expired token',
      ErrorCodes.INVALID_TOKEN
    );
  }
}
