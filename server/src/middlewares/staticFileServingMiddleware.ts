import express from 'express';
import path from 'path';
import { staticDistDir } from '../utils/path.js';
import logger from '../utils/logger.js';

/**
 * Static Files Middleware
 * 
 * This middleware serves static files from the client build directory and handles
 * client-side routing by serving index.html for non-API routes.
 * 
 * Features:
 * - Serves static assets (CSS, JS, images, etc.) from the client build directory
 * - Handles client-side routing by serving index.html for all non-API routes
 * - Excludes API routes from the SPA fallback
 */

const clientBuildPath = staticDistDir;

const staticRouter = express.Router();

staticRouter.use(express.static(clientBuildPath));

// Handle client-side routing - serve index.html for all non-API routes
// This regex matches any route that doesn't start with '/api/'
staticRouter.get(/^\/(?!api\/).*/, (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

// Log static file configuration
logger.info(`Static files middleware configured. Serving from: ${clientBuildPath}`);

export default staticRouter;
