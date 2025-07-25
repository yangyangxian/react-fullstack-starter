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

const apiDir = path.resolve(serverRootDir, './api');
const basePath = '/api';

// Collect all public and protected routers
const publicRouter = Router();
const protectedRouter = Router();

try {
  await loadApiRoutesFromFiles(publicRouter, protectedRouter, apiDir, basePath);
  logger.info(`✅ API routers loaded successfully from ${apiDir}`);
} catch (error) {
  logger.error('❌ FATAL: Failed to load API routers during startup:', error);
  process.exit(1);
}

/**
 * Loads API routes into the provided router
 */
async function loadApiRoutesFromFiles(publicRouter: Router, protectedRouter: Router, apiDir: string, basePath: string): Promise<void> {
  const files = fs.readdirSync(apiDir);

  for (const file of files) {
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
        let registered = false;
        if (routerModule.publicRouter) {
          publicRouter.use(routePath, routerModule.publicRouter);
          logger.debug(`📍 Registered PUBLIC API route: ${routePath} from ${file}`);
          registered = true;
        }
        if (routerModule.protectedRouter) {
          protectedRouter.use(routePath, routerModule.protectedRouter);
          logger.debug(`📍 Registered PROTECTED API route: ${routePath} from ${file}`);
          registered = true;
        }
        if (!registered) {
          logger.warn(`⚠️ No publicRouter or protectedRouter exported from ${file}. Skipping.`);
        }
      } catch (error) {
        logger.error(`❌ Failed to load API route from ${file}:`, error);
        throw error;
      }
    }
  }
}

export { publicRouter, protectedRouter };
