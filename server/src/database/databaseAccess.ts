import postgres from 'postgres';
import configs from '../appConfig.js';
import { CustomError } from '../classes/CustomError.js';
import { ErrorCode } from '@fullstack/common';
import logger from '../utils/logger.js';

if (!configs.dbUrl || configs.dbUrl.trim() === '') {
  logger.error('DATABASE_URL is not set or is empty. Database operations may fail. Please check your environment variables.');
}

const sql = postgres(configs.dbUrl || '', {
  ssl: configs.dbUrl ? 'require' : false
});

export async function executeQuery<T = any>(query: string, params: any[] = []): Promise<T[]> {
  if (!configs.dbUrl || configs.dbUrl.trim() === '') {
    throw new CustomError(
      'DatabaseURLNotConfigured', 
      'DATABASE_URL is not configured.',
      ErrorCode.INTERNAL_ERROR
    );
  }
  
  try {
    const result = await sql.unsafe(query, params);
    return result as unknown as T[];
  } catch (error) {
    throw new CustomError(
      'DatabaseExecutionError', 
      error instanceof Error ? error.message : 'Database query failed',
      ErrorCode.INTERNAL_ERROR
    );
  }
}