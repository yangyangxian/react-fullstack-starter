import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file in the root directory

const GetEnv = (key: string, fallback?: string): string => {
  const value = process.env[key];
  if (value !== undefined) return value;
  if (fallback !== undefined) return fallback;
  
  throw new Error(`Missing required env var: ${key}`);
};

const configs = {
  port: parseInt(GetEnv('PORT', '5050'), 10),
  dbUrl: GetEnv('DATABASE_URL', 'mongodb://localhost:27017/my_database'),
  env: GetEnv('NODE_ENV', 'development'),
};

export default configs; 