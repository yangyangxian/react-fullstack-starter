import { Request, Response, NextFunction } from 'express';
import { verifyJWT, JWTPayload } from '../utils/jwt.js';
import { ErrorCodes } from '@fullstack/common';
import { CustomError } from '../classes/CustomError.js';

// Extend Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

// Public API routes that don't require authentication (without /api prefix since middleware is already on /api)
const PUBLIC_API_ROUTES = [
  '/hello',
  '/auth/login',
  '/auth/logout',
  // Add more public API routes here as needed
];

function isPublicRoute(path: string): boolean {
  // Since this middleware is only applied to /api routes, we just check the path after /api
  return PUBLIC_API_ROUTES.some(publicRoute => path.startsWith(publicRoute));
}

export function globalAuthMiddleware(req: Request, res: Response, next: NextFunction): void {
  if (isPublicRoute(req.path)) {
    return next();
  }

  authenticateJWT(req, res, next);
}

export function authenticateJWT(req: Request, res: Response, next: NextFunction): void {
  try {
    // Try to get token from cookie first (for browsers)
    let token = req.cookies?.['auth-token'];
    
    // If no cookie, try Authorization header (for API clients)
    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }
    
    if (!token) {
      const error = new CustomError(
        'Access token required',
        ErrorCodes.UNAUTHORIZED
      );
      return next(error);
    }
    
    const payload = verifyJWT(token);
    req.user = payload;
    next();
    
  } catch (error) {
    next(error);
  }
}
