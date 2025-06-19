/**
 * Client Application Configuration
 * 
 * How Vite determines MODE:
 * - `npm run dev` → MODE = "development" (loads .env)
 * - `npm run build` → MODE = "production" (loads .env + .env.production)
 */

import logger from "./utils/logger";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
export const IS_DEVELOPMENT = import.meta.env.DEV;
export const IS_PRODUCTION = import.meta.env.PROD;
export const ENVIRONMENT = import.meta.env.MODE;

if (IS_DEVELOPMENT) {
  logger.info('App Configuration:', {
    MODE: ENVIRONMENT,
    API_BASE_URL,
    IS_DEVELOPMENT,
    IS_PRODUCTION,
  });
}
