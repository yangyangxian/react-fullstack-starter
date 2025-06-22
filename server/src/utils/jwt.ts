import jwt from 'jsonwebtoken';
import configs from '../appConfig.js';
import { CustomError } from '../classes/CustomError.js';
import { ErrorCode } from '@fullstack/common';

export interface JWTPayload {
  userId: string;
  email: string;
  name: string;
}

export function createJWT(payload: JWTPayload): string {
  if (!configs.jwtSecret) {
    throw new CustomError(
      'JWTConfigurationError', 
      'JWT_SECRET is not configured',
      ErrorCode.INTERNAL_ERROR
    );
  }
  
  return jwt.sign(payload, configs.jwtSecret, {
    expiresIn: '7d' // Token expires in 7 days
  });
}

export function verifyJWT(token: string): JWTPayload {
  if (!configs.jwtSecret) {
    throw new CustomError(
      'JWTConfigurationError', 
      'JWT_SECRET is not configured',
      ErrorCode.INTERNAL_ERROR
    );
  }
  
  try {
    return jwt.verify(token, configs.jwtSecret) as JWTPayload;
  } catch (error) {
    throw new CustomError(
      'JWTVerificationError', 
      'Invalid or expired token',
      ErrorCode.INVALID_TOKEN
    );
  }
}
