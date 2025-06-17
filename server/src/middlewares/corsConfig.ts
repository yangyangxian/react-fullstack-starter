import cors from 'cors';
import configs from '../config.js';
import logger from '../utils/logger.js';

/**
 * CORS Configuration Middleware
 * 
 * This middleware configures Cross-Origin Resource Sharing (CORS) for the Express server.
 * CORS is disabled by default to support single-server deployments where the frontend 
 * and backend are served from the same origin.
 * 
 * To enable CORS (useful for separate frontend/backend deployments):
 * - Set CORS_ENABLED=true in your environment variables
 * - Configure CORS_ORIGINS with comma-separated allowed origins
 * 
 * Environment Variables:
 * - CORS_ENABLED: "true" or "false" (default: "false")
 * - CORS_ORIGINS: Comma-separated list of allowed origins (default: "http://localhost:5173,http://localhost:3000")
 */

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // If CORS is disabled, reject all cross-origin requests
    if (!configs.corsEnabled) {
      return callback(null, false);
    }

    // Allow requests with no origin (like mobile apps or server-to-server requests)
    if (!origin) {
      return callback(null, true);
    }

    // Check if the origin is in the allowed list
    if (configs.corsOrigins.includes(origin)) {
      callback(null, true);
    } else {
      logger.warn(`CORS: Blocked request from origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  maxAge: 86400, // 24 hours - how long the browser can cache preflight responses
};

// Log CORS configuration on startup
if (configs.corsEnabled) {
  logger.info(`CORS enabled. Allowed origins: ${configs.corsOrigins.join(', ')}`);
} else {
  logger.info('CORS disabled. Single-server deployment mode.');
}

export default cors(corsOptions);
