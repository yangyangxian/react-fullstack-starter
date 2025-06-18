import { drizzle } from 'drizzle-orm/postgres-js';
import configs from '../appConfig.js';
import { CustomError } from '../classes/CustomError.js';
import logger from './logger.js';

if (!configs.dbUrl || configs.dbUrl.trim() === '') {
  logger.error('DATABASE_URL is not set or is empty. Database operations may fail. Please check your environment variables.');
}

// Single database instance
const db = drizzle({ 
  connection: { 
    url: configs.dbUrl,
    ssl: 'require'
  }
});

// Central execute function for all SQL queries
export async function executeQuery<T = any>(sql: string): Promise<T[]> {
  if (!configs.dbUrl || configs.dbUrl.trim() === '') {
    throw new CustomError('DatabaseURLNotConfigured', 'DATABASE_URL is not configured. Cannot execute query.');
  }
  try {
    const result = await db.execute(sql);
    return result as T[];
  } catch (error) {
    if (error instanceof Error) {
      throw new CustomError('DatabaseExecutionError', `SQL query failed: ${error.message}`, error.stack);
    }

    throw new CustomError('DatabaseExecutionError', 'Unknown database error occurred');
  }
}

export default db;