import { Router } from 'express';
import path from 'path';
import fs from 'fs';
import { pathToFileURL } from 'url';
import { serverRootDir } from '../utils/path.js';
import logger from '../utils/logger.js';

/**
 * API Routes Auto-Discovery Router
 * 
 * This router automatically discovers and registers API routes from the `api/` directory.
 * Each .ts/.js file in the API directory becomes a route endpoint.
 * 
 * Example:
 * - `api/hello.ts` → `/api/hello`
 * - `api/users.ts` → `/api/users`
 */

const router = Router();
const apiDir = path.resolve(serverRootDir, './api');
const basePath = '/api';

// Load routes synchronously during module initialization
// If there are errors, crash the server startup process
try {
  await loadApiRoutesFromFiles(router, apiDir, basePath);
  logger.info(`✅ API routes loaded successfully from ${apiDir}`);
} catch (error) {
  logger.error('❌ FATAL: Failed to load API routes during startup:', error);
  process.exit(1); // Stop the server startup process
}

/**
 * Loads API routes into the provided router
 */
async function loadApiRoutesFromFiles(router: Router, apiDir: string, basePath: string): Promise<void> {
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
          const errorMsg = `No default export found in ${file}. Each API route file must export a Router as default.`;
          logger.error(errorMsg);
          throw new Error(errorMsg);
        }
        
        router.use(routePath, apiRouter);
        logger.debug(`📍 Registered API route: ${routePath} from ${file}`);
      } catch (error) {
        logger.error(`❌ Failed to load API route from ${file}:`, error);
        throw error; // Re-throw to stop the startup process
      }
    }
  }
}

export default router;
