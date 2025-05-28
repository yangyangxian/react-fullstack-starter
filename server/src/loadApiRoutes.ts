import { Express } from 'express';
import path from 'path';
import fs from 'fs';

export async function loadApiRoutes(app: Express, __dirname: string) {
  const apiDir = path.join(__dirname, 'api');
  const files = fs.readdirSync(apiDir);
  for (const file of files) {
    // Only include .ts or .js files, skip .d.ts and hidden files
    if (
      (file.endsWith('.ts') || file.endsWith('.js')) &&
      !file.endsWith('.d.ts') &&
      !file.startsWith('.')
    ) {
      const routeName = file.replace(/\.(ts|js)$/, '');
      if (!routeName) continue; // skip if filename is empty
      const routePath = `/api/${routeName}`;
      const modulePath = path.join(apiDir, file);
      const routerModule = await import(modulePath);
      const router = routerModule.default;
      app.use(routePath, router);
    }
  }
}
