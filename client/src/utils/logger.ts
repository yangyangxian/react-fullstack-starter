/**
 * Simple Frontend Logger
 * 
 * Just a thin wrapper around console with environment-aware logging.
 */

const isDev = import.meta.env.DEV;

export const logger = {
  debug: (message: string, ...args: any[]) => {
    if (isDev) {
      console.log(`🐛 ${message}`, ...args);
    }
  },

  info: (message: string, ...args: any[]) => {
    if (isDev) {
      console.info(`ℹ️ ${message}`, ...args);
    }
  },

  warn: (message: string, ...args: any[]) => {
    console.warn(`⚠️ ${message}`, ...args);
  },

  error: (message: string, ...args: any[]) => {
    console.error(`❌ ${message}`, ...args);
  }
};

export default logger;
