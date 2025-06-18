import { Router } from 'express';
import path from 'path';
import fs from 'fs';
import { pathToFileURL } from 'url';
import { serverRootDir } from '../utils/path.js';
import logger from '../utils/logger.js';

/**
 * API Routes Auto-Discovery Middleware
 * 
 * This middleware automatically discovers and registers API routes from the `api/` directory.
 * Each .ts/.js file in the API directory becomes a route endpoint.
 * 
 * Example:
 * - `api/hello.ts` → `/api/hello`
 * - `api/users.ts` → `/api/users`
 */

const router = Router();
const apiDir = path.resolve(serverRootDir, './api');
const basePath = '/api';

// Load routes asynchronously
loadApiRoutesFromFiles(router, apiDir, basePath)
  .then(() => {
    logger.info(`API routes middleware loaded from ${apiDir}`);
  })
  .catch(error => {
    logger.error('Failed to load API routes:', error);
  });

/**
 * Loads API routes into the provided router
 */
async function loadApiRoutesFromFiles(router: Router, apiDir: string, basePath: string): Promise<void> {
  try {
    const files = fs.readdirSync(apiDir);

    for (const file of files) {
      // Only include .ts or .js files, skip .d.ts and hidden files
      if (
        (file.endsWith('.ts') || file.endsWith('.js')) &&
        !file.endsWith('.d.ts') &&
        !file.startsWith('.')
      ) {
        const routeName = file.replace(/\.(ts|js)$/, '');
        if (!routeName) continue;
        
        const routePath = `${basePath}/${routeName}`;
        const modulePath = path.join(apiDir, file);
        const moduleUrl = pathToFileURL(modulePath).href;
        
        try {
          const routerModule = await import(moduleUrl);
          const apiRouter = routerModule.default;
          
          if (!apiRouter) {
            logger.warn(`No default export found in ${file}. Skipping route registration.`);
            continue;
          }
          
          router.use(routePath, apiRouter);
          logger.debug(`Registered API route: ${routePath} from ${file}`);
        } catch (error) {
          logger.error(`Failed to load API route from ${file}:`, error);
        }
      }
    }
  } catch (error) {
    logger.error('Failed to read API directory:', error);
    throw error;
  }
}

export default router;
